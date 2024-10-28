<script setup lang="ts">
defineProps<{
  data: Contributions['prs'][number]
}>()

function mapIcons(state: PullRequest['state']) {
  switch (state) {
    case 'open': return 'i-octicon-git-pull-request-24'
    case 'merged': return 'i-octicon-git-merge-24'
    case 'draft': return 'i-octicon-git-pull-request-draft-24'
    case 'closed': return 'i-octicon-git-pull-request-closed-24'
    default: return 'i-octicon-git-pull-request-24'
  }
}
</script>

<template>
  <ContributionContainer :data="data">
    <UIcon
      :name="mapIcons(data.state)"
      :class="{
        'text-green-500 dark:text-green-400': data.state === 'open',
        'text-gray-500 dark:text-gray-400': data.state === 'draft',
        'text-purple-500 dark:text-purple-400': data.state === 'merged',
        'text-red-500 dark:text-red-400': data.state === 'closed',
      }"
      class="size-4 sm:size-5 shrink-0"
    />
  </ContributionContainer>
</template>
