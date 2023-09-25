<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        v-model="searchQuery"
        @input="getSearchResults"
        type="text"
        placeholder="Search for a city"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-sm"
      />

      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="amapQueryResults"
      >
        <p v-if="queryError">Sorry, something went wrong, please try agagin.</p>
        <p v-if="!queryError && amapQueryResults.length === 0">
          No result match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="result in amapQueryResults"
            :key="result.id"
            class="py-2 cursor-pointer"
            @click="previewCity(result)"
          >
            {{ result.formatted_address }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CityCardSkeleton from "../components/CityCardSkeleton.vue";

const searchQuery = ref("");
const queryTimeout = ref(null);
const amapQueryResults = ref(null);
const queryError = ref(null);
const amapaApiKey = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://restapi.amap.com/v3/geocode/geo?key=${amapaApiKey}&address=${searchQuery.value}`
        );
        if (result.data.status == 0) {
          amapQueryResults.value = [];
        } else {
          amapQueryResults.value = result.data.geocodes;
        }
      } catch (err) {
        queryError.value = true;
        console.error(err);
      }
      return;
    }
    amapQueryResults.value = null;
  }, 1000);
};

const router = useRouter();

const previewCity = (queryResult) => {
  let find = false;
  if (localStorage.getItem("saveCities")) {
    const cities = JSON.parse(localStorage.getItem("saveCities"));
    find = cities.find((element) => element.code == queryResult.adcode);
  }

  console.log(queryResult);
  const province = queryResult.province;
  const city = queryResult.city;
  const adcode = queryResult.adcode;
  router.push({
    name: "cityView",
    params: { province: province, city: city },
    query: {
      code: adcode,
      ...(find ? {} : { preview: true }),
    },
  });
};
</script>
