import {ETaskStatus} from "../Enum/ETaskStatus";
import { ObjectId } from 'bson';

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