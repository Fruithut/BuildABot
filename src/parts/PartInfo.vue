<template>
  <div>
    <h1>{{ part.title }}</h1>
    <div>{{ part.description }}</div>
  </div>
</template>

<script>
import getPartsMixin from './get-parts-mixing';

export default {
  name: 'PartInfo',
  mixins: [getPartsMixin],
  props: {
    partType: { type: String },
    id: {
      type: [Number, String],
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },
  },
  computed: {
    part() {
      const { partType, id } = this;
      const part = this.parts[partType].find((p) => p.id === +id);

      return {
        title: part.title,
        description: part.description,
      };
    },
  },
};
</script>

<style scoped>

</style>
