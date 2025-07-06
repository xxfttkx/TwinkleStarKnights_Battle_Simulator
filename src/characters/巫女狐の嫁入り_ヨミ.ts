import { CharacterBase } from '../types/CharacterBase';

export class 巫女狐の嫁入り_ヨミ extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    /*
    	一番右に配置されている味方のATKを50％+自身の基礎ATK200ごと×8％アップ（30CT）（最大150％）/
      魔族または炎属性の味方のノーツを4～4（ヒールタイプの場合、7～7）前方に移動 ※2つの条件を満たした場合でもノーツ移動効果は重複しない/
      味方のHPがフルオーバーヒール状態（300％）の時、敵単体のEXゲージを50吸収し、その内の100％味方のEXゲージを回復
    */
    for (const c of team) {
      if (c.isFactionOrElement('魔族', '炎')) {
        c.notesForward(c.isType('HEAL') ? 7 : 4);
      }
    }
    if (this.battleSystem.isFullOverheal()) {
      this.battleSystem.addEx(50);
    }
  }

  useSkill2(team: CharacterBase[]): void {
    /*
      魔族の味方のATKを100％+自身の基礎ATK200ごと×18％アップ（30CT）（最大300％）/
      さらに炎属性の味方のATKを100％+自身の基礎ATK200ごと×18％アップ（30CT）（最大300％）/
      魔族または炎属性のクリティカルをラッシュ数×0.5％加算（5CT）（最大50％）/
      ノーツを10～10前方に移動 ※2つの条件を満たした場合でも効果は重複しない/
      自身を含む味方と3体以上ユニゾン時、味方全体のクリティカル時のダメージ倍率を魔族または炎属性の味方の数×12％加算（25CT）
    */
    for (const c of team) {
      if (c.isFactionOrElement('魔族', '炎')) {
        c.notesForward(10);
      }
    }
  }
}
