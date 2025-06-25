import { CharacterBase } from '../types/CharacterBase';

export class 歩く図書館_モネ extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    const left = this.getLeftCharacter();
    if (!left) return;
    left.setBuff({
      target: 'ct',
      name: '歩く図書館_モネ',
      val: left.isElement('炎') ? 0.402 : 0.201,
      duration: 30,
    });
    left.ctForward(7);
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isElement('炎')) {
        c.ctForward(7);
      }
    }
  }
}
