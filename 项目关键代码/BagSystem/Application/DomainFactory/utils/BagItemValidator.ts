// BagItemValidator.ts
import type { DomainItemUseType ,DomainBagItemTemplate} from "../../../Domain/BagType";


export class BagItemValidator {

    static parse(raw: any): DomainBagItemTemplate {

        // 1️⃣ 必要字段校验
        if (!raw?.name) throw new Error("Item missing name");
        if (!raw?.describe) throw new Error("Item missing describe");

        // 2️⃣ useType 兜底
        const useTypeList = ["roleTrain", "bagUse", "noUse"];
        const useType :DomainItemUseType=
            useTypeList.indexOf(raw.useType) !== -1
                ? raw.useType
                : "none";

        // 3️⃣ act 校验
        const actList = ["add"];
        const act :string= 
            actList.indexOf(raw.act1) !==-1
            ? raw.act1
            : "none";

        // 4️⃣ 数值修正
        const num = Number(raw.num1);
        if (Number.isNaN(num)) {
            throw new Error("Item num invalid");
        }
        let outName:string=raw.name;
        let outDescribe:string=raw.describe;
        let outLevel:string=raw.level;

        let outUseType:DomainItemUseType=useType;
        let outUseTarget:string=raw.useTarget1 || "";
        let outAct:string=act;
        let outNum:number=num;

        // 5️⃣ 输出标准结构
        return {
            name:outName,
            describe:outDescribe,
            level:outLevel,

            useType:outUseType,
            useTarget: outUseTarget,
            act:outAct,
            actNum:outNum
        };
    }
}
