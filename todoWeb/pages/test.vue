<script setup>
import {_fetch} from '../http/_fetch'



const list = ref()
_fetch({
  url:'/todolist/find/8e7c0edac9c84005b627efab28716744',
  name:'user',
  method:'get',
}).then(res=>{
  list.value = res.data
})

const submit = ()=>{
  _fetch({
    url:'/todolist/find/8e7c0edac9c84005b627efab28716744',
    name:'user',
    method:'get',
  }).then(res=>{
    list.value = res.data
    console.log(res.data)
  })
}
</script>

<template>
  <div @click="submit">{{list}}</div>
</template>

<style scoped>

</style>