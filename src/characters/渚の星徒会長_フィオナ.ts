import { CharacterBase } from '../types/CharacterBase';

export class 渚の星徒会長_フィオナ extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    /*
    	敵単体に288%のダメージ
      水属性の味方のノーツを7~7前方に移動
    */
    for (const c of team) {
      if (c.isElement('水')) {
        c.notesForward(7);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    /* 
      水属性の味方のATK218%アップ(40CT)
      ノーツを8~8前方に移動
    */
    for (const c of team) {
      if (c.isElement('水')) {
        c.notesForward(8);
      }
    }
  }
}
