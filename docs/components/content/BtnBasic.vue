<template>
  <a
    v-bind="$attrs"
    class="px-4 py-2 text-sm hover:no-underline font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    <slot />
  </a>
</template>
