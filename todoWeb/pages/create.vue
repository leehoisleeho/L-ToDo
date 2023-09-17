<script setup lang="ts">
import {timeConversion} from '../util'
import {http} from "~/http";
const router = useRouter()
const groupChecked = ref([]);
const showCalendar = ref(false);
const onConfirm = (e: any) => {
  time.value = timeConversion(e)
  showCalendar.value = false;
};
const time = ref('')
// time.value = timeConversion(new Date)
const title = ref('')
const content = ref('')
const urgentState = ref(0)
const starState = ref(0)

// 获取 groupChecked 复选框数据
const getChecked = ()=>{
  groupChecked.value.forEach(item=>{
    if(item === 'urgent'){
      urgentState.value =1
    }else if(item==='star'){
      starState.value =1
    }
  })
}
// 提交
const submit = async () => {
  // 设置状态
  getChecked()
  if (title.value && time.value) {
    const data = {
      uuid:localStorage.getItem('uuid'),
      title:title.value,
      content:content.value ? content.value : '无描述',
      time:time.value,
      urgentState:urgentState.value,
      starState:starState.value
    }
    http.post('/todolist/create',data).then(res=>{
      if(res.error===0){
        showNotify({ type: 'success', message: '创建成功',duration: 600, });
        router.push('list')
      }
    })
  } else {
    if(title.value===''){
      showNotify({ type: 'warning', message: '标题不能为空',duration: 1000, });
    }else if(time.value===''){
      showNotify({ type: 'warning', message: '完成时间不能为空',duration: 1000, });
    }
  }
}
</script>

<template>
  <div>
    <div class="header">
      <img src="../public/images/createBg.png" alt="">
    </div>
    <van-field type="text" v-model="title" autosize placeholder="请输入标题"/>
    <van-field
        rows="5"
        autosize
        type="textarea"
        placeholder="请输入详情"
        v-model="content"
    />
    <van-field name="checkboxGroup">
      <template #input>
        <van-checkbox-group v-model="groupChecked" direction="horizontal">
          <van-checkbox name='urgent' checked-color="#e94235" icon-size="20px">
            <span class="state" style="background: #ea4335">紧急</span>
          </van-checkbox>
          <van-checkbox name=star checked-color="#fabb22" icon-size="20px">
            <span class="state" style="background: #fbbc23">星标</span>
          </van-checkbox>
        </van-checkbox-group>
      </template>
    </van-field>
    <van-field
        v-model="time"
        is-link
        readonly
        name="calendar"
        placeholder="选择完成时间"
        @click="showCalendar = true"
    />
    <van-calendar v-model:show="showCalendar" @confirm="onConfirm"/>
    <div class="btnBox">
      <van-button type="primary" block @click="submit">新建事件</van-button>
    </div>
  </div>
</template>

<style scoped>
.header > img {
  width: 280px;
}
.header {
  margin-bottom: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}

.btnBox {
  padding: 0 30px;
  margin-top: 50px;
}

.state {
  font-size: 24px;
  padding: 3px 10px;
  display: flex;
  border-radius: 10px;
  color: white;
}

.time {
  padding: .26rem .2rem;
  border-bottom: 0.014rem solid #e3e3e3;
  font-size: .25rem;
}
</style>