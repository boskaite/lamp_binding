<template>
  <div class="home">
    <h1>Hello! It is the first page.</h1>
    <button onclick="alert('You are touch this button.')">Enter on me</button>
    <HelloWorld :msg="message"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/HelloWorld.vue'
import axios from 'axios'

export default {
  el: 'HelloWorld',
  name: 'Home',
  data() {
    return {
      message: "",
    }
  },
  components: {
    HelloWorld
  },
  created: function() {
    axios
        .get('http://localhost:5000/')
        .then(response => {
          this.message = response.data;
          console.log(response.data);
        });
    }
  }
</script>
