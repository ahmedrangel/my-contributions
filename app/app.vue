<script setup>
useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <UApp>
    <NuxtPage />
    <p class="text-center py-6 pb-10 text-sm">
      <UButton
        to="https://github.com/ahmedrangel/my-contributions"
        target="_blank"
        color="black"
        size="xs"
        icon="i-simple-icons-github"
      >
        Create my own contributions page
      </UButton>
    </p>
    <ScrollToTop />
  </UApp>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";
</style>
