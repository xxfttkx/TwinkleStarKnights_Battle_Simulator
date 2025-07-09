import { CharacterBase } from '../types/CharacterBase';

export class 電撃熱唱の歌姫レミカ extends CharacterBase {
  static id = '電撃熱唱の歌姫レミカ';

  useSkill1(_team: CharacterBase[]): void {
    // 味方のHPを雷属性の味方の数x13.4%回復/
    // 自身の行動CT50%短縮(1CT)
    this.battleSystem.addHP(0.134 * this.battleSystem.getElementCount('雷'));
    this.setCTBuff(電撃熱唱の歌姫レミカ.id, 50, 1);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 味方のHPを50%+雷属性の味方の数x10%回復/
    // 雷属性の味方のATKを雷属性の味方の数x40%アップ(30CT)/
    // 味方のHPがオーバーヒール状態(100%超)の時、味方全体のクリティカルを雷属性の味方の数x10%加算(30CT)/
    // 味方のHPがフルオーバーヒール状態(300%)の時、敵単体のEXゲージを雷属性の味方の数x40吸収し、その内の50%味方のEXゲージを回復
    this.battleSystem.addHP(
      0.5 + 0.1 * this.battleSystem.getElementCount('雷')
    );
    this.battleSystem.isFullOverheal() &&
      this.battleSystem.addEx(
        this.battleSystem.getElementCount('雷') * 40 * 0.5
      );
  }
}
export default 電撃熱唱の歌姫レミカ;
