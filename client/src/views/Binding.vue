<template>
  <div class="pageBinding">
    <div id="window" v-bind:class="getWindowStyle">
      <div id="uppMenu" @mousedown.stop="startDrag" @mouseup.stop="drop" @mouseleave="drop">
        <div class="leftMenu">
          <div class="backButton"></div>
          <input id="inputFind" class="find" type="text" placeholder="Введите поисковый запрос" v-model="search"/>
        </div>
        <div class="centerTitle">Привязка индивидуальных светильников ЛУЧ-4</div>
        <div class="rightButton">
          <span class="changeSize" @mousedown.stop @mouseup.stop @click.stop="changeSize"></span>
          <span class="verticalSlash"></span>
          <router-link to="/">
            <span class="close"></span>
          </router-link>
          <div class="globalFilter">
            <div class="imgGlobalFilter"></div>
            <div class="textGlobalFilter">Задать фильтры</div>
          </div>
        </div>
      </div>
      <div class="greenButtonUpp">
        <div class="buttonBindLamp">Привязка светильника</div>
        <div class="companyFilter">
          <div class="leftCenterParallelogram">
            <div class="nameCompanyFilter">(Шахта "Заполярная")</div>
          </div>
          <div class="rightCenterParallelogram">
            <div class="buttonCompanyFilter"></div>
          </div>
        </div>
        <div class="rightUppRectangle"></div>
      </div>
      <p v-if="loading">Подождите</p>
      <p class="centerWindow" v-else-if="bindings === undefined">Записей пока нет.</p>
      <div class="background" :class="getBackgroundStyle" v-else>
        <div class="table" :class="getTableStyle">
          <div class="thead">
            <div class="tr">
              <div class="cell titleIndex">
               <div class="index">№ п/п</div>
              </div>
              <div class="cell titleCheckBox">
                <div class="checkBox">Выбор</div>
              </div>
              <div class="cell titleSerialNumber">
                <div class="serialNumber">Заводской номер</div>
              </div>
              <div class="cell titleOptionNumber">
                <div class="optionNumber">Экспл. номер</div>
              </div>
              <div class="cell titleNetNumber">
                <div class="netNumber">Сетевой идентификатор</div>
              </div>
              <div class="cell titleDateOperation">
                <div class="DateOperation">
                  <p>Дата допуска</p>
                  <p>к эксплуатации</p>
                </div>
              </div>
              <div class="cell indicatorStatusLamp" style="border-right: 0px solid #CCCCCC;">
                <div class="indicatorStatusLamp"></div>
              </div>
              <div class="cell data">
                <div class="info" style="text-align: center; ">
                  Владелец
                </div>
              </div>
              <div class="cell company">
                <div class="nameCompany">Участок / подразделение</div>
              </div>
              <div class="cell DateBinding">
                <div class="DateBinding">Дата и время привязки</div>
              </div>
              <div class="cell hour">
                <div class="countHour">
                  <p>Наработка светильника,</p>
                  <p>часов</p>
                </div>
              </div>
              <div class="cell dateTO" style="border-right: 0px solid #CCCCCC;">
                <div class="valueDateTO">Дата последнего ТО</div>
              </div>
              <div class="box"></div>
            </div>
          </div>
          <div class="tbody" :class="getTbodyStyle">
            <div class="tr" v-for="(binding, index) in getSearchQuery" :key="binding.id">
              <div class="cell titleIndex">
                <div class="index">{{ index + 1 }}</div>
              </div>
              <div class="cell titleCheckBox">
                <div class="checkBox">
                  <label class="choice">
                    <input class="check" type="checkbox">
                    <span class="newCheck"></span>
                  </label>
                </div>
              </div>
              <div class="cell titleSerialNumber">
                <div class="serialNumber">{{ binding.serial_number }}</div>
              </div>
              <div class="cell titleOptionNumber">
                <div class="optionNumber">{{ binding.operational_number }}</div>
              </div>
              <div class="cell titleNetNumber">
                <div class="netNumber">{{ binding.netID }}</div>
              </div>
              <div class="cell titleDateOperation">
                <div class="DateOperation">{{ binding.dateOperation }}</div>
              </div>
              <div class="cell indicatorStatusLamp" style="border-right: 0 solid #CCCCCC;">
                <div class="indicatorStatusLamp">
                    <div class="circle" :class="getColorCircle(binding.status, index+1)"
                         :data-tooltip="getDataTooltip(binding.status)"></div>
                </div>
              </div>
              <div class="cell data">
                <div class="info">{{ binding.info }}</div>
              </div>
              <div class="cell company">
                <div class="nameCompany" style="font-size: 14px;">{{ binding.company }}</div>
              </div>
              <div class="cell DateBinding">
                <div class="DateBinding">{{ binding.dateBinding }}</div>
              </div>
              <div class="cell hour">
                <div class="countHour">
                  <div class="colorHour" v-bind:class="calcStyleHour(binding.hour)">{{ binding.hour }}</div>
                </div>
              </div>
              <div class="cell dateTO" style="border-right: 0px solid #CCCCCC;">
                <div class="valueDateTO">{{ binding.dateTO }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="downButtons" :class="getDownButtonsStyle">
      <div class="exportExcel">
        <div class="imgExportExcel"></div>
        <div class="textExportExel">Выгрузить в Excel</div>
      </div>
      <div class="sendToPrint">
        <div class="imgSendToPrint"></div>
        <div class="textSendToPrint">Отправить на печать</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Binding',
  data() {
    return {
      search: "",
      loading: true,
      chSize: false,
      drag: {
        mouseDown: false
      },
      startDragPosition: {
        x: 0,
        y: 0
      },
      bindings: [],
    };
  },
  async created() {
    this.bindings = await axios
        .get('http://localhost:5000/binding')
        .then(response => {
          return response.data;
        })
        .catch((err) => {
          console.log("error: ", err);
        });
   this.loading = false;
  },
  computed: {
    getWindowStyle() {
      let windowStyle={};
      if (this.chSize) {
        windowStyle.smallWindow = true;
        windowStyle.bigWindow = false;
      }
      else {
        windowStyle.bigWindow = true;
        windowStyle.smallWindow = false;
      }
      return windowStyle;
    },
    getBackgroundStyle() {
      let backgroundStyle={};
      if (this.chSize) {
        backgroundStyle.smallBackground = true;
        backgroundStyle.bigBackground = false;
      } else {
        backgroundStyle.smallBackground = false;
        backgroundStyle.bigBackground = true;
      }
      return backgroundStyle;
    },
    getTableStyle() {
      let tableStyle = {};
      if (this.chSize) {
        tableStyle.bigTableStyle = false;
        tableStyle.smallTableStyle = true;
      } else {
        tableStyle.bigTableStyle = true;
        tableStyle.smallTableStyle = false;
      }
      return tableStyle;
    },
    getTbodyStyle() {
      let tbodyStyle = {};
      if (this.chSize) {
        tbodyStyle.smallTbody = true;
        tbodyStyle.bigTbody = false;
      } else {
        tbodyStyle.smallTbody = false;
        tbodyStyle.bigTbody = true;
      }
      return tbodyStyle;
    },
    getDownButtonsStyle() {
      let downButtonsStyle = {};
      if (this.chSize) {
        downButtonsStyle.downPageDownButtons = false;
        downButtonsStyle.centerPageDownButtons = true;
      } else {
        downButtonsStyle.downPageDownButtons = true;
        downButtonsStyle.centerPageDownButtons = false;
      }
      return downButtonsStyle;
    },
    getSearchQuery() {
      let foundBindings = [];
      let indexArray = 0 ;
      if (this.search != "") {
        console.log("не пуст");
        for (let i = 0; i < this.bindings.length; i++) {
          let strOperationNumber = String(this.bindings[i].operational_number);
          let strNetNumber = String(this.bindings[i].netID);
          if (this.bindings[i].serial_number.toLowerCase().indexOf(this.search.toLowerCase()) != -1 ||
              this.bindings[i].info.toLowerCase().indexOf(this.search.toLowerCase()) != -1 ||
              strOperationNumber.toLowerCase().indexOf(this.search.toLowerCase()) != -1 ||
              strNetNumber.toLowerCase().indexOf(this.search.toLowerCase()) != -1) {
                  foundBindings[indexArray] = this.bindings[i];
                  indexArray++;
          }
        }
      } else foundBindings = this.bindings;
      return foundBindings;
    }
  },
  methods: {
    getColorCircle(statusLamp) {
      let colorCircle={};
      if (statusLamp === 1) {
        colorCircle.lightGreenCircle = true;
        colorCircle.redCircle = false;
        colorCircle.darkGreenCircle = false;
      } else if (statusLamp === 2) {
        colorCircle.lightGreenCircle = false;
        colorCircle.redCircle = true;
        colorCircle.darkGreenCircle = false;
      } else if (statusLamp === 3) {
        colorCircle.lightGreenCircle = false;
        colorCircle.redCircle = false;
        colorCircle.darkGreenCircle = true;
      }
      return colorCircle;
    },
    getDataTooltip(statusLamp) {
      let textHint;
      if (statusLamp === 1) {
        textHint = "Резервный индивидуальный светильник ЛУЧ-4";
      }
      if (statusLamp === 2) {
        textHint = "Постоянный привязанный индивидуальный светильник ЛУЧ-4";
      }
      if (statusLamp === 3) {
        textHint = "Временный привязанный индивидуальный светильник ЛУЧ-4";
      }
      return textHint;
    },
    changeSize() {
      this.chSize = !this.chSize;
      if (this.chSize === false) {
        let doc = document.getElementById('window');
        doc.style.left = "0px";
        doc.style.top = "0px";
        let downMenu = document.getElementById('downButtons');
        downMenu.style.left = "0px";
        downMenu.style.top = "91%";
      }
      if (this.chSize === true)
      {
        let downMenu = document.getElementById('downButtons');
        downMenu.style.top = "407px";
      }
    },
    startDrag(event) {
      if (this.chSize === true) {
        this.drag.mouseDown = true;
        let doc = document.getElementById('window');
        let windowStartDragX = '0';
        if (doc.style.left != 0) {
          for (let i = 0; i < doc.style.left.length; i++) {
            if (doc.style.left[i] != 'p') {
              windowStartDragX = windowStartDragX + doc.style.left[i];
            }
          }
        }
        this.startDragPosition.x = event.clientX - parseInt(windowStartDragX);
        let windowStartDragY = '0';
        if (doc.style.top != 0) {
          for (let i = 0; i < doc.style.top.length; i++) {
            if (doc.style.top[i] != 'p') {
              windowStartDragY = windowStartDragY + doc.style.top[i];
            }
            else break;
          }
          this.startDragPosition.y = event.clientY - windowStartDragY;
        }else this.startDragPosition.y = event.clientY;
        doc.addEventListener("mousemove", this.dragging);
      }
    },
    dragging(event) {
      let doc = document.getElementById('window');
      let downMenu = document.getElementById('downButtons');
      if (this.chSize === true && this.drag.mouseDown === true) {
        doc.style.left = event.clientX - this.startDragPosition.x + "px";
        doc.style.top = event.clientY - this.startDragPosition.y + "px";
        downMenu.style.left = event.clientX - this.startDragPosition.x +"px";
        downMenu.style.top = event.clientY - this.startDragPosition.y + 407 + "px";
      }
    },
    drop() {
      this.drag.mouseDown = false;
    },
    calcStyleHour(hour) {
      let classHour={};
      return hour > 10000 ? (classHour.classRedHour=true, classHour.classBlackHour = false) :
          (classHour.classRedHour=false, classHour.classBlackHour = true);
    }
  }
}
</script>

