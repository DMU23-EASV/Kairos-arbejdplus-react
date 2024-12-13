export class UtilityKm{
    
    
    public static kmToString(km:number | undefined | null): string {
        
        if (!km){
            return "";
        } else {
            
            return km.toString();
        }
    }
    
}