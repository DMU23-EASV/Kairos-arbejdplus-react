
export class KmRules {

    public static kmRegex: RegExp = /^(?:0|[1-9][0-9]{0,5}|1000000)$/;
    
    // Validates time input from user using regex (hh:mm format)
    public static validateKm(value: string): boolean {
        const timeRegex = /^(?:0|[1-9][0-9]{0,5}|1000000)$/;
        return timeRegex.test(value);
    }
}

