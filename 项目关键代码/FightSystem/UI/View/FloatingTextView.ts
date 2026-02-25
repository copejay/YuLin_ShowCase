import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import {Label} from 'cc';

@ccclass('FloatingTextView')
export class FloatingTextView extends Component {

    @property(Node)
    TextNode:Node;

    @property(Node)
    BackgroundNode:Node;


    syncPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    setText(text:string){
        this.TextNode.getComponent(Label).string=text;
    }

    setType(type:"damage"|"skill"){
        if(type=="damage"){
            this.closeBg();
        }else{
            this.openBg();
        }
    }

    closeBg(){
        this.BackgroundNode.active=false;
    }

    openBg(){
        this.BackgroundNode.active=true;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


