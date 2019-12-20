<!--  -->
<template>
  <div class="stu">
    <b>学生管理</b>
    <el-table :data="alldata" border style="width: 80%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="140"></el-table-column>
      <el-table-column prop="num" label="学号" width="140"></el-table-column>
      <el-table-column prop="role" label="身份" width="140">
        <template slot-scope="scope">
          <span v-show="scope.row.role==2">学委</span>
          <span v-show="scope.row.role==3">学生</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" @click="handleSee(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改弹框 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form :model="editdata">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="editdata.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="editdata.num" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份" :label-width="formLabelWidth">
          <el-select v-model="editdata.role">
            <el-option label="学委" value="学委"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="que">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "",
  data() {
    return {
      token: localStorage.token,
      alldata: [],
      editdata: {},
      id: null,
      role: "",
      dialogFormVisible: false,
      formLabelWidth: "90px"
    };
  },
  components: {},
  computed: {},
  created() {
    /**
     *  获取所有学生
     */
    this.getmylist();
  },
  methods: {
    getmylist() {
      axios
        .get("/api/allstudent", { headers: { token: this.token } })
        .then(({ data }) => {
          // console.log(data.data);
          this.alldata = data.data;
        });
    },
    /**
     * 修改
     */
    handleEdit(row) {
      this.editdata = row;
      this.editdata.role = "";
      this.dialogFormVisible = true;
      this.id = row.id;
    },
    /**
     * 删除
     */
    handleDelete(row) {
      axios
        .get("/api/userdelete", {
          params: { id: row.id },
          headers: { token: this.token }
        })
        .then(({ data }) => {
          if (data.code == 1) {
            this.getmylist();
          }else{
            alert(data.msg)
          }
        });
    },
    /**
     * 查看详情
     */
    handleSee(row) {
      localStorage.id = row.id;
      localStorage.num=row.num;
      this.$router.push("/home/studenthome");
    },
    /**
     * 确定修改
     */
    que() {
      this.dialogFormVisible = false;
      this.role = this.editdata.role;
      let num = this.role === "学委" ? 2 : 3;
      /**
       *  修改学生身份
       */
      axios
        .post(
          "/api/editstudent",
          { id: this.id, role: num },
          { headers: { token: this.token } }
        )
        .then(({ data }) => {
          if (data.code === 1) {
            this.getmylist();
          }
        });
    }
  }
};
</script>
<style scoped>
.stu {
  width: 100%;
  height: 100%;
}
.stu b {
  display: block;
  padding: 50px;
  font-weight: 800;
  font-size: 22px;
}
</style>