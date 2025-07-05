import { CharacterBase } from '../types/CharacterBase';

export class 蒼穹の仮想歌姫_ルルカ extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    /*
    	前から3番目にいる味方のノーツを前から2番目の味方と同じ位置に移動
    */
    const secondCharacters = this.battleSystem.getSecondCharacters();
    const thirdCharacters = this.battleSystem.getThirdCharacters();
    for (const c of thirdCharacters) {
      c.notesChange(secondCharacters[0].notes);
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    /*
    	ノーツが一番後ろの味方のノーツを12前方に移動
      行動CTを19.2%短縮(30CT)
    */
    const lastCharacters = this.battleSystem.getLastCharacters();
    if (lastCharacters.length <= 0) return;
    for (const c of lastCharacters) {
      c.notesForward(12);
      c.setBuff({
        target: 'ct',
        name: '蒼穹の仮想歌姫_ルルカ',
        val: 0.192,
        duration: 30,
      });
    }
  }
}
