import { CharacterBase } from '../types/CharacterBase';

export class さざ波に揺られて_ソフィア extends CharacterBase {
  static id = 'さざ波に揺られてソフィア';

  getEx_up(): number {
    let buffExUp = 0;
    for (const buff of this.buffs) {
      if (buff.target === 'ex_up') {
        buffExUp += buff.val;
      }
    }
    return super.getEx_up() + buffExUp;
  }

  useSkill1(_team: CharacterBase[]): void {
    // 一番右に配置されている味方のATK150％アップ（30CT）/
    // クリティカルを30％加算（30CT）/
    // 対象が魔族または闇属性の場合、ノーツを7前方に移動
    // ※2つの条件を満たした場合でもノーツ移動効果は重複しない/
    // 自身のEX上昇を60アップ（25CT）
    const right = this.battleSystem.getRightmostCharacter();
    if (right) {
      right.setATKBuff('さざ波に揺られて_ソフィア', 150, 30);
      right.setCriticalBuff('さざ波に揺られて_ソフィア', 30, 30);
      if (right.isFactionOrElement('魔族', '闇')) {
        right.notesForward(7);
      }
    }
    this.setExUpBuff('さざ波に揺られて_ソフィア', 60, 25);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 魔族の味方のATK200％アップ（30CT）/
    // さらに闇属性の味方のATK200％アップ（30CT）/
    // 魔族または闇属性の味方のノーツを7～7前方に移動
    // ※2つの条件を満たした場合でもノーツ移動効果は重複しない/
    // 自身を含む魔族または闇属性の味方と3体以上ユニゾン時、さらに魔族または闇属性の味方のATKを10％+自身の基礎ATK200ごと×5.5％アップ（30CT）（最大100％）
    // ※2つの条件を満たした場合でも効果は重複しない
    for (const c of this.battleSystem.team) {
      if (c.isFactionOrElement('魔族', '闇')) {
        c.notesForward(7);
      }
    }
  }
}
export default さざ波に揺られて_ソフィア;
