<template>
  <div class="about">
    <h1>{{ message }}</h1>
    <table>Список компаний
      <tr><!--строка шапка таблицы-->
        <th>№ компании</th>
        <th>Название компании</th>
        <th>№ шеф-компании</th>
      </tr>
      <tr>
        <td>
          <ul>
            <li class="img_circle"><div class="d1" data-tooltip="HELPER =)"></div></li>
            <li>hover the cursor over me</li>
          </ul>
        </td>
        <td>some 2 data</td><td>some 3 data</td></tr><!--строка таблицы ts, столбец таблицы td-->
    </table>
    <h2>Создать компанию</h2>
    <form action="/company" method="POST">
      <label>Название</label>
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
          console.log(response.data);
        });
  }
}
</script>

<style scoped>
table {
  border: 5px solid cornflowerblue;
  border-collapse: collapse;
}
th {
  border-right: 2px solid black;
  border-bottom: 2px solid black;
}
td {
  border:2px solid cornflowerblue;
  width: 230px;
  height: 15px;
}
.d1 {
  width: 10px;
  height: 10px;
  background: #42b983;
  border-radius: 50%;
}
ul {
  display: inline;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
}
ul li {
  display: inline;
  height: 10px;
}
.img_circle {
  display: inline-block;
  height: 10px;
  width: 10px;
  margin-right: 10px;
}
[data-tooltip]{
  position: relative;
}
[data-tooltip]::after{
  content: attr(data-tooltip);
  opacity: 0;
  transistion: 1s;
  pointer-events: none;
  position: absolute;
  left: 1em; top: 0;
  background: #3989c9;
  color: #fff;
  padding: 0.5em;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5);

}
[data-tooltip]:hover::after{
  opacity: 1;
  top: 2px;
}

</style>
