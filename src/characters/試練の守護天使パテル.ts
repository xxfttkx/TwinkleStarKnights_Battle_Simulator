import { CharacterBase } from '../types/CharacterBase';

export class 試練の守護天使パテル extends CharacterBase {
  static id = '試練の守護天使パテル';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に70%×8回のダメージ/
    // 自身の行動CT70%短縮(1CT) /
    // ステルス状態を付与(40CT)
    // ※ステルス状態：攻撃対象から除外されるようになる(範囲ダメージ含む)。味方が1人だけの状態では発動しない。
    this.setCTBuff(試練の守護天使パテル.id, 70, 1);
    this.setStealth(試練の守護天使パテル.id, 40);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に[120%+ラッシュ数×2%(最大100%)]×10回のダメージ/
    // 自身のATKを神族の味方の数×80%アップ(1CT) /
    // 神族の味方のノーツを8～8前方に移動
    this.battleSystem.team.forEach(
      c => c.isFaction('神族') && c.notesForward(8)
    );
  }
}
export default 試練の守護天使パテル;
