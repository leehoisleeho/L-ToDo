<script setup ts>
const username = ref('')
const password = ref('')
const router = useRouter()
import {http} from '../http/index'
const toList = ()=>{
  router.push('list')
}
const submit = async ()=>{

  if(!checkPassword())
  if(username.value && password.value){
    http.post('/user/create',{
      username:username.value,
      password:password.value
    }).then(res=>{
      if(res.error=== 0){
        showNotify({ type: 'success', message: '注册成功',duration: 1000, });
        router.push('login')
      }else {
        showNotify({ type: 'warning', message: '注册失败',duration: 1000, });
      }
    }).catch(err=>{
      console.log(err)
    })
  }else if(username.value===''){
    showNotify({ type: 'warning', message: '用户名不能为空',duration: 1000, });
  }else if(password.value===''){
    showNotify({ type: 'warning', message: '密码不能为空',duration: 1000, });
  }
}

// 验证用户名是否存在
const usernameIsError = ref(false)
const userNamePlaceholder = ref('请输入用户名')
const  inputFocus = ()=>{
  usernameIsError.value = false
  userNamePlaceholder.value = '请输入用户名'
}
const checkUserName = async ()=>{
  if(username.value){
    let res = await http.post(`/user/check/${username.value}`, {
      username: username.value,
      password:password.value
    })
    if(res == 1){
      username.value = ''
      usernameIsError.value = true
      userNamePlaceholder.value = '用户名已存在，请重新输入'
    }else {
      usernameIsError.value = false
      userNamePlaceholder.value = '请输入用户名'
    }
  }
}
// 验证两次密码是否都一致
const password_2 = ref('')
const checkPassword = ()=>{
  if (password.value!==password_2.value){
    showNotify({ type: 'warning', message: '两次密码输入不一样',duration: 1000, });
    password.value =''
    password_2.value = ''
    return false
  }
}

</script>

<template>
  <div class="container">
    <header>
      <img src="../public/images/registerBg.png">
    </header>
    <h2>注册 Register</h2>
    <van-cell-group inset>
      <van-field
          @blur="checkUserName"
          @focus="inputFocus"
          v-model="username"
          :placeholder="userNamePlaceholder"
          :error="usernameIsError"
      />
      <van-field
          type="password"
          v-model="password"
          placeholder="请输入密码"
      />
      <van-field
          type="password"
          v-model="password_2"
          placeholder="请确认密码"
      />
    </van-cell-group>
    <div class="btnBox">
      <van-button type="primary" block  plain hairline @click="submit">注册</van-button>
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