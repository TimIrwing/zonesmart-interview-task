<template>
  <Container>
    <form @submit.prevent="auth">
      <MdCard class="card">
        <MdCardHeader>
          <div class="md-title"> Login</div>
          <div class="md-subhead error" v-if="error">No such user exist</div>
        </MdCardHeader>

        <MdCardContent>


          <md-field>
            <label>E-mail</label>
            <md-input v-model="email" type="email" required/>
          </md-field>

          <md-field>
            <label>Password</label>
            <md-input v-model="password" type="password" required/>
          </md-field>
        </MdCardContent>

        <MdCardActions>
          <MdButton type="submit" class="md-primary">Proceed</MdButton>
        </MdCardActions>
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
import { getJSON } from '@/helpers';

export default {
  name: 'Login',
  components: { Container, Loading },
  data: () => ({
    email: null,
    password: null,
    loading: null,
    error: null,
  }),
  methods: {
    async auth() {
      this.loading = true;

      const { refresh, access } = await getJSON('http://utss.su/api/auth/jwt/create/', {
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });

      if (access) {
        const storage = window.localStorage;

        storage.setItem('access', access);
        storage.setItem('refresh', refresh);

        window.location.href = '/main';
      } else {
        this.error = true;
      }

      this.loading = false;
    },
  },
};
</script>

<style scoped>
  .card {
    min-width: 20vw;
  }
  .error {
    color: #FE2400;
  }


  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition-delay: .25s;
    transition: opacity .5s;
  }
</style>
