
export type talentType={
    name:string;
    describe:string;
    strong:string;
    speed:string;
    blood:string;
    smart:string;
}
export const talentTemplate=new Map<string,talentType>([
    ["human",{name:"人类",describe:"平平无奇的血脉天赋，比没有好一点",strong:"E",speed:"E",blood:"E",smart:"D"}],
 ["pgst",{name:"盘古神体",describe:"传说开天辟地的盘古留下的血脉，天生近道，受天地钟爱，神级血脉天赋",strong:"S",speed:"S",blood:"S",smart:"S"}],
 ["gdst",{name:"功德圣体",describe:"上古仙庭的主宰者历经万世劫难，功德加身,天道护佑，神级血脉",strong:"A",speed:"S",blood:"S",smart:"S"}],
 ["wjjs",{name:"万劫金身",describe:"上古顶级大能以天劫淬炼身躯，横推诸天，万法不侵，神级血脉",strong:"S",speed:"A",blood:"S",smart:"S"}],
 ["tyst",{name:"天眼圣体",describe:"灌口江二郎显圣，收摄天地妖魔，镇压人间,仙级血脉",strong:"S",speed:"A",blood:"A",smart:"S"}],
 ["lmsh",{name:"灵明石猴",describe:"身入仙炉如炼金精，七十二变般变化无人能敌，仙级血脉",strong:"A",speed:"S",blood:"S",smart:"A"}],
 ["jls",{name:"巨灵神",describe:"法相天地，力大无穷，上古天庭以力量著称的战将，天级血脉",strong:"S",speed:"B",blood:"A",smart:"C"}],
 ["rht",{name:"人皇体",describe:"具有十分全面的属性，地级血脉中的最强体质",strong:"A",speed:"A",blood:"A",smart:"A"}],
 ["zzzl",{name:"诅咒之灵",describe:"受到天地诅咒的神奇物种，飘忽不定，速度极高，地级血脉",strong:"E",speed:"S",blood:"E",smart:"E"}],
 ["ql",{name:"青龙",describe:"龙族中的青龙血脉，速度突出，地级天赋",strong:"B",speed:"A",blood:"A",smart:"B"}],
 ["wwt",{name:"巫王体",describe:"天生的施法者，智力水平极高，但是其它方面较弱，玄级天赋",strong:"C",speed:"C",blood:"B",smart:"A"}],
 ["dl",{name:"地龙",describe:"具有微薄的真龙血脉，下品血脉天赋",strong:"B",speed:"C",blood:"B",smart:"D"}],
 ["fth",{name:"飞天虎",describe:"虎类血脉，速度和力量都还不错，黄级血脉",strong:"C",speed:"B",blood:"D",smart:"D"}],
 ["tce",{name:"铁齿鳄",describe:"具有一定力量天赋，据说有一丝上古异种的血脉，黄级血脉天赋",strong:"C",speed:"D",blood:"C",smart:"E"}],
 ["dls",{name:"大力士",describe:"人类中力量天赋突出的人，不入流血脉天赋",strong:"D",speed:"E",blood:"D",smart:"E"}]
]);
