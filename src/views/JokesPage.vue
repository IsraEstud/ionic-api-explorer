<template>
  <ion-page class="jokes-page">
    <ion-header :translucent="true" class="jokes-header">
      <ion-toolbar class="jokes-toolbar">
        <ion-buttons slot="start">
          <ion-menu-button class="menu-btn"></ion-menu-button>
        </ion-buttons>
        <div class="toolbar-brand" slot="start">
          <span class="brand-icon">⚡</span>
          <ion-title class="jokes-title">NorrisFacts</ion-title>
        </div>
        <div slot="end" class="header-badge">
          <span class="badge-count">{{ jokeStore.jokes.length }}</span>
          <span class="badge-label">Facts</span>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="jokes-content">
      <!-- ── Hero Section ── -->
      <div class="search-hero">
        <div class="hero-glow"></div>
        <div class="hero-text">
          <h1 class="hero-title">Verdades de<br /><em>Chuck Norris</em></h1>
          <p class="hero-sub">Advertencia: Estos hechos pueden ser demasiado intensos.</p>
        </div>

        <div class="action-wrapper">
          <button 
            class="punch-btn" 
            @click="getJoke"
            :disabled="jokeStore.loading"
          >
            <span v-if="!jokeStore.loading" class="btn-content">
              <span class="fist-icon">👊</span>
              GOLPEAR PARA UN HECHO
            </span>
            <span v-else class="btn-spinner"></span>
          </button>
          
          <p v-if="jokeStore.error" class="error-msg">{{ jokeStore.error }}</p>
        </div>
      </div>

      <!-- ── List / Cards Section ── -->
      <div class="list-section">
        <div class="section-header" v-if="jokeStore.jokes.length > 0">
          <h2 class="section-title">Historial de Impactos</h2>
          <button class="clear-btn" @click="jokeStore.clearJokes">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
            </svg>
            Limpiar
          </button>
        </div>

        <transition-group name="list" tag="div" class="jokes-grid">
          <div 
            v-for="(j, index) in jokeStore.jokes" 
            :key="j.id" 
            class="joke-card"
            :style="{ '--delay': `${index * 50}ms` }"
          >
            <div class="card-ribbon">FACT #{{ j.id.substring(0,4).toUpperCase() }}</div>
            <div class="quote-icon">“</div>
            <p class="joke-text">{{ j.joke }}</p>
            <div class="card-footer">
              <span class="verified-badge">✓ Verificado</span>
            </div>
          </div>
        </transition-group>

        <!-- ── Empty State ── -->
        <div v-if="jokeStore.jokes.length === 0 && !jokeStore.loading" class="empty-state">
          <div class="empty-icon">🤠</div>
          <p>El silencio es oro,<br>pero Chuck Norris prefiere el ruido.</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, 
  IonTitle, IonToolbar 
} from '@ionic/vue';
import { useJokeStore } from '@/store/useJokeStore';

const jokeStore = useJokeStore();

const getJoke = () => {
  jokeStore.fetchRandomJoke();
};
</script>

<style scoped>
/* ─── Fonts ───────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Russo+One&family=Open+Sans:wght@400;600;700&display=swap');

/* ─── Variables ────────────────────────────────────────── */
:root {
  --bg-dark:      #121212;
  --bg-card:      #1e1e24;
  --accent-orange:#ff9500;
  --accent-red:   #d32f2f;
  --text-main:    #ffffff;
  --text-muted:   #9e9e9e;
  --radius:       16px;
}

/* ─── Page ─────────────────────────────────────────────── */
.jokes-page {
  --ion-background-color: var(--bg-dark);
  font-family: 'Open Sans', sans-serif;
}

.jokes-content {
  --background: var(--bg-dark);
  --color: var(--text-main);
}

