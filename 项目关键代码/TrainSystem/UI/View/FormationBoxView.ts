import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FormationBoxView')
export class FormationBoxView extends Component {


    // private myId:string;
    private Site:{x:number,y:number};

    private callBack:(site:{x:number,y:number})=>void;

    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    initInfo(site:{x:number,y:number},callBack:(site:{x:number,y:number})=>void){
        this.Site=site;
        this.callBack=callBack;

        this.node.on(Node.EventType.TOUCH_END,this.clickCB,this);
    }

    clickCB(){
        if(this.callBack){
            this.callBack(this.Site);
        }
    }

    update(deltaTime: number) {
        
    }
}


