const fs=require('fs');
const path=require('path');
const XLSX=require('xlsx');

const xlsxPath=path.resolve(__dirname,'../data/talent.xlsx');
const workbook=XLSX.readFile(xlsxPath);

const sheetName=workbook.SheetNames[0];
const sheet=workbook.Sheets[sheetName];

let outMap=new Map;

//转成按行读取
const rows=XLSX.utils.sheet_to_json(sheet,{
    header:1
});

for(let rowIndex=1;rowIndex<rows.length;rowIndex++){
    const row=rows[rowIndex];

    const id=row[0];
    const name=row[2];
    const describe=row[3];

    const strong=row[4];
    const speed=row[5];
    const blood=row[6];
    const smart=row[7];
    if(!id) continue;

    const head=id.slice(0,1)
    if(head!='?'){
        console.log(id,name,describe,strong,speed,blood,smart);
        outMap.set(`${id}`,`{name:"${name}",describe:"${describe}",strong:"${strong}",speed:"${speed}",blood:"${blood}",smart:"${smart}"}`);
    }
}

//写入逻辑
writePath=path.resolve(__dirname,'../out/talent.ts');

const entries=[];

for (const [key,value] of outMap.entries()){
    entries.push(`["${key}",${value}]`);
}

const tsContent=`
export type talentType={
    name:string;
    describe:string;
    strong:string;
    speed:string;
    blood:string;
    smart:string;
}
export const talentTemplate=new Map<string,talentType>([
    ${entries.join(',\n ')}
]);
`;

fs.writeFileSync(writePath,tsContent,'utf-8');
