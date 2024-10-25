<script setup lang="ts">
defineProps<{
  data: Contributions["issues"][number];
}>();

function mapIcons (state: Issues["state"]) {
  switch (state) {
    case "open": return "i-octicon-issue-opened-24";
    case "completed": return "i-octicon-issue-closed-24";
    case "not-planned": return "i-octicon-skip-24";
    default: return "i-octicon-issue-opened-24";
  }
}
</script>

<template>
  <ContributionContainer :data="data">
    <UIcon
      :name="mapIcons(data.state)"
      :class="{
        'text-green-500 dark:text-green-400': data.state === 'open',
        'text-gray-500 dark:text-gray-400': data.state === 'not-planned',
        'text-purple-500 dark:text-purple-400': data.state === 'completed',
      }"
      class="size-4 sm:size-5 shrink-0"
    />
  </ContributionContainer>
</template>
