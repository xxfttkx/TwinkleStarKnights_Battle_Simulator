import { CharacterBase } from '../types/CharacterBase';

export class 絶対普遍の守り手_マトイ_纏雷 extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    // 自身の右1レーンにいる味方に「纏雷の恩寵」の効果
    // 纏雷の恩寵：ノーツを4前方に移動し、チャージ状態を付与
    const rightLaneCharacter = this.getRightCharacter();
    if (rightLaneCharacter) {
      rightLaneCharacter.notesForward(4);
      rightLaneCharacter.setCharged();
    }
  }

  useSkill2(_team: CharacterBase[]): void {}
}
