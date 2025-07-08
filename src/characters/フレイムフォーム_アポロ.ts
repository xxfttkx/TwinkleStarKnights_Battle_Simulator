import { CharacterBase } from '../types/CharacterBase';

export class フレイムフォーム_アポロ extends CharacterBase {
  static id = 'フレイムフォームアポロ';

  useSkill1(_team: CharacterBase[]): void {
    // 自身のATK150％アップ（20CT）/
    // 行動CT50％短縮（1CT）
    this.setATKBuff('フレイムフォームアポロ', 150, 20);
    this.setCTBuff('フレイムフォームアポロ', 50, 1);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に2200％のダメージ/
    // 13ノックバック/
    // 50％の確率で火傷を付与（20CT）/
    // 自身のATK150％アップ（1CT）/
    // 自身の行動CT20％遅延（20CT）
    this.setCTBuff('フレイムフォームアポロ', -20, 20);
  }
}
export default フレイムフォーム_アポロ;
