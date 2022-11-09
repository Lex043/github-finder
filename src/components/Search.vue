<template>
  <section
    class="px-7 grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8"
  >
    <div>
      <form class="mt-16" action="" @submit.prevent="fetchRepo">
        <div class="form-control">
          <div class="relative">
            <input
              class="w-full pr-40 bg-gray-200 input input-lg text-black"
              type="text"
              placeholder="Search"
              v-model.trim="searchResult"
            />
            <button
              :disabled="searchResult === ''"
              class="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
            >
              Go
            </button>
          </div>
        </div>
      </form>
    </div>
    <div v-if="apiResult.length > 0">
      <button @click="clear" className="mt-16 btn btn-ghost btn-lg">
        Clear
      </button>
    </div>
  </section>

  <p v-if="isLoading"><Spinner /></p>

  <div class="px-7 text-center mt-[4rem]" v-if="error">
    Oops! Error encountered: {{ error.message }}
  </div>

  <section
    v-else-if="apiResult"
    class="px-7 grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
  >
    <div
      v-for="{ id, login, avatar_url } in apiResult"
      :key="id"
      class="card shadow-md compact side bg-base-100"
    >
      <div class="flex-row items-center space-x-4 card-body">
        <div>
          <div class="avatar">
            <div class="rounded-full shadow w-14 h-14">
              <img :src="avatar_url" alt="" />
            </div>
          </div>
        </div>
        <div>
          <h2 class="card-title">{{ login }}</h2>
          <a :href="`/user/${login}`" class="text-base-content text-opacity-40"
            >Visit profile</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import githubApi from "../services/githubApi";
import Spinner from "../components/Spinner.vue";
const githubToken = import.meta.env.VITE_VUE_APP_GITHUB_TOKEN;

const searchResult = ref("");
const apiResult = ref({});
const isLoading = ref(false);
const error = ref(null);

const fetchRepo = async () => {
  try {
    isLoading.value = true;
    apiResult.value = "";
    const response = await githubApi.getData(
      `/search/users?q=${searchResult.value}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      }
    );
    isLoading.value = false;
    apiResult.value = response.data.items;
    searchResult.value = "";
  } catch (err) {
    isLoading.value = false;
    error.value = err;
  }
};

const clear = () => {
  apiResult.value = "";
};
</script>
