

import {UIFloatText} from '../UIType';

import {RoleViewSyncer} from './ViewSyncerAt/RoleViewSyncer';
import { HitEffectSyncer } from './ViewSyncerAt/HitEffectSyncer';

export class ViewSyncer{

    //数据体列表
    private FloatingTextList:UIFloatText[]=[];
    //视图列表
    private FightBoxViewList=[];
    private FloatingTextViewList=[];
    //战斗板子依附节点
    private BoardNode;
    //刷新器
    private FightBoxSpawner;
    private FightRoleSpawner;
    private HitEffectSpawner;
    private FloatingTextSpawner;

    //协助类
    private RoleAt:RoleViewSyncer;
    private HitEffectAt:HitEffectSyncer;

    constructor(FightRoleSpawner,FloatingTextSpawner,FightBoxSpawner,HitEffectSpawner,BoardNode){

        this.FightBoxSpawner=FightBoxSpawner;
        this.FightRoleSpawner=FightRoleSpawner;
        this.HitEffectSpawner=HitEffectSpawner;
        this.FloatingTextSpawner=FloatingTextSpawner;

        this.BoardNode=BoardNode;

        this.RoleAt=new RoleViewSyncer(this.FightRoleSpawner,this.BoardNode);
        this.HitEffectAt=new HitEffectSyncer(this.BoardNode,this.HitEffectSpawner,this.RoleAt);

        this.BuildBoardView();
    }

//核心方法


    sync(FightRoleList,HitEffectList,FloatingTextList,BoardBoxList){
        console.log(`Fight-UI-ViewSyncer: 接收同步信息，开始同步`);
        this.SyncBoardCell(BoardBoxList);
    
        this.RoleAt.Sync(FightRoleList);
        this.SyncFloatingText(FloatingTextList);
        this.HitEffectAt.Sync(HitEffectList);
    }


//棋盘和浮空特效的同步写在这里，逻辑不多，懒得多加一个子类
    
//棋盘创建
    //创建棋盘box视图
    BuildBoardView(){
        let TotalLength=18;
        // let TotalLength=this.FightRoleList.length;
        for(let i=0;i<TotalLength;i++){
            let fightBoxView=this.FightBoxSpawner.get(this.BoardNode);
            this.FightBoxViewList.push(fightBoxView);
        }
    }
    //同步棋盘box
    SyncBoardCell(BoardBoxList){
        // let BoardBoxList=this.FightManager.exportBoardBoxList();
        let TotalLength=BoardBoxList.length;
        for(let i=0;i<TotalLength;i++){
            let fightBoxView=this.FightBoxViewList[i];
            let fightBox=BoardBoxList[i];
            fightBoxView.syncPosition(fightBox.x,fightBox.y);
        }
    }

//视图数量管理方法
    //对齐浮空特效视图
    checkFloatingTextViewNum(){
        let TotalLength=this.FloatingTextList.length;

        let ViewLength=this.FloatingTextViewList.length;
        let Num=TotalLength-ViewLength;
        if(Num==0){
            return
        }else if(Num<0){
            this.deleteFloatingTextView(-Num);
        }else if(Num>0){
            this.addFloatingTextView(Num);
        }
    }
    addFloatingTextView(Num){
        for(let i=0;i<Num;i++){
            let floatingTextView=this.FloatingTextSpawner.get(this.BoardNode);
            this.FloatingTextViewList.push(floatingTextView);
        } 
    }
    deleteFloatingTextView(Num){
        for(let i=0;i<Num;i++){
            let view=this.FloatingTextViewList.pop();
            this.FloatingTextSpawner.recycle(view);
        }  
    }

    //同步浮空特效
    //特效不是外部传入，而是属于role自带的
    SyncFloatingText(FloatTextList:UIFloatText[]){
        // let newFloatingTextList=[];
        // this.RoleAt.RoleList.forEach((role)=>{
        //     if(role.FloatingTextList.length!=0){
        //         newFloatingTextList=newFloatingTextList.concat(role.FloatingTextList);
        //     }
        // })
        this.FloatingTextList=FloatTextList;
       
        this.checkFloatingTextViewNum();

        for(let i=0;i<this.FloatingTextList.length;i++){
            let floatingTextView=this.FloatingTextViewList[i];
            let floatingText=this.FloatingTextList[i];
            floatingTextView.syncPosition(floatingText.x,floatingText.y);
            floatingTextView.setText(floatingText.text);
            floatingTextView.setType(floatingText.type);
        }
    }


}