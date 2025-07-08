import { CharacterBase } from '../types/CharacterBase';

export class 天恵の守護天使_オオヒメ extends CharacterBase {
  static id = '天恵の守護天使オオヒメ';

  useSkill1(_team: CharacterBase[]): void {
    // 敵全体に60％のダメージ
    // 神族の味方のノーツを7～7前方に移動
    // 守護天使の味方の行動CT20％短縮（5CT）
    for (const c of this.battleSystem.team) {
      if (c.isFaction('神族')) {
        c.notesForward(7);
      }
      if (c.isAffiliation('守護天使')) {
        c.setCTBuff('天恵の守護天使_オオヒメ', 20, 5);
      }
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に200％のダメージ
    // 神族の味方のATK200％アップ（30CT）
    // さらに守護天使の味方のATK100％アップ（30CT）
    // 神族の味方のノーツを10～10前方に移動
    // このEXスキルのEX消費量を自身を含む守護天使の味方のEXスキル使用回数×20減少（EX消費量は100未満にはならない）
    // ※このEXスキルは他星騎士から付与されたEX消費量減少の効果を受けない
    for (const c of this.battleSystem.team) {
      if (c.isFaction('神族')) {
        c.notesForward(10);
      }
    }
    // todo: 这减ex是啥呀
  }

  //EXスキル2+
}
export default 天恵の守護天使_オオヒメ;
