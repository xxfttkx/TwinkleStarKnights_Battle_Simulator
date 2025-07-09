import { CharacterBase } from '../types/CharacterBase';

export class 流星ライダーアポロ extends CharacterBase {
  static id = '流星ライダーアポロ';
  status = 'ソードフォーム';

  // 参考：万成の幼天使_セシア
  skill1CD: number = 0;
  updateNotes(): void {
    super.updateNotes();
    if (this.skill1CD > 0) {
      this.skill1CD--;
    }
  }

  canUseSkill1(): boolean {
    return this.skill1CD <= 0;
  }

  getCT(): number {
    // ウイングフォームの行動CT-5
    return this.status === 'ソードフォーム'
      ? super.getCT()
      : Math.max(5, Math.ceil((this.data.ct - 5) * (1 - this.getCTBonus())));
  }

  getEx_up(): number {
    return this.status === 'ソードフォーム'
      ? super.getEx_up()
      : super.getEx_up() / 2;
  }

  useSkill1(_team: CharacterBase[]): void {
    // ・自身のフォームを切り替える
    // ・行動終了後のノーツ戻り位置をタイムライン上1の位置にする
    // ・スキル再使用時間（4CT）
    // ・ソードフォーム（初期）：初期ステータス
    // ・ウイングフォーム：基礎ステータス変化（ATK-60%、行動CT-5、EX上昇-50%）
    this.status =
      this.status === 'ソードフォーム' ? 'ウイングフォーム' : 'ソードフォーム';
    this.returnNotes = 1;
    this.skill1CD = 4;
  }

  useSkill2(_team: CharacterBase[]): void {
    // ・自身のフォームによって効果が変化する
    // ・ソードフォーム：
    // 　・敵全体に200%のダメージ
    // 　・人間の味方のATKを人間の味方の数×54%アップ(40CT)
    // 　・ノーツを前方に7～7移動
    // ・ウイングフォーム：
    // 　・敵単体に1400％のダメージ
    // 　・スタンゲージを全減少させてスタン状態にし、減少したスタンゲージ数×12の味方のEXゲージを回復
    // 　・対象とその左右１レーンにいる敵すべてに100%の確率で強制スタンを付与（5CT）
    if (this.status === 'ソードフォーム') {
      this.battleSystem.team.forEach(
        c => c.isFaction('人間') && c.notesForward(7)
      );
    } else {
    }
  }

  //todo: ex2+
}
export default 流星ライダーアポロ;
