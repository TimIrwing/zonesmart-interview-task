<template>
  <MdList class="categoryList">
    <MdListItem v-for="obj in col"
                :key="obj.name"
                :class="{ notLeaf: !obj.is_leaf, selected: obj.name === selected }"
                @click="select(obj)">
      {{obj.name}}
    </MdListItem>
  </MdList>
</template>

<script>
export default {
  name: 'CategoryCol',
  props: {
    col: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    selected: null,
  }),
  methods: {
    select(obj) {
      this.selected = obj.name;
      this.$emit('click', obj);
    },
  },
};
</script>

<style scoped>
  .categoryList {
    width: 25em;
    max-height: 75vh;
    overflow-y: auto;
  }

  .selected {
    background-color: rgba(0, 0, 20, .10);
  }

  .notLeaf::after {
    content: '>';
    position: absolute;
    top: 50%; right: .5em;
    font-size: 1.5em;
    transform: translateY(-50%);
  }
</style>
