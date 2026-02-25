
import { FloatingText } from "./FloatingText";
import { HitEffect } from "./HitEffect";

import { BattleTime, battleDelay } from "./BattleTime";



export class FightRole{

//不变量
    //战斗开始的位置
    beginX:number;
    beginY:number;
    //基本信息
    name:string="霹雳火";
    level:number=10;
    skillName:string="万剑决";
    //创建角色的时候赋予的基础值
    maxHp:number=100;
    maxMp:number=100;
    baseSpeed:number=100;
    baseAtk:number=15;
    baseDef:number=10;

    moveTime:number=0.5;

//变量
    //移动方法需要的变量
    startX:number=0;//开始时，记录移动开始位置
    startY:number=0;
    moveElapsed:number=0;//记录累计移动时间
    needMove:boolean=false;//标记是否需要移动
    targetX:number;//记录移动目的位置
    targetY:number;

    //现在的位置
    x:number;
    y:number;


    //战斗中的数据
    Hp:number=100;
    Mp:number=100;
    Speed:number=100;
    Atk:number=15;
    Def:number=10;

    died:boolean=false;

    //内部特效数据体列表
    FloatingTextList:Array<FloatingText>=[];
    // DamageTextList:Array<FloatingText>=[];
    HitEffectList:Array<HitEffect>=[];
    //属于哪一边
    side:"left"|"right";
    //角色所属类，修真者，骑士等
    classType:string;
    classTypeNum:number;//角色所属类中序列，用于同类角色的不同建模

    constructor(){

    }

    setSite(x:number,y:number){
        this.x=x;
        this.y=y;
        //存储初始位置
        this.beginX=x;
        this.beginY=y;
    }

    setSide(side:"left"|"right"){
        this.side=side;
    }

    setBaseInfo(name:string,level:number,classType:string,classTypeNum:number){
        this.name=name;
        this.level=level;
        this.classType=classType;
        this.classTypeNum=classTypeNum;
    }

    setFightInfo(speed:number,atk:number,def:number,hp:number){
        this.Speed=speed;
        this.Atk=atk;
        this.Def=def;
        this.maxHp=hp;
        this.Hp=hp;
    }


    //行动行为
    async Action(getDefenseList:(range:number)=>FightRole[]){
        //行动延迟半秒
        await battleDelay(500);
        //播放技能漂浮数字
        let skillFloat=this.playSkillFloat();
        await skillFloat.finished;

        //获取敌人防御列表，调用敌人防御方法传递攻击参数
        let defenseList=getDefenseList(1);
        await Promise.all(
            defenseList.map(defenseRole =>
                defenseRole.defense(this.attack())
            )
        );
    }


    attack(){
        return this.Atk;
    }


    //防御行为
    async defense(atk:number){

        //创建受击特效，等待完成
        this.playHitEffect();
        await this.HitEffectList[this.HitEffectList.length-1].finished;

        await this.pushBack();
        //计算伤害
        let realAtk;
        if(atk<=this.Def){
            realAtk=1;
        }else{
            realAtk=atk-this.Def;
        }
        this.Hp-=realAtk;
        //播放的伤害处理
        let displayAtk;
        if(realAtk>=10000){
            displayAtk = `${Math.floor(realAtk / 1000) / 10}w`;
        }else{
            displayAtk=realAtk;
        }
        console.log("FightRole");
        console.log(`${this.name}受到${realAtk}伤害，当前血量${this.Hp}`);
        //播放受伤数字
        this.playDamageFloat(`-${displayAtk}`);
        //死亡判断
        await this.FloatingTextList[this.FloatingTextList.length-1].finished;
        if(this.Hp<=0){
            this.died=true;
            console.log(`${this.name}死亡`);
        }
    }

    //受伤回退效果
    async pushBack(){
        console.log(`FightRole: 后退函数执行`);
        let backLong=5;
        let sideMap={
            left:-1,
            right:1,
        }
        this.x+=backLong*sideMap[this.side];
        // await this.delay(100);
        await battleDelay(100);
        this.x=this.beginX;
    }

    //播放受击特效
    playHitEffect(){
        let sideMap={'right':-1,'left':1}
        let targetSite={
            x:this.x+20*sideMap[this.side],
            y:this.y+10,
        }
        let startSite={
            x:this.x+100*sideMap[this.side],
            y:this.y+10,
        }
        let hitEffect=new HitEffect(startSite,targetSite,0.2,"飞剑",this.side);
        this.HitEffectList.push(hitEffect);
    }

    //播放伤害漂浮特效
    playDamageFloat(string){
        let floatingText=new FloatingText(this.x,this.y,string,"damage");
        this.FloatingTextList.push(floatingText);
        // this.DamageTextList.push(floatingText);
    }

    //播放技能释放漂浮特效
    playSkillFloat(){
        let floatingText=new FloatingText(this.x,this.y,this.skillName,"skill");
        this.FloatingTextList.push(floatingText);
        return floatingText;
    }


    //浮空特效更新
    FloatingTextUpdate(dt:number){
        for(let i=0;i<this.FloatingTextList.length;i++){
            let floatingText=this.FloatingTextList[i];
            floatingText.update(dt);
            if(floatingText.disPlay==true){
                this.FloatingTextList.splice(i,1);
                i--;
            }
        }
    }
    //受击特效更新
    HitEffectUpdate(dt:number){
        for(let i=this.HitEffectList.length-1;i>=0;i--){
            let hitEffect=this.HitEffectList[i];
            hitEffect.update(dt);
            if(hitEffect.disPlay==true){
                this.HitEffectList.splice(i,1);
            }
        }
    }

    // attackMove(x:number,y:number){
    //     console.log("attackMove调用");
    //     this.moveTo(x,y);

    //     setTimeout(()=>{
    //         console.log(`FightROle:回调触发`);
    //         this.moveBack();
    //     },500);
    // }

    moveTo(targetX:number,targetY:number){
        this.targetX=targetX;
        this.targetY=targetY;

        this.startX=this.x;
        this.startY=this.y;

        this.needMove=true;
    }

    // moveBack(){
    //     this.moveTo(this.beginX,this.beginY);
    // }

    move(dt: number) {
        if (!this.needMove) return;

        // 累积时间
        this.moveElapsed += dt;

        // 计算 t = 当前进度（0 → 1）
        let t = this.moveElapsed / this.moveTime;
        if (t >= 1) t = 1;

        // 线性插值匀速移动
        this.x = this.startX + (this.targetX - this.startX) * t;
        this.y = this.startY + (this.targetY - this.startY) * t;

        // 完成
        if (t >= 1) {
            this.moveElapsed=0;
            this.needMove = false;
        }
    }


    update(dt:number){
        this.HitEffectUpdate(dt);
        this.FloatingTextUpdate(dt);
        // this.DamageTextUpdate(dt);
        if(this.needMove==true){
            this.move(dt);
        }
    }

}