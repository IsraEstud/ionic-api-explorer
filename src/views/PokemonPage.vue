<template>
  <ion-page class="poke-page">
    <ion-header :translucent="true" class="poke-header">
      <ion-toolbar class="poke-toolbar">
        <ion-buttons slot="start">
          <ion-menu-button class="menu-btn"></ion-menu-button>
        </ion-buttons>
        <div class="toolbar-brand" slot="start">
          <span class="brand-icon">⬡</span>
          <ion-title class="poke-title">PokéDex</ion-title>
        </div>
        <div slot="end" class="header-badge">
          <span class="badge-count">{{ pokeStore.totalPokemon }}</span>
          <span class="badge-label">capturados</span>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="poke-content">
      <!-- Hero search section -->
      <div class="search-hero">
        <div class="hero-glow"></div>
        <div class="hero-text">
          <h1 class="hero-title">Explora el mundo<br /><em>Pokémon</em></h1>
          <p class="hero-sub">Busca por nombre o número de Pokédex</p>
        </div>

        <div class="search-wrapper">
          <div class="search-box" :class="{ 'is-loading': pokeStore.loading }">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref="searchInput"
              class="poke-input"
              type="text"
              placeholder="Ej: pikachu, charizard, 25..."
              :disabled="pokeStore.loading"
              @keyup.enter="onSearch"
            />
            <button
              class="search-btn"
              :disabled="pokeStore.loading"
              @click="onSearch"
            >
              <span v-if="!pokeStore.loading">Buscar</span>
              <span v-else class="btn-spinner"></span>
            </button>
          </div>

          <!-- Loading state -->
          <transition name="fade-slide">
            <div v-if="pokeStore.loading" class="loading-pill">
              <div class="pokeball-spinner">
                <div class="pb-top"></div>
                <div class="pb-mid"></div>
                <div class="pb-bot"></div>
              </div>
              <span>Escaneando Pokédex...</span>
            </div>
          </transition>

          <!-- Error state -->
          <transition name="fade-slide">
            <div v-if="pokeStore.error" class="error-card">
              <span class="error-icon">✕</span>
              <div>
                <strong>Sin resultados</strong>
                <p>{{ pokeStore.error }}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Pokémon grid -->
      <div class="list-section" v-if="pokeStore.pokemonList.length > 0">
        <div class="section-header">
          <h2 class="section-title">Resultados</h2>
          <button class="clear-btn" @click="pokeStore.clearList">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
            </svg>
            Limpiar
          </button>
        </div>

        <div class="pokemon-grid">
          <div
            v-for="(pokemon, index) in pokeStore.pokemonList"
            :key="pokemon.name"
            class="poke-card"
            :class="getTypeClass(pokemon)"
            :style="{ animationDelay: `${index * 60}ms` }"
          >
            <div class="card-bg-circle"></div>
            <div class="card-number">#{{ String(getPokemonId(pokemon)).padStart(3, '0') }}</div>
            <div class="card-sprite-wrap">
              <img
                class="card-sprite"
                :src="pokemon.sprites.front_default"
                :alt="pokemon.name"
                loading="lazy"
              />
            </div>
            <div class="card-info">
              <h3 class="card-name">{{ pokemon.name }}</h3>
              <div class="card-types">
                <span
                  v-for="t in pokemon.types"
                  :key="t.type.name"
                  class="type-badge"
                  :class="`type-${t.type.name}`"
                >
                  {{ t.type.name }}
                </span>
              </div>
            </div>
            <div class="card-shine"></div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="pokeStore.pokemonList.length === 0 && !pokeStore.loading" class="empty-state">
        <div class="empty-pokeball">
          <div class="ep-top"></div>
          <div class="ep-mid"></div>
          <div class="ep-bot"></div>
        </div>
        <p>Tu Pokédex está vacía.<br />¡Empieza a buscar!</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { usePokeStore } from "@/store/usePokeStore";

const pokeStore = usePokeStore();
const searchInput = ref<HTMLInputElement | null>(null);

const onSearch = () => {
  const query = searchInput.value?.value.trim();
  if (query) {
    pokeStore.fetchPokemon(query);
    if (searchInput.value) searchInput.value.value = "";
  }
};

const getPokemonId = (pokemon: any): number => {
  const url = pokemon.url || "";
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1]) : (pokemon.id ?? 0);
};

