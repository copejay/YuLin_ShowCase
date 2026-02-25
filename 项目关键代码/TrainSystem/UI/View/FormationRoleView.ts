import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Label} from 'cc';

import { wrapText } from '../../Infrastructure';

@ccclass('FormationRoleView')
export class FormationRoleView extends Component {

    @property(Node)
    NameLabelNode:Node;

    @property(Node)
    LevelLabelNode:Node;


    setName(Name:string){
        let nameText=wrapText(Name,3);
        this.NameLabelNode.getComponent(Label).string=nameText;
    }

    setLevel(Level:number){
        this.LevelLabelNode.getComponent(Label).string=`Level:${Level}`;
    }

    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


