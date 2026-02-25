import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

import { UISkillInfo } from '../RolePanelEntry';

import { SkillCellView } from '../../View/SkillCellView';
import { SkillCellViewSpawner } from '../../Spawner/SkillCellViewSpawner';

import {event} from '../RolePanelEntry';

type site={
    x:number,
    y:number
}

@ccclass('RolePanel_SkillContent')
export class RolePanel_SkillContent extends Component {

    @property({type:Node,tooltip:"ActiveNode"})
    ActiveNode:Node;

    @property(Node)
    SkillCellsNode:Node;

    @property({type:Node,tooltip:"SkillCellViewSpawner"})
    SkillCellViewSpawnerNode:Node=null;

    // private TrainApp;
    private EventBus;

    private SkillCellViewSpawner:SkillCellViewSpawner=null;

    private ViewLis=[];

    start(){
        this.SkillCellViewSpawner=this.SkillCellViewSpawnerNode.getComponent(SkillCellViewSpawner);
        // this.initAt();
    }


    SkillCellClick(skillType:string,skillID:string,clickType:string){
        if(skillType=="Active"){
            let event:event={callFrom:"SkillContent",type:"ActiveSkillClick",data:{SkillID:skillID,clickType:clickType}};
            this.EventBus(event);
        }else if(skillType=="Passive"){
            let event:event={callFrom:"SkillContent",type:"PassiveSkillClick",data:{SkillID:skillID,clickType:clickType}};
            this.EventBus(event);
        }else{
            console.error("TrainSys-UI-SkillCellClick:Unknown SkillType");
        }

    }



    setSkillInfo(ActiveSkillList:UISkillInfo[],PassiveSkillList:UISkillInfo[]){
        this.destroyViewList();

        let AllLength=ActiveSkillList.length+PassiveSkillList.length;
        let SiteList=this.getSiteList(AllLength);

        for(let i=0;i<PassiveSkillList.length;i++){
            let SkillView=this.SkillCellViewSpawner.getView(this.SkillCellsNode);
            this.ViewLis.push(SkillView);

            let Skill=PassiveSkillList[i];
            SkillView.setActiveType(false);
            SkillView.setName(Skill.name);
            SkillView.setLevel(Skill.level);
            SkillView.setPosition(SiteList[i].x,SiteList[i].y);
            SkillView.setClickCB(Skill.id,(SkillType,SkillID,clickType)=>{
                this.SkillCellClick(SkillType,SkillID,clickType);
            });
        }
        for(let i=0;i<ActiveSkillList.length;i++){
            let SkillView=this.SkillCellViewSpawner.getView(this.SkillCellsNode);
            this.ViewLis.push(SkillView);

            let Skill=ActiveSkillList[i];
            SkillView.setActiveType(true);
            SkillView.setName(Skill.name);
            SkillView.setLevel(Skill.level);
            SkillView.setPosition(SiteList[i+PassiveSkillList.length].x,SiteList[i+PassiveSkillList.length].y);
            SkillView.setClickCB(Skill.id,(SkillType,SkillID,clickType)=>{
                this.SkillCellClick(SkillType,SkillID,clickType);
            });
        }
    }

    // setActiveSkillInfo(){

    // }
    
    // setPassiveSkillInfo(){

    // }

    destroyViewList(){
        for(let i=0;i<this.ViewLis.length;i++){
            let SkillView=this.ViewLis[i];
            this.SkillCellViewSpawner.recycle(SkillView);
        }
        this.ViewLis=[];
    }

    getSiteList(ListLength:number):site[]{
        let SiteList:site[]=[];

        for(let i=0;i<ListLength;i++){
            let site:site={x:0,y:-90*i};
            SiteList.push(site);
        }
        return SiteList;
    }


    initEventBus(EventBus){
        this.EventBus=EventBus;
        this.close();
    }


    open(){
        this.ActiveNode.active=true;
    }

    close(){
        this.ActiveNode.active=false;
    }


}


