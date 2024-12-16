import {ETaskStatus} from "../Enum/ETaskStatus";

export class TaskModel{

    public bsonId?: string;
    public name?: string;
    public remark?:string;
    public modelStatus?:ETaskStatus;
    public owner?:string;
    public comment?:string;
    public selecteDate?:Date;
    public startTime?:Date;
    public endTime?:Date;
    public startKilometers?:number;
    public endKilometers?:number;

}