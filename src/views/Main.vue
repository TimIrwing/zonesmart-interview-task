<template>
  <Container>
    <form>
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
              <MdList class="categoryList">
                <MdListItem v-for="obj in col"
                            :key="obj.name"
                            :class="{ notLeaf: !obj.is_leaf }"
                            @click="colClick(obj)">
                  {{obj.name}}
                </MdListItem>
              </MdList>
            </li>
          </ul>
        </MdCardContent>
      </MdCard>
    </form>
    <Loading v-if="loading"/>
  </Container>
</template>

<script>
import Container from '@/components/Container';
import Loading from '@/components/Loading';
import { getCategoryList, getChannels } from '@/APIService';

export default {
  name: 'Main',
  components: { Loading, Container },
  data: () => ({
    channels: null,
    loading: null,
    channelID: null,
    categories: [],
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

      this.removeCategories(options.level);
      const list = await getCategoryList(options);


      if (list.length > 0) this.categories.push(list);

      this.loading = false;
    },

    removeCategories(start) {
      this.categories.length = start - 1;
    },

    colClick(obj) {
      const options = {
        channel_id: this.channelID,
        level: obj.level,
        parent_id: obj.category_id,
      };

      options.level += 1;

      this.showCategories(options);
    },
  },
};
</script>

<style scoped>
  .card {
    min-width: 40em;
  }

  .categoriesContainer {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .categoryList {
    width: 20em;
    max-height: 80vh;
    overflow-y: auto;
  }

  .notLeaf::after {
    content: '>';
    position: absolute;
    top: 50%; right: .5em;
    font-size: 1.5em;
    transform: translateY(-50%);
  }
</style>
