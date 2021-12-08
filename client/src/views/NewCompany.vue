<template>
  <div class="company">
    <h2>Создать компанию</h2>
    <form action="/company" method="POST">
      <lable>Название</lable>
      <br>
      <input name="title" class="new-company" />
      <br>
      <br>
      <label>Вышестоящая компания</label><br>
      <input name="upperid" type="number" class="new-company" min="0" /><br><br>
      <input type="submit" value="Отправить" />
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Company'
  // created: function () {
  //   axios
  //       .post('http://localhost:5000/about')
  //       .then(response => {
  //         this.message = response.data;
  //         console.log(response.data);
  //       });
  // }
}
</script>

