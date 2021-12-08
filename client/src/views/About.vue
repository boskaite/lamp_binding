<template>
  <div class="about">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'About',
  data() {
    return {
      message: "",
    }
  },
  created: function () {
    axios
        .get('http://localhost:5000/about')
        .then(response => {
          this.message = response.data;
        });
  }
}
</script>

