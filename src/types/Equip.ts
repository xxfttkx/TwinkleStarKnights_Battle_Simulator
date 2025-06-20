// 装备类型
export type EquipType = "武器" | "防具" | "装飾品";

// 装备接口
export interface Equip {
  id: number; // 装备唯一标识
  name: string; // 装备名称
  type: EquipType; // 装备类型
  atkBonus: number; // 攻击力加成
  exBonus: number; // 特殊技能值加成
  exUpBonus: number; // 特殊技能提升值加成
  ctBonus: number; // 冷却时间减少加成
}