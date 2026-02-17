<template>
  <ion-page class="home-page">
    <ion-header :translucent="true" class="home-header">
      <ion-toolbar class="home-toolbar">
        <ion-buttons slot="start">
          <ion-menu-button class="menu-btn"></ion-menu-button>
        </ion-buttons>
        <div class="toolbar-brand" slot="start">
          <span class="brand-dot"></span>
          <ion-title class="home-title">API Explorer</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="home-content">

      <!-- ── Hero ── -->
      <section class="hero">
        <div class="hero-bg-grid"></div>
        <div class="hero-glow glow-1"></div>
        <div class="hero-glow glow-2"></div>

        <div class="hero-inner">
          <div class="hero-badge">
            <span class="badge-pulse"></span>
            Proyecto académico · Vue 3 + Ionic
          </div>

          <h1 class="hero-heading">
            Explora APIs<br />
            <span class="hero-highlight">en tiempo real</span>
          </h1>

          <p class="hero-body">
            Una práctica que demuestra el consumo de APIs externas con
            <strong>Vue 3</strong>, <strong>Ionic</strong> y
            <strong>Pinia</strong> para la gestión del estado reactivo.
          </p>

          <div class="hero-chips">
            <span class="chip">Vue 3 Composition API</span>
            <span class="chip">Pinia Store</span>
            <span class="chip">REST APIs</span>
          </div>
        </div>
      </section>

      <!-- ── Features ── -->
      <section class="features">
        <p class="features-label">¿Qué puedes hacer aquí?</p>

        <div class="feature-grid">

          <div class="feature-card card-pokemon">
            <div class="fc-icon-wrap">
              <ion-icon :icon="eggOutline"></ion-icon>
            </div>
            <div class="fc-body">
              <h3>PokéDex</h3>
              <p>Busca tus Pokémon favoritos y guarda los resultados en el Store.</p>
            </div>
            <div class="fc-arrow">→</div>
          </div>

          <div class="feature-card card-chuck">
            <div class="fc-icon-wrap">
              <ion-icon :icon="chatbubbleOutline"></ion-icon>
            </div>
            <div class="fc-body">
              <h3>Chuck Norris</h3>
              <p>Chistes aleatorios con persistencia reactiva entre navegaciones.</p>
            </div>
            <div class="fc-arrow">→</div>
          </div>

          <div class="feature-card card-weather">
            <div class="fc-icon-wrap">
              <ion-icon :icon="cloudOutline"></ion-icon>
            </div>
            <div class="fc-body">
              <h3>Clima</h3>
              <p>Datos meteorológicos en tiempo real desde una API externa.</p>
            </div>
            <div class="fc-arrow">→</div>
          </div>

          <div class="feature-card card-pinia">
            <div class="fc-icon-wrap">
              <ion-icon :icon="codeWorkingOutline"></ion-icon>
            </div>
            <div class="fc-body">
              <h3>Estado con Pinia</h3>
              <p>Los datos persisten mientras navegas entre secciones.</p>
            </div>
            <div class="fc-arrow">→</div>
          </div>

        </div>
      </section>

      <!-- ── Stack ── -->
      <section class="stack-section">
        <p class="features-label">Stack tecnológico</p>
        <div class="stack-row">
          <div class="stack-pill">
            <span class="stack-dot dot-vue"></span>Vue 3
          </div>
          <div class="stack-pill">
            <span class="stack-dot dot-ionic"></span>Ionic 7
          </div>
          <div class="stack-pill">
            <span class="stack-dot dot-pinia"></span>Pinia
          </div>
          <div class="stack-pill">
            <span class="stack-dot dot-ts"></span>TypeScript
          </div>
        </div>
      </section>

      <!-- ── Footer hint ── -->
      <div class="footer-hint">
        <ion-icon :icon="menuOutline" class="hint-icon"></ion-icon>
        <span>Usa el menú lateral para empezar a explorar</span>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons, IonContent, IonHeader, IonMenuButton,
  IonPage, IonTitle, IonToolbar, IonIcon,
} from '@ionic/vue';
import {
  eggOutline, chatbubbleOutline,
  cloudOutline, codeWorkingOutline, menuOutline,
} from 'ionicons/icons';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&family=Syne:wght@700;800&display=swap');

/* ── Variables ─────────────────────────────────────────── */
:root {
  --bg:         #09090f;
  --surface:    #111118;
  --surface-2:  #17171f;
  --border:     rgba(255,255,255,0.07);
  --text:       #eeeef5;
  --muted:      #666680;
  --radius:     18px;
  --pill:       999px;
}

/* ── Page & Content ────────────────────────────────────── */
.home-page {
  --ion-background-color: #09090f;
  font-family: 'Nunito', sans-serif;
}
.home-content {
  --background: #09090f;
  --color: var(--text);
}

