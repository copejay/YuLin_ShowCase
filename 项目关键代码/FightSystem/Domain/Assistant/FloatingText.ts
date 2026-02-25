
import { BattleTime,battleDelay } from "./BattleTime";

export class FloatingText{

    x:number;
    y:number;

    text:string="浮动提示";

    type:"damage"|"skill";

    moveSpeed:number=60;

    playTime:number=1;
    waitTime:number=0.2;


    disPlay:boolean=false;

    private _resolve:(()=>void) | null = null;
    finished:Promise<void>;

    constructor(x:number,y:number,text:string,type:"damage"|"skill"){
        this.x=x;
        this.y=y;
        this.text=text;
        this.type=type;

        if(type=="skill"){
            // this.setSkillType();
            this.TypeScaleSpeed("skill");
            this.y+=20;
            this.finished=new Promise(res=>{
                this._resolve=res;
            });
        }else{
            // this.setDamageType();
            this.TypeScaleSpeed("damage");
            this.y+=20;
            this.finished=new Promise(res=>{
                this._resolve=res;
            });
        }
    }

    TypeScaleSpeed(type){
        if(type=="damage"){
            let scale=BattleTime.scale;
            this.moveSpeed=120*BattleTime.speed;
            this.playTime=scale(0.5);
            this.waitTime=scale(0.3);
        }else{
            let scale=BattleTime.scale;
            this.moveSpeed=120*BattleTime.speed;
            this.playTime=scale(0.5);
            this.waitTime=scale(0.3);
        }
    }

    onFinish() {
        this._resolve?.();
    }

    move(dt:number){
        if(this.playTime<=this.waitTime){
            return;
        }
        this.y+=this.moveSpeed*dt;
    }

    update(dt:number){
        // this.TypeScaleSpeed(this.type);
        this.move(dt);
        this.playTime-=dt;
        if(this.playTime<=0){
            this.disPlay=true;
            this.onFinish();
        }
    }




}