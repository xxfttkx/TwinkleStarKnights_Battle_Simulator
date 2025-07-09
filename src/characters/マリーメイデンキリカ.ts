import { CharacterBase } from '../types/CharacterBase';

export class マリーメイデンキリカ extends CharacterBase {
  static id = 'マリーメイデンキリカ';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に100%のダメージ/
    // 自身のATK100%アップ(40CT)/
    // 行動CT20%短縮(1CT)
    this.setCTBuff(マリーメイデンキリカ.id, 20, 1);
  }
  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に900%(自身を含む3体以上ユニゾン時、1800%)のダメージ/
    // 自身の右1レーンにいる味方のノーツを3前方に移動
    this.getRightCharacter()?.notesForward(3);
  }
}
export default マリーメイデンキリカ;
