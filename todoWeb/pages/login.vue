<script setup ts>
const username = ref('')
const password = ref('')
const router = useRouter()
import {http} from '../http/index'
import config from "~/config";
const toList =async ()=>{
 http.post('/login', { username:username.value,password:password.value})
     .then(res=>{
       let token = res.token
       if(res && res.error===0){
         try {
           localStorage.setItem('uuid', res.data.uuid);
           localStorage.setItem('token',token);
           showNotify({type: 'success', message: '登录成功', duration: 600,});
           router.push('list')
         } catch (e) {
           showNotify({type: 'success', message: 'session失败', duration: 600,});
         }
       } else {
         showNotify({type: 'warning', message: res.msg, duration: 600,});
       }
     })
}
const toRegister = ()=>{
  router.push('register')
}
</script>

<template>
  <div class="container">
    <header>
      <img src="../public/images/login.png">
    </header>
    <h2>登录 Login</h2>
    <van-cell-group inset>
      <van-field
          v-model="username"
          left-icon="contact"
          placeholder="请输入用户名"
      />
      <van-field
          type="password"
          v-model="password"
          left-icon="apps-o"
          placeholder="请输入密码"
      />
    </van-cell-group>
    <div class="btnBox">
      <van-button type="primary" block @click="toList">登录</van-button>
      <van-button type="primary" block @click="toRegister" style="margin-top: 20px" plain hairline>注册</van-button>
    </div>
  </div>
</template>

<style scoped>
.btnBox{
  margin-top: 50px;
  padding: 0 45px;
}
h2{
  text-align: center;
  margin: 50px;
  font-size: 45px;
}
header{
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
header>img{
  width: 400px;
}
</style>