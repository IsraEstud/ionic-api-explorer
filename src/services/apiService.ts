/**
 * Api Service
 * Centralizes all external API calls to keep stores clean.
 */

const POKE_API = 'https://pokeapi.co/api/v2';
const JOKE_API = 'https://api.chucknorris.io/jokes/random';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export const apiService = {
    // ─── Pokémon ───
    async getPokemon(name: string) {
        const response = await fetch(`${POKE_API}/pokemon/${name.toLowerCase()}`);
        if (!response.ok) {
            if (response.status === 404) throw new Error('Pokémon no encontrado');
            throw new Error(`Error ${response.status}: Algo salió mal`);
        }
        return await response.json();
    },

    // ─── Chuck Norris ───
    async getRandomJoke() {
        const response = await fetch(JOKE_API);
        if (!response.ok) throw new Error('No se pudo conectar con la central de Chuck');
        return await response.json();
    },

    // ─── Weather ───
    async getWeather(lat: number, lng: number) {
        const url = `${WEATHER_API}?latitude=${lat}&longitude=${lng}&current_weather=true`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('No se pudo obtener el clima');
        return await response.json();
    }
};
