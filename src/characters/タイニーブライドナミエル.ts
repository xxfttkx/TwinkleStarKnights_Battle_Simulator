import { CharacterBase } from '../types/CharacterBase';

export class タイニーブライドナミエル extends CharacterBase {
  static id = 'タイニーブライドナミエル';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に200％のダメージ
    // 自身に挑発状態を付与（50CT）【バフ解除無効】
    // 前から2番目にいる味方のノーツを3前方に移動
    // 炎属性の味方を3体以上編成している時、自身の右1レーンにいる味方のノーツを7前方に移動
    this.battleSystem.getSecondCharacters().forEach(c => c.notesForward(3));
    this.battleSystem.getElementCount('炎') >= 3 &&
      this.getRightCharacter()?.notesForward(7);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 自身に庇護状態を付与（50CT）【バフ解除無効】
    // 被ダメージ20%軽減(50CT)【バフ解除無効】
    // カウンター[進攻]：炎属性の味方のノーツを前方に8～8移動（1回発動まで）を付与（50CT）【バフ解除無効】
    // 炎属性の味方の行動CT10％短縮（5CT）
    this.battleSystem.team.forEach(
      c => c.isElement('炎') && c.setCTBuff(タイニーブライドナミエル.id, 10, 5)
    );
  }
}
export default タイニーブライドナミエル;
