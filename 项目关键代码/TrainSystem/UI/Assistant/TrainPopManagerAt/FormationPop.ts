import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { FormationBoxViewSpawner } from '../../Spawner/FormationBoxViewSpawner';
import { FormationRoleViewSpawner } from '../../Spawner/FormationRoleViewSpawner';

import { FormationUpRole } from '../TrainPopManager';
import { FormationRoleView } from '../../View/FormationRoleView';
import { FormationBoxView } from '../../View/FormationBoxView';

@ccclass('FormationPop')
export class FormationPop extends Component {


    @property({type:Node,tooltip:"激活节点"})
    ActiveNode:Node;

    @property({type:Node,tooltip:"内容父节点"})
    ContentParentNode:Node;

    @property({type:Node,tooltip:"阵型角色生成器"})
    FormationRoleSpawnerNode:Node;
    @property({type:Node,tooltip:"阵型盒子生成器"})
    FormationBoxSpawnerNode:Node;

    @property(Node)
    CloseButton:Node;

    @property(Node)
    DownRoleButton:Node;

    @property(Node)
    CleanFormationButton:Node;

    // FormationRoleViewFactory:FormationRoleViewFactory;
    // FormationBoxViewFactory:FormationBoxViewFactory;
    private FormationBoxViewSpawner:FormationBoxViewSpawner;
    private FormationRoleViewSpawner:FormationRoleViewSpawner;

    FormationBaseCells:FormationBoxView[]=[];
    FormationRoleCells:FormationRoleView[]=[];

    EventBus;

    private gridPositions: number[][] = [];
    GRID_SIZE = 3;

    listen(){
        this.CloseButton.on(Node.EventType.TOUCH_END,this.close,this);
        this.DownRoleButton.on(Node.EventType.TOUCH_END,this.downRoleClick,this);
        this.CleanFormationButton.on(Node.EventType.TOUCH_END,this.cleanFormationClick,this);
    }

    start(){
        this.close();
        // this.initFactory();
        this.initSpawner();
        // this.createFormationBoard();
        this.initGridPositions();//

        this.syncBaseCellsInfo();
        this.listen();
    }
    close(){
        this.ActiveNode.active=false;
    }
    open(){
        this.ActiveNode.active=true;
    }

    downRoleClick(){
        if(this.EventBus!=null){
            this.EventBus({callFrom:"FormationPopClick",type:"DownRole",data:{}});
        }
    }
    cleanFormationClick(){
        if(this.EventBus!=null){
            this.EventBus({callFrom:"FormationPopClick",type:"CleanFormation",data:{}});
        }
    }

    initEventBus(EventBus){
        this.EventBus=EventBus;
    }

    initSpawner(){
        this.FormationBoxViewSpawner=this.FormationBoxSpawnerNode.getComponent(FormationBoxViewSpawner);
        this.FormationRoleViewSpawner=this.FormationRoleSpawnerNode.getComponent(FormationRoleViewSpawner);
    }

    clickCB(site:{x:number,y:number}){
        console.log(`FOrmationPop: clickCB${site.x},${site.y}`);
        if(this.EventBus!=null){
            this.EventBus({callFrom:"FormationPopClick",type:"ClickCell",data:{site:site}});
        }
    }

    syncRoleCellsInfo(list: FormationUpRole[]) {

        this.recycleRoleCellView();

        this.FormationRoleCells = this.buildRoleCellsView(list.length);

        for (let i = 0; i < list.length; i++) {

            const role = list[i];
            const view = this.FormationRoleCells[i];

            const { x, y } = role.site;

            const index = this.gridToIndex(x, y);

            const pos = this.gridPositions[index];

            if (!pos) {
                console.error("非法坐标:", role.site);
                continue;
            }

            view.setPosition(pos[0], pos[1]);
            view.setName(role.name.toString());
        }
    }
    syncBaseCellsInfo() {

        this.FormationBaseCells = this.buildBaseCellsView();

        for (let i = 0; i < 9; i++) {

            const cell = this.FormationBaseCells[i];
            const pos = this.gridPositions[i];
            const grid = this.indexToGrid(i);

            cell.setPosition(pos[0], pos[1]);
            cell.initInfo(grid, this.clickCB.bind(this));
        }
    }


    buildRoleCellsView(num:number){
        let RoleCellViewList=[];
        for (let i=0;i<num;i++){
            let RoleCellView=this.FormationRoleViewSpawner.getView(this.ContentParentNode);
            RoleCellViewList.push(RoleCellView);
        }
        return RoleCellViewList;
    }

    recycleRoleCellView(){
        let CellViewList=this.FormationRoleCells;
        for (let i=0;i<CellViewList.length;i++){
            let CellView=CellViewList[i];
            this.FormationRoleViewSpawner.recycle(CellView);
        }
        this.FormationRoleCells=[];
    }

    buildBaseCellsView(){
        let BaseCellViewList=[];
        for (let i=0;i<9;i++){
            let BaseCellView=this.FormationBoxViewSpawner.getView(this.ContentParentNode);
            BaseCellViewList.push(BaseCellView);
        }
        return BaseCellViewList;
    }

    // private gridPositions: number[][] = [];
    // GRID_SIZE = 3;

    initGridPositions() {

        const Box = 70;
        const Space = 20;

        this.gridPositions = [];

        for (let i = 0; i < 9; i++) {

            const grid = this.indexToGrid(i);

            const x = (grid.x - 2) * (Box + Space);
            const y = (2 - grid.y) * (Box + Space);

            this.gridPositions.push([x, y]);
        }
    }

    update(deltaTime: number) {
        
    }

    // ========== Grid 核心工具 ==========

    // GRID_SIZE = 3;

    gridToIndex(x: number, y: number) {
        return (y - 1) * this.GRID_SIZE + (x - 1);
    }

    indexToGrid(index: number) {
        return {
            x: (index % this.GRID_SIZE) + 1,
            y: Math.floor(index / this.GRID_SIZE) + 1,
        };
    }


}


