import { CharacterBase } from '../types/CharacterBase';

export class 逆転ダイスロール_ネーゼマイン extends CharacterBase {
  static id = '逆転ダイスロールネーゼマイン';
  useSkill1(_team: CharacterBase[]): void {
    // 一番右に配置されている味方のATKを50％+自身の基礎ATK200ごと×8％アップ（30CT）（最大150％）/
    // 自身の左右1レーンのメイン属性が炎属性の味方に水の「サブ属性」を付与する（40CT）（優先発動）【バフ解除無効】/
    // 自身の左右1レーンのメイン属性が水属性の味方に炎の「サブ属性」を付与する（40CT）（優先発動）【バフ解除無効】/
    // 炎属性または水属性の味方のノーツを4（サブ属性が付与されている場合、7）前方に移動
    // ※2つの条件を満たした場合でもノーツ移動効果は重複しない
    // ※サブ属性：属性指定スキルの条件や対象に含まれる（ダメージ計算には影響しない）
    const chars = this.getLeftAndRightLanes(1, 1);
    for (const c of chars) {
      if (c.isElement('炎')) {
        c.setSubElementBuff('水', 40);
      } else if (c.isElement('水')) {
        c.setSubElementBuff('炎', 40);
      }
    }
    for (const c of this.battleSystem.team) {
      if (c.isElement('炎') || c.isElement('水')) {
        // 炎属性または水属性の味方のノーツを4（サブ属性が付与されている場合、7）前方に移動
        // todo: 存疑
        c.notesForward(c.hasAnySubElement() ? 7 : 4);
      }
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 炎属性の味方のATKを100％+自身の基礎ATK200ごと×18％アップ（30CT）（最大300％）/
    // さらに水属性の味方のATKを100％+自身の基礎ATK200ごと×18％アップ（30CT）（最大300％）/
    // 炎属性または水属性の味方のノーツを7～7前方に移動
    // ※2つの条件を満たした場合でもノーツ移動効果は重複しない/
    // サブ属性が付与されている味方2体以上の時、サブ属性が付与された味方のクリティカル時のダメージ倍率を50％加算（25CT）
    for (const c of this.battleSystem.team) {
      if (c.isElement('炎') || c.isElement('水')) {
        c.notesForward(7);
      }
    }
  }

  // todo: ex2+
  // 炎属性の味方のATKを100％+自身の基礎ATK200ごと×18％アップ（30CT）（最大300％）/
  // さらに水属性の味方のATKを100％+自身の基礎ATK200ごと×18％アップ（30CT）（最大300％）/
  // 炎属性または水属性の味方のノーツを7～7前方に移動
  // ※2つの条件を満たした場合でもノーツ移動効果は重複しない/
  // サブ属性が付与されている味方2体以上の時、サブ属性が付与された味方のクリティカル時のダメージ倍率を50％加算（25CT）/
  // 自身を含む味方と3体以上ユニゾン時、ユニゾンしている人数によって以下の効果を適用する
  // ・3体以上：水属性の味方のクリティカルを50％加算（10CT）
  // ・4体以上：さらに炎属性の味方のクリティカルを50％加算（10CT）
  // ・5体：さらに敵全体に100％の確率で強制スタン（1CT）
}
export default 逆転ダイスロール_ネーゼマイン;
