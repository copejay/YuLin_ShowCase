

//导入训练领域的子规则域
import { Role } from "../../Domain/TrainDomainAt/Role";
import { RoleFactory } from "../../Domain/TrainDomainAt/RoleFactory";
import { FightFormation } from "../../Domain/TrainDomainAt/FightFormation";
import { OtherDomain } from "../../Domain/TrainDomainAt/OtherDomain";
// import { TrainItemUser } from "../../Domain/TrainDomainAt/TrainItemUser";
//导入子领域的建立类
import { builderRole } from "./builderRole";
import { builderRoleFactory } from "./builderRoleFactory";
import { builderFightFormation } from "./builderFightFormation";
import { builderOtherDomain } from "./builderOtherDomain";
// import { builderTrainItemUser } from "./builderTrainItemUser";
//导入总领域
import { TrainDomainEnv } from "../../Domain/TrainDomain";
import { TrainDomain } from "../../Domain/TrainDomain";


function createTrainDomainEnv():TrainDomainEnv{

    const Role:Role= new builderRole().domainRole;
    const RoleFactory:RoleFactory= new builderRoleFactory().domainRoleFactory;
    const FightFormation:FightFormation= new builderFightFormation().domainFightFormation;
    const OtherDomain:OtherDomain=new builderOtherDomain().domainOtherDomain;
    // const TrainItemUser:TrainItemUser= new builderTrainItemUser().build();

    return {
        Role:Role,
        RoleFactory:RoleFactory,
        FightFormation:FightFormation,
        OtherDomain:OtherDomain,
        // TrainItemUser:TrainItemUser,
    }
}

export class builderTrainDomain{
    public domainTrainDomain:TrainDomain;

    constructor(){
        let trainDomainEnv=createTrainDomainEnv();
        this.domainTrainDomain=new TrainDomain(trainDomainEnv);
    }
}