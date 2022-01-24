<template>
  <div v-if="popUpStyle" id="tst" class="success">
    <h3>{{ message }}</h3>
  </div>
  <div v-if="!popUpStyle" id="tst" class="fail">
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
export default {
  name: "PopUpMsg",
  props: ["message", "popUpStyle"],
};
</script>

<style scoped>
#tst {
  width: 50%;
  padding: 10px;
  margin: 20px auto;
  color: white;
}

.success {
  text-align: center;
  background: green;
}

.fail {
  text-align: center;
  background: red;
}
</style>
