import { CharacterBase } from '../types/CharacterBase';

export class 初日の出を迎えて_フィオナ extends CharacterBase {
  getEx_up(): number {
    let buffExUp = 0;
    for (const buff of this.buffs) {
      if (buff.target === 'ex_up') {
        buffExUp += buff.val;
      }
    }
    return super.getEx_up() + buffExUp;
  }

  useSkill1(team: CharacterBase[]): void {
    /*
      自身のEX上昇を60アップ(25CT)
      自身の右3レーンにいる味方にチャージを付与
      アタックタイプの味方の行動CT20％短縮（3CT）
      味方全体のノーツを5～5前方に移動
    */
    this.setBuff({
      target: 'ex_up',
      name: '初日の出を迎えて_フィオナ',
      val: 60,
      duration: 25,
    });
    let count = 0;
    for (const c of team) {
      if (count > 0) {
        c.isCharged = true;
        --count;
      }
      if (c.data.name == '初日の出を迎えてフィオナ') {
        count = 3;
      }
      if (c.isType('ATK')) {
        c.setBuff({
          target: 'ct',
          name: '初日の出を迎えて_フィオナ',
          val: 20,
          duration: 3,
        });
      }
      c.notesForward(5);
    }
  }

  useSkill2(team: CharacterBase[]): void {
    // 人間または光属性の味方のノーツを7～7前方に移動
    for (const c of team) {
      if (c.isFactionOrElement('人間', '光')) {
        c.notesForward(7);
      }
    }
  }

  // todo: EXスキル2+
}
