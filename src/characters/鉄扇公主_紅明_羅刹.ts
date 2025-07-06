import { CharacterBase } from '../types/CharacterBase';

export class 鉄扇公主_紅明_羅刹 extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    /*
    	敵単体に「羅刹の呪縛」の効果/
      自身の右1レーンにいる味方の行動CT20％短縮（10CT）/
      クリティカルを30％加算（30CT）/
      ノーツを7前方に移動
      ※羅刹の呪縛：ATKを30％ダウンさせ（20CT）、ノーツをタイムライン上12の位置にワープさせる【強制移動無効対象外】
    */
    const right = this.getRightCharacter();
    if (right) {
      right.setBuff({
        target: 'ct',
        name: '鉄扇公主_紅明_羅刹',
        val: 0.2,
        duration: 10,
      });
      right.notesForward(7);
    }
  }

  useSkill2(team: CharacterBase[]): void {
    /*
      雷属性の味方のATKを100％+自身の基礎ATK200ごと×18％アップ（30CT）（最大300％）/
      クリティカル時のダメージ倍率を30％加算。さらに1バトル中、自身のEXスキル2の使用が2回目以降の時、自身のEXスキル2を使用する度にクリティカル時のダメージ倍率を10％ずつ加算する（30CT）（合計最大60％）/
      ノーツを7～7前方に移動
      魔族の味方を5体以上編成している時、自身のEX消費量40減少（次ターン以降EXスキル1回発動まで）
    */
    for (const c of team) {
      if (c.isElement('雷')) {
        c.notesForward(7);
      }
    }
    if (this.battleSystem.getFactionCount('魔族') >= 5) {
      this.exBuff = {
        costReduction: 40,
        remainingUses: 1,
      };
    }
  }
}
