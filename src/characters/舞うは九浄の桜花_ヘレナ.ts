import { CharacterBase} from "../types/CharacterBase";

export class 舞うは九浄の桜花_ヘレナ extends CharacterBase {

    useSkill1(team: CharacterBase[]): void {
        let secondPos = 999;
        for (const c of team) {
            if (c.ct != 0)
                secondPos = Math.min(secondPos, c.ct); // 找到第二个位置的最小 CT
        }
        for (const c of team) {
            if (c.ct == secondPos) {
                c.ctForward(3);
            }
        }
    }

    useSkill2(team: CharacterBase[]): void {
        for (const c of team) {
            if (c.isFaction("人間"))
                c.ctForward(7);
        }
        let count = 0;
        for (const c of team) {
            if (count > 0) {
                c.isCharged = true;
                --count
            }
            if (c.data.name == '舞うは九浄の桜花_ヘレナ') {
                count = 4;
            }
        }

    }
}