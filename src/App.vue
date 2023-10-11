<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation />
    <RouterView
      v-if="isRouterAlive"
      v-slot="{ Component }"
    >
      <Transition
        name="page"
        mode="out-in"
      >
        <component :is="Component"></component>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { ref, provide, nextTick } from "vue";
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
const isRouterAlive = ref(true);
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};
provide("reload", reload);
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: 500ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
