import { CharacterBase } from '../types/CharacterBase';

export class 皇妃に仕える剣_リーエン extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    /* 
      対象とその左右1レーンにいる敵すべてに30％×5回のダメージ/
      自身の行動CT50％短縮（1CT）/
      ラッシュ30以上の時、自身のEX上昇を60アップ（25CT）
    */
    this.setBuff({
      target: 'ct',
      name: '皇妃に仕える剣_リーエン',
      val: 0.5,
      duration: 1,
    });
    //todo: ラッシュ30以上の時、自身のEX上昇を60アップ（25CT）
  }

  useSkill2(team: CharacterBase[]): void {
    /*
      敵単体に150％×8回のダメージ/
      炎属性の味方の行動CT15％短縮（5CT）/
      ノーツを5～5前方に移動/
      炎属性の味方が4体以上の時、敵単体に標的状態を付与（20CT）
      ※標的：対象へのダメージが50％アップ、通常攻撃によるスタンゲージ減少が2倍になる
    */
    for (const c of team) {
      if (c.isElement('炎')) {
        c.notesForward(5);
      }
    }
  }
}
