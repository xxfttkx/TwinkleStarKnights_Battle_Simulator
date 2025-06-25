import { CharacterBase } from '../types/CharacterBase';

export class はにかみチシャ猫_ヒトリ extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    // 自身の右1レーンの味方にステルス状態を付与（40CT）（優先発動）
    // ステルス状態の味方のノーツ7～7前方に移動
    // 哎哟整天就出这种鬼设计
    this.setBuff({
      target: 'ステルス',
      name: 'はにかみチシャ猫_ヒトリ',
      val: 1,
      duration: 40,
    });
    this.getRightCharacter()?.setBuff({
      target: 'ステルス',
      name: 'はにかみチシャ猫_ヒトリ',
      val: 1,
      duration: 40,
    });
    for (const c of team) {
      if (c.isStealth()) {
        c.ctForward(7);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    this.setBuff({
      target: 'ステルス',
      name: 'はにかみチシャ猫_ヒトリ',
      val: 1,
      duration: 40,
    });
    this.getRightCharacter()?.setBuff({
      target: 'ステルス',
      name: 'はにかみチシャ猫_ヒトリ',
      val: 1,
      duration: 40,
    });

    for (const c of team) {
      if (c.isElement('炎') || c.isElement('雷')) {
        c.ctForward(7);
      }
    }
  }
}
