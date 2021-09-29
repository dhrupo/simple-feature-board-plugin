<template>
  <div id="vue-backend-app">
    <router-view />    
  </div>
</template>

<script>
export default {
  name: 'App',
  }
</script>

<style>
#vue-backend-app {
  margin-top: 20px;
}

.btn {
  padding: 8px 12px;
  color: #fff;
  border-radius: 4px;
  background-color: #337ab7;
  border: 1px solid #326fa5;
  transition: 0.3s all;
}

.btn:hover {
  background-color: #1f66a3;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  font-weight: 700;
  margin-bottom: 6px;
  display: block;
}

.input-group input {
  width: 100%;
}

.input-group textarea {
  width: 100%;
}
</style>>

</style>
