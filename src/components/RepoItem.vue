<template>
  <p v-if="isLoadingItem"><Spinner /></p>
  <div class="px-7 text-center mt-[4rem]" v-if="error">
    Oops! Error encountered: {{ error.message }}
  </div>
  <div
    v-for="{
      id,
      html_url,
      name,
      description,
      watchers_count,
      stargazers_count,
      open_issues,
      forks,
    } in repo"
    :key="id"
  >
    <div className="mb-2 rounded-md card bg-gray-800 hover:bg-gray-900">
      <div className="card-body">
        <h3 className="mb-2 text-xl font-semibold">
          <a :href="html_url">
            <i class="fa-sharp fa-solid fa-link inline mr-1"></i> {{ name }}
          </a>
        </h3>
        <p className="mb-3">{{ description }}</p>
        <div>
          <div className="mr-2 badge badge-info badge-lg">
            <i class="fa-sharp fa-solid fa-eye mr-2"></i>
            {{ watchers_count }}
          </div>
          <div className="mr-2 badge badge-success badge-lg">
            <i class="fa-solid fa-star mr-2"></i> {{ stargazers_count }}
          </div>
          <div className="mr-2 badge badge-error badge-lg">
            <i class="fa-solid fa-info mr-2"></i> {{ open_issues }}
          </div>
          <div className="mr-2 badge badge-warning badge-lg">
            <i class="fa-solid fa-utensils mr-2"></i> {{ forks }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import githubApi from "../services/githubApi";
import Spinner from "./Spinner.vue";

const githubToken = import.meta.env.VITE_VUE_APP_GITHUB_TOKEN;
const route = useRoute();
const login = ref(route.params.login);
const repo = ref([]);
const error = ref(null);
const isLoadingItem = ref(false);

const getRepo = async () => {
  try {
    isLoadingItem.value = true;
    const response = await githubApi.getData(`/users/${login.value}/repos`, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
    });
    isLoadingItem.value = false;
    repo.value = response.data;
  } catch (err) {
    console.log(err);
    isLoadingItem.value = false;
    error.value = err;
  }
};
onMounted(() => {
  getRepo();
});
</script>
