import {ETaskStatus} from "../Enum/ETaskStatus.ts";

export class TaskModel{

    public remark?:string;
    public modelStatus?:ETaskStatus;
    public owner?:string;
    public comment?:string;
    public selecteDate?:Date;
    public startTime?:Date;
    public endTime?:Date;
    public startKm?:number;
    public endKm?:number;

}