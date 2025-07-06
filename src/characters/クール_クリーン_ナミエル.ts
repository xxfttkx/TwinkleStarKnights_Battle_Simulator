import { CharacterBase } from '../types/CharacterBase';

export class クール_クリーン_ナミエル extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に144%のダメージ
    // ノーツを9後方に強制移動
    // 行動CT13.9%遅延(48CT)
  }

  useSkill2(_team: CharacterBase[]): void {
    // 対象とその左右1レーンにいる敵すべてに200%のダメージ
    // ノーツを12~12後方に強制移動(レーン隣接している敵は対象レーンから離れるほど移動量は-1ずつ減少)
  }
}
