

import { FightBox } from "../Assistant/FightBox";

import { FightBoardSite } from "../Assistant/FightBoardSite";

export class FightBoardManager{


    BoardBoxList;

    FightBoardSite;

    constructor(){
        this.LoadFightBoard();
    }

    initFightBoard(){
        this.FightBoardSite=new FightBoardSite();
    }

    LoadFightBoard(){
        this.BoardBoxList=[];

        this.initFightBoard();
        
        let AllSite=this.FightBoardSite.exportAllSite();
        AllSite.forEach((site)=>{
            let newFightBox=new FightBox(site[0],site[1]);
            this.BoardBoxList.push(newFightBox);
        })
    }



}