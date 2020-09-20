<template>
  <div>
    <div class="header">
      <span v-if="open" @click="open = !open">&#x25B2; Collapse</span>
      <span v-else @click="open = !open">&#x25BC; Expand</span>
    </div>
    <slot v-if="open"></slot>
  </div>
</template>

<script>
export default {
  name: 'CollapsibleSection',
  data() {
    return {
      open: true,
    };
  },
};
</script>

<style scoped>
  .header {
    background: grey;
    padding: 3px;
    cursor: pointer;
  }
</style>
