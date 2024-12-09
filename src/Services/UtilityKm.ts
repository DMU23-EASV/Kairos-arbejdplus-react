export class UtilityKm{
    
    
    public static kmToString(km:number | undefined): string {
        
        if (!km){
            return "";
        } else {
            
            return km.toString();
        }
    }
    
}