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
import { getJSON, refreshToken } from '@/helpers';

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
    await refreshToken();
    const res = await getJSON('http://utss.su/api/user_channel/', {
      method: 'GET',
      headers: {
        Authorization: `JWT ${window.localStorage.getItem('access')}`,
      },
    });

    this.channels = res.results;
    this.loading = false;
  },
};
</script>

<style scoped>
  .card {
    min-width: 40em;
  }
</style>
