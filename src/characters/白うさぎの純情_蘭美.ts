import { CharacterBase } from '../types/CharacterBase';

export class 白うさぎの純情_蘭美 extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {}

  useSkill2(_team: CharacterBase[]): void {
    this.setBuff({
      target: 'ct',
      name: '白うさぎの純情_蘭美',
      val: -0.2,
      duration: 20,
    });
  }
}
