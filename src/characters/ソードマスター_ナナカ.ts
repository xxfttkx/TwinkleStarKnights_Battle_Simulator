import { CharacterBase } from '../types/CharacterBase';

export class ソードマスター_ナナカ extends CharacterBase {
  static id = 'ソードマスターナナカ';
  secondFaction = '人間';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に94％×6回のダメージ
    // 被ダメージを異なる属性の味方の数×8％（チャージ状態の時、10％）増加（20CT）
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に2500％のダメージ
    // スタンゲージ6減少
    // 自身のクリティカル時のダメージ倍率を自身を含むユニゾンの味方の数×15％加算（1CT）
    // 自身の行動CT20％遅延（20CT）
    this.setCTBuff('ソードマスターナナカ', -20, 20);
  }

  // EXスキル2+
}
export default ソードマスター_ナナカ;
