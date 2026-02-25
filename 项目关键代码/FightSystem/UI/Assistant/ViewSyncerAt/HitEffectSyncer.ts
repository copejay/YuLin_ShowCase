

import {HitEffect} from '../../UIType';

export class HitEffectSyncer{


    private BoardNode;

    // private HitEffectFactory;

    private HitEffectList=[];
    private HitEffectViewList=[];

    // private RoleAt;
    private HitEffectSpawner;

    constructor(BoardNode,HitEffectSpawner,RoleAt){
        this.BoardNode=BoardNode;
        this.HitEffectSpawner=HitEffectSpawner;
        // this.RoleAt=RoleAt;
    }


    Sync(HitEffectList:HitEffect[]){
        this.SyncHitEffect(HitEffectList);
    }

    //同步受击特效
    SyncHitEffect(newHitEffectList:HitEffect[]){
        this.HitEffectList=newHitEffectList;
       
        this.checkHitEffectViewNum();

        for(let i=0;i<this.HitEffectList.length;i++){
            // console.log(`FightSystem-App-ViewSyncer:受击特效开始同步,特效列表长度${this.HitEffectViewList.length}`);
            let HitEffectView=this.HitEffectViewList[i];
            let HitEffect:HitEffect=this.HitEffectList[i];
            
            HitEffectView.setPosition(HitEffect.x,HitEffect.y);
            HitEffectView.setEffect(HitEffect.EffectName,HitEffect.EffectType);
        }
    }


    //对齐受击特效
    checkHitEffectViewNum(){
        let TotalLength=this.HitEffectList.length;
        let ViewLength=this.HitEffectViewList.length;
        let Num=TotalLength-ViewLength;
        if(Num==0){
            return
        }else if(Num<0){
            this.deleteHitEffectView(-Num);
        }else if(Num>0){
            this.addHitEffectView(Num);
        }
    }
    addHitEffectView(Num){
        for(let i=0;i<Num;i++){
            let hitEffectView=this.HitEffectSpawner.get(this.BoardNode);
            this.HitEffectViewList.push(hitEffectView);
        } 
    }
    deleteHitEffectView(Num){
        for(let i=0;i<Num;i++){
            let view=this.HitEffectViewList.pop();
            this.HitEffectSpawner.recycle(view);
        }  
    }

}
