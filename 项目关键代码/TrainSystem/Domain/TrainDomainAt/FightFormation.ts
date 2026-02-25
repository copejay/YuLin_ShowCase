type Site = { x: number; y: number };

import type { DisplayFormationRole } from "../TrainType";
import type { FormationRole } from "../TrainType";
// export type FormationRow = {
//     id: string;
//     site: Site;
// };

export interface FightFormationEnv {

    getFormationRow():FormationRole[];

    saveFormation(FormationRoles:FormationRole[]):void;

}

import { OtherDomain } from "./OtherDomain";
import { Role } from "./Role";

export class FightFormation {

    private Max_X = 3;
    private Max_Y = 3;
    private Max_UpRole = 5;

    // 位置 → 角色
    private cellToRole = new Map<string, string>();
    // 角色 → 位置
    private roleToCell = new Map<string, Site>();

    private FightFormationEnv:FightFormationEnv;

    //这个组件可以一次构造多处复用
    // private loaded:boolean=false;

    constructor(Env:FightFormationEnv){
        this.FightFormationEnv=Env;
        // this.init();
        this.buildComponent();
    }

    private otherDomain:OtherDomain;
    private role:Role;

    commitFormation(){
        this.FightFormationEnv.saveFormation(this.getFormationRowList());
    }


    buildComponent(){
        let list=this.FightFormationEnv.getFormationRow();
        list.forEach(row => {
            const key = this.siteKey(row.site);
            this.cellToRole.set(key, row.id);
            this.roleToCell.set(row.id, row.site);
        });
    }

    LinkOtherDomain(otherDomain:OtherDomain,role:Role){
        this.otherDomain=otherDomain;
        this.role=role;
    }


    /* ================== 核心点击 ================== */

    formationCellClick(roleID: string, cell: Site) {
        // this.init();
        if (!this.checkCellSiteOK(cell)) return;

        const key = this.siteKey(cell);
        const targetRole = this.cellToRole.get(key);
        const hasRole = this.roleToCell.has(roleID);

        // ① 新上阵
        if (!hasRole) {
            if (this.roleToCell.size >= this.Max_UpRole) return;

            if (targetRole) {
                this.removeRole(targetRole);
            }
            this.placeRole(roleID, cell);
            return;
        }

        // ② 已上阵：移动 / 交换
        const oldCell = this.roleToCell.get(roleID);
        if (!oldCell) return;

        this.removeRole(roleID);

        if (targetRole) {
            this.placeRole(targetRole, oldCell);
        }

        this.placeRole(roleID, cell);
    }

    DownRoleClick(roleID: string) {
        // this.init();
        this.removeRole(roleID);
        this.otherDomain.createToastPop(`角色已下阵！`);

        return {result:true}
    }

    checkInFormation(roleID:string){
        // this.init();
        return this.roleToCell.has(roleID);
    }

    getDisplayFormation():DisplayFormationRole[]{
        let FormationRow=this.getFormationRowList();

        let DisplayFormation=FormationRow.map((role)=>{
            this.role.initRole(role.id);
            let name=this.role.getRole().baseInfo.name;
            return {name:name,site:role.site};
        })
        return DisplayFormation;
    }


    /* ================== 基础操作 ================== */

    private placeRole(roleID: string, site: Site) {
        const key = this.siteKey(site);
        this.cellToRole.set(key, roleID);
        this.roleToCell.set(roleID, site);
    }

    private removeRole(roleID: string) {
        const site = this.roleToCell.get(roleID);
        if (!site) return;

        const key = this.siteKey(site);
        this.roleToCell.delete(roleID);
        this.cellToRole.delete(key);
    }

    /* ================== 工具方法 ================== */

    private siteKey(site: Site) {
        return `${site.x},${site.y}`;
    }

    private checkCellSiteOK(site: Site) {
        return (
            site.x > 0 && site.x <= this.Max_X &&
            site.y > 0 && site.y <= this.Max_Y
        );
    }

    /* ================== 导出 ================== */

    getFormationRowList(): FormationRole[] {
        const result: FormationRole[] = [];
        this.roleToCell.forEach((site, id) => {
            result.push({ id, site });
        });
        return result;
    }
}
