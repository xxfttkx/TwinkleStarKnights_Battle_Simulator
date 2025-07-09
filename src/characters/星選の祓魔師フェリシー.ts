import { CharacterBase } from '../types/CharacterBase';

export class 星選の祓魔師フェリシー extends CharacterBase {
  static id = '星選の祓魔師フェリシー';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に200%のダメージ
    // 18ノックバック
    // 自身の右1レーンにいる味方のノーツを4前方に移動
    // 味方のHPがオーバーヒール状態(100%超)の時、自身の左1レーンにいる味方にチャージ状態を付与
    this.getRightCharacter()?.notesForward(4);
    this.battleSystem.isOverheal() && this.getLeftCharacter()?.setCharged();
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に330%(味方のHPがフルオーバーヒール状態(300%)の時、470%)のダメージ
    // 12~12ノックバック(レーン隣接している敵は対象レーンから離れるほどノックバック量は-1ずつ減少)
    // 味方のHPがオーバーヒール状態(100%超)の時、重さ30%ダウン(1CT)
  }
}
export default 星選の祓魔師フェリシー;
