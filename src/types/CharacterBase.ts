import type { Equip } from './Equip';
import { EventEmitter } from '../utils/EventEmitter';
import type { BattleSystem } from '../systems/BattleSystem';

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

export interface CharacterData {
  id: number;
  name: string;
  role: string;
  avatar: string;
  atk: number; // 攻击力
  ex: number; // 特殊技能值
  ex_up: number; // 特殊技能提升值
  type: string; // 角色类型
  ct: number;
  faction: string; // 阵营
  element: string; // 属性
}

export class CharacterBase {
  data: CharacterData;
  ct: number; // 位置
  equips: {
    weapon?: Equip; // 武器
    armor?: Equip; // 防具
    accessory?: Equip; // 装飾品
  };
  isCharged: boolean = false; // 是否充能
  isDead: boolean = false; // 是否死亡
  protected eventEmitter: EventEmitter;
  battleSystem: BattleSystem;
  buffs: Buff[];

  constructor(
    data: CharacterData,
    eventEmitter: EventEmitter,
    battleSystem: BattleSystem
  ) {
    this.data = data;
    this.ct = data.ct;
    this.equips = {};
    this.eventEmitter = eventEmitter;
    this.battleSystem = battleSystem;
    this.buffs = [];
  }

  // 通用方法
  useSkill1(_team: CharacterBase[]): void {}
  useSkill2(_team: CharacterBase[]): void {}
  updateCT(): void {
    if (this.ct > 0) {
      this.ct -= 1;
    } else {
      this.ct = this.getCT();
    }
    for (const b of this.buffs) {
      b.duration -= 1; // 每次设置 Buff 时减少持续时间
      // console.log(`Buff ${b.name} 的剩余持续时间: ${b.duration}`);
      if (b.duration <= 0) {
        // 如果 Buff 的持续时间小于等于 0，则移除该 Buff
        this.buffs = this.buffs.filter(existingBuff => existingBuff !== b);
      }
    }
  }

  getEx(): number {
    return this.data.ex; // 特殊技能提升值
  }

  getEx_up(): number {
    return this.data.ex_up; // 特殊技能提升值
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

  ctForward(num: number): void {
    if (this.ct > 1) {
      this.ct = Math.max(1, this.ct - num);
    }
  }

  ctUnison(num: number): void {
    this.ct = num;
  }

  getEx1Cost(): number {
    return 100;
  }

  getEx2Cost(): number {
    return 200;
  }

  finishAction(): void {
    this.isCharged = false;
  }

  isFaction(faction: string): boolean {
    return this.data.faction === faction;
  }

  isElement(element: string): boolean {
    return this.data.element === element;
  }

  setBuff(buff: Buff): void {
    this.buffs.push(buff);
  }

  // 通常攻击增加 EX
  atkAddEX(): void {
    this.battleSystem.addEx(
      (100 + this.getEx_up()) / (this.isCharged ? 3 : 3.75)
    );
  }
}
