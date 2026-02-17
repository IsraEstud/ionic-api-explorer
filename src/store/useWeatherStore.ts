import { defineStore } from 'pinia';
import { apiService } from '@/services/apiService';

interface WeatherData {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
}

export const useWeatherStore = defineStore('weatherStore', {
    state: () => ({
        currentWeather: null as WeatherData | null,
        loading: false,
        error: null as string | null,
    }),

    actions: {
        async fetchQuitoWeather() {
            this.loading = true;
            this.error = null;
            try {
                // Coordenadas de Quito, Ecuador
                const data = await apiService.getWeather(-0.1807, -78.4678);
                this.currentWeather = data.current_weather;
            } catch (err: any) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        }
    }
});