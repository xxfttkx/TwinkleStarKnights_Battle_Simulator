import { CharacterBase } from '../types/CharacterBase';

export class 漆黒槍の令嬢エルデリーゼ extends CharacterBase {
  static id = '漆黒槍の令嬢エルデリーゼ';

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
    // 敵単体に94%×7回のダメージ
    // ノーツを7後方に強制移動
    // 自身のATK124%アップ(40CT)
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に330%のダメージ
    // 味方のスタンゲージを全消費してスタン状態になり、敵全体に消費スタンゲージ1あたり5%被ダメージ増加(10CT)
    // 闇属性の味方のノーツを7~7前方に移動
    // 自身のEX上昇を100アップ(25CT)
    this.battleSystem.team.forEach(c => c.isElement('闇') && c.notesForward(7));
    this.setExUpBuff(漆黒槍の令嬢エルデリーゼ.id, 100, 25);
  }
}
export default 漆黒槍の令嬢エルデリーゼ;
