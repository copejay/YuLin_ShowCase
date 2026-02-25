

export type FightRoleBaseInfo={
    strong:number,
    speed:number,
    blood:number,
    smart:number,
    dao:number
}

export type SkillAdd={
    target:string,
    act:string,
    base:string,
    num:number,
    level:number,
}

//练气100级的道行大概是10000点
//炼体100，按照S级的属性计算，大概是10000点


export class FightRole{


    //基础五维属性,力量，速度，血量，智力，道行
    strong:number;
    speed:number;
    blood:number;
    smart:number;

    dao:number

    //战斗属性
    //出手速度
    public ft_speed:number=0;
    //攻击与防御
    public ft_attack:number=0;
    public ft_defense:number=0;
    //总血量与法力
    public ft_hp:number=0;
    public ft_mp:number=0;
    //自动增加血量与法力
    public ft_addHp:number=0;
    public ft_addMp:number=0;


    static fromFightInfo(BaseInfo: FightRoleBaseInfo,SkillAddList:SkillAdd[]):FightRole {
        const role = new FightRole();
        role.setBaseData(BaseInfo);

        role.figure_BaseAdd();
        role.figure_DaoAdd();
        role.figure_SkillAdd(SkillAddList);

        role.weightScaling();

        return role;
    }

    //计算技能等级对整体的增幅,计算公式是等差数列求和
    getLevelAddNum(level:number):number{
        return 0.1 * level * (level + 1) / 2;
    }

//权重增幅与基础设置
    weightScaling(){
        //属性增幅权重
        this.ft_hp=this.ft_hp*30;
        this.ft_mp=this.ft_mp*10;

        this.ft_attack=this.ft_attack*2;
        this.ft_defense=this.ft_defense*1;

        this.ft_speed=this.ft_speed*1;
        this.ft_addHp=this.ft_addHp*1;
        this.ft_addMp=this.ft_addMp*1;
    }
    setBaseData(info:FightRoleBaseInfo){
        this.strong=info.strong;
        this.speed=info.speed;
        this.blood=info.blood;
        this.smart=info.smart;
        this.dao=info.dao;
    }

//进行增幅计算
    //计算被动技能对战斗属性的增幅
    figure_SkillAdd(addList:SkillAdd[]){
        for(let add of addList){
            let addNum:number=0;
            //计算技能的层级叠加增幅
            let levelAddNum:number=this.getLevelAddNum(add.level);
            let num:number=add.num*(1+levelAddNum);

            if(add.base=="number"){

            }else if(add.base=="strong"){
                addNum=this.strong*num;
            }else if(add.base=="speed"){
                addNum=this.speed*num;
            }else if(add.base=="blood"){
                addNum=this.blood*num;
            }else if(add.base=="smart"){
                addNum=this.smart*num;
            }else{
                console.log(`TrainSys-Domain-FightRole-未知基础属性:${add.base}`)
            }

            if(add.act=="add"){

            }
            //数字取整
            addNum=Math.floor(addNum);

            if(add.target=="hp"){
                this.ft_hp+=addNum;
            }else if(add.target=="mp"){
                this.ft_mp+=addNum;
            }else if(add.target=="attack"){
                this.ft_attack+=addNum;
            }else if(add.target=="defense"){
                this.ft_defense+=addNum;
            }else{
                console.log(`TrainSys-Domain-FightRole-未知目标属性:${add.target}`)
            }
        }
    }

    //计算道行对战斗属性的增幅
    figure_DaoAdd(){
        let daoAdd=this.dao*1;

        this.ft_attack+=daoAdd;
        this.ft_defense+=daoAdd;
        this.ft_hp+=daoAdd;
        this.ft_mp+=daoAdd;
        this.ft_speed+=daoAdd;
        this.ft_addHp+=daoAdd;
        this.ft_addMp+=daoAdd;
    }

    //计算基础属性对战斗属性的增幅
    figure_BaseAdd(){
        this.ft_speed+=this.speed;

        this.ft_attack+=this.strong;
        this.ft_defense+=this.blood;

        this.ft_hp+=this.blood;
        this.ft_mp+=this.smart;

        this.ft_addHp+=this.blood;
        this.ft_addMp+=this.smart;

        //全部取整
        this.ft_speed=Math.floor(this.ft_speed);
        this.ft_attack=Math.floor(this.ft_attack);
        this.ft_defense=Math.floor(this.ft_defense);
        this.ft_hp=Math.floor(this.ft_hp);
        this.ft_mp=Math.floor(this.ft_mp);
        this.ft_addHp=Math.floor(this.ft_addHp);
        this.ft_addMp=Math.floor(this.ft_addMp);
    }


}