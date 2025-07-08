import { CharacterBase } from '../types/CharacterBase';

export class 妹魔王増量中_メイプル extends CharacterBase {
  static id = '妹魔王増量中メイプル';

  useSkill1(_team: CharacterBase[]): void {
    // ・敵単体に176％のダメージ
    // ・一番右に配置されている味方のATK100％アップ（30CT）
    // ・自身の右1レーンにいる味方を3ノーツ前方に移動
    this.getRightCharacter()?.notesForward(3);
  }

  useSkill2(_team: CharacterBase[]): void {
    // ・敵単体に400％のダメージ
    // ・闇属性の味方のATK400％アップ（1CT）
    // ・クリティカル50％加算（1CT）
    // ・自身に強制スタン（3CT）
  }
}
export default 妹魔王増量中_メイプル;
