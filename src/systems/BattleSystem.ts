import { CharacterBase, type CharacterData } from '../types/CharacterBase';
import { EventEmitter } from '../utils/EventEmitter';
import emitter from '../eventBus';
import { 夏空の一番星_ヴィーナス } from '../characters/夏空の一番星_ヴィーナス';
import { 招福の明星_ヴィーナス } from '../characters/招福の明星_ヴィーナス';
import { 正義のハッカー_コハルコ } from '../characters/正義のハッカー_コハルコ';
import { 舞うは九浄の桜花_ヘレナ } from '../characters/舞うは九浄の桜花_ヘレナ';
import { 霹靂の射手_梨緒 } from '../characters/霹靂の射手_梨緒';

interface EditedExData {
  ex: number;
  ex_up: number;
}

export class BattleSystem {
  public team: CharacterBase[] = []; // 队伍成员
  private teamEx: number = 0; // 队伍整体 EX 量
  private teamExMax: number = 400;
  eventEmitter: EventEmitter;
  canAction: number[] = [];
  afterAction: number[] = [];
  startAction: number = -1; // 最先行动的角色索引
  allowNegativeEx = true;
  editedExMap: Record<string, EditedExData> = {};

  constructor() {
    this.eventEmitter = new EventEmitter();
    // 监听 EX 增加事件
    this.eventEmitter.on('onExIncrease', (amount: number) => {
      this.addEx(amount);
    });

    emitter.on('ex-edit', (data: [string, number]) => {
      const [name, value] = data;
      if (!this.editedExMap[name]) {
        this.editedExMap[name] = { ex: 0, ex_up: 0 };
      }
      this.editedExMap[name].ex = value;
    });
    emitter.on('ex-up-edit', (data: [string, number]) => {
      const [name, value] = data;
      if (!this.editedExMap[name]) {
        this.editedExMap[name] = { ex: 0, ex_up: 0 };
      }
      this.editedExMap[name].ex_up = value;
    });
  }
  createCharacter(char: CharacterData): CharacterBase {
    switch (char.name) {
      case '夏空の一番星_ヴィーナス':
        return new 夏空の一番星_ヴィーナス(char, this.eventEmitter, this);
      case '招福の明星_ヴィーナス':
        return new 招福の明星_ヴィーナス(char, this.eventEmitter, this);
      case '正義のハッカー_コハルコ':
        return new 正義のハッカー_コハルコ(char, this.eventEmitter, this);
      case '舞うは九浄の桜花_ヘレナ':
        return new 舞うは九浄の桜花_ヘレナ(char, this.eventEmitter, this);
      case '霹靂の射手_梨緒':
        return new 霹靂の射手_梨緒(char, this.eventEmitter, this);
      default:
        return new CharacterBase(char, this.eventEmitter, this);
    }
  }

  init(team: CharacterBase[]): void {
    this.team = team;
  }

  start(): void {
    this.teamEx = 0;
    this.teamExMax = 400; // 最大 EX 量为 400
    for (const c of this.team) {
      this.addEx(c.getEx()); // 初始化时增加每个角色的 EX 量
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

  unison(): void {
    let canUnison = this.canAction.length === 1;
    if (!canUnison) {
      alert('当前无法发动合体技能！');
      return;
    }
    let secondPos = 999;
    for (const c of this.team)
      if (c.ct != 0) secondPos = Math.min(secondPos, c.ct); // 找到第二个位置的最小 CT
    this.team[this.canAction[0]].ctUnison(secondPos);
    emitter.emit(
      'custom-event',
      `${this.team[this.canAction[0]].data.name} 发动了unison!`
    );
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
            exCost = c.getEx1Cost();
            this.addEx(-exCost); // 使用技能1时扣除对应的EX量
            c.useSkill1(this.team);
          }
        } else if (skill === 'ex2') {
          if (this.teamEx >= c.getEx2Cost() || this.allowNegativeEx) {
            exCost = c.getEx2Cost();
            this.addEx(-exCost);
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
        //  unison
        this.addEx(40 * this.afterAction.length);
        emitter.emit(
          'custom-event',
          `$ユニゾンアタック(ex + ${40 * this.afterAction.length})`
        );
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
}
