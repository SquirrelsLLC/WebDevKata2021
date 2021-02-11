import { IWeatherDay } from './IWeatherDay';

export interface IDashboard {
    today: IWeatherDay,
    next48: IWeatherDay[];
}