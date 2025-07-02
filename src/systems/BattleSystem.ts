import { CharacterBase } from '../types/CharacterBase';
import emitter from '../eventBus';
import { type CharacterData } from '@/types';
import { CharacterRegistry } from '@/utils/CharacterRegistry';

interface EditedExData {
  ex: number;
  ex_up: number;
}

export class BattleSystem {
  public team: CharacterBase[] = []; // 队伍成员
  private teamEx: number = 0; // 队伍整体 EX 量
  private teamExMax: number = 400;
  canAction: number[] = [];
  afterAction: number[] = [];
  startAction: number = -1; // 最先行动的角色索引
  allowNegativeEx = true;
  editedExMap: Record<string, EditedExData> = {};
  hp: number = 1.0;

  constructor() {
    emitter.on('ex-edit', (data: [string, number]) => {
      const [name, value] = data;
      if (!this.editedExMap[name]) {
        this.editedExMap[name] = { ex: 0, ex_up: 0 };
      }
      this.editedExMap[name].ex = value;
      emitter.emit('ex-changed', name); // 通知 EX 变化
    });
    emitter.on('ex-up-edit', (data: [string, number]) => {
      const [name, value] = data;
      if (!this.editedExMap[name]) {
        this.editedExMap[name] = { ex: 0, ex_up: 0 };
      }
      this.editedExMap[name].ex_up = value;
      emitter.emit('ex-up-changed', name); // 通知 EX_UP 变化
    });
  }

  createCharacter(char: CharacterData): CharacterBase {
    const Cls = CharacterRegistry[char.name];
    if (Cls) return new Cls(char, this);
    alert(`キャラクター ${char.name} のクラスはまだ実装されていません`);
    return new CharacterBase(char, this);
  }

  init(team: CharacterBase[]): void {
    this.team = team;
  }

  start(): void {
    this.teamEx = 0;
    this.teamExMax = 400; // 最大 EX 量为 400
    this.hp = 1.0;
    for (const c of this.team) {
      this.addEx(c.getEx()); // 初始化时增加每个角色的 EX 量
      emitter.emit('ex-up-changed', c.data.name); // 通知 EX_UP 变化
    }
    // perfect ロケットスタート
    for (const c of this.team) {
      c.ctForward(10);
    }
    emitter.emit('battle-start'); // 触发战斗开始事件
    this.startNewTurn();
  }

  currTurnCanAction(): boolean {
    this.canAction = [];
    this.afterAction = [];
    for (let i = 0; i < this.team.length; i++) {
      if (this.team[i].ct <= 0) {
        this.canAction.push(i);
      }
    }
    return this.canAction.length !== 0;
  }

  autoSetEX(): void {
    if (this.team.length <= 0) {
      alert('チームが空です！');
      return;
    }
    for (const c of this.team) {
      emitter.emit('ex-edit', [c.data.name, 400]);
      emitter.emit('ex-up-edit', [c.data.name, 150]); // 通知 EX_UP 变化
    }
  }

  unison(): void {
    if (this.startAction !== -1) {
      alert('もう行動しているキャラがいます！');
      return;
    }
    let canUnison = this.canAction.length === 1;
    if (!canUnison) {
      alert("can't unison now!");
      return;
    }
    let currChar = this.team[this.canAction[0]];
    if (currChar.isCharged) {
      alert(`${currChar.data.name} is already charged, can't unison now!`);
      return;
    }
    let secondPos = 999;
    for (const c of this.team)
      if (c.ct != 0) secondPos = Math.min(secondPos, c.ct); // 找到第二个位置的最小 CT
    currChar.ctChange(secondPos);
    emitter.emit('custom-event', `${currChar.data.name} 发动了unison!`);
    this.startNewTurn();
  }

  charge(): void {
    if (this.startAction !== -1) {
      alert('もう行動しているキャラがいます！');
      return;
    }
    for (const index of this.canAction) {
      let c = this.team[index];
      if (c.isCharged) {
        alert(`${c.data.name} is already charged!`);
        return;
      }
    }
    // todo: ただし、 蛍火 はATKタイプであるにもかかわらず例外的に8CTとなっている。
    let typeToCT: Record<string, number> = {
      SPD: 12,
      SUP: 10,
      ATK: 9,
      HEAL: 8,
      DEF: 7,
    };
    let allCT = 0;
    for (const index of this.canAction) {
      let c = this.team[index];
      if (typeToCT[c.data.type] === undefined) {
        alert(`出bug啦`);
        return;
      }
      allCT += typeToCT[c.data.type];
    }
    // ユニゾン参加者全員のチャージCTの平均値（小数点以下切り捨て）
    let chargedCT = Math.floor(allCT / this.canAction.length);
    let addEX = 100;
    for (const index of this.canAction) {
      let c = this.team[index];
      c.ctChange(chargedCT);
      c.isCharged = true;
      addEX += c.getEx_up();
    }
    addEX /= 1.5;
    this.addEx(addEX);
    const names = this.canAction
      .map(index => this.team[index].data.name)
      .join(', ');
    emitter.emit('custom-event', `${names} charged!(ex + ${addEX})`);
    this.startNewTurn();
  }

