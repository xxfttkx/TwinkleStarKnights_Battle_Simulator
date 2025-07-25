import type { Equip } from './Equip';
import type { BattleSystem } from '../systems/BattleSystem';
import { type CharacterData } from '@/types';

export type CharacterType = 'sup' | 'atk' | 'spd' | 'def' | 'heal';
// 阵营类型
export type Faction = '人間' | '神族' | '魔族';
// 属性类型
export type Element = '闇' | '光' | '雷' | '炎' | '水';

export interface Buff {
  target: string; // Buff 属性
  name: string; // Buff 名称
  val: number;
  duration: number; // 持续时间（单位：CT）
}

export interface Status {
  name: string; // Status 名称
  duration: number; // 持续时间（单位：CT）
}

export type CharacterConstructor = new (
  char: CharacterData,
  battle: any
) => CharacterBase;

export class CharacterBase {
  data: CharacterData;
  notes: number; // 位置
  equips: {
    weapon?: Equip; // 武器
    armor?: Equip; // 防具
    accessory?: Equip; // 装飾品
  };
  isCharged: boolean = false; // 是否充能
  isDead: boolean = false; // 是否死亡
  battleSystem: BattleSystem;
  buffs: Buff[];
  statuses: Map<string, Status>;
  exBuff?: {
    costReduction: number;
    remainingUses: number;
  };
  subElementBuff?: {
    subElement: string; // サブ属性名
    duration: number; // 持続時間
  };
  returnNotes: number = -1;
  useSecondFrontAllyNoteReturn = false;
  secondFaction: string = ''; // セカンド種族

  constructor(data: CharacterData, battleSystem: BattleSystem) {
    this.data = data;
    this.notes = data.ct;
    this.equips = {};
    this.battleSystem = battleSystem;
    this.buffs = [];
    this.statuses = new Map<string, Status>();
  }

  // 通用方法
  useSkill1(_team: CharacterBase[]): void {}
  useSkill2(_team: CharacterBase[]): void {}

  canUseSkill1(): boolean {
    return true;
  }
  canUseSkill2(): boolean {
    return true;
  }

  updateNotes(): void {
    if (this.notes > 0) {
      this.notes -= 1;
    } else {
      this.notes = this.getCT();
    }
    // todo: 我也不知道先算buff还是先算ct
    // 自身の行動CT50％短縮（1CT） 有这种东西存在所以应该是先算ct吧
    for (const b of this.buffs) {
      b.duration -= 1;
      if (b.duration <= 0) {
        this.buffs = this.buffs.filter(existingBuff => existingBuff !== b);
      }
    }
    if (this.subElementBuff) {
      this.subElementBuff.duration -= 1; // 每次设置 Buff 时减少持续时间
      if (this.subElementBuff.duration <= 0) {
        this.subElementBuff = undefined; // 移除子属性 Buff
      }
    }
    for (const [name, status] of this.statuses) {
      status.duration -= 1;
      if (status.duration <= 0) {
        this.statuses.delete(name); // 移除状态
      }
    }
  }

  // 行動終了後のノーツ戻り位置を前から2番目の味方と同じ位置にする（対象がいない場合、行動CT値を参照した位置に戻る）
  applyNotesOverride(): void {
    if (this.returnNotes != -1) {
      this.notesChange(this.returnNotes);
      this.returnNotes = -1; // 重置返回位置
      return;
    }
    if (this.useSecondFrontAllyNoteReturn) {
      this.useSecondFrontAllyNoteReturn = false;
      const secPos = this.battleSystem.getSecondPos();
      if (secPos !== 999) {
        this.notesChange(secPos);
      }
      return;
    }
  }

  getBaseEx(): number {
    if (
      this.battleSystem.editedExMap[this.data.name] &&
      this.battleSystem.editedExMap[this.data.name].ex !== 0
    ) {
      return this.battleSystem.editedExMap[this.data.name].ex;
    }
    return this.data.ex;
  }

  getEx(): number {
    return this.getBaseEx();
  }

  getBaseEx_Up(): number {
    if (
      this.battleSystem.editedExMap[this.data.name] &&
      this.battleSystem.editedExMap[this.data.name].ex_up !== 0
    ) {
      return this.battleSystem.editedExMap[this.data.name].ex_up;
    }
    return this.data.ex_up;
  }

  getEx_up(): number {
    return this.getBaseEx_Up(); // 特殊技能提升值
  }

  getCTBonus(): number {
    let ctBonus = 0;
    for (const buff of this.buffs) {
      if (buff.target === 'ct') {
        ctBonus += buff.val; // 假设 Buff 的持续时间作为 CT 增加值
      }
    }
    return ctBonus;
  }

  getCT(): number {
    return Math.max(5, Math.ceil(this.data.ct * (1 - this.getCTBonus())));
  }

  notesForward(num: number): void {
    if (this.notes > 1) {
      this.notes = Math.max(1, this.notes - num);
    }
  }

  notesChange(num: number): void {
    this.notes = num;
  }

  getEx1Cost(): number {
    return 100;
  }

  getEx2Cost(): number {
    return 200;
  }

