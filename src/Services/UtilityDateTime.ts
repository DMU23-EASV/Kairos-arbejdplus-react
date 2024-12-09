import {Dayjs} from "dayjs";

export class UtilityDateTime {

    /**
     * This method converts a time given as a string into a Date object
     * @param date corresponding to the given time.
     * @param time as a string.
     * @return The given time as a Date object
     */
    public static convertTimeStringToDateType(date:Date, time:string):Date {

        const [hours, minutes] = time.split(":").map(Number);

        const newDate = new Date(date);
        newDate.setHours(hours, minutes, 0, 0);


        return newDate;

    }


    /**
     * This method converts a time given as a Date object into a time given as a string
     * @param time as a Date object
     * @return the given time as a string (hh:mm format)
     */
    public static convertDateTimeToStringTime(time:Date): string{
        
        return "Time";
    }

    
    /**
     * This method converts a given Date object to a Dayjs object
     * @param date as a Date object
     * @return the given date as a Dayjs object
     */
    public static convertDateToDayjsType(date:Date): Dayjs {
        
        return Dayjs;
    }
    
}