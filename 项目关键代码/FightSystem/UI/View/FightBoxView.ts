import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FightBoxView')
export class FightBoxView extends Component {



    syncPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