/* ─── Header ───────────────────────────────────────────── */
.jokes-header {
  --background: transparent;
  --border-color: transparent;
}
.jokes-toolbar {
  --background: rgba(18, 18, 18, 0.85);
  --border-color: rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  --padding-top: 8px;
  --padding-bottom: 8px;
}
.toolbar-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand-icon {
  font-size: 20px;
  animation: pulse 2s infinite;
}
.jokes-title {
  font-family: 'Russo One', sans-serif;
  font-size: 18px;
  letter-spacing: 1px;
  color: var(--text-main);
  text-transform: uppercase;
}
.menu-btn { --color: var(--text-muted); }

.header-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 16px;
  line-height: 1.1;
}
.badge-count {
  font-family: 'Russo One', sans-serif;
  font-size: 18px;
  color: var(--accent-orange);
}
.badge-label {
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 700;
}

/* ─── Hero ─────────────────────────────────────────────── */
.search-hero {
  position: relative;
  padding: 40px 20px 30px;
  text-align: center;
  overflow: hidden;
}
.hero-glow {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 400px;
  background: radial-gradient(circle, rgba(255,149,0,0.15) 0%, transparent 70%);
  pointer-events: none;
}
.hero-title {
  font-family: 'Russo One', sans-serif;
  font-size: 36px;
  line-height: 1.1;
  margin: 0 0 10px;
  text-transform: uppercase;
  color: var(--text-main);
}
.hero-title em {
  font-style: normal;
  color: var(--accent-orange);
  text-shadow: 0 0 20px rgba(255,149,0,0.4);
}
.hero-sub {
  color: var(--text-muted);
  font-size: 14px;
  margin: 0 0 30px;
}

/* ─── Action Button ────────────────────────────────────── */
.action-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.punch-btn {
  background: linear-gradient(135deg, #ff9500, #ff5e3a);
  border: none;
  padding: 16px 32px;
  border-radius: 999px;
  color: #fff;
  font-family: 'Russo One', sans-serif;
  font-size: 16px;
  letter-spacing: 1px;
  box-shadow: 0 8px 20px rgba(255,149,0,0.4);
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 240px;
}
.punch-btn:active {
  transform: scale(0.95);
  box-shadow: 0 4px 10px rgba(255,149,0,0.3);
}
.punch-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.fist-icon { margin-right: 8px; font-size: 20px; }
.btn-spinner {
  width: 20px; height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
.error-msg { color: var(--accent-red); font-size: 13px; font-weight: 600; }

/* ─── Styles Section ───────────────────────────────────── */
.list-section {
  padding: 0 20px 40px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.section-title {
  font-family: 'Russo One', sans-serif;
  font-size: 18px;
  color: var(--text-main);
  margin: 0;
}
.clear-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 700;
  cursor: pointer;
}
.clear-btn svg { width: 14px; height: 14px; }
.clear-btn:hover { color: var(--accent-red); border-color: rgba(211,47,47,0.4); }

/* ─── Cards ────────────────────────────────────────────── */
.jokes-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.joke-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 24px;
  position: relative;
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  /* Animation */
}
.card-ribbon {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 10px;
  font-weight: 900;
  color: var(--accent-orange);
  opacity: 0.6;
  letter-spacing: 0.5px;
}
.quote-icon {
  font-family: serif;
  font-size: 60px;
  line-height: 1;
  color: rgba(255,255,255,0.05);
  position: absolute;
  top: 10px;
  left: 14px;
  pointer-events: none;
}
.joke-text {
  font-size: 16px;
  line-height: 1.6;
  color: #e0e0e0;
  margin: 0 0 16px;
  font-weight: 500;
  position: relative;
  z-index: 1;
}
.card-footer {
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 12px;
  display: flex;
  justify-content: flex-end;
}
.verified-badge {
  font-size: 11px;
  color: #4caf50;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(76,175,80,0.1);
  padding: 4px 10px;
  border-radius: 8px;
}

/* ─── Empty State ──────────────────────────────────────── */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}
.empty-icon { font-size: 64px; margin-bottom: 20px; opacity: 0.5; }
.empty-state p { font-size: 15px; line-height: 1.6; }

/* ─── Animations ───────────────────────────────────────── */
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>