export interface IWeatherDay {
    date: string;
    summary: {
        precipitation: {
            probability: number,
            weatherType: string
        };
        temperature: {
            high:{
                f:number;
                c: number;
            };
            low: {
                f:number;
                c: number;
            }
        };
        description: string;
        notification: {
            title: string;
            county: string;
            description: string;
            weatherType: string;
        }
    },
    am: {    
        precipitation: {
            probability: number,
            weatherType: string
        };
        temperature: {
            high:{
                f:number;
                c: number;
            };
            low: {
                f:number;
                c: number;
            }
        };
        description: string;
        notification: {
            title: string;
            county: string;
            description: string;
            weatherType: string;
        }
    },
    pm: {
        precipitation: {
            probability: number,
            weatherType: string
        };
        temperature: {
            high:{
                f:number;
                c: number;
            };
            low: {
                f:number;
                c: number;
            }
        };
        description: string;
        notification: {
            title: string;
            county: string;
            description: string;
            weatherType: string;
        }
    }
}