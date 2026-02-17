import { defineStore } from 'pinia';
import { apiService } from '@/services/apiService';

// Definimos la estructura del chiste según la API
interface Joke {
    id: string;
    joke: string;
    category?: string;
}

export const useJokeStore = defineStore('jokeStore', {
    state: () => ({
        jokes: [] as Joke[],
        loading: false,
        error: null as string | null,
    }),

    actions: {
        async fetchRandomJoke() {
            this.loading = true;
            this.error = null;
            try {
                // Usamos la API centralizada
                const data = await apiService.getRandomJoke();

                // Adaptamos el formato de la API a nuestra interfaz
                const newJoke: Joke = {
                    id: data.id,
                    joke: data.value,
                };

                // Lo añadimos al inicio de la lista (el más reciente primero)
                this.jokes.unshift(newJoke);
            } catch (err: any) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        clearJokes() {
            this.jokes = [];
        }
    }
});