import { CharacterBase } from '../types/CharacterBase';

export class 変幻のアクトレス藍 extends CharacterBase {
  static id = '変幻のアクトレス藍';
  useSkill1(_team: CharacterBase[]): void {
    // 自身のATK170％アップ（20CT）/
    // 行動CT70％短縮（1CT）/
    // 味方のHPがフルオーバーヒール状態（300％）の時、自身の左1レーンにいる味方のノーツを3移動
    this.setCTBuff('変幻のアクトレス藍.id', 70, 1);
    this.battleSystem.isFullOverheal() &&
      this.getLeftCharacter()?.notesForward(3);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に1500％+オーバーヒール割合（フルオーバーヒール時200％）×5％のダメージ/
    // 自身のATKを水属性の味方の数×50％アップ（1CT）
  }
}
export default 変幻のアクトレス藍;
