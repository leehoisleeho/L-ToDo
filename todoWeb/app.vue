<script setup>
</script>

<template>
    <transition name="page" mode="out-in">
      <div id="app">
        <NuxtPage></NuxtPage>
      </div>
    </transition>
</template>

<style>
.page-enter-active{
  transition: all .4s;
}
.page-leave-active {

}
.page-enter-from{
  transform: translateX(100vw );
}
.page-leave-to {
  transform: translateX(-100vw);
}

body {
  overflow: auto;
  touch-action: manipulation;
  touch-action: pan-x pan-y;
}

@font-face {
  font-family: 'alimama';
  src: url("./public/font/frnF0ZjoxtLA.woff");
  src: url("./public/font/frnF0ZjoxtLA.woff2");
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
</style>