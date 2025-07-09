import { CharacterBase } from '../types/CharacterBase';

export class 精錬の機甲天使シュティレ extends CharacterBase {
  static id = '精錬の機甲天使シュティレ';

  getEx_up(): number {
    let buffExUp = 0;
    for (const buff of this.buffs) {
      if (buff.target === 'ex_up') {
        buffExUp += buff.val;
      }
    }
    return super.getEx_up() + buffExUp;
  }

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に200％のダメージ
    // 自身のEX上昇を30アップ（15CT）
    // 流星学園附属の味方を3体以上編成している時、自身の右1レーンにいる味方のノーツを7前方に移動
    this.setExUpBuff('精錬の機甲天使シュティレ.id', 30, 15);
    this.battleSystem.getAffiliationCount('流星学園附属') >= 3 &&
      this.getRightCharacter()?.notesForward(7);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に2324％のダメージ
    // 自身の右1レーンにいる味方のノーツを3前方に移動
    // 2324吗，有点意思
    this.getRightCharacter()?.notesForward(3);
  }
}
export default 精錬の機甲天使シュティレ;
