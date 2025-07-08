import { CharacterBase } from '../types/CharacterBase';

export class マリンガンナー_セーラ extends CharacterBase {
  static id = 'マリンガンナーセーラ';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に176％のダメージ/
    // 闇属性の味方の行動CTを闇属性の異なるタイプの数×3％短縮（5CT）/
    // ノーツを1～3前方に移動

    // 不知道和副属性怎么算，可能有错
    const num =
      this.battleSystem.team.length - this.battleSystem.getElementCount('闇');
    for (const c of this.battleSystem.team) {
      if (c.isElement('闇')) {
        c.setCTBuff(マリンガンナー_セーラ.id, num * 3, 5);
        c.notesForward(1);
      }
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に600％のダメージ/
    // 闇属性の味方のノーツを6～6前方に移動/
    // 闇属性の味方のタイプが3タイプ以上の場合、敵単体のEXゲージを20+自身の基礎ATK150ごと×4（合計最大80）吸収し、その内の100％味方のEXゲージを回復
    for (const c of this.battleSystem.team) {
      if (c.isElement('闇')) {
        c.notesForward(6);
      }
    }
    // todo: 幽默机制不想写。。
  }
}
export default マリンガンナー_セーラ;
