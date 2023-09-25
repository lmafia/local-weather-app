<template>
  <div
    class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1 gap-2">
      <h2 class="text-2xl">
        {{ city.city }}
      </h2>
      <p class="text-md">
        {{ city.province }}
      </p>
    </div>
    <div class="flex flex-col gap-1 self-end">
      <p class="text-3xl self-center">
        {{ Math.round(city.liveWeather.temperature) }}&#8451;
      </p>
      <div class="flex">
        <WeatherIcon
          :weatherZh="city.liveWeather.weather"
          :size="2"
          class="flex"
        />
        <p class="ml-3">{{ city.liveWeather.weather }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import WeatherIcon from "./WeatherIcon.vue";

defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>