<style scoped>
.pageBinding {
  height:100%;
}
#window {
  position: absolute;
  border-color: #598D9B;
  border-style: solid;
  border-width: 4px;
  min-width: 1203px;
}
.smallWindow {
  height: 400px;
  width: 88%;
}
.bigWindow {
  width: 99.4%;
  height: 90%;
}
#uppMenu {
  height: 30px;
  width: 100%;
  background-color: #598D9B;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.leftMenu {
  width: 400px;
  display: flex;
  flex-direction: row;
}
.backButton {
  position: absolute;
  left: 10px;
  top: 2px;
  width: 25px;
  height: 20px;
  background-image: url(../../public/arrow_back.svg);
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
}
.find {
  position: absolute;
  width: 240px;
  height: 24px;
  left: 50px;
  background-color: #FFFFFF;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding-left: 5px;
  font-size: 13px;
  color: #CCCCCC;
  background-size: 7.5%;
  background-image: url(../../public/Лупасерая.svg);
  background-repeat: no-repeat;
  background-position-x: 223px;
  background-position-y: 4px;
}
.centerTitle{
  padding-top: 3px;
  color: #FFFFFF;
  font-size: 16px;
  width: 400px;
}
.rightButton {
  text-align: right;
  height: 30px;
  width: 400px;
  right: 4px;
}
.changeSize {
  position: absolute;
  top: 4px;
  right: 40px;
  content: ' ';
  height: 17px;
  width: 16px;
  background-image: url(../../public/Rectangle35.svg);
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
}
.verticalSlash {
  position: absolute;
  top: 2px;
  right: 30px;
  content: ' ';
  height: 20px;
  width: 0px;
  background-color: #FFFFFF;
  border: 1px solid #FFFFFF;
}
.close {
  position: absolute;
  top: 5px;
  right: 5px;
  content: ' ';
  height: 16px;
  width: 16px;
  background-image: url(../../public/Group28.svg);
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
}
.globalFilter {
  width: 240px;
  height: 26px;
  background-color: #FFFFFF;
  position:absolute;
  right: 100px;
  display:flex;
  flex-direction: row;
  cursor: pointer;
}
.imgGlobalFilter {
  margin-top: 5px;
  margin-right: 35px;
  margin-left: 15px;
  height: 16px;
  width: 50px;
  background-image: url(../../public/filter2.svg);
  background-repeat: no-repeat;
  background-size: cover;
}
.textGlobalFilter {
  margin-top: 5px;
  font-size: 13px;
  color: #808080;
}
.greenButtonUpp {
  width: 100%;
  height: 51px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.buttonBindLamp {
  padding-left: 10px;
  margin-left: 22px;
  margin-top:9px;
  width: 171px;
  height: 29px;
  background-color: #B2D63C;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.buttonBindLamp:hover {
  background-color: #c5ee3f;
}
.companyFilter {
  height: 30px;
  width: 472px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.companyFilter:hover .leftCenterParallelogram{
   background: #c5ee3f;
}
.companyFilter:hover .rightCenterParallelogram{
  background: #c5ee3f;
}
.leftCenterParallelogram {
  position: absolute;
  top: 30px;
  width: 442px;
  height: 35px;
  transform: skew(20deg);
  background: #B2D63C;
}
.nameCompanyFilter {
  width: 452px;
  margin-top: 7px;
  transform: skew(-21deg);
}
.rightCenterParallelogram {
  position: absolute;
  top: 30px;
  width: 50px;
  height: 35px;
  margin-left: 422px;
  transform: skew(-20deg);
  background: #B2D63C;
}
.buttonCompanyFilter {
  margin-top: 13px;
  height: 10px;
  width: 12px;
  transform: skew(21deg);
  background-image: url(../../public/Polygon4.svg);
  background-repeat: no-repeat;
  background-size: cover;
}
.rightUppRectangle {
  width: 171px;
  margin-right: 22px;
}
.background {
  background-color: #F0F0F0;
}
.smallBackground {
  height: 72.5%;
  width: 100%;
}
.bigBackground {
  height: 85%;
  width: 100%;
}
 .table {
  min-width: 1195px;
}
 .bigTableStyle {
   height: 90%;
   width: 100%;
 }
 .smallTableStyle {
   height: 100%;
   width: 100%;
 }
 .thead {
   width: 100%;
 }
.thead .tr {
  background-color: #F0F0F0;
  display: flex;
  flex-grow: 1;
  position: inherit;
  font-weight: normal;
  font-size: 16px;
}
 .tbody {
  margin-top: 0px;
  overflow-y: scroll;
  background-color: white;
}
 .smallTbody {
  height: 91%;
  width: 100%;
 }
 .bigTbody {
   left: 0px;
   top: 50px;
   height: 100%;
   width: 100%;
 }
 .tbody .tr {
   display: flex;
   border-bottom: 1px solid #CCCCCC;
   font-size: 16px;
   min-height: 50px;
 }
p {
  margin-bottom: 0%;
  margin-top: 0%;
}
.cell {
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #CCCCCC;
}
.titleIndex {
  width: 2.4%;
  min-width: 40px;
}
.index {
  width: 100%;
  min-width: 40px;
  padding-left: 0.52%;
  padding-right: 0.52%;
}
.titleCheckBox {
  width: 3.95%;
  min-width: 60px;
}
.checkBox {
  width: 100%;
  min-width: 60px;
  padding-left: 0.52%;
  padding-right: 0.52%;
}
.choice {
  display: block;
  margin: 0 0 10px 0;
  cursor: pointer;
  user-select: none;
  position: relative;
}
.choice .check {
  position: absolute;
  z-index: -1;
  opacity: 0;
  display: block;
  width: 0;
  height: 0;
}
.choice .newCheck {
  display: inline-block;
  position: relative;
  padding: 0 0 0 35px;
  line-height: 22px;
}
.choice .newCheck:before {
  content: "";
  display: inline-block;
  width: 19px;
  height: 19px;
  position: absolute;
  left: 7px;
  bottom: -9px;
  border: 1px solid #CBCBCB;
}
.choice .check:checked + .newCheck:before {
  background: url(../../public/Polygon7.svg) white no-repeat center;
}
.titleSerialNumber {
  width: 6.1%;
  min-width: 90px;
}
.serialNumber {
  width: 100%;
  min-width: 90px;
  padding-left: 0.52%;
  padding-right: 0.52%;
}
.titleOptionNumber {
  width: 4.9%;
  min-width: 65px;
}
.optionNumber {
  width: 100%;
  min-width: 65px;
  padding-left: 0.52%;
  padding-right: 0.52%;
}
.titleNetNumber {
  width: 7.6%;
  min-width: 125px;
}
.netNumber {
  width: 100%;
  min-width: 125px;
  padding-left: 0.52%;
  padding-right: 0.52%;
}
.titleDateOperation {
  width: 7.6%;
  min-width: 130px;
}
.DateOperation {
  width: 90%;
  min-width: 130px;
  padding-left: 0.52%;
  padding-right: 0.52%;
}
.indicatorStatusLamp {
  width: 2%;
  min-width: 30px;
  padding-right: 7px;
}
.circle.redCircle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 17px;
  background: #7C6580;
}
.circle.lightGreenCircle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 17px;
  background: #B2D63C;
}
.circle.darkGreenCircle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 17px;
  background: #4D897C;
}
[data-tooltip] {
  position: relative;
}
[data-tooltip]::after {
  content: attr(data-tooltip);
  opacity: 0;
  pointer-events: none;
  position: absolute;
  left: -1px;
  width: 180px;
  background: #000000;
  color: #fff;
  padding: 0.5em;
}
[data-tooltip]:hover::after {
  opacity: 0.5;
}
.data {
  width: 20%;
  min-width: 110px;
}
.info {
  width: 100%;
  text-align: left;
  min-width: 110px;
}
.person {
  width: 100%;
}
.company {
  width: 15%;
}
.nameCompany {
  width: 100%;
  min-width: 145px;
  padding-left: 0.52%;
  padding-right: 0.52%;
}
.DateBinding {
  width: 7.5%;
  min-width: 120px;
  padding-left: 0.52%;
  padding-right: 0.52%;
}
.hour {
  width: 12%;
}
.countHour {
  width: 100%;
  min-width: 120px;
  padding-left: 0.52%;
  padding-right: 0.52%;
}
.colorHour.classRedHour {
  color: #B55A6E;
}
.colorHour.classBlackHour {
  color: #000000;
}
.dateTO {
  width: 13%;
}
.valueDateTO {
  width: 100%;
  min-width: 120px;
  padding-left: 0.52%;
  padding-right: 0.52%;
}
.box {
  min-width: 17px;
}
#downButtons {
  position: absolute;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.downPageDownButtons {
  width: 100%;
  top: 91%;
}
.centerPageDownButtons {
  width: 88.64%;
  top: 407px;
}
.exportExcel {
  position: absolute;
  right: 230px;
  height: 35px;
  width: 258px;
  background-image: url(../../public/Rectangle66.svg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.imgExportExcel {
  height: 21px;
  width: 21px;
  background-image: url(../../public/Excel1.svg);
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 10px;
}
.textExportExel {
  color: #FFFFFF;
}
.sendToPrint {
  height: 35px;
  width: 258px;
  background-image: url(../../public/Rectangle65.svg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.imgSendToPrint {
  height:39px;
  width: 32px;
  background-image: url(../../public/print2.svg);
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 5px;
  margin-left: 20px;
}
.textSendToPrint {
  color: #FFFFFF;
}
</style>
