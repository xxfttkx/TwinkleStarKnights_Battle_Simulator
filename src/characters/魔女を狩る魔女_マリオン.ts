import { CharacterBase } from '../types/CharacterBase';

export class 魔女を狩る魔女_マリオン extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    /*
      敵単体に176％のダメージ/
      魔族の味方の行動CTをネビュラの味方の数×3％短縮（5CT）/
      魔族の味方のノーツを1～3前方に移動
    */
    const val = this.battleSystem.getAffiliationCount('ネビュラ') * 3;
    for (const c of team) {
      if (c.isFaction('魔族')) {
        c.setCTBuff('魔女を狩る魔女_マリオン', val, 5);
        c.notesForward(1);
      }
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体を12～12ノックバック（レーン隣接している敵は対象レーンから離れるほど移動量は-1ずつ減少）/
    // 敵単体に「葬礼の呪縛」の効果/
    // 魔族の味方のATKを50％+自身の基礎ATK200ごと×14.00％アップ（30CT）（最大200％）
    // ※葬礼の呪縛：EXゲージをネビュラの味方の数×16吸収し、その内の100％味方のEXゲージを回復

    // 为什么加EX非要弄一个特殊效果
    this.battleSystem.addEx(
      this.battleSystem.getAffiliationCount('ネビュラ') * 16
    );
  }
}
