<!--  -->
<template>
  <div class="home">
    <el-container>
      <el-header>
        <b>1706E成绩后台管理系统</b>
        <span>
          欢迎， {{this.name}}
          {{role==1?"讲师":"同学"}}
          <a @click="tui" style="cursor: pointer;">退出</a>
        </span>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <router-link
            v-for="(item,index) in this.data"
            :key="index"
            :to="'/home'+item.menuapi"
          >{{item.menuname}}</router-link>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!-- {{this.data}} -->
  </div>
</template>

<script>
import http from "../util/axiosTwo"
// import axios from "axios";

export default {
  name: "",
  data() {
    return {
      token: localStorage.getItem("token"),
      data: [],
      name: localStorage.user,
      role: localStorage.role
    };
  },
  components: {},
  computed: {},
  created() {
    //   console.log(this.roleId,this.token)
    http
      .get("/api/menu", {
        headers: { token: this.token }
      })
      .then(({ data }) => {
        // console.log(data.data);
        if (data.code == 1) {
          this.data = data.data;
          // console.log(data)
        }
      });
  },
  methods: {
    // 退出登录
    tui() {
      localStorage.clear();
      // 跳登录界面
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.home,
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  line-height: 60px;
  border-bottom: 1px solid #ccc;
}
.el-header b {
  font-size: 20px;
}
.el-header a {
  padding: 0 10px;
  color: deepskyblue;
  text-decoration: none;
}
.el-header span {
  float: right;
  padding-right: 60px;
}
.el-aside {
  border-right: 1px solid #ccc;
}
.el-aside a {
  display: block;
  height: 60px;
  line-height: 60px;
  text-align: center;
  text-decoration: none;
  color: #000;
}
.el-aside .router-link-active {
  color: #fff;
  background: skyblue;
}
</style>