  // 增加队伍整体 EX 量
  addEx(amount: number): void {
    this.teamEx = Math.min(this.teamEx + amount, this.teamExMax);
    // this.teamEx = Math.max(this.teamEx, 0); // 确保 EX 量不小于 0
    emitter.emit('ex-change', this.teamEx);
  }

  // 获取队伍整体 EX 量
  getTeamEx(): number {
    return this.teamEx;
  }

  // 使用技能
  tryUseSkill(name: string, skill: string): boolean {
    console.log(`${name} 尝试使用 ${skill}`);
    for (const c of this.team) {
      if (c.data.name === name) {
        if (c.ct > 0) {
          alert(`${c.data.name} 的行动条未满，无法使用技能！`);
          return false;
        }
        if (this.afterAction.includes(this.team.indexOf(c))) {
          return false; // 如果该角色已经行动过，则不能再次使用技能
        }
        console.log('是否测试模式:', this.allowNegativeEx);
        let exCost = 0;
        if (skill === 'ex1') {
          if (this.teamEx >= c.getEx1Cost() || this.allowNegativeEx) {
            if (!c.canUseSkill1()) return false;
            exCost = c.getEx1Cost();
            exCost = c.getActualExCost(exCost);
            this.addEx(-exCost); // 使用技能1时扣除对应的EX量
            // 暂时这样处理ex buff，可能要改，也可能不改了
            c.afterSkill();
            c.useSkill1(this.team);
          }
        } else if (skill === 'ex2') {
          if (this.teamEx >= c.getEx2Cost() || this.allowNegativeEx) {
            if (!c.canUseSkill2()) return false;
            exCost = c.getEx2Cost();
            exCost = c.getActualExCost(exCost);
            this.addEx(-exCost);
            c.afterSkill();
            c.useSkill2(this.team);
          }
        }
        let addEx = c.atkAddEX();
        this.addEx(addEx);
        emitter.emit(
          'custom-event',
          `${c.data.name} 使用了 ${skill}(ex - ${exCost}), 普通攻击(ex + ${addEx})`
        );

        if (this.startAction === -1) {
          this.startAction = this.team.indexOf(c);
        }
        this.nextAction(this.team.indexOf(c));
        return true;
      }
    }
    return false;
  }

  nextAction(index: number): void {
    // 强制行动
    if (this.startAction === -1) {
      alert('不对的吧！');
      return;
    }
    this.team[index].finishAction();
    this.afterAction.push(index); // 将当前行动的角色添加到 afterAction 列表中
    if (this.afterAction.length === this.canAction.length) {
      // 如果所有角色都行动完毕，开始新回合
      if (this.afterAction.length > 1) {
        //  unison attack
        this.addEx(40 * this.afterAction.length);
        emitter.emit(
          'custom-event',
          `ユニゾンアタック(ex + ${40 * this.afterAction.length})`
        );
        for (const i of this.afterAction) {
          this.team[i].endUnison();
        }
      }
      this.startNewTurn();
      return;
    }
  }

  startNewTurn(): void {
    this.startAction = -1; // 重置最先行动的角色索引
    for (const c of this.team) {
      c.updateCT();
    }
    emitter.emit('custom-event', 'all forward ct ' + 1);
    if (this.currTurnCanAction()) {
    } else {
      this.startNewTurn();
    }
  }

  addHP(amount: number): void {
    this.hp = Math.min(this.hp + amount, 3.0); // 确保 HP 不超过 3.0
  }

  isOverHeal(): boolean {
    return this.hp > 1.0;
  }

  isFullOverheal(): boolean {
    return this.hp >= 3.0;
  }

  getFactionCount(faction: string): number {
    let count = 0;
    for (const c of this.team) {
      if (c.isFaction(faction)) {
        count++;
      }
    }
    return count;
  }

  getElementCount(element: string): number {
    let count = 0;
    for (const c of this.team) {
      if (c.isElement(element)) {
        count++;
      }
    }
    return count;
  }

  getFactionOrElementCount(faction: string, element: string): number {
    return this.team.filter(c => c.isFaction(faction) || c.isElement(element))
      .length;
  }

  getSecondCharacters(): CharacterBase[] {
    let secondPos = 999;
    for (const c of this.team) {
      if (c.ct != 0) secondPos = Math.min(secondPos, c.ct); // 找到第二个位置的最小 CT
    }
    let res = [];
    for (const c of this.team) {
      if (c.ct == secondPos) {
        res.push(c);
      }
    }
    return res;
  }

  getLastCharacters(): CharacterBase[] {
    let lastPos = 0;
    for (const c of this.team) {
      lastPos = Math.max(lastPos, c.ct);
    }
    let res = [];
    for (const c of this.team) {
      if (c.ct == lastPos) {
        res.push(c);
      }
    }
    return res;
  }

  getTeamIndex(character: CharacterBase): number {
    return this.team.indexOf(character);
  }
}
