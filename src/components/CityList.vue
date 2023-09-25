<template>
  <div
    v-for="city in savedCities"
    :key="city.id"
  >
    <CityCard
      :city="city"
      @click="goToCityView(city)"
    />
  </div>
  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";

const savedCities = ref([]);
const amapaApiKey = ref(null);
const getCities = async () => {
  if (localStorage.getItem("saveCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("saveCities"));

    savedCities.value = Array.from(
      new Set(
        savedCities.value
          .filter((item) => item.code != null)
          .map((item) => item.code)
      )
    ).map((code) => savedCities.value.find((item) => item.code === code));

    const requests = [];
    savedCities.value.forEach((city) => {
      console.log(city.code);
      requests.push(
        axios.get(
          `https://restapi.amap.com/v3/weather/weatherInfo?extensions=base&key=${amapaApiKey}&city=${city.code}`
        )
      );
    });

    const weatherData = await Promise.all(requests);

    //  Flicker Delay
    await new Promise((res) => setTimeout(res, 500));

    weatherData.forEach((value, index) => {
      savedCities.value[index].liveWeather = value.data.lives[0];
    });
  }
};
await getCities();

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { city: city.city, province: city.province },
    query: { code: city.code },
  });
};
</script>
