
export class DistanceRules {
    
    public static validateDistance(startKm:string, endKm:string):boolean {
        
        let isValid:boolean = false;

        if (startKm == '' && endKm == ''){
            isValid = true;
            
        } else {
            
            let kmStart: number = parseInt(startKm);
            let kmEnd: number = parseInt(endKm);

            if (kmStart > kmEnd) { isValid = false; }
            if (kmStart < kmEnd) { isValid = true; }
            if (kmStart != 0 && kmEnd != 0 && kmStart == kmEnd) { isValid = false; }
            if (kmStart == 0 && kmEnd == 0) { isValid = true; }
        }

        return isValid;
    }
}