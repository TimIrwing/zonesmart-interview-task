<template>
  <Container>
    <form @submit.prevent="auth" class="form">
      <h1 class="title">Login</h1>

      <transition name="fade">
        <p class="error" v-if="error">
          No such user exist
        </p>
      </transition>

      <md-field>
        <label>E-mail</label>
        <md-input v-model="email" type="email" required/>
      </md-field>

      <md-field>
        <label>Password</label>
        <md-input v-model="password" type="password" required/>
      </md-field>

      <MdButton type="submit" class="md-raised md-primary">Proceed</MdButton>
    </form>

    <transition name="fade">
      <Loading v-if="loading"/>
    </transition>
  </Container>
</template>

<script>
import Container from '@/components/Container';
import Loading from '@/components/Loading';

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

      const response = await fetch('http://utss.su/api/auth/jwt/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });

      if (response.ok) {
        const json = await response.json();

        const storage = window.localStorage;

        Object.keys(json).forEach((key) => {
          storage.setItem(key, json[key]);
        });

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
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 25em;
    padding: 2em;
    border-radius: 1em;
    background-color: #fefefe;
    box-shadow: 2px 4px 1px rgba(0, 0, 0, .2);
  }

  .title {
    color: #222;
  }

  .error {
    padding: 1em;
    border: 1px solid #FE2400;
    border-radius: 4px;
    font-size: 1.2em;
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
