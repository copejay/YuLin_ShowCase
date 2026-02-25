import { _decorator, Component, Node } from 'cc';
import {Label,Vec3} from "cc";
const { ccclass, property } = _decorator;

// import { RoleRow } from '../../../GlobalService';
import {SpriteShow, SpriteType} from "../../../../../GlobalSystem/UI/View/SpriteShow";

@ccclass('BaseContent_BaseInfo')
export class BaseContent_BaseInfo extends Component {


//baseInfo
    @property(Label)
    NameLabel:Label;

    @property(Label)
    QiLevelLabel:Label;
    @property(Label)
    QiExpLabel:Label;

    @property(Label)
    TiLevelLabel:Label;
    @property(Label)
    TiExpLabel:Label;

    @property(Label)
    LearnPointLabel:Label;

    @property(Label)
    LifeSpanLabelNode:Label;
    @property(Label)
    GetDataLabelNode:Label;

    @property(Node)
    SpriteShowNode:Node;


    setBaseInfo(name:string,classType:string,classTypeNum:number,
        QiLevel:string,QiExp:string,TiLevel:string,TiExp:string,learnPoint:number,getData:number,lifeSpan:number){
        // this.NameLabel.getComponent(Label).string=`【${name}】`;
        // this.LevelLabel.getComponent(Label).string=`${level}`;
        // this.ExpLabel.getComponent(Label).string=`${exp}`;
        // this.LifeSpanLabelNode.getComponent(Label).string=`${lifeSpan}`;
        // this.GetDataLabelNode.getComponent(Label).string=`${getData}`;
        this.NameLabel.string=`【${name}】`;
        this.QiLevelLabel.string=`${QiLevel}`;
        this.QiExpLabel.string=`${QiExp}`;
        this.TiLevelLabel.string=`${TiLevel}`;
        this.TiExpLabel.string=`${TiExp}`;
        this.LearnPointLabel.string=`${learnPoint}`;

        this.LifeSpanLabelNode.string=`${lifeSpan}`;
        this.GetDataLabelNode.string=`${getData}`;

        let SpriteType:SpriteType={type:classType,id:classTypeNum};
        let SpriteShowComponent=this.SpriteShowNode.getComponent(SpriteShow);
        SpriteShowComponent.showSprite(SpriteType,"left");
        SpriteShowComponent.setPosScale(new Vec3(0,0,0),new Vec3(3,3,1));
    }

}


