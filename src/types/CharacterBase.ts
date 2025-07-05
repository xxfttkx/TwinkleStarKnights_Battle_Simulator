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
  exBuff?: {
    costReduction: number;
    remainingUses: number;
  };

  constructor(data: CharacterData, battleSystem: BattleSystem) {
    this.data = data;
    this.notes = data.ct;
    this.equips = {};
    this.battleSystem = battleSystem;
    this.buffs = [];
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

  updateCT(): void {
    if (this.notes > 0) {
      this.notes -= 1;
    } else {
      this.notes = this.getCT();
    }
    // todo: 我也不知道先算buff还是先算ct
    // 自身の行動CT50％短縮（1CT） 有这种东西存在所以应该是先算ct吧
    for (const b of this.buffs) {
      b.duration -= 1; // 每次设置 Buff 时减少持续时间
      // console.log(`Buff ${b.name} 的剩余持续时间: ${b.duration}`);
      if (b.duration <= 0) {
        // 如果 Buff 的持续时间小于等于 0，则移除该 Buff
        this.buffs = this.buffs.filter(existingBuff => existingBuff !== b);
      }
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
    return Math.max(1, Math.ceil(this.data.ct * (1 - this.getCTBonus())));
  }

  notesForward(num: number): void {
    if (this.notes > 1) {
      this.notes = Math.max(1, this.notes - num);
    }
  }

  ctChange(num: number): void {
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
    this.exBuff = {
      costReduction,
      remainingUses,
    };
  }

  getActualExCost(baseCost: number): number {
    if (this.exBuff) {
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

  finishAction(): void {
    this.isCharged = false;
  }

  endUnison(): void {
    // unison也会消isCharged
    this.isCharged = false;
  }

  isFaction(faction: string): boolean {
    return this.data.faction === faction;
  }

  isElement(element: string): boolean {
    return this.data.element === element;
  }

  isFactionOrElement(faction: string, element: string): boolean {
    return this.isFaction(faction) || this.isElement(element);
  }

  isType(type: string): boolean {
    return this.data.type === type;
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

  isStealth(): boolean {
    return this.buffs.some(buff => buff.target === 'ステルス');
  }

  afterSkill(): void {
    this.consumeExBuffIfAny();
  }
}
