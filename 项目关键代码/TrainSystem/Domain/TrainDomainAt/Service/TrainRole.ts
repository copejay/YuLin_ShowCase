

let level_UP_talent={"S":100,"A":50,"B":30,"C":10,"D":5,"E":2}

export type TrainRoleBaseInfo={QiLevel:number,QiExp:number,TiLevel:number,TiExp:number,lifeSpan:number,talentLevel:number};
export type TrainRoleFightData={strong:number,speed:number,blood:number,smart:number};
export type TrainRoleTalentType={strong:string,speed:string,blood:string,smart:string};


export class TrainRole{

    //基本信息，练气等级，练气经验，炼体等级，炼体经验，生命线，天赋等级
    public QiLevel:number;
    public QiExp:number;

    public TiLevel:number;
    public TiExp:number;

    public lifeSpan:number;
    public talentLevel:number;

    //角色基本四维数据
    public ft_strong:number;
    public ft_speed:number;
    public ft_blood:number;
    public ft_smart:number;

    //天赋增幅等级
    te_strong:string;
    te_speed:string;
    te_blood:string;
    te_smart:string;

     //回调函数
    PopCB:(msg:string)=>void;

    static fromPersistence(
        base: TrainRoleBaseInfo,
        fight: TrainRoleFightData,
        talent: TrainRoleTalentType
    ) {
        const role = new TrainRole();
        role.setBaseInfo(base);
        role.setFightData(fight);
        role.setTalentType(talent);
        return role;
    }

    setCB(cb:(msg:string)=>void){
        this.PopCB=cb;
    }

    setBaseInfo(Info:TrainRoleBaseInfo){
        this.QiLevel=Info.QiLevel;
        this.QiExp=Info.QiExp;
        this.TiLevel=Info.TiLevel;
        this.TiExp=Info.TiExp;
        this.lifeSpan=Info.lifeSpan;
        this.talentLevel=Info.talentLevel;
    }
    setFightData(Info:TrainRoleFightData){
        this.ft_strong=Info.strong;
        this.ft_speed=Info.speed;
        this.ft_blood=Info.blood;
        this.ft_smart=Info.smart;
    }
    setTalentType(Info:TrainRoleTalentType){
        this.te_strong=Info.strong;
        this.te_speed=Info.speed;
        this.te_blood=Info.blood;
        this.te_smart=Info.smart;
    }

    strongAdd(num:number){
        this.ft_strong+=num;
        this.PopCB(`力量提升${num}点！`);
    }
    speedAdd(num:number){
        this.ft_speed+=num;
        this.PopCB(`速度提升${num}点！`);
    }
    bloodAdd(num:number){
        this.ft_blood+=num;
        this.PopCB(`血量提升${num}点！`);
    }
    smartAdd(num:number){
        this.ft_smart+=num;
        this.PopCB(`智力提升${num}点！`);
    }


//练气方法
    QiExpAdd(num:number){
        this.QiExp+=num;
        this.PopCB(`练气经验提升${num}点！`);
        this.QiLevelUpCheck();
    }
    QiLevelUpCheck(){
        let levelUpNeedExp=(this.QiLevel+1)*1000;
        if(this.QiExp>=levelUpNeedExp){
            this.QiExp-=levelUpNeedExp;
            this.QiLevelUp();
            this.QiLevelUpCheck();
        }
    }
    QiLevelUp(){
        this.QiLevel++;
        this.PopCB("练气等级提升！");
    }

//炼体培养
    TiExpAdd(num:number){
        this.TiExp+=num;
        this.PopCB(`炼体经验提升${num}点！`);
        this.TiLevelUpCheck();
    }
    TiLevelUpCheck(){
        let levelUpNeedExp=(this.TiLevel+1)*1000;
        if(this.TiExp>=levelUpNeedExp){
            this.TiExp-=levelUpNeedExp;
            this.TiLevelUp();
            this.TiLevelUpCheck();
        }
    }
    TiLevelUp(){
        this.TiLevel++;
        this.PopCB("炼体等级提升！");

        let percentage=this.talentLevel/100;

        let strongAddNum=Math.floor(level_UP_talent[this.te_strong]*percentage*this.random());
        this.strongAdd(strongAddNum);

        let speedAddNum=Math.floor(level_UP_talent[this.te_speed]*percentage*this.random());
        this.speedAdd(speedAddNum);

        let bloodAddNum=Math.floor(level_UP_talent[this.te_blood]*percentage*this.random());
        this.bloodAdd(bloodAddNum);

        let smartAddNum=Math.floor(level_UP_talent[this.te_smart]*percentage*this.random());
        this.smartAdd(smartAddNum);
    }

    random(){
        return this.getRandomNum(0.5,1.5);
    }

    getRandomNum(a: number, b: number): number {
        const min = Math.min(a, b);
        const max = Math.max(a, b);

        const value = Math.random() * (max - min) + min;

        // 保留 1 位小数
        return Math.round(value * 10) / 10;
    }



}