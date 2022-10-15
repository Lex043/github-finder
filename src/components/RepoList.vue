<template>
  <div className="rounded-lg shadow-lg card bg-base-100">
    <div className="card-body">
      <h2 className="text-3xl my-4 font-bold card-title">
        Latest Respositories
      </h2>

      <RepoItem />
    </div>
  </div>
</template>

<script setup>
import RepoItem from "../components/RepoItem.vue";
</script>
