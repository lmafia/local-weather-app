<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <CitySkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
import CitySkeleton from "../components/CityViewSkeleton.vue";
</script>