const getTypeClass = (pokemon: any): string => {
  const primary = pokemon.types?.[0]?.type?.name ?? "";
  return `card-type-${primary}`;
};
</script>

<style scoped>
/* ─── Google Fonts ─────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&family=Silkscreen&display=swap');

/* ─── CSS Variables ────────────────────────────────────── */
:root {
  --bg-deep:      #0b0e1a;
  --bg-card:      #131729;
  --bg-surface:   #1a1f36;
  --accent-red:   #ff3b5c;
  --accent-gold:  #ffd438;
  --accent-blue:  #4cc9f0;
  --text-primary: #f0f4ff;
  --text-muted:   #6b7499;
  --radius-card:  20px;
  --radius-pill:  999px;
}

/* ─── Page & Content ───────────────────────────────────── */
.poke-page {
  --ion-background-color: var(--bg-deep);
  font-family: 'Nunito', sans-serif;
}

.poke-content {
  --background: var(--bg-deep);
  --color: var(--text-primary);
}

/* ─── Header ────────────────────────────────────────────── */
.poke-header {
  --background: transparent;
  --border-color: transparent;
}

.poke-toolbar {
  --background: rgba(11, 14, 26, 0.85);
  --border-color: rgba(255,255,255,0.06);
  --padding-top: 8px;
  --padding-bottom: 8px;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.toolbar-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 4px;
}

.brand-icon {
  font-size: 22px;
  color: var(--accent-red);
  animation: hex-pulse 3s ease-in-out infinite;
}

@keyframes hex-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(0.92); }
}

.poke-title {
  font-family: 'Silkscreen', monospace;
  font-size: 18px;
  color: var(--text-primary);
  letter-spacing: 1px;
  padding: 0;
}

.menu-btn {
  --color: var(--text-muted);
}

.header-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 16px;
  line-height: 1.1;
}

.badge-count {
  font-family: 'Silkscreen', monospace;
  font-size: 18px;
  color: var(--accent-gold);
}

.badge-label {
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ─── Hero ──────────────────────────────────────────────── */
.search-hero {
  position: relative;
  padding: 40px 20px 32px;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,59,92,0.18) 0%, transparent 70%);
  pointer-events: none;
}

.hero-text {
  margin-bottom: 28px;
}

.hero-title {
  font-size: 32px;
  font-weight: 900;
  color: var(--text-primary);
  line-height: 1.15;
  margin: 0 0 8px;
}

.hero-title em {
  font-style: normal;
  color: var(--accent-red);
}

.hero-sub {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}

/* ─── Search Box ────────────────────────────────────────── */
.search-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-surface);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-pill);
  padding: 6px 6px 6px 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-box:focus-within {
  border-color: var(--accent-red);
  box-shadow: 0 0 0 3px rgba(255,59,92,0.15);
}

.search-box.is-loading {
  opacity: 0.7;
}

.search-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--text-muted);
}

.poke-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 600;
}

.poke-input::placeholder {
  color: var(--text-muted);
  font-weight: 400;
}

.search-btn {
  background: var(--accent-red);
  color: #fff;
  border: none;
  border-radius: var(--radius-pill);
  padding: 10px 22px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s, opacity 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  min-height: 40px;
}

.search-btn:active {
  transform: scale(0.96);
}

.search-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ─── Pokéball Spinner ──────────────────────────────────── */
.pokeball-spinner,
.empty-pokeball {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  animation: spin 1s linear infinite;
  border: 2px solid rgba(255,255,255,0.15);
  display: flex;
  flex-direction: column;
}

.empty-pokeball {
  width: 64px;
  height: 64px;
  animation: none;
  opacity: 0.25;
  margin: 0 auto 20px;
}

.pb-top, .ep-top { background: var(--accent-red); flex: 1; }
.pb-bot, .ep-bot { background: #f0f0f0; flex: 1; }
.pb-mid, .ep-mid {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  height: 3px;
  background: #222;
  z-index: 2;
}

@keyframes spin { to { transform: rotate(360deg); } }

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

/* ─── Loading Pill ──────────────────────────────────────── */
.loading-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--radius-pill);
  padding: 10px 18px;
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 600;
}

/* ─── Error Card ────────────────────────────────────────── */
.error-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(255,59,92,0.1);
  border: 1px solid rgba(255,59,92,0.3);
  border-radius: 16px;
  padding: 14px 18px;
}