  setExBuff(costReduction: number, remainingUses: number): void {
    // 次ターン以降EXスキル1回発動まで
    // 使用 万成の幼天使_セシア 和 智謀の黒き微笑み_ジュリエッテ 测试发现不能叠加，且似乎是取最高
    // 然而有个-50%ex的角色，我没有测试过
    if (this.exBuff && this.exBuff.costReduction >= costReduction) {
      return; // 如果已有的exBuff更强，则不设置新的
    }
    this.exBuff = {
      costReduction,
      remainingUses,
    };
  }

  getActualExCost(baseCost: number): number {
    if (this.exBuff) {
      if (this.exBuff.costReduction <= 1) {
        return Math.max(0, baseCost - baseCost * this.exBuff.costReduction);
      }
      return Math.max(0, baseCost - this.exBuff.costReduction);
    }
    return baseCost;
  }

  consumeExBuffIfAny(): void {
    if (this.exBuff) {
      this.exBuff.remainingUses -= 1;
      if (this.exBuff.remainingUses <= 0) {
        this.exBuff = undefined;
      }
    }
  }

  setCharged(): void {
    this.isCharged = true;
  }

  finishAction(): void {
    this.isCharged = false;
  }

  endUnison(): void {
    // unison也会消isCharged
    this.isCharged = false;
  }

  isFaction(faction: string): boolean {
    return this.data.faction === faction || this.secondFaction === faction;
  }

  isElement(element: string): boolean {
    return this.data.element === element || this.hasSubElement(element);
  }

  setSubElementBuff(subElement: string, duration: number): void {
    this.subElementBuff = {
      subElement,
      duration,
    };
  }

  // サブ属性
  hasAnySubElement(): boolean {
    return (
      this.subElementBuff?.subElement !== undefined &&
      this.subElementBuff?.subElement !== ''
    );
  }

  // サブ属性
  hasSubElement(element: string): boolean {
    return this.subElementBuff?.subElement === element;
  }

  isFactionOrElement(faction: string, element: string): boolean {
    return this.isFaction(faction) || this.isElement(element);
  }

  isType(type: string): boolean {
    return this.data.type === type;
  }

  isAffiliation(affiliation: string): boolean {
    switch (affiliation) {
      case 'コラプサー':
        return (
          this.data.affiliation === affiliation ||
          this.data.affiliation === 'コラプサ'
        );
      case '流星学園附属':
        return this.data.affiliation.includes('流星附属');
      default:
        return this.data.affiliation === affiliation;
    }
  }

  setCTBuff(name: string, val: number, duration: number): void {
    this.setBuff({
      target: 'ct',
      name,
      val: val * 0.01,
      duration,
    });
  }

  // 注意重载 getEx_up()
  setExUpBuff(name: string, val: number, duration: number): void {
    this.setBuff({
      target: 'ex_up',
      name,
      val,
      duration,
    });
  }

  setBuff(buff: Buff): void {
    this.buffs.push(buff);
  }

  // 通常攻击增加 EX
  atkAddEX(): number {
    return (100 + this.getEx_up()) / (this.isCharged ? 3 : 3.75);
  }

  getLeftCharacter(): CharacterBase | null {
    const index = this.battleSystem.getTeamIndex(this);
    if (index <= 0) {
      return null;
    }
    return this.battleSystem.team[index - 1];
  }

  getRightCharacter(): CharacterBase | null {
    const index = this.battleSystem.getTeamIndex(this);
    if (index < 0 || index >= this.battleSystem.team.length - 1) {
      return null; // 如果是最后一个角色，返回 null
    }
    return this.battleSystem.team[index + 1];
  }

  setStealth(name: string, duration: number): void {
    this.setBuff({
      target: 'ステルス',
      name,
      val: 1,
      duration,
    });
  }

  isStealth(): boolean {
    return this.buffs.some(buff => buff.target === 'ステルス');
  }

  afterSkill(): void {
    this.consumeExBuffIfAny();
  }

  getLeftLanes(num: number): CharacterBase[] {
    const index = this.battleSystem.getTeamIndex(this);
    if (index < 0) {
      return []; // 如果当前角色不在队伍中，返回空数组
    }
    // 尝试获取左侧队友，最多获取到队伍开头
    const startIndex = Math.max(index - num, 0);
    return this.battleSystem.team.slice(startIndex, index);
  }

  getRightLanes(num: number): CharacterBase[] {
    const index = this.battleSystem.getTeamIndex(this);
    if (index < 0) {
      return []; // 如果当前角色不在队伍中，返回空数组
    }
    // 尝试获取右侧队友，最多获取到队伍末尾
    const endIndex = Math.min(index + num + 1, this.battleSystem.team.length);
    return this.battleSystem.team.slice(index + 1, endIndex);
  }

  getLeftAndRightLanes(numLeft: number, numRight: number): CharacterBase[] {
    const leftLanes = this.getLeftLanes(numLeft);
    const rightLanes = this.getRightLanes(numRight);
    return [...leftLanes, ...rightLanes];
  }

  setATKBuff(_name: string, _val: number, _duration: number): void {
    // todo
  }

  setCriticalBuff(_name: string, _val: number, _duration: number): void {
    // todo
  }

  setStatus(name: string, duration: number): void {
    // todo: 我不知道逻辑啊，要不要判断duration？还是直接上書き？
    this.statuses.set(name, { name, duration });
  }

  hasStatus(name: string): boolean {
    return this.statuses.has(name);
  }
}
