import {
    Action,
    Module,
    Mutation,
    VuexModule,
} from 'vuex-module-decorators';

import store from '..';

import axios from 'axios';
import { IDashboard } from '../interfaces/IDashboard';
import { IStoreActionResponse } from '../interfaces/IStoreActionResponse';

export interface IWeatherState {
    readonly dashboard: IDashboard | null;
    fetchDashboard(reload?: boolean): Promise<IStoreActionResponse<IDashboard | null>>
}

@Module({ dynamic: true, store, name: 'weather' })
export default class WeatherState extends VuexModule implements IWeatherState {
    private DASHBOARD: IDashboard = null as any;
    
    //#region GETTERS
    get dashboard(): IDashboard | null {
        if(!this.DASHBOARD) return null;
        return Object.assign({}, this.DASHBOARD);
    }

    //#endregion

    //#region ACTIONS
    @Action
    async fetchDashboard(reload = false): Promise<IStoreActionResponse<IDashboard | null>> {
        if (!reload && this.DASHBOARD) return { success: true, data: Object.assign({}, this.DASHBOARD)};

        try {
            const fetchDashboardUrl = `http://localhost:3000/dashboard`;
            const axiosResponse = await axios.get(fetchDashboardUrl);

            if(axiosResponse && axiosResponse.data) {
                this.context.commit('setDashboard', axiosResponse.data);
            }

            const returnData = this.DASHBOARD ? Object.assign({}, this.DASHBOARD): null;
            return { success: true, data: returnData as any};
        }
        catch (e) {
            console.error('Weather Store Dashboard Error:', e);
        }

        return { success: false, reason: 'Error fetching dashboard.' };
    }

    //#endregion

    //#region MUTATIONS

    @Mutation
    async setDashboard(dashboard: IDashboard) {
        this.DASHBOARD = dashboard;
    }
    //#endregion
}
