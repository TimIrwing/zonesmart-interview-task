<template>
  <ul class="aspectList">
    <li v-for="aspect in aspects" class="aspectList__item">
      <Aspect :aspect="aspect"/>
    </li>
  </ul>
</template>

<script>
import Aspect from '@/components/Aspect';

export default {
  name: 'AspectList',
  components: { Aspect },
  props: {
    aspects: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
  .aspectList {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .aspectList__item {
    padding: .5em 1em;
    box-sizing: border-box;
  }
</style>