/* ── Header ────────────────────────────────────────────── */
.home-header { --background: transparent; --border-color: transparent; }
.home-toolbar {
  --background: rgba(9,9,15,0.8);
  --border-color: var(--border);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  --padding-top: 6px;
  --padding-bottom: 6px;
}
.toolbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 4px;
}
.brand-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #6ee7b7;
  box-shadow: 0 0 8px #6ee7b7;
  animation: dot-pulse 2.5s ease-in-out infinite;
}
@keyframes dot-pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50% { opacity:0.5; transform:scale(0.8); }
}
.home-title {
  font-family: 'Syne', sans-serif;
  font-size: 17px;
  color: var(--text);
  padding: 0;
  letter-spacing: 0.5px;
}
.menu-btn { --color: var(--muted); }

/* ── Hero ──────────────────────────────────────────────── */
.hero {
  position: relative;
  padding: 48px 24px 40px;
  overflow: hidden;
}
.hero-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%);
}
.hero-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(60px);
}
.glow-1 {
  width: 280px; height: 280px;
  top: -80px; left: -60px;
  background: rgba(110,231,183,0.08);
}
.glow-2 {
  width: 200px; height: 200px;
  top: 20px; right: -40px;
  background: rgba(139,92,246,0.08);
}
.hero-inner { position: relative; z-index: 1; }

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(110,231,183,0.08);
  border: 1px solid rgba(110,231,183,0.2);
  border-radius: var(--pill);
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 700;
  color: #6ee7b7;
  letter-spacing: 0.3px;
  margin-bottom: 24px;
}
.badge-pulse {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #6ee7b7;
  animation: dot-pulse 2s ease-in-out infinite;
}

.hero-heading {
  font-family: 'Syne', sans-serif;
  font-size: 38px;
  font-weight: 800;
  line-height: 1.1;
  color: var(--text);
  margin: 0 0 16px;
}
.hero-highlight {
  background: linear-gradient(90deg, #6ee7b7, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-body {
  font-size: 15px;
  color: var(--muted);
  line-height: 1.7;
  margin: 0 0 24px;
  max-width: 340px;
}
.hero-body strong { color: #a5b4fc; font-weight: 700; }

.hero-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--pill);
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
}

/* ── Features ──────────────────────────────────────────── */
.features {
  padding: 0 16px 8px;
}
.features-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--muted);
  margin: 0 0 14px 4px;
}

.feature-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  transition: transform 0.18s, border-color 0.18s;
  cursor: pointer;
  animation: card-in 0.4s ease both;
}
.feature-card:active { transform: scale(0.98); }

@keyframes card-in {
  from { opacity:0; transform:translateY(14px); }
  to   { opacity:1; transform:translateY(0); }
}
.feature-card:nth-child(1) { animation-delay: 0.05s; }
.feature-card:nth-child(2) { animation-delay: 0.10s; }
.feature-card:nth-child(3) { animation-delay: 0.15s; }
.feature-card:nth-child(4) { animation-delay: 0.20s; }

/* icon wraps per card */
.fc-icon-wrap {
  width: 44px; height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}
.card-pokemon .fc-icon-wrap  { background: rgba(248,113,113,0.12); color: #f87171; }
.card-chuck   .fc-icon-wrap  { background: rgba(251,191,36,0.12);  color: #fbbf24; }
.card-weather .fc-icon-wrap  { background: rgba(129,140,248,0.12); color: #818cf8; }
.card-pinia   .fc-icon-wrap  { background: rgba(110,231,183,0.12); color: #6ee7b7; }

.card-pokemon:hover { border-color: rgba(248,113,113,0.3); }
.card-chuck:hover   { border-color: rgba(251,191,36,0.3); }
.card-weather:hover { border-color: rgba(129,140,248,0.3); }
.card-pinia:hover   { border-color: rgba(110,231,183,0.3); }

.fc-body { flex: 1; }
.fc-body h3 {
  font-size: 15px;
  font-weight: 800;
  color: var(--text);
  margin: 0 0 3px;
}
.fc-body p {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
}
.fc-arrow {
  font-size: 18px;
  color: var(--muted);
  flex-shrink: 0;
}

/* ── Stack section ─────────────────────────────────────── */
.stack-section {
  padding: 24px 16px 8px;
}
.stack-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.stack-pill {
  display: flex;
  align-items: center;
  gap: 7px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--pill);
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
}
.stack-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot-vue   { background: #42d392; }
.dot-ionic { background: #4a87ff; }
.dot-pinia { background: #ffd438; }
.dot-ts    { background: #3178c6; }

/* ── Footer hint ───────────────────────────────────────── */
.footer-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 28px 20px 40px;
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
}
.hint-icon {
  font-size: 18px;
  opacity: 0.6;
}
</style>