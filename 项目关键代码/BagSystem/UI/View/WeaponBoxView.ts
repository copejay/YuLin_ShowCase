import { _decorator, Component, Node } from 'cc';
import { Label} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WeaponBoxView')
export class WeaponBoxView extends Component {
    @property(Node)
    WeaponNameNode;

    @property(Node)
    WeaponNumNode;

    private WeaponID:string;
    private ClickCallBack:(WeaponID:string)=>void;

    start() {
        //对物品框设置点击事件
        this.node.on(Node.EventType.TOUCH_END,()=>{
            this.ClickCallBack(this.WeaponID);
        },this);

    }

    setBoxCallBack(WeaponID,CallBack:(WeaponID:string)=>void){
        this.WeaponID=WeaponID;
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

    //同步物品名称
    syncName(WeaponName){
        let string=this.AutoText(WeaponName)
        this.WeaponNameNode.getComponent(Label).string=string;
    }

    //同步物品数量
    syncNum(WeaponNum){
        this.WeaponNumNode.getComponent(Label).string=WeaponNum;
    }

}


