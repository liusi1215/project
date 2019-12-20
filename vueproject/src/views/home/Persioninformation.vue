<!--  -->
<template>
  <div class="per">
    <b>个人信息</b>
    <div class="per-item">
      <p>
        <span>姓名</span>
        {{user}}
      </p>
      <p v-show="flag!=1">
        <span>学号</span>
        {{pasd}}
      </p>
      <p>
        <span>密码</span>
        {{pasd}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      user: localStorage.user,
      pasd: localStorage.pasd,
      flag:localStorage.role
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {}
};
</script>
<style scoped>
.per {
  width: 100%;
  height: 100%;
}
.per b {
  height: 80px;
  display: block;
  font-weight: 800;
  font-size: 22px;
  padding: 50px;
}
.per-item {
  width: 300px;
  height: 200px;
  margin: 5px 90px;
}
.per-item p {
  height: 80px;
  line-height: 80px;
}
.per-item p span {
  padding: 0 50px;
}
</style>