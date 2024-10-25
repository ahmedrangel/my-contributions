<script setup lang="ts">
defineProps<{
  data: Contributions["prs"][number];
}>();

function mapIcons (state: PullRequest["state"]) {
  switch (state) {
    case "open": return "i-ph-git-pull-request-duotone";
    case "merged": return "i-ph-git-merge-duotone";
    case "draft": return "i-hugeicons-git-pull-request-draft";
    case "closed": return "i-hugeicons-git-pull-request-closed";
    default: return "i-ph-git-pull-request-duotone";
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
