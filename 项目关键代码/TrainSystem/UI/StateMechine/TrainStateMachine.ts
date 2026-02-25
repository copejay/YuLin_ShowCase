
// export interface IState{
//     name:string;

//     onEnter?():void;
//     onExit?():void;
//     onEvent(event:string,payload?:any):void;
// }
import { IState } from './IState';


export class TrainStateMachine{


    private current: IState | null=null;

    constructor(){

    }

    change(state:IState){
        if(this.current){
            this.current.onExit?.();
        }
        this.current=state;
        this.current.onEnter?.();
    }

    dispatch(event:string,payload?:any){
        if(!this.current) return;
        this.current.onEvent(event,payload);
    }

    getStateName(){
        return this.current?.name??"None";
    }

}