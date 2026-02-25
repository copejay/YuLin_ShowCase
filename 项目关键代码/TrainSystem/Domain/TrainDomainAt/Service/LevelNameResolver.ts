


export class LevelNameResolver{

    static resolve(type:string,level:number){

        const realmIndex=Math.floor(level/10);
        const layer=level%10;

        if(type=="练气"){
            return LevelNameResolver.QiFormatCultivation(realmIndex,layer);
        }else if(type=="炼体"){
            return LevelNameResolver.TiFormatCultivation(realmIndex,layer);
        }else{
            return "未知";
        }
    }
    //按照公式，100级的数值大概是100万
    static resolveDao(QiLevel:number){
        const bigStage=Math.floor(QiLevel/10);//大层级
        const littleStage=(QiLevel%10)+1;//小层级
        let base=10;

        // 1层=1.0, 9层=3.0（严格 3 倍）
        const littleFactor = 1 + ((littleStage - 1) * 2) / 9;
        // 跨境界永不倒挂：step 必须 > 3
        const step = 3.2;
        const bigFactor = step ** bigStage;

        let dao=Math.floor(base * littleFactor * bigFactor);
        return dao
    }

    static QiFormatCultivation(index:number,layer:number){
        let realIndex=index;
        let realLayer=layer;
        if(layer>9){
            realLayer=9;
        }
        if(index>9){
            realIndex=9;
        }

        const indexMap={
            0:"练气",
            1:"筑基",
            2:"金丹",
            3:"元婴",
            4:"化神",
            5:"炼虚",
            6:"合体",
            7:"大乘",
            8:"渡劫",
            9:"地仙",
            10:"天仙",
            11:"金仙",
            12:"太乙",
            13:"大罗",
            14:"圣人",
            15:"大圣",
            16:"仙帝",
            17:"未知",
        }
        const layerMap={
            0:"一",1:"二",2:"三",3:"四",4:"五",5:"六",6:"七",7:"八",8:"九",9:"大圆满"
        }
        if(layer==9){
            return `${indexMap[index]}${layerMap[layer]}`
        }else{
            return `${indexMap[index]}${layerMap[layer]}层`
        }

        // return `${indexMap[index]}${layerMap[layer]}`

    }

    static TiFormatCultivation(index:number,layer:number){
        let realIndex=index;
        let realLayer=layer;
        if(layer>9){
            realLayer=9;
        }
        if(index>9){
            realIndex=9;
        }

        const indexMap={
            0:"武徒",
            1:"武师",
            2:"大武师",
            3:"武灵",
            4:"武王",
            5:"武皇",
            6:"武宗",
            7:"武尊",
            8:"武圣",
            9:"武帝",
            10:"武仙",
            11:"摘星",
            12:"化日",
            13:"不朽",
            14:"神域",
            15:"超脱",
            16:"永恒",
            17:"未知",
        }
        const layerMap={
            0:"一",1:"二",2:"三",3:"四",4:"五",5:"六",6:"七",7:"八",8:"九",9:"十"
        }
        
        return `${indexMap[index]}${layerMap[layer]}阶`
    }

}