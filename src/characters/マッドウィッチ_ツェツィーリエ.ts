import { CharacterBase } from '../types/CharacterBase';

export class マッドウィッチ_ツェツィーリエ extends CharacterBase {
  static id = 'マッドウィッチツェツィーリエ';
  useSkill1(_team: CharacterBase[]): void {
    // 対象とその左右1レーンにいる敵すべてに50％の確率で毒を付与（30CT）
    // 一番右に配置されている味方のATK100％アップ（40CT）
    // 魔族の味方の行動CT20％短縮（5CT）
    // ノーツを前方に4移動
    for (const c of this.battleSystem.team) {
      if (c.isElement('魔族')) {
        c.setCTBuff('マッドウィッチツェツィーリエ', 20, 5);
        c.notesForward(4);
      }
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に200％のダメージ
    // 毒状態の敵の数×15のEXゲージを吸収し、その内の100％味方のEXゲージを回復
    // 魔族の味方のクリティカル時のダメージ倍率を50％加算（20CT）
    // ノーツを7～7前方に移動
    for (const c of this.battleSystem.team) {
      if (c.isFaction('魔族')) {
        c.notesForward(7);
      }
    }
  }
}
export default マッドウィッチ_ツェツィーリエ;
