import { CharacterBase } from '../types/CharacterBase';

export class 斉天大聖_クーシェン extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    /*
    	敵単体に94％×6回のダメージ/
      敵全体の被ダメージを魔族の味方の数×8％（ラッシュ30以上の時、10％）増加（20CT）
    */
  }

  useSkill2(_team: CharacterBase[]): void {
    /*
    	敵全体に100％×5回のダメージ/
      自身のATKを魔族の味方の数×80％アップ（1CT）/
      自身の行動CT20％遅延（20CT）
    */
    this.setBuff({
      target: 'ct',
      name: '斉天大聖_クーシェン_Skill2',
      val: -0.2,
      duration: 20,
    });
  }
}
