<template>
  <main class="min-h-screen bg-[#2a303c]">
    <nav class="flex text-white justify-between py-5 px-7 bg-[#191d24]">
      <RouterLink class="md:text-xl" to="/"
        ><i class="fa-brands fa-github"></i> Github Finder</RouterLink
      >
      <RouterLink class="md:text-xl" to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </main>
</template>

<script setup></script>
