/**
 * Api Service
 * Centralizes all external API calls to keep stores clean.
 */

import axios from 'axios';

const POKE_API = 'https://pokeapi.co/api/v2';
const JOKE_API = 'https://api.chucknorris.io/jokes/random';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export const apiService = {
    // ─── Pokémon ───
    async getPokemon(name: string) {
        try {
            const response = await axios.get(`${POKE_API}/pokemon/${name.toLowerCase()}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error('Pokémon no encontrado');
                }
                throw new Error(`Error ${error.response?.status}: Algo salió mal`);
            }
            throw error;
        }
    },

    // ─── Chuck Norris ───
    async getRandomJoke() {
        try {
            const response = await axios.get(JOKE_API);
            return response.data;
        } catch (error) {
            throw new Error('No se pudo conectar con la central de Chuck');
        }
    },

    // ─── Weather ───
    async getWeather(lat: number, lng: number) {
        try {
            const url = `${WEATHER_API}?latitude=${lat}&longitude=${lng}&current_weather=true`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error('No se pudo obtener el clima');
        }
    }
};
