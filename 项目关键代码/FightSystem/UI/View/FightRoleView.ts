import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Label,ProgressBar} from 'cc';

import { UITransform,Sprite } from 'cc';

import { SpriteShow,SpriteType } from '../../../GlobalSystem';
    export type {SpriteType};

@ccclass('FightRoleView')
export class FightRoleView extends Component {


    @property(Node)
    NameNode:Node;

    @property(Node)
    LevelNode:Node;

    @property(Node)
    TitleNode:Node;

    @property(Node)
    HpBarNode:Node;

    @property(Node)
    MpBarNode:Node;

   

    @property(Node)
    SpriteShowNode:Node;

    // @property([Node])
    // RoleImgNodeList:Node[]=[];

    private MaxImgHeight:number=180;

    private SpriteShow:SpriteShow;

    // ImgMap={"修真者":0,"骑士":1};
    // ImgMap={"修真者":"铁狼","骑士":"修真者"};


    syncPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    syncHpBar(hp:number,maxHp:number){
        let HpBar=this.HpBarNode.getComponent(ProgressBar);
        HpBar.progress=hp/maxHp;
    }

    setName(name:string){
        this.NameNode.getComponent(Label).string=name;
    }

    setLevel(level:number){
        this.LevelNode.getComponent(Label).string="等级: "+level.toString();
    }

    setTitle(title:string){
        this.TitleNode.getComponent(Label).string=title;
    }

    syncVisual(SpriteType:SpriteType,side:"left"|"right"){
        this.SpriteShowNode.getComponent(SpriteShow).showSprite(SpriteType,side);
    }

    start() {
     
        this.SpriteShow=this.SpriteShowNode.getComponent(SpriteShow);
    
    }

    update(deltaTime: number) {
        
    }
}


