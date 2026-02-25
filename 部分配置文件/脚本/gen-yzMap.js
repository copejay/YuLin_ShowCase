const fs=require('fs');
const path=require('path');
const XLSX=require('xlsx');

const xlsxPath=path.resolve(__dirname,'../data/maps/yangzhou_map.xlsx');
const workbook=XLSX.readFile(xlsxPath);

const sheetName=workbook.SheetNames[0];
const sheet=workbook.Sheets[sheetName];

let outMap=new Map;
for (const cellAddr in sheet){
    if(cellAddr[0]==='!') continue;

    const cell=sheet[cellAddr];
    const {r,c} =XLSX.utils.decode_cell(cellAddr);

    console.log({
        x:c,
        y:r,
        value:cell.v
    });
    
    outMap.set(`${c},${r}`,cell.v);
}

writePath=path.resolve(__dirname,'../out/yangzhou_map.ts');

const entries=[];

for (const [key,value] of outMap.entries()){
    entries.push(`["${key}","${value}"]`);
}

const tsContent=`
export const mapData=new Map<string,string>([
    ${entries.join(',\n ')}
]);
`;

fs.writeFileSync(writePath,tsContent,'utf-8');
