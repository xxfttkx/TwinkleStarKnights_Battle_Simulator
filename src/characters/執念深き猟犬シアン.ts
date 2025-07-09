import { CharacterBase } from '../types/CharacterBase';

export class 執念深き猟犬シアン extends CharacterBase {
  static id = '執念深き猟犬シアン';

  useSkill1(_team: CharacterBase[]): void {
    // 自身のATK100%アップ(10CT)/
    // 行動CT70%短縮(1CT)
    this.setCTBuff(執念深き猟犬シアン.id, 70, 1);
  }
  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に330%ダメージ/
    // EXゲージを80減少/
    // 100%の確率で萎縮を付与(40CT)
  }
}
export default 執念深き猟犬シアン;
