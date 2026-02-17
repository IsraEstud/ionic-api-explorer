import { defineStore } from "pinia";
import { apiService } from "@/services/apiService";

// Definimos una interfaz para tener tipado fuerte
interface Pokemon {
  name: string;
  sprites: { front_default: string };
  types: any[];
}

export const usePokeStore = defineStore("pokeStore", {
  // 1. STATE: El "Single Source of Truth"
  state: () => ({
    pokemonList: [] as Pokemon[],
    loading: false,
    error: null as string | null,
  }),

  // 2. ACTIONS: Llamadas a la API
  actions: {
    async fetchPokemon(name: string) {
      this.loading = true;
      this.error = null;
      try {
        const data = await apiService.getPokemon(name);

        // Guardamos en el store
        this.pokemonList.push(data);
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    clearList() {
      this.pokemonList = [];
    },
  },

  // 3. GETTERS: Como las computed properties de Vue
  getters: {
    totalPokemon: (state) => state.pokemonList.length,
  },
});
