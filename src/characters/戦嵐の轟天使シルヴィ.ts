import { CharacterBase } from '../types/CharacterBase';

export class 戦嵐の轟天使シルヴィ extends CharacterBase {
  static id = '戦嵐の轟天使シルヴィ';
  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に94％×6回のダメージ
    // 被ダメージを雷属性の味方の数×8％増加(20CT)
    // アタックタイプの味方のノーツを4前方に移動
    this.battleSystem.team.forEach(c => c.isType('ATK') && c.notesForward(4));
  }

  useSkill2(_team: CharacterBase[]): void {
    // 対象とその左右1レーンにいる敵すべてに50％のダメージ
    // ノーツをタイムライン上15の位置にワープさせる【強制移動無効対象外】
    // 神族または雷属性の味方のATKを100％アップ（40CT）
    // クリティカルを神族または雷属性の味方の数×8.2％加算（40CT）※2つの条件を満たした場合でも効果は重複しない
    // 雷属性の味方を3体以上編成している時、味方に4回の攻撃を無効化するバリアを張る（40CT）【バフ解除無効】
  }
}
export default 戦嵐の轟天使シルヴィ;
