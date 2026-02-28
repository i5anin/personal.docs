<script setup>
import catalog from './resources.json'
import ResourceTable from '../.vitepress/components/ResourceTable.vue'
</script>

<template>
  <ResourceTable :data="catalog" />
</template>
