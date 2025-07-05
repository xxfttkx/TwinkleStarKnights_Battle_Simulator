import { CharacterBase } from '../types/CharacterBase';

export class 善哉童子_紅明 extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    /*
    	味方のHPを35%+雷属性の味方の数x7%回復
      敵のExゲージを34吸収し、その内の100%味方のExゲージを回復
      雷属性の味方のノーツを1前方に移動
    */
    this.battleSystem.addHP(
      0.35 + this.battleSystem.getElementCount('雷') * 0.07
    );
    this.battleSystem.addEx(34);
    for (const c of team) {
      if (c.isElement('雷')) {
        c.notesForward(1);
      }
    }
  }

  useSkill2(_team: CharacterBase[]): void {}
}
