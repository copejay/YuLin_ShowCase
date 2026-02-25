import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

// import { RoleRow } from '../../../GlobalService';

@ccclass('BaseContent_DaoTalentInfo')
export class BaseContent_DaoTalentInfo extends Component {


//talentInfo
    @property(Label)
    DaoLevelLabel:Label;

    @property(Label)
    JinTalentLabel:Label;
    @property(Label)
    MuTalentLabel:Label;
    @property(Label)
    ShuiTalentLabel:Label;
    @property(Label)
    HuoTalentLabel:Label;
    @property(Label)
    TuTalentLabel:Label;
    // @property(Node)
    // TeSmartLabelNode:Node;


    setDaoTalentInfo(DaoLevel:string,JinTalentLabel:string,MuTalentLabel:string,ShuiTalentLabel:string,HuoTalentLabel:string,TuTalentLabel:string){
        this.DaoLevelLabel.getComponent(Label).string=`${DaoLevel}`;
        this.JinTalentLabel.getComponent(Label).string=JinTalentLabel;
        this.MuTalentLabel.getComponent(Label).string=MuTalentLabel;
        this.ShuiTalentLabel.getComponent(Label).string=ShuiTalentLabel;
        this.HuoTalentLabel.getComponent(Label).string=HuoTalentLabel;
        this.TuTalentLabel.getComponent(Label).string=TuTalentLabel;
    }

    // setDaoTalentInfo(TalentName:string,TalentDescribe:string,TalentLevel:number,StrongType:string,SpeedType:string,BloodType:string,SmartType:string){
    //     this.TalentNameLabel.getComponent(Label).string=TalentName;

    //     let talentDs=this.autoTextLong(TalentDescribe,17);
    //     this.TalentDescribeLabel.getComponent(Label).string=talentDs;
    //     this.TalentLevelLabel.getComponent(Label).string=`${TalentLevel}%`;

    //     this.TeStrongLabelNode.getComponent(Label).string=`${StrongType}`;
    //     this.TeSpeedLabelNode.getComponent(Label).string=`${SpeedType}`;
    //     this.TeBloodLabelNode.getComponent(Label).string=`${BloodType}`;
    //     this.TeSmartLabelNode.getComponent(Label).string=`${SmartType}`;
    // }


    autoTextLong(text: string, max: number): string {
        if (!text) return "";

        let result = "";
        let count = 0;

        for (let i = 0; i < text.length; i++) {
            result += text[i];
            count++;

            if (count === max && i !== text.length - 1) {
                result += "\n";
                count = 0;
            }
        }
        return result;
    }
}


