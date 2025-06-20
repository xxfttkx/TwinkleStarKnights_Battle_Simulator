import { CharacterBase } from "../types/CharacterBase";

export class 招福の明星_ヴィーナス extends CharacterBase {

    useSkill1(team: CharacterBase[]): void {
        if(this.isCharged){
            this.eventEmitter.emit("onExIncrease", 100); // 触发 EX 增加事件
        }
        for (const c of team) {
            c.ctForward(7); // 给队友充能
        }
    }

    useSkill2(team: CharacterBase[]): void {
        for (const c of team) {
            if (c.data.faction === "人間" || c.data.element === "水") {
                c.ctForward(7); // 给队友充能
            }
        }
    }
}