


export class FightBoardSite{

    fightBoxWidth:number=80;
    fightBoxHeight:number=80;

    BoxXSpace:number=10;
    BoxYSpace:number=20;

    BoxSiteList:{'right':any[],'left':any[]}={
        'right':[],
        'left':[]
    };
    // LeftBoxSiteList:any[]=[];

    constructor(){
        // this.createRightBoxSiteList();
        // this.createLeftBoxSiteList();
        this.createBoxSiteList(1);
        this.createBoxSiteList(-1);
    }

    exportAllSite(){
        let AllSite=[...this.BoxSiteList.right,...this.BoxSiteList.left];
        return AllSite;
    }

    //
    // getSite(Side:'right'|'left',Site:{x:number,y:number}){
    //     if(Side==='right'){
    //         return this.BoxSiteList.right[(Site.x-1)+(Site.y-1)*3];
    //     }
    //     else{
    //         return this.BoxSiteList.left[(Site.x-1)+(Site.y-1)*3];
    //     }
    // }
    getSite(Side:'right'|'left', Site:{x:number,y:number}){

        let col = Site.x - 1;
        let row = Site.y - 1;

        if(Side === 'left'){
            col = 2 - col;   // 翻转列
        }

        return this.BoxSiteList[Side][col + row*3];
    }

    createBoxSiteList(dir:1|-1){
        let BoxWidth = this.fightBoxWidth;
        let BoxHeight= this.fightBoxHeight;
        let XSpace = this.BoxXSpace;
        let YSpace = this.BoxYSpace;

        let x = 0, y = 0;
        let level = -1;

        for (let i = 0; i < 9; i++) {

            if (i % 3 == 0) {
                level += 1;
            }

            const baseX =
                (i - level * 3) * (BoxWidth + XSpace) + 80;

            x = dir * baseX;   // ⭐ 唯一关键变化
            y = level * -(BoxHeight + YSpace);

            if (dir === 1) {
                this.BoxSiteList.right.push([x, y]);
            } else {
                this.BoxSiteList.left.push([x, y]);
            }
        }
    }


}