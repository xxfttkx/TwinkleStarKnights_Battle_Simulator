import { CharacterBase } from '../types/CharacterBase';

export class 騎士皇女リア extends CharacterBase {
  static id = '騎士皇女リア';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に200%のダメージ
    // ノーツを8後方に強制移動
    // EXゲージを200減少
    // (チャージ状態の時、減少させたEXゲージの内、50%味方のEXゲージを回復)
    this.isCharged && this.battleSystem.addEx(100);
  }
  useSkill2(_team: CharacterBase[]): void {
    // 味方全体のATK140%(光属性の場合200%)アップ(50CT)
    // 光属性の味方のノーツを10~10前方へ移動
    // (チャージ状態の時、対象が味方全体となる)
    this.battleSystem.team.forEach(c => {
      if (c.isFaction('光') || this.isCharged) {
        c.notesForward(10);
      }
    });
  }
}
export default 騎士皇女リア;
