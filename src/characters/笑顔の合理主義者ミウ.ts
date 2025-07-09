import { CharacterBase } from '../types/CharacterBase';

export class 笑顔の合理主義者ミウ extends CharacterBase {
  static id = '笑顔の合理主義者ミウ';
  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に200％のダメージ/
    // 流星学園附属の味方のATK300％アップ（1CT）/
    // ノーツを4前方に移動
    this.battleSystem.team.forEach(
      c => c.isAffiliation('流星学園附属') && c.notesForward(4)
    );
  }

  useSkill2(_team: CharacterBase[]): void {
    // 流星学園附属の味方のATKを流星学園附属の味方の数×54％アップ（40CT）/
    // クリティカルを流星学園附属の味方の数×8.2％加算（40CT）/
    // ノーツを6～6前方に移動
    this.battleSystem.team.forEach(
      c => c.isAffiliation('流星学園附属') && c.notesForward(6)
    );
  }
}
export default 笑顔の合理主義者ミウ;
