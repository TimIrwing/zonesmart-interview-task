<template>
  <Container>
    <form class="form">
      <MdCard class="card">
        <MdCardContent>
          <MdField>
            <label>Select channel</label>
            <MdSelect v-model="channelID"
                      required
                      @input="showCategories({channel_id: channelID, level: 1})">
              <MdOption v-for="channel in channels"
                        :key="channel.channel"
                        :value="channel.channel">
                {{ channel.name }}
              </MdOption>
            </MdSelect>
          </MdField>

          <ul class="categoriesContainer">
            <li v-for="(col, index) in categories" :key="index">
              <CategoryCol :col="col" @click="colClick"/>
            </li>
          </ul>

          <AspectList v-if="aspects" :aspects="aspects"/>
        </MdCardContent>
      </MdCard>
    </form>

    <transition name="fade">
      <Loading v-if="loading"/>
    </transition>
  </Container>
</template>

<script>
import Container from '@/components/Container';
import Loading from '@/components/Loading';
import CategoryCol from '@/components/CategoryCol';
import AspectList from '@/components/AspectList';
import { getCategoryList, getChannels, getAspects } from '@/APIService';

export default {
  name: 'Main',
  components: {
    CategoryCol, Loading, Container, AspectList,
  },
  data: () => ({
    channels: null,
    loading: null,
    channelID: null,
    categories: [],
    aspects: null,
  }),
  async created() {
    this.loading = true;

    try {
      this.channels = await getChannels();
    } catch (e) {
      window.location.href = '/';
    }

    this.loading = false;
  },
  methods: {
    async showCategories(options) {
      this.loading = true;

      this.removeCategories(options.level - 1);
      const list = await getCategoryList(options);

      if (list.length > 0) this.categories.push(list);

      this.loading = false;
    },

    removeCategories(start) {
      this.aspects = null;
      this.categories.length = start;
    },

    async colClick(obj) {
      const options = {
        channel_id: this.channelID,
        level: obj.level,
        parent_id: obj.category_id,
      };

      if (obj.is_leaf) {
        this.loading = true;
        this.removeCategories(options.level);
        this.aspects = await getAspects(obj.id);
        this.loading = false;
      } else {
        options.level += 1;

        this.showCategories(options);
      }
    },
  },
};
</script>

<style scoped>
  .form {
    max-width: 100%;
  }
  .card {
    min-width: 40em;
  }

  .categoriesContainer {
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
    list-style: none;
    max-width: 100%;
    overflow-x: auto;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }
</style>
