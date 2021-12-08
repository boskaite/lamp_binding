<template>
  <div class="home">
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
