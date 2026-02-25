export interface IState{
    name:string;

    onEnter?():void;
    onExit?():void;
    onEvent(event:string,payload?:any):void;
}