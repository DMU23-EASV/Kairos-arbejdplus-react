import {ETaskStatus} from "../Enum/ETaskStatus";

interface ObjectId {
    timeStamp: number;
    creationTime: Date;
}

export class TaskModel{

    public _id?: ObjectId;
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