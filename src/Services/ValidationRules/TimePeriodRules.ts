
export class TimePeriodRules {
    
    public static validateTimePeriod(startTime:string, endTime:string):boolean {

        let isValid:boolean = false;

        if (startTime == '' && endTime == '') {
            isValid = true;
            
        } else {

            // hour and minutes from start time
            let hourStartTime: number = TimePeriodRules.getHour(startTime);
            let minutesStartTime: number = TimePeriodRules.getMinutes(startTime);
            // hours and minutes from end time
            let hourEndTime: number = TimePeriodRules.getHour(endTime);
            let minutesEndTime: number = TimePeriodRules.getMinutes(endTime);


            if (hourStartTime < hourEndTime) { isValid = true; }
            if (hourStartTime > hourEndTime) { isValid = false; }
            if (hourStartTime == hourEndTime && minutesStartTime < minutesEndTime) { isValid = true; }
            if (hourStartTime == hourEndTime && minutesStartTime > minutesEndTime) { isValid = false; }
            if (hourStartTime == hourEndTime && minutesStartTime == minutesEndTime) { isValid = false; }

        }

        return isValid;
    }


    public static getHour(time: string): number {

        let timeSplit = time.split(":");
        return parseInt(timeSplit[0]);
    }


    public static getMinutes(time: string): number {

        let timeSplit = time.split(":");
        return parseInt(timeSplit[1]);
    }
    
}