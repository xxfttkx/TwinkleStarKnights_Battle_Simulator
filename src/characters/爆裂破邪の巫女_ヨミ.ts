import { CharacterBase } from '../types/CharacterBase';

export class 爆裂破邪の巫女_ヨミ extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    // 敵単体の行動CTを13.9%遅延(48CT)
    // 75%の確率で封印を付与(48CT)
    // 144%のダメージ
    // 闇属性の味方のノーツを1前方に移動
    for (const c of team) {
      if (c.isElement('闇')) {
        c.notesForward(1);
      }
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に50%の確率で付与されているあらゆるバフを解除
    // 被ダメージ15.6%(光属性の場合、さらに18.8%)増加(30CT)
    // 100%のダメージ
  }
}
