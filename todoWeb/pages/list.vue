<script setup lang="ts">
import {http} from '../http/index';

const router = useRouter()
const list = ref([])
onMounted(async () => {
  await getList()
})
// 获取用户todolist
const isEmpty = ref(false)
const getList = async () => {
  isEmpty.value = false
  let url = '/todolist/find/' + localStorage.getItem('uuid')
  let res = await http.get(url)
  let arr: [] = res.data.reverse()
  if (n.value === 0) {
    list.value = arr.filter(item => {
      return item.starState === 1 && item.done === 0
    })
  } else if (n.value === 1) {
    list.value = arr.filter(item => {
      return item.urgentState === 1 && item.done === 0
    })
  } else if (n.value === 2) {
    list.value = arr
  } else if (n.value === 3) {
    list.value = arr.filter(item => {
      return item.done === 0
    })
  } else if (n.value === 4) {
    list.value = arr.filter(item => {
      return item.done === 1
    })
  }
  if (list.value.length === 0) isEmpty.value = true
}
// 切换tab
const n = ref(3)

const onChange = (e: number) => {
  n.value = e
  getList()
}
// 计算当前时间 显示今天 或是 明天
const newDate = (e) => {
  let newTime = new Date()
  let n = new Date(e)
  return Math.floor((n - newTime) / (1000 * 60 * 60 * 24)) + 1
}
// 新建
const toCreate = () => {
  router.push('/create')
}
// 事件完成
const done = async (item) => {
  let date = {
    id: item.id,
    done: item.done === 0 ? 1 : 0
  }
  http.post('/todolist/update', date)
      .then(res => {
        console.log(res)
        getList()
      })
      .catch(err => {
        console.log(err)
      })
}
// 删除
const del = async (id) => {
  let url = '/todolist/delete/' + id
  http.remove(url).then(res => {
    getList()
  })
}
const delDone = () => {
  list.value.forEach(item => {
    del(item.id)
  })
}
// 去编辑
const toDetails = (item) => {
  router.push({
    path: 'todoDetails',
    query: item
  })
}
// 退出
const showPopover = ref(false);
// 通过 actions 属性来定义菜单选项
const actions = [
  {text: '退出'},
];
const select = (e) => {
  if (e.text === '退出') {
    router.push('/')
    localStorage.clear()
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <img src="../public/logo.png" alt="">
      <van-popover v-model:show="showPopover" :actions="actions" @select="select">
        <template #reference>
          <h1>
            <span>L-ToDo</span>
          </h1>
        </template>
      </van-popover>
      <div class="create" @click="toCreate">
        <img src="../public/images/create.png">
      </div>
    </div>
    <ul class="listHeader">
      <li :class="n === 0 ?'star' : ' '" @click="onChange(0)">星标</li>
      <li :class="n === 1 ?'urgent' : ' '" @click="onChange(1)">紧急</li>
      <li :class="n === 2 ?'active' : ' '" @click="onChange(2)">全部</li>
      <li :class="n === 3 ?'active' : ' '" @click="onChange(3)">未完成</li>
      <li :class="n === 4 ?'active' : ' '" @click="onChange(4)">已完成</li>
    </ul>
    <div class="btnBox">
      <van-button plain hairline type="danger" :disabled="isEmpty" v-if="n===4" block @click="delDone">清空所有已完成的事
      </van-button>
    </div>
    <div class="imgBox" v-if="isEmpty&& n!==3">
      <img src="../public/images/empty.png" alt="">
      <span>暂无事件</span>
    </div>
    <div class="imgBox" v-if="isEmpty && n===3">
      <img src="../public/images/doneBg.png" alt="">
      <span>你已经完成了所有的事</span>
    </div>
    <TransitionGroup name="list" tag="div">
      <ul class="listInfo" v-for="(item,index) in list" :key="item.id">
        <li>
          <div class="doState" @click="done(item)">
            <img src="../public/images/unfinish.png" v-show="item.done===0">
            <img src="../public/images/finish.png" v-show="item.done===1">
          </div>
          <div class="infoDetails" @click="toDetails(item)">
            <p>{{ item.title }}</p>
            <p>
              <span :class="item.starState===1?'star_1':''">星标</span>
              <span :class="item.urgentState===1?'urgent_1  ':''">紧急</span>
            </p>
            <p>{{ item.content }}</p>
            <p>
              <img src="../public/images/doneTime.png" class="donetime">
              <span style="margin-right: 5px">{{ item.time }}</span>
              <span class="day" v-show="newDate(item.time)>0&&newDate(item.time)!==0&&newDate(item.time)!==1&&newDate(item.time)!==2">{{newDate(item.time)}}天后</span>
              <span class="day_0" v-show="newDate(item.time)<0">{{Math.abs(newDate(item.time))}}天前</span>
              <span class="day_1" v-show="newDate(item.time)===0">今天</span>
              <span class="day_2" v-show="newDate(item.time)===1">明天</span>
              <span class="day_3" v-show="newDate(item.time)===2">后天</span>
            </p>
          </div>
        </li>
      </ul>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.donetime{
  width: 30px;
  margin-right: 10px;
}
.header>img{
  width: 55px;
  margin-right: 10px;
}
.btnBox {
  margin-top: 20px;
  width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.imgBox > img {
  width: 30%;
  opacity: 0.5;
}

.imgBox {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.imgBox > span {
  font-size: 25px;
  margin-top: 30px;
  color: #999999;
  padding-left: 20px;
}

.list-enter-active,
.list-leave-active {
  transition: all 300ms ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.day_0 {
  font-size: 23px;
  padding: 0.05rem 0.15rem;
  border-radius: .2rem;
  border: 1px solid #ea4335;
  color: #ea4335;
}

.day_1 {
  font-size: 23px;
  padding: 0.05rem 0.15rem;
  border-radius: .2rem;
  border: 1px solid #34a853;
  color: #34a853;
}

.day_2 {
  font-size: 23px;
  border: 1px solid #fbbc23;
  color: #fbbc23;
  padding: 0.05rem 0.15rem;
  border-radius: .2rem;
}

.day_3 {
  font-size: 23px;
  border: 1px solid #4285f4;
  color: #4285f4;
  padding: 0.05rem 0.15rem;
  border-radius: .2rem;
}



.create > img {
  width: 40%;
  height: 40%;
}

.create {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: #4285f4;
}

.doState > img {
  width: 100%;
  transition: all 3s ease-in-out;
}

.state {
  position: absolute;
  right: 20px;
  bottom: 20px;
  font-size: 30px;
  color: #999999;
}

.infoDetails > p {
  margin-bottom: 10px;
}
.infoDetails > p:last-child{
  margin-bottom: 0;
}
.infoDetails > p:nth-child(1) {
  color: #333333;
  font-size: 35px;
  font-weight: 550;
}

.infoDetails > p:nth-child(2) > span {
  margin-right: .1rem;
  font-size: 23px;
  padding: 5px 5px;
  border-radius: 5px;
  background: #c7c7c7;
  color: white;
  display: flex;
  margin-right: 10px;
}

.infoDetails > p:nth-child(2) {
  font-size: 25px;
  display: flex;
}

.infoDetails > p:nth-child(3) {
  font-size: 28px;
  color: #bbbbbb;
}

.infoDetails > p:nth-child(4) {
  font-size: 28px;
  color: #bbbbbb;
  display: flex;
  align-items: center;
}

.infoDetails {
  width: 580px;
}

.doState {
  width: 50px;
  height: 50px;
}

.listInfo > li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  padding: 20px 20px;
  position: relative;
}

.listInfo {
  width: 700px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}

.star_1 {
  background: #fbbc23 !important;
  font-weight: 600;
  color: white !important;
}

.urgent_1 {
  background: #ea4335 !important;
  font-weight: 600;
  color: white !important;
}

.star {
  color: #fbbc23 !important;
  font-weight: 600;
}

.urgent {
  color: #ea4335 !important;
  font-weight: 600;
}

.active {
  color: #333333 !important;
  font-weight: 600;
}

.listHeader > li:last-child {
  border: none;
}

.listHeader > li {
  flex: 1;
  text-align: center;
  font-size: 28px;
  color: #999999;
  border-right: 1px solid #e1e1e1;
}

.listHeader {
  display: flex;
  padding: 20px 0;
}
h1 {
  font-weight: 580;
  color: #333;
  font-size: 35px;
  text-align: center;
  display: flex;
  align-items: center;
}

.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(117, 117, 129, 0.2) 0px 7px 29px 0px;
  padding: 30px 30px;
}

.container {
  position: relative;
  margin-bottom: 50px;
}
</style>