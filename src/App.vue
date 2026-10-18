<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <nav class="nav-bar">
      <div class="nav-container">
        <RouterLink to="/" class="nav-brand">🕵️ Murder Mystery 2026</RouterLink>
        <div class="nav-links">
          <RouterLink to="/" class="nav-link" active-class="active">Home</RouterLink>
          <RouterLink to="/clues" class="nav-link" active-class="active">Clue Board</RouterLink>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-bar {
  background: #0f172a;
  color: #f8fafc;
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-weight: 700;
  font-size: 1.15rem;
  color: #f8fafc;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.25rem;
}

.nav-link {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: color 0.15s ease;
}

.nav-link:hover {
  color: #f8fafc;
}

.nav-link.active {
  color: #38bdf8;
}

.main-content {
  flex: 1;
}
</style>
