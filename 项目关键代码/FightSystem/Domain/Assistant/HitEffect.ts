
import { BattleTime,battleDelay } from "./BattleTime";

export class HitEffect{

    x:number;
    y:number;

    targetX:number;
    targetY:number;

    EffectType:"right"|"left";
    EffectName:string="命中特效";

    moveSpeed:number=100;
    playTime:number;

    scaleTime:number;

    // waitTime:number=0;

    disPlay:boolean=false;

    sx: number;
    sy: number;
    elapsed = 0;

    private _resolve:(()=>void) | null = null;
    finished:Promise<void>;


    constructor(startSite:{x:number,y:number},targetSite:{x:number,y:number},playTime:number,effectName:string,effectType:"right"|"left"){
        console.log(`HitEffect: 特效被创建！`);
        this.x=startSite.x;
        this.y=startSite.y;
        this.EffectName=effectName;
        this.EffectType=effectType;
        
        this.sx=startSite.x;
        this.sy=startSite.y;

        this.targetX=targetSite.x;
        this.targetY=targetSite.y;
        this.playTime=playTime;

        this.scaleSpeed();
        this.finished=new Promise(res=>{
            this._resolve=res;
        });
    }

    scaleSpeed(){
        this.moveSpeed*=BattleTime.speed;
        this.scaleTime=BattleTime.scale(this.playTime);
    }

    move(dt: number) {
        // this.scaleSpeed();

        this.elapsed += dt;

        const t = Math.min(this.elapsed / this.scaleTime, 1);

        this.x = this.sx + (this.targetX - this.sx) * t;
        this.y = this.sy + (this.targetY - this.sy) * t;


        if (t >= 1) {
            this.onFinish();
        }
    }

    onFinish() {
        console.log(`HitEffect: 特效播放完成！`);
        this.x = this.targetX;
        this.y = this.targetY;
        this.disPlay = true;
        this._resolve?.();
    }

    update(dt:number){
        this.move(dt);
    }




}