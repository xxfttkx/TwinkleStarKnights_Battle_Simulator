import { CharacterBase } from '../types/CharacterBase';

export class お人好し吸血鬼_ベアトリス extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    for (const c of this.battleSystem.getLastCharacters()) {
      // 行動CT20％（ヒールタイプの場合、35％）短縮（20CT）
      c.notesForward(10);
      c.setBuff({
        target: 'ct',
        name: 'お人好し吸血鬼_ベアトリス',
        val: c.isType('HEAL') ? 0.35 : 0.2,
        duration: 20,
      });
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isElement('闇')) {
        c.notesForward(7);
      }
    }
    // todo: 1バトル中、自身のEXスキル2の使用が4回目以降の時、敵単体のEXゲージを50吸収し、その内の100％味方のEXゲージを回復
  }
}
