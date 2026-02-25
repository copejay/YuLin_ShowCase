import { _decorator, Component, Node } from 'cc';
import {Label} from 'cc';
import { Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemBoxView')
export class ItemBoxView extends Component {

    //背景版
    
    @property(Sprite)
    levelBorder:Sprite=null;
  
    @property(Node)
    ItemNameNode;

    @property(Node)
    ItemNumNode;

    private slotID:number;//背包槽位置
    private ClickCallBack:(slotID:number)=>void;

    start() {
        //对物品框设置点击事件
        this.node.on(Node.EventType.TOUCH_END,()=>{
            this.ClickCallBack(this.slotID);
        },this);

        // this.setLevelBorder(1);
    }

  
    setLevelBorder(level: number) {
        if (!this.levelBorder) return;

        let color: Color;

        switch (level) {
            case 1: // 绿
                color = new Color(120, 200, 120, 255);
                break;
            case 2: // 蓝
                color = new Color(120, 160, 220, 255);
                break;
            case 3: // 紫
                color = new Color(180, 140, 220, 255);
                break;
            case 4: // 红
                color = new Color(220, 130, 130, 255);
                break;
            default:
                color = Color.BLACK;
                break;
        }

        this.levelBorder.color = color;
    }

    setBoxCallBack(slotID,CallBack:(slotID:number)=>void){
        this.slotID=slotID;
        this.ClickCallBack=CallBack;
    }

    //设置物品框位置
    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    AutoText(string:string){
        const chars = Array.from(string);
        let result = "";
        for (let i = 0; i < chars.length; i++) {
            result += chars[i];
            // 每 3 个字符插入一次换行
            if ((i + 1) % 3 === 0 && i !== chars.length - 1) {
                result += "\n";
            }
        }
        return result;
    }

    // setId(ItemID){
    //     this.ItemID=ItemID;
    // }

    //同步物品名称
    syncName(ItemName){
        let string=this.AutoText(ItemName);
        this.ItemNameNode.getComponent(Label).string=string;
    }

    //同步物品数量
    syncNum(ItemNum){
        this.ItemNumNode.getComponent(Label).string=ItemNum;
    }

    update(deltaTime: number) {
        
    }
}


