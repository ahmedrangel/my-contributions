<script setup lang="ts">
defineProps<{
  data: Contributions['issues' | 'prs'][number]
}>()

function formatStars(stars: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(stars)
}
</script>

<template>
  <div class="flex items-center gap-2 sm:gap-4">
    <NuxtLink
      :to="`https://github.com/${data.repo}`"
      target="_blank"
      relative
      :class="['size-10 sm:size-12 shrink-0 border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm', data.type === 'Organization' ? 'rounded-lg' : 'rounded-full']"
    >
      <img :src="`https://github.com/${data.repo.split('/')[0]}.png`" :alt="data.repo" class="size-full">
    </NuxtLink>

    <div class="flex-1 flex justify-between gap-2 lg:gap-4 min-w-0">
      <div class="flex flex-col min-w-0 gap-0.5 sm:gap-1">
        <NuxtLink :to="data.url" target="_blank" class="text-sm sm:text-base flex items-center gap-0.5 sm:gap-1 hover:underline text-gray-900 dark:text-white">
          <slot />
          <span class="truncate font-semibold">{{ data.title }}</span>
        </NuxtLink>

        <div class="flex gap-2 items-bottom">
          <NuxtLink :to="`https://github.com/${data.repo}`" target="_blank" class="text-sm sm:text-base inline-flex gap-1 hover:text-black dark:hover:text-white truncate">
            <span class="opacity-75">{{ data.repo.split('/')[0] }}</span>
            <span class="opacity-50">/</span>
            <span class="truncate">{{ data.repo.split('/')[1] }}</span>
          </NuxtLink>
          <NuxtLink :to="`https://github.com/${data.repo}`" target="_blank" class="items-center hidden sm:inline-flex gap-0.5 hover:text-black dark:hover:text-white truncate">
            <UIcon name="i-octicon-star-24" class="size-3 shrink-0" />
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatStars(data.stars) }}</span>
          </NuxtLink>
          <NuxtLink :to="data.url" target="_blank" class="items-center hidden sm:inline-flex gap-0.5 hover:text-black dark:hover:text-white truncate">
            <UIcon name="i-octicon-comment-24" class="size-3 shrink-0" />
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ data.comments }}</span>
          </NuxtLink>
        </div>
      </div>

      <div class="flex flex-col justify-between shrink-0 text-right">
        <NuxtLink :to="data.url" target="_blank" class="hover:underline text-xs sm:text-sm">
          #{{ data.number }}
        </NuxtLink>

        <time :datatime="data.created_at" class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{{ useTimeAgo(new Date(data.created_at)) }}</time>
      </div>
    </div>
  </div>
</template>
