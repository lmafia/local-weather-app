<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'homeView' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-3xl"></i>
          <p class="text-3xl">The Local Weather</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-300 cursor-pointer"
          @click="toggleModal"
        />
        <i
          v-if="route.query.preview"
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-300 cursor-pointer"
          @click="addCity"
        />
        <i
          class="fa-solid fa-key text-xl hover:text-weather-secondary duration-300 cursor-pointer"
          @click="toggleKeyModal"
        />
      </div>
      <BaseModal
        :modal-active="modalActive"
        @close-modal="toggleModal"
      >
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </BaseModal>

      <BaseModal
        :modal-active="keyModalActive"
        @close-modal="toggleKeyModal"
      >
        <div class="flex flex-col px-2">
          <p class="text-xl text-black">API Key</p>
          <input
            v-model="apiKey"
            @input="addApiKey"
            type="text"
            placeholder="Please fill in your api key..."
            class="py-2 px-5 w-full border-b focus:border-weather-secondary focus:outline-none focus:shadow-sm"
          />
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { ref } from "vue";
import router from "../router";

const route = useRoute();

const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const keyModalActive = ref(false);
const toggleKeyModal = () => {
  keyModalActive.value = !keyModalActive.value;
};

const saveCities = ref([]);
// add City
const addCity = () => {
  if (localStorage.getItem("saveCities")) {
    saveCities.value = JSON.parse(localStorage.getItem("saveCities"));
  }

  // LocalStroge save object
  const location = {
    code: route.query.code,
    province: route.params.province,
    city: route.params.city,
  };
  // 通过  code
  const existingItem = saveCities.value.find(
    (item) => item.code === location.code
  );
  if (!existingItem) {
    saveCities.value.push(location);
  }

  localStorage.setItem("saveCities", JSON.stringify(saveCities.value));
  let query = Object.assign({}, route.query);
  delete query.preview;
  router.replace({ query });
};

// add Key
const apiKey = ref(localStorage.getItem("apiKey"));

const addApiKey = () => {
  localStorage.setItem("apiKey", apiKey.value);
};

</script>
