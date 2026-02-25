
//外部服务
import { DataBaseService,TemplateService, GlobalApp} from "../../DTO/OutApp.contract";
//领域模型接口+领域集合
import { TrainDomain } from "../../Domain/TrainDomain";
import { DomainFactory } from "../DomainFactory/DomainFactory"; 


export class RoleFactoryAt{

    private DomainTrain:TrainDomain;

    constructor(){
        // console.log(`TrainSystem--RoleFactory--构造启动！`);
        this.DomainTrain=DomainFactory.instance.getTrainDomain();
    }

    deleteRole(RoleID:string){
        this.DomainTrain.deleteRole(RoleID);
        // GlobalApp.instance.createToastPop(`队伍:角色已遣散！`);
    }

    checkInFormation(RoleID:string){
        return this.DomainTrain.checkInFormation(RoleID);
    }

    setRole(){
        this.DomainTrain.addRole();
        // GlobalApp.instance.createToastPop(`创建角色成功`);
    }


}