import { CharacterBase } from '../types/CharacterBase';

export class 救世の錬金術師_アニマ extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    // 雷属性の味方に付与されているデバフ・状態異常効果をすべて解除
    // 全状態異常耐性を1段階アップ(48CT)
  }

  useSkill2(_team: CharacterBase[]): void {
    // 対象とその左右2レーンにいる敵すべてに150%のダメージ
    // 重さ13%(水属性の場合、さらに15.6%)ダウン(40CT)
    // 10~10ノックバック(レーン隣接している敵は対象レーンから離れるほどノックバック量は-1ずつ減少)
  }
}
