<template>
  <div class="px-7 w-full mx-auto lg:w-10/12">
    <div class="mb-4">
      <a :href="'/'" class="btn btn-ghost">Back to Search</a>
    </div>

    <div class="px-7 text-center mt-[4rem]" v-if="error">
      Oops! Error encountered: {{ error.message }}
    </div>

    <div
      class="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8"
    >
      <div class="custom-card-image mb-6 md:mb-0">
        <div class="rounded-lg shadow-xl card image-full">
          <figure>
            <img :src="profile.avatar_url" alt="" />
          </figure>
          <div class="card-body justify-end">
            <h2 class="card-title mb-0">{{ profile.name }}</h2>
            <p class="flex-grow-0">{{ profile.login }}</p>
          </div>
        </div>
      </div>

      <div class="col-span-2">
        <div class="mb-6">
          <h1 class="text-3xl card-title">
            {{ profile.name }}
            <div class="ml-2 mr-1 badge badge-success">
              {{ profile.type }}
            </div>

            <div v-if="profile.hireable" class="mx-1 badge badge-info">
              Hireable
            </div>
          </h1>
          <p>{{ profile.bio }}</p>
          <div class="mt-4 card-actions">
            <a
              :href="profile.html_url"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Visit Github Profile
            </a>
          </div>
        </div>

        <div className="w-full rounded-lg shadow-md bg-base-100 stats">
          <div v-if="profile.location" class="stat">
            <div class="stat-title text-md">Location</div>
            <div class="text-lg stat-value">{{ profile.location }}</div>
          </div>

          <div v-if="profile.blog" className="stat">
            <div class="stat-title text-md">Website</div>
            <div class="text-lg stat-value">
              <a
                :href="`https://${profile.blog}`"
                target="_blank"
                rel="noreferrer"
              >
                {{ profile.blog }}
              </a>
            </div>
          </div>

          <div v-if="profile.twitter_username" className="stat">
            <div class="stat-title text-md">Twitter</div>
            <div class="text-lg stat-value">
              <a
                :href="`https://twitter.com/${profile.twitter_username}`"
                target="_blank"
                rel="noreferrer"
              >
                {{ profile.twitter_username }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
      <div class="grid grid-cols-1 md:grid-cols-3">
        <div class="stat">
          <div class="stat-figure text-secondary">
            <i class="fa-solid fa-users text-3xl md:text-5xl"></i>
          </div>
          <div class="stat-title pr-5">Followers</div>
          <div class="stat-value pr-5 text-3xl md:text-4xl">
            {{ profile.followers }}
          </div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <i class="fa-solid fa-user-group text-3xl md:text-5xl"></i>
          </div>
          <div class="stat-title pr-5">Following</div>
          <div class="stat-value pr-5 text-3xl md:text-4xl">
            {{ profile.following }}
          </div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <i class="fa-brands fa-codepen text-3xl md:text-5xl"></i>
          </div>
          <div class="stat-title pr-5">Public Repos</div>
          <div class="stat-value pr-5 text-3xl md:text-4xl">
            {{ profile.public_repos }}
          </div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <i class="fa-solid fa-store text-3xl md:text-5xl"></i>
          </div>
          <div class="stat-title pr-5">Public Gists</div>
          <div class="stat-value pr-5 text-3xl md:text-4xl">
            {{ profile.public_gists }}
          </div>
        </div>
      </div>
    </div>

    <RepoList />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import RepoList from "../components/RepoList.vue";
import githubApi from "../services/githubApi";

const githubToken = import.meta.env.VITE_VUE_APP_GITHUB_TOKEN;
const route = useRoute();
const login = ref(route.params.login);
const profile = ref({});
const error = ref(null);

const getUser = async () => {
  try {
    const response = await githubApi.getData(`/users/${login.value}`, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
    });
    // console.log(response.data);
    profile.value = response.data;
  } catch (err) {
    error.value = err;
    // console.log(err);
  }
};

onMounted(() => {
  getUser();
});
</script>
