import dayjs, {Dayjs} from "dayjs";
import { date } from "yup";

export class UtilityDateAndTime {

    /**
     * This method converts a time given as a string into a Date object
     * @param date The date corresponding to the given time.
     * @param time The time as a string.
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
     * @param time The time as a Date object
     * @return the given time as a string (hh:mm format)
     */
    public static convertDateTimeToStringTime(time:Date | undefined): string{
        
        let dateTimeThing = time;

        if (!dateTimeThing){
            dateTimeThing = "";
        } else if (!(dateTimeThing instanceof date)) {
            dateTimeThing = new Date(dateTimeThing);
        } 

        return `${dateTimeThing?.getHours().toString().padStart(2, '0')}:${dateTimeThing?.getMinutes().toString().padStart(2, '0')}`;

    }

    
    /**
     * This method converts a given Date object to a Dayjs object
     * @param date The date as a Date object
     * @return the given date as a Dayjs object
     */
    public static convertDateToDayjsType(date: Date | undefined): dayjs.Dayjs {
        console.log("Todays Date: " + date)

        if (!date){
            return dayjs();
        } else { 
            return dayjs(date);
        }
       
    }
    
}