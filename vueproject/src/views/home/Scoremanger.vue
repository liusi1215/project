<!--  -->
<template>
  <div class="scoremanger">
    <div class="score">成绩管理</div>
    <div class="search">
      <span>姓名</span>
      <input type="text" v-model="keyword" />
      <el-button type="primary" icon="el-icon-search" @click="search(keyword)">搜索</el-button>
      <el-button type="info" @click="nosearch()">取消</el-button>
      <el-button type="primary" @click="add">添加</el-button>
    </div>

    <!-- 添加的弹框 -->
    <el-dialog title="添加" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      学生姓名
      <el-select class="select" v-model="name">
        <el-option
          v-for="(item,index) in adddata"
          :value="item.username"
          :key="index"
        >{{item.username}}</el-option>
      </el-select>
      <p class="hang">
        理论成绩
        <el-input v-model="lilun" placeholder="请输入理论成绩"></el-input>
        <!-- <input type="text" v-model="lilun" placeholder="请输入理论成绩" /> -->
      </p>
      <p class="hang">
        技能成绩
        <el-input v-model="jineng" placeholder="请输入技能成绩"></el-input>
        <!-- <input type="text" v-model="jineng" placeholder="请输入技能成绩" /> -->
      </p>
      <p class="hang">今日成绩</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="que(lilun,jineng)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改的弹框 -->

    <el-dialog title="修改" :visible.sync="dialogVisibleedit" width="40%" :before-close="handleClose">
      <p class="hang">
        学生姓名
        <el-input v-model="name" :disabled="true"></el-input>
      </p>
      <p class="hang">
        理论成绩
        <el-input v-model="lilun" placeholder="请输入理论成绩"></el-input>
      </p>
      <p class="hang">
        技能成绩
        <el-input v-model="jineng" placeholder="请输入技能成绩"></el-input>
      </p>
      <el-button type="primary" @click="gai">提交</el-button>
      <el-button @click="cancel">取 消</el-button>
    </el-dialog>

    <!-- 表格 -->
    <template>
      <el-table :data="data" border style="width: 80%">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="username" label="姓名" width="100"></el-table-column>
        <el-table-column prop="theory" label="理论成绩" width="100"></el-table-column>
        <el-table-column prop="skill" label="技能成绩" width="100"></el-table-column>
        <el-table-column prop="time" label="日期" width="100"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页器 -->
    <el-pagination
      background
      v-show="pageflag"
      layout="prev, pager, next"
      :page-size="pagesize"
      :total="total"
      @current-change="change"
    ></el-pagination>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      keyword: "",
      token: localStorage.token,
      data: [],
      copydata: [],
      adddata: [],
      name: "",
      dialogVisible: false,
      dialogVisibleedit: false,
      lilun: "",
      jineng: "",
      id: null,
      page: 1,
      pagesize: 4,
      total: 0,
      pageflag: true
    };
  },
  components: {},
  computed: {},
  created() {
    this.getlist();
  },
  methods: {
    // 获取列表数据
    getlist() {
      // axios
      //   .get("/api/scoreall", { headers: { token: this.token } })
      //   .then(({ data }) => {
      //     if (data.code == 1) {
      //       this.data = data.scoredata;
      //       // console.log(this.data);
      //       this.data.forEach(item => {
      //         item.time = item.time.slice(0, 10);
      //       });
      //     }
      //   });

      axios
        .post(
          "/api/scorelimit",
          { page: this.page, pagesize: this.pagesize },
          { headers: { token: this.token } }
        )
        .then(({ data }) => {
          if (data.code == 1) {
            this.data = data.data;
            this.data.forEach(item => {
              item.time = item.time.slice(0, 10);
            });
            this.copydata = JSON.parse(JSON.stringify(this.data));
            this.total = data.total;
          }
        });
    },
    //   添加
    add() {
      this.dialogVisible = true;
      // 没有录入成绩的同学
      axios
        .get("/api/student", { headers: { token: this.token } })
        .then(({ data }) => {
          if (data.code == 1) {
            this.adddata = data.data;
          }
        });
    },
    // 修改
    handleEdit(row) {
      this.dialogVisibleedit = true;
      // 回显
      this.name = row.username;
      this.lilun = row.theory;
      this.jineng = row.skill;
      this.id = row.id;
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .get("/api/scoredelete", {
              params: { id: row.id },
              headers: { token: this.token }
            })
            .then(({ data }) => {
              if (data.code == 1) {
                this.getlist();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                alert(data.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 添加弹框 关闭
    handleClose() {
      this.dialogVisible = false;
      this.dialogVisibleedit = false;
      this.lilun = "";
      this.jineng = "";
      this.name = "";
    },
    // 确认添加成绩
    que(lilun, jineng) {
      this.dialogVisible = false;

      // 判断成绩在0-100之间
      if (lilun < 0 || lilun > 100 || jineng < 0 || jineng > 100) {
        alert("成绩填写格式错误");
      }

      // 添加成绩
      axios
        .post(
          "/api/getscore",
          {
            theory: this.lilun,
            skill: this.jineng,
            username: this.name
          },
          { headers: { token: this.token } }
        )
        .then(({ data }) => {
          if (data.code == 1) {
            alert(data.msg);
            this.getlist();
            this.name = "";
          } else {
            alert(data.msg);
          }
        });

      this.lilun = "";
      this.jineng = "";
    },
    cancel() {
      this.dialogVisible = false;
      this.dialogVisibleedit = false;
      this.lilun = "";
      this.jineng = "";
      this.name = "";
    },
    /**
     *  修改成绩
     */
    gai() {
      this.dialogVisibleedit = false;
      axios
        .post(
          "/api/scoreedit",
          { theory: this.lilun, skill: this.jineng, id: this.id },
          { headers: { token: this.token } }
        )
        .then(({ data }) => {
          if (data.code == 1) {
            this.getlist();
            alert(data.msg);
          } else {
            alert(data.msg);
          }
        });
    },

    /**
     * 模糊搜索
     */
    search(keyword) {
      axios
        .get("/api/search", {
          params: { keyword: keyword },
          headers: { token: this.token }
        })
        .then(({ data }) => {
          if (data.code == 1) {
            this.data = data.data;
            this.pageflag = false;
          } else {
            alert(data.msg);
          }
        });
    },
    nosearch() {
      this.data = this.copydata;
      this.keyword = "";
      this.pageflag = true;
    },

    /**
     * 分页器
     */

    change(index) {
      // console.log(index)
      this.page = index;
      this.getlist();
    }
  }
};
</script>
<style scoped>
.scoremanger {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.score {
  width: 100%;
  height: 45px;
  font-weight: bold;
  font-size: 20px;
  line-height: 45px;
  padding: 50px;
}
.search {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
}
.search span {
  padding: 0 30px;
}
.search input {
  width: 200px;
  height: 35px;
  padding-left: 20px;
}
.search .el-button {
  width: 90px;
  height: 35px;
  margin-left: 8px;
}
.el-table {
  margin: 10px 0;
}
.hang {
  line-height: 45px;
  margin: 8px 0;
}
.hang .el-input {
  width: 75%;
  height: 45px;
  margin-left: 8px;
}
.select {
  width: 170px;
}
.select option {
  height: 25px;
}
</style>