<template>
  <div class="flex flex-col flex-1">
    <!-- Overview -->
    <div class="flex flex-col py-12 items-center">
      <AnimatedPlaceholder class="max-w-[300px] w-full mb-2" />
      <AnimatedPlaceholder class="max-w-[300px] w-full mb-5" />
      <AnimatedPlaceholder class="max-w-[300px] h-[80px] w-full mb-5" />
      <AnimatedPlaceholder class="max-w-[300px] w-full mb-5" />
      <AnimatedPlaceholder class="max-w-[300px] h-[60px] w-full" />
    </div>
    <!-- Hourly -->
    <div class="flex flex-col py-10 px-8 items-center">
      <AnimatedPlaceholder class="max-w-screen-md h-[150px] w-full mb-10" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>
