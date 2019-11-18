<template>
  <MdField class="aspect">
    <label>{{ aspect.localizedAspectName }}</label>

    <MdSelect v-if="aspect.aspectMode === selectionOnly"
              :required="aspect.aspectRequired">
      <MdOption v-for="val in values"
                :key="val"
                :value="val">
        {{ val }}
      </MdOption>
    </MdSelect>

    <div class="width100" v-else>
      <MdInput class="width100" :required="aspect.aspectRequired" :list="aspect.id"/>
      <datalist :id="aspect.id">
        <option v-for="val in values" :value="val" :key="val"></option>
      </datalist>
    </div>
  </MdField>
</template>

<script>
export default {
  name: 'Aspect',
  props: {
    aspect: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    selectionOnly: 'SELECTION_ONLY',
  }),
  computed: {
    values() {
      return this.aspect.aspect_values.map((obj) => obj.value);
    },
  },
};
</script>

<style scoped>
  .aspect {
    min-width: 25em;
    max-width: 100%;
  }

  .width100 {
    width: 100%;
  }
</style>
