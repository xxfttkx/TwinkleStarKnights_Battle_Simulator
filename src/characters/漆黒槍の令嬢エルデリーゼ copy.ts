import { CharacterBase } from '../types/CharacterBase';

export class ズタズタシスターリーナ extends CharacterBase {
  static id = 'ズタズタシスターリーナ';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に94%×6回のダメージ
    // 被ダメージを人間の味方の数×8%増加(20CT)
    // 自身にステルス付与(30CT)
    // チャージ状態の時、人間の味方の行動CT10%短縮(20CT)
    this.setStealth(ズタズタシスターリーナ.id, 30);
    this.isCharged &&
      this.battleSystem.team.forEach(
        c =>
          c.isFaction('人間') && c.setCTBuff(ズタズタシスターリーナ.id, 10, 20)
      );
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に200%×8回のダメージ(チャージ状態の時、220%×10回のダメージ)
    // スタンゲージ9減少
  }
}
export default ズタズタシスターリーナ;
