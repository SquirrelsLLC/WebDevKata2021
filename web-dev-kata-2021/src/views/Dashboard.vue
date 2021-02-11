<template>
    <div>
        {{dashboard}}    
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getModule } from 'vuex-module-decorators';
import WeatherState, { IWeatherState } from '../store/modules/weather';
import { IDashboard } from '../store/interfaces/IDashboard';

let weatherState = {} as IWeatherState;

export default defineComponent({
    name: 'Dashboard',
    computed: {
        dashboard(): IDashboard {
            if(!weatherState || !weatherState.dashboard) return {} as IDashboard;
            return weatherState.dashboard;
        }
    },
    async created () {
        weatherState = getModule(WeatherState);
        
        await Promise.all([
            weatherState.fetchDashboard()
        ]);

        console.log(weatherState.dashboard);
    }

});
</script>
