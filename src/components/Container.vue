<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Container',
};
</script>

<style scoped>
  .container {
    width: 100%;
    min-height: 100%;
    padding: 2em;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(120deg, #4b6cb7, #182848);
  }

</style>
