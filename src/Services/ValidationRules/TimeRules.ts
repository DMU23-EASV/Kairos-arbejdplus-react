
export class TimeRules {
    
    // Validates time input from user using regex (hh:mm format)
    public static validateTime(value: string): boolean {
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(value);
    }
}