.error-icon {
  width: 32px;
  height: 32px;
  background: var(--accent-red);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.error-card strong {
  font-size: 14px;
  color: var(--text-primary);
  display: block;
}

.error-card p {
  margin: 2px 0 0;
  font-size: 12px;
  color: rgba(255,59,92,0.8);
}

/* ─── Transitions ───────────────────────────────────────── */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ─── List Section ──────────────────────────────────────── */
.list-section {
  padding: 0 16px 32px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 900;
  color: var(--text-primary);
  margin: 0;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-pill);
  padding: 6px 14px;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  color: var(--accent-red);
  border-color: rgba(255,59,92,0.3);
}

.clear-btn svg {
  width: 14px;
  height: 14px;
}

/* ─── Pokémon Grid ──────────────────────────────────────── */
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

/* ─── Pokémon Card ──────────────────────────────────────── */
.poke-card {
  position: relative;
  background: var(--bg-card);
  border-radius: var(--radius-card);
  padding: 16px 14px 14px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
  animation: card-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.poke-card:active {
  transform: scale(0.96);
}

@keyframes card-in {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.card-bg-circle {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255,255,255,0.03);
  border: 20px solid rgba(255,255,255,0.03);
  pointer-events: none;
}

.card-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%);
  border-radius: var(--radius-card) var(--radius-card) 0 0;
  pointer-events: none;
}

.card-number {
  font-family: 'Silkscreen', monospace;
  font-size: 10px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.card-sprite-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.card-sprite {
  width: 80px;
  height: 80px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
  transition: transform 0.3s;
}

.poke-card:hover .card-sprite {
  transform: translateY(-4px) scale(1.05);
}

.card-name {
  font-size: 15px;
  font-weight: 900;
  color: var(--text-primary);
  text-transform: capitalize;
  margin: 8px 0 6px;
  line-height: 1;
}

.card-types {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.type-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: capitalize;
  padding: 3px 8px;
  border-radius: var(--radius-pill);
  letter-spacing: 0.3px;
}

/* ─── Type Colors ───────────────────────────────────────── */
.type-fire      { background: rgba(255,111,0,0.2);    color: #ff6f00; }
.type-water     { background: rgba(76,201,240,0.2);   color: #4cc9f0; }
.type-grass     { background: rgba(56,217,87,0.2);    color: #38d957; }
.type-electric  { background: rgba(255,212,56,0.2);   color: #ffd438; }
.type-psychic   { background: rgba(255,59,92,0.2);    color: #ff3b5c; }
.type-ice       { background: rgba(144,224,239,0.2);  color: #90e0ef; }
.type-dragon    { background: rgba(103,58,183,0.2);   color: #9c7be8; }
.type-dark      { background: rgba(30,30,50,0.6);     color: #8899aa; }
.type-fairy     { background: rgba(255,133,198,0.2);  color: #ff85c6; }
.type-fighting  { background: rgba(213,96,50,0.2);    color: #d56032; }
.type-poison    { background: rgba(160,70,200,0.2);   color: #a046c8; }
.type-ground    { background: rgba(180,140,80,0.2);   color: #c8a04a; }
.type-rock      { background: rgba(140,120,80,0.2);   color: #968752; }
.type-bug       { background: rgba(130,180,50,0.2);   color: #82b432; }
.type-ghost     { background: rgba(70,60,120,0.2);    color: #7068b0; }
.type-steel     { background: rgba(140,160,180,0.2);  color: #8ca0b4; }
.type-flying    { background: rgba(120,150,255,0.2);  color: #7896ff; }
.type-normal    { background: rgba(160,160,160,0.2);  color: #a0a0a0; }

/* ─── Card Type Border Tints ────────────────────────────── */
.card-type-fire     { border-color: rgba(255,111,0,0.2); }
.card-type-water    { border-color: rgba(76,201,240,0.2); }
.card-type-grass    { border-color: rgba(56,217,87,0.2); }
.card-type-electric { border-color: rgba(255,212,56,0.2); }
.card-type-psychic  { border-color: rgba(255,59,92,0.2); }
.card-type-ice      { border-color: rgba(144,224,239,0.2); }
.card-type-dragon   { border-color: rgba(103,58,183,0.2); }
.card-type-dark     { border-color: rgba(80,80,100,0.3); }
.card-type-fairy    { border-color: rgba(255,133,198,0.2); }
.card-type-ghost    { border-color: rgba(70,60,120,0.3); }

/* ─── Empty State ───────────────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-muted);
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.6;
}
</style>