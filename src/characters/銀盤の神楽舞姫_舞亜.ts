import { CharacterBase } from '../types/CharacterBase';

export class 銀盤の神楽舞姫_舞亜 extends CharacterBase {
  static id = '銀盤の神楽舞姫舞亜';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に94%×6回のダメージ
    // 自身の行動CT20%短縮(5CT)
    // 自身の右1レーンにいる味方のノーツを1~2前方に移動
    this.setCTBuff('銀盤の神楽舞姫_舞亜', 20, 5);
    this.getRightCharacter()?.notesForward(1);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に1800%(ラッシュ100以上の時、2000%)のダメージ
    // ラッシュ100以上の時、敵単体のEXゲージを100吸収し、その内の50%味方のEXゲージを回復
    if (this.battleSystem.getRush() >= 100) {
      this.battleSystem.addEx(50);
    }
  }
}
export default 銀盤の神楽舞姫_舞亜;
