import { CharacterBase } from '../types/CharacterBase';

export class グロウンヒーロー_アポロ_大人 extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    // todo: インフィニティ状態の時、人間または闇属性のノーツを2~3前方に移動
  }

  useSkill2(team: CharacterBase[]): void {
    // todo: EXスキル2+
    for (const c of team) {
      if (c.isFaction('人間') || c.isElement('闇')) {
        c.ctForward(7);
      }
    }
  }
}
