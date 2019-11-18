<template>
  <div class="loading-container">
    <div class="loading">
      <md-progress-spinner :md-diameter="100" :md-stroke="5" md-mode="indeterminate"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style scoped>
  .loading-container {
    position: fixed;
    top: 0; right: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .loading {
    background-color: #fefefe;
    display: flex;
    padding: .5em;
    border-radius: 100%;
  }
</style>
