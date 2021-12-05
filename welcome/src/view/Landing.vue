<template>
  <div class="landing">
    <p>Hello, Welcome to Red Records.</p>
    <p>Music to your ears!</p>
    <p>
      <router-link :to="{ name: 'SignIn' }">Sign in</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Landing'
}
</script>
