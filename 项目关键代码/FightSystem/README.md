

#FightSystem生命周期

入口：
    -FightApplication.NewFight()

整体流程：

[Start]->

[InitFightData]
    -职责：
        -加载战斗数据
    -包含：
        -从GlobalService获取阵容数据
        -给FightManager传入阵容数据
    -代码涉及：
        -App/Assistant/FightData
        -Domain/FightManager

[FightBegin]
    -职责：
        -根据数据加载战斗逻辑实体
    -包含：
        -创建双方FightRoleManager
    -代码涉及：
        -Domain/FightManager
        -Domain/FightRoleManager

[FightRoundLoop]
    -职责：
        -控制回合循环
    -包含阶段：
        -ExecuteRound
        -CheckResult
    -代码涉及：
        -Domain-FightManager

    [ExecuteRound]
        -职责：
            -执行一整回合的角色行动
        -行为：
            -按顺序驱动Left/Right RoleManager
            -Role行动完成后触发状态检测
        -代码涉及：
            -Domain/FightRoleManager

    [CheckResult]
        -职责：
            -判断战斗是否结束
        
        未结束->回到FightRoundLoop

(已结束)
[EndDelay]
    -职责：
        -战斗结束后演出缓冲(0.5s)


[End]