import { CharacterBase } from '../types/CharacterBase';

export class 蒼海の国の元気娘_プトラ extends CharacterBase {
  static id = '蒼海の国の元気娘プトラ';

  useSkill1(_team: CharacterBase[]): void {
    // 敵全体に60％のダメージ/
    // 被ダメージを人間または水属性の味方の数×8％（1バトル中、自身のEXスキル1の使用が3回目以降の時、10％）増加（20CT）
    // ※2つの条件を満たした場合でも効果は重複しない
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に200％×10回（自身を含む2体以上ユニゾン時、250％×10回）のダメージ/
    // 対象がスタン状態の時、敵単体の被ダメージを50％増加（1CT）/
    // 自身の行動CT20％遅延（20CT）
    this.setCTBuff('蒼海の国の元気娘_プトラ', -20, 20);
  }

  // ex2+
}
export default 蒼海の国の元気娘_プトラ;
