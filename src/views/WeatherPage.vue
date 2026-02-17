<template>
  <ion-page class="weather-page">
    <ion-header :translucent="true" class="weather-header">
      <ion-toolbar class="weather-toolbar">
        <ion-buttons slot="start">
          <ion-menu-button class="menu-btn"></ion-menu-button>
        </ion-buttons>
        <div class="toolbar-brand" slot="start">
          <span class="brand-icon">☁️</span>
          <ion-title class="weather-title">SkyCast</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="weather-content">
      <!-- ── Background ── -->
      <div class="bg-gradient"></div>
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>

      <div class="weather-container">
        <!-- ── Main Info ── -->
        <div class="location-box">
          <h2 class="city-name">Quito</h2>
          <p class="country-name">Ecuador</p>
          <div class="date-badge">{{ new Date().toLocaleDateString() }}</div>
        </div>

        <!-- ── Weather Card ── -->
        <div class="glass-card main-card" v-if="weatherStore.currentWeather">
          <div class="temp-section">
            <span class="temp-value">{{ weatherStore.currentWeather.temperature }}°</span>
            <div class="weather-icon-wrap">
              <ion-icon :icon="cloudyNightOutline" class="main-icon"></ion-icon>
            </div>
          </div>
          <p class="weather-condition">Mayormente Nublado</p>
          
          <div class="details-grid">
            <div class="detail-item">
              <ion-icon :icon="speedometerOutline"></ion-icon>
              <span>{{ weatherStore.currentWeather.windspeed }} <small>km/h</small></span>
              <label>Viento</label>
            </div>
            <div class="detail-item">
              <ion-icon :icon="timeOutline"></ion-icon>
              <span>{{ weatherStore.currentWeather.time.split('T')[1] }}</span>
              <label>Hora</label>
            </div>
          </div>
        </div>

        <!-- ── Loading State ── -->
        <div v-else-if="weatherStore.loading" class="loading-container">
          <div class="spinner-box">
            <div class="pulse-ring"></div>
            <ion-icon :icon="cloudOutline" class="pulse-icon"></ion-icon>
          </div>
          <p>Consultando satélite...</p>
        </div>

        <!-- ── Action ── -->
        <div class="actions">
          <button 
            class="refresh-btn" 
            @click="weatherStore.fetchQuitoWeather()"
            :disabled="weatherStore.loading"
          >
            <ion-icon :icon="refreshOutline" :class="{ 'spin': weatherStore.loading }"></ion-icon>
            <span>Actualizar Pronóstico</span>
          </button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, 
  IonTitle, IonToolbar, IonIcon 
} from '@ionic/vue';
import { 
  cloudyNightOutline, speedometerOutline, 
  timeOutline, refreshOutline, cloudOutline 
} from 'ionicons/icons';
import { useWeatherStore } from '@/store/useWeatherStore';

const weatherStore = useWeatherStore();

// Cargar automáticamente al entrar si no hay datos
if (!weatherStore.currentWeather) {
  weatherStore.fetchQuitoWeather();
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');

/* ─── Variables ────────────────────────────────────────── */
:root {
  --bg-gradient: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --text-main: #ffffff;
  --text-alpha: rgba(255, 255, 255, 0.7);
}

.weather-page {
  font-family: 'Outfit', sans-serif;
}

/* ─── Header ───────────────────────────────────────────── */
.weather-header { --background: transparent; --border-color: transparent; }
.weather-toolbar {
  --background: transparent;
  --border-color: transparent;
  --color: #fff;
  padding-top: 10px;
}
.toolbar-brand { display: flex; align-items: center; gap: 8px; }
.brand-icon { font-size: 24px; }
.weather-title { font-weight: 800; letter-spacing: 0.5px; font-size: 20px; }
.menu-btn { --color: #fff; }

/* ─── Content & Background ─────────────────────────────── */
.weather-content {
  --background: #1e3c72; /* Fallback */
  position: relative;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: var(--bg-gradient);
  z-index: 0;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.6;
}
.shape-1 {
  width: 300px; height: 300px;
  background: #4facfe;
  top: -50px; left: -100px;
}
.shape-2 {
  width: 250px; height: 250px;
  background: #00f2fe;
  bottom: 10%; right: -50px;
}

.weather-container {
  position: relative;
  z-index: 1;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* ─── Typography ───────────────────────────────────────── */
.location-box {
  margin-bottom: 30px;
  text-align: center;
}
.city-name {
  font-size: 38px;
  font-weight: 800;
  margin: 0;
  color: #fff;
  letter-spacing: -0.5px;
}
.country-name {
  font-size: 16px;
  font-weight: 300;
  margin: 4px 0 12px;
  color: var(--text-alpha);
  text-transform: uppercase;
  letter-spacing: 2px;
}
.date-badge {
  display: inline-block;
  background: rgba(0,0,0,0.2);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: var(--text-alpha);
  backdrop-filter: blur(4px);
}

/* ─── Glass Card ───────────────────────────────────────── */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 30px;
  padding: 30px 20px;
  color: #fff;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  margin-bottom: 40px;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.temp-section {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
}
.temp-value {
  font-size: 96px;
  font-weight: 200;
  line-height: 1;
  letter-spacing: -4px;
}
.weather-icon-wrap {
  position: absolute;
  right: 10px;
  top: 0;
  font-size: 50px;
  color: #4facfe;
  filter: drop-shadow(0 0 10px rgba(79, 172, 254, 0.5));
}
.weather-condition {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-alpha);
  margin: 10px 0 30px;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.detail-item ion-icon { font-size: 24px; color: #4facfe; }
.detail-item span { font-size: 18px; font-weight: 600; }
.detail-item label { font-size: 12px; color: var(--text-alpha); text-transform: uppercase; }

/* ─── Loading ──────────────────────────────────────────── */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: var(--text-alpha);
}
.spinner-box {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.pulse-ring {
  position: absolute;
  width: 100%; height: 100%;
  border: 4px solid #4facfe;
  border-radius: 50%;
  animation: ringPulse 1.5s infinite;
}
.pulse-icon {
  font-size: 32px;
  color: #fff;
}
@keyframes ringPulse {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* ─── Action Button ────────────────────────────────────── */
.actions {
  text-align: center;
  margin-top: auto;
}
.refresh-btn {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  padding: 14px 28px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;
}
.refresh-btn:hover {
  background: rgba(255,255,255,0.3);
  transform: translateY(-2px);
}
.refresh-btn:active { transform: translateY(0); }

.spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>