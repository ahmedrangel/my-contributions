<script setup lang="ts">
const colorMode = useColorMode()
const { data: contributions } = await useFetch<Contributions>('/api/contributions')
if (!contributions.value) {
  throw createError('Could not load User activity')
}

const { user, prs, issues } = contributions.value
const userUrl = `https://github.com/${user.username}`

const items = [{ key: 'prs', label: 'Pull Requests' }, { key: 'iss', label: 'Issues' }]
const itemsIndex = ref('0')

useHead({
  link: [
    { rel: 'icon', href: '/favicon.png' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'alternate', type: 'application/rss+xml', title: `${user.name}'s recent contributions`, href: '/feed.xml' },
  ],
})
const url = useRequestURL()
useSeoMeta({
  title: `${user.name} is Contributing`,
  description: `Discover ${user.name} recent contributions on GitHub.`,
  ogTitle: `${user.name} is Contributing`,
  ogDescription: `Discover ${user.name} recent contributions on GitHub.`,
  twitterCard: 'summary_large_image',
  ogImage: `${url.origin}/og.png`,
  twitterImage: `${url.origin}/og.png`,
})
</script>

<template>
  <main>
    <UContainer class="p-4 sm:p-6 lg:p-8 lg:pt-10 max-w-3xl">
      <div class="flex flex-col items-center gap-2">
        <NuxtLink :to="userUrl" target="_blank">
          <UAvatar
            :src="user.avatar"
            :alt="user.name"
            size="3xl"
          />
        </NuxtLink>
        <h1 class="text-2xl sm:text-3xl text-center">
          <NuxtLink :to="userUrl" target="_blank">
            {{ user.name }}
          </NuxtLink>
          is <span class="animate-pulse">Contributing...</span>
        </h1>
        <p class="text-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <NuxtLink :to="userUrl" target="_blank">
            @{{ user.username }}'s recent contributions on GitHub.
          </NuxtLink>
        </p>
        <div class="flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300">
          <ClientOnly>
            <UButton
              :aria-label="`${user.name}'s GitHub profile`"
              :icon="colorMode.value === 'dark' ? 'i-ph-moon-stars-duotone' : 'i-ph-sun-duotone'"
              color="neutral"
              variant="link"
              @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
            />
            <template #fallback>
              <div class="w-8 h-8" />
            </template>
          </ClientOnly>
          <UButton
            :to="userUrl"
            external
            target="_blank"
            :aria-label="`${user.name}'s GitHub profile`"
            icon="i-ph-github-logo-duotone"
            color="neutral"
            variant="link"
          />
          <UButton
            to="/feed.xml"
            external
            target="_blank"
            aria-label="RSS Feed"
            icon="i-ph-rss-simple-duotone"
            color="neutral"
            variant="link"
          />
        </div>
        <USeparator class="sm:mt-6 mb-6 w-1/2 mx-auto animate-pulse" />
      </div>

      <UTabs v-model="itemsIndex" :items="items" color="neutral" />
      <div class="mt-6 overflow-hidden relative">
        <TransitionGroup name="fade">
          <div v-if="items[Number(itemsIndex)]?.key === 'prs'" class="flex flex-col gap-6 sm:gap-6">
            <ContributionPullRequest v-for="pr of prs" :key="pr.url" :data="pr" />
          </div>
          <div v-else class="flex flex-col gap-6 sm:gap-6">
            <ContributionIssues v-for="issue of issues" :key="issue.url" :data="issue" />
          </div>
        </TransitionGroup>
      </div>
    </UContainer>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
  width: 100%;
}
</style>
