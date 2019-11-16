<template>
  <Container>
    <form>
      <MdCard class="card">
        <MdCardContent>
          <MdField>
            <label>Select channel</label>
            <MdSelect v-model="channelID" required>
              <MdOption v-for="channel in channels"
                        :key="channel.channel"
                        :value="channel.id">
                {{ channel.name }}
              </MdOption>
            </MdSelect>
          </MdField>
        </MdCardContent>
      </MdCard>
    </form>
    <Loading v-if="loading"/>
  </Container>
</template>

<script>
import Container from '@/components/Container';
import Loading from '@/components/Loading';
import { getChannels } from '@/APIService';

export default {
  name: 'Main',
  components: { Loading, Container },
  data: () => ({
    channels: null,
    loading: null,
    channelID: null,
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
};
</script>

<style scoped>
  .card {
    min-width: 40em;
  }
</style>
