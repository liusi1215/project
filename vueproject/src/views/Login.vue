<template>
  <div class="home">
    <div class="login">登录</div>
    <div class="kuang">
      <p>
        <span>用户名</span>
        <input type="text" v-model="user" placeholder="用户名" />
      </p>
      <p>
        <span>密码</span>
        <input type="password" v-model="pasd" placeholder="密码" />
      </p>
      <p>
        <button @click="Login()">登录</button>
        <button @click="register()">注册</button>
      </p>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import http from "../util/axiosTwo"

export default {
  name: "login",
  data() {
    return {
      user: "",
      pasd: ""
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {
    // 注册
    register(){
      this.$router.push("/register")
    },
    // 登录
    Login() {
      if (this.user&&this.user.trim()&&this.pasd&&this.pasd.trim()) {
        http
          .post("/api/login", { username: this.user, password: this.pasd })
          .then(({ data }) => {
            if (data.code == 1) {
              // 在本地存一下token备用
              localStorage.token = data.token;
              localStorage.user = this.user;
              localStorage.pasd = this.pasd;
              localStorage.role = data.role;
              localStorage.id = data.id;
              this.$router.push("/home");
            } else {
              alert(data.msg);
            }
          });
      } else {
        this.user=""
        this.pasd=""
        alert("请输入完整");
      }
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.login {
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
