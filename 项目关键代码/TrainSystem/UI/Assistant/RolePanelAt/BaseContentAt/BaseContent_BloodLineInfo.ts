import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

// import { RoleRow } from '../../../GlobalService';

@ccclass('BaseContent_BloodLineInfo')
export class BaseContent_BloodLineInfo extends Component {


//talentInfo
    @property(Node)
    TalentNameLabel:Node;
    @property(Node)
    TalentLevelLabel:Node;
    @property(Node)
    TalentDescribeLabel:Node;

    @property(Node)
    TeStrongLabelNode:Node;
    @property(Node)
    TeSpeedLabelNode:Node;
    @property(Node)
    TeBloodLabelNode:Node;
    @property(Node)
    TeSmartLabelNode:Node;


    setBloodLineInfo(TalentName:string,TalentDescribe:string,TalentLevel:number,StrongType:string,SpeedType:string,BloodType:string,SmartType:string){
        this.TalentNameLabel.getComponent(Label).string=TalentName;

        let talentDs=this.autoTextLong(TalentDescribe,17);
        this.TalentDescribeLabel.getComponent(Label).string=talentDs;
        this.TalentLevelLabel.getComponent(Label).string=`${TalentLevel}%`;

        this.TeStrongLabelNode.getComponent(Label).string=`${StrongType}`;
        this.TeSpeedLabelNode.getComponent(Label).string=`${SpeedType}`;
        this.TeBloodLabelNode.getComponent(Label).string=`${BloodType}`;
        this.TeSmartLabelNode.getComponent(Label).string=`${SmartType}`;
    }


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


