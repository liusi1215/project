<!--  -->
<template>
  <div class="home">
    <div class="register">注册</div>
    <div class="kuang">
      <p>
        <span>用户名</span>
        <input type="text" v-model="user" placeholder="输入用户名" />
      </p>
      <p>
        <span>密码</span>
        <input type="password" v-model="pasd" placeholder="密码" />
      </p>
      <p>
        <span>学号</span>
        <input type="text" v-model="num" placeholder="学号" />
      </p>
      <p>
        <button @click="Register(user,pasd,num)">注册</button>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "",
  data() {
    return {
      user: "",
      pasd: "",
      num: ""
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {
    Register(user, pasd, num) {
      axios
        .post("/api/register", { username: user, password: pasd, num: num })
        .then(({ data }) => {
          //   console.log(data);
          if (data.code == 1) {
            alert(data.msg);
            this.$router.push("/login");
          } else if (data.code == 2) {
            alert(data.msg);
          } else if (data.code == 3) {
            alert(data.msg);
          }
        });
    }
  }
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.register {
  width: 200px;
  height: 130px;
  line-height: 200px;
  margin: 0 auto;
  text-align: center;
  font-weight: 700;
}
.kuang {
  width: 400px;
  height: 400px;
  text-align: center;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding-right: 40px;
}
.kuang p {
  line-height: 80px;
}
.kuang p span {
  display: inline-block;
  width: 70px;
  height: 35px;
}
.kuang p input {
  width: 180px;
  height: 35px;
}
.kuang p button {
  width: 120px;
  height: 35px;
  margin-left: 70px;
}
</style>