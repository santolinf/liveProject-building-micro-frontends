<template>
  <b-container class="signin">
    <b-row class="justify-content-center">
      <b-col cols="6">
        <h1>Red Records :: Sign in</h1>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col cols="6">
        <p class="text-danger">{{ message }}</p>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col cols="6">
        <b-form @submit="onSubmit">
          <b-input-group class="mb-3"
            prepend="Username"
          >
            <b-form-input
                id="username"
                type="text"
                v-model="form.username"
                required
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-3"
            prepend="Password"
          >
            <b-form-input
              id="password"
              type="password"
              v-model="form.password"
              required
            ></b-form-input>
          </b-input-group>

          <router-link class="mr-3" :to="{ name: 'Home' }">Cancel</router-link>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { login } from '../services';
import { goToMusicFrontend } from '../bootstrap';

export default {
  name: 'SignIn',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      message: ''
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.message = '';
      login(this.form,
          () => goToMusicFrontend(),
          error => {
            console.log(error);
            this.form.username = '';
            this.form.password = '';
            this.message = 'Bad Credentials';
          }
      );
    }
  }
}
</script>
