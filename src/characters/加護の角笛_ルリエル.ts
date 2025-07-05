import { CharacterBase } from '../types/CharacterBase';

export class 加護の角笛_ルリエル extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    // todo: 	ATKが一番高い味方1人の行動CT16.8%(光属性の場合、更に23.4%)短縮(30CT)
  }

  useSkill2(team: CharacterBase[]): void {
    // 味方全体のノーツを前方に7~7移動
    for (const c of team) {
      c.notesForward(7);
    }
  }
}
