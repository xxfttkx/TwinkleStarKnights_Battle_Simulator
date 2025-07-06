import { CharacterBase } from '../types/CharacterBase';

export class アイスクイーン_サーシャ extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に192%のダメージ
    // 75%の確率で凍傷を付与(20CT)
  }

  useSkill2(_team: CharacterBase[]): void {
    // 対象とその左右2レーンにいる敵すべてに200%のダメージ
    // 12~12ノックバック(レーン隣接している敵は対象レーンから離れるほどノックバック量は-1ずつ減少)
  }
}
