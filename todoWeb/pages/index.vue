<script setup ts>
import config from "~/config";
import {http} from '../http/index'
const router = useRouter()
const toLogin =  () => {
  let token = localStorage.getItem('token')
  http.post('/auth/check',{token})
      .then(res=>{
        console.log(res)
        if(res.decoded.error===0){
          router.push('list')
        }else {
          router.push('login')
        }
      })
      .catch(err=>{
        router.push('login')
      })
}
</script>

<template>
  <div class="container">
    <img src="../public/images/bs.svg">
    <h1>欢迎使用L-ToDo</h1>
    <p>人生之败,非傲即惰,二者必居其一.勤则百弊皆除.</p>
    <p>集中记录您需要完成的所有事项</p>
    <div class="btnBox">
      <van-button type="primary" @click="toLogin">开始使用</van-button>
    </div>
  </div>
</template>

<style scoped>
.btnBox {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.container > p {
  text-align: center;
  margin-top: 20px;
  font-size: 25px;
  color: #999;
}

.container > h1 {
  text-align: center;
  margin-top: 20px;
  font-size: 45px;
  font-weight: 500;
  color: #444;
}

.container > img {
  width: 100vw;
}

.container {
  width: 100vw;
}
</style>