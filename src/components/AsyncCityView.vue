<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="p-4 bg-weather-secondary w-full text-white text-center"
    >
      <p>
        Your are currently previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>

    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-2xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-5">
        {{
          new Date(weatherData.live.reporttime).toLocaleDateString("zh-cn", {
            weekday: "short",
          })
        }}
        {{
          new Date(weatherData.live.reporttime).toLocaleDateString("zh-cn", {
            month: "short",
            day: "2-digit",
          })
        }}
        {{
          new Date(weatherData.live.reporttime).toLocaleTimeString("zh-cn", {
            timeStyle: "short",
          })
        }}
      </p>
      <div class="flex items-end mb-4">
        <p class="text-5xl">{{ weatherData.live.temperature }}&#8451;</p>
        <p class="mx-2">{{ weatherData.live.humidity }}&#37;</p>
      </div>
      <p class="text-sm">{{ weatherData.live.weather }}</p>
      <WeatherIcon
        :weatherZh="weatherData.live.weather"
        :size="5"
        class="mt-4"
      />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!--3 Day Forecast-->
    <div class="max-w-screen-md w-full py-10">
      <div class="mx-8 text-white">
        <h2 class="mb-4">3 Day Forecast</h2>
        <div class="flex gap-10 overflow-x-hidden hover:overflow-x-scroll">
          <div
            v-for="forecast in weatherData.forecasts"
            :key="forecast.date"
            class="flex flex-row"
          >
            <div class="flex flex-col items-center gap-4">
              <p class="whitespace-nowrap text-md">
                {{
                  new Date(forecast.date).toLocaleDateString("zh-cn", {
                    month: "short",
                    day: "2-digit",
                  })
                }}
                白天
              </p>
              <p class="text-sm">{{ forecast.dayweather }}</p>
              <CityIcon
                :weatherZh="forecast.dayweather"
                :size="3"
              />
              <p class="text-xl">{{ forecast.daytemp }}&deg;</p>
            </div>
            <div class="mx-4 flex flex-col items-center gap-4">
              <p class="whitespace-nowrap text-md">
                {{
                  new Date(forecast.date).toLocaleDateString("zh-cn", {
                    month: "short",
                    day: "2-digit",
                  })
                }}
                夜晚
              </p>
              <p class="text-sm">{{ forecast.nightweather }}</p>
              <WeatherIcon
                :weatherZh="forecast.nightweather"
                :size="3"
              />
              <p class="text-xl">{{ forecast.nighttemp }}&deg;</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!route.query.preview"
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-400"
      @click="removeCity(route.query.code)"
    >
      <i class="fa-solid fa-trash" />
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import CityIcon from "./WeatherIcon.vue";
import WeatherIcon from "./WeatherIcon.vue";

const queryError = ref(null);
const weatherData = ref({
  live: null,
  forecasts: null,
});
const route = useRoute();
// 高德天气 api key
const amapaApiKey = ref(localStorage.getItem("apiKey"));

const queryLiveWeather = async () => {
  try {
    const result = await axios.get(
      `https://restapi.amap.com/v3/weather/weatherInfo?extensions=base&key=${amapaApiKey.value}&city=${route.query.code}`
    );
    if (result.data.status == 1) {
      weatherData.value.live = result.data.lives[0];
      console.log(result);
    }
  } catch (err) {
    queryError.value = true;
    console.error(err);
  }
};

const queryForeCastWeather = async () => {
  try {
    const result = await axios.get(
      `https://restapi.amap.com/v3/weather/weatherInfo?extensions=all&key=${amapaApiKey.value}&city=${route.query.code}`
    );
    if (result.data.status == 1) {
      weatherData.value.forecasts = result.data.forecasts[0].casts;
      console.log(result.data.forecasts[0].casts);
    }
  } catch (err) {
    queryError.value = true;
    console.error(err);
  }
};
await queryLiveWeather(), queryForeCastWeather();

//  Flicker Delay
await new Promise((res) => setTimeout(res, 500));

const router = useRouter();

const removeCity = (code) => {
  if (localStorage.getItem("saveCities")) {
    const cities = JSON.parse(localStorage.getItem("saveCities"));
    const updtedCities = cities.filter((item) => item.code !== code);
    localStorage.setItem("saveCities", JSON.stringify(updtedCities));
  }
  router.push({
    name: "homeView",
  });
};
</script>
