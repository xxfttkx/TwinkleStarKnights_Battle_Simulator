import { CharacterBase } from '../types/CharacterBase';

export class 水星の花嫁_トワ先生 extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    /*
      敵単体に176％のダメージ/
      炎属性の味方の行動CT20％短縮（各対象の行動終了後、ACTバーからノーツが戻る際に1回まで）/
      ノーツを1～3前方に移動
    */

    for (const c of team) {
      if (c.isElement('炎')) {
        // todo: 炎属性の味方の行動CT20％短縮（各対象の行動終了後、ACTバーからノーツが戻る際に1回まで
        // 怎么还有这种设定的
        c.notesForward(1);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    /*
      炎属性の味方のATKを100％+自身の基礎ATK200ごと×25％アップ（各対象の行動終了1回まで）（最大400％）/
      ノーツを5～5（スタン中の場合、10～10）前方に移動/
      スタン中の味方のスタン状態を回復
    */
    for (const c of team) {
      if (c.isElement('炎')) {
        c.notesForward(5);
      }
    }
  }
}
