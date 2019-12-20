<!--  -->
<template>
  <div class="stuhome">
    <b>
      <span class="return" v-show="role==1" @click="myreturn">&lt;</span>
      今日成绩
    </b>
    <p>今日理论成绩：{{scoredata.theory}} 技能：{{scoredata.skill}}</p>
    <p v-show="scoredata.theory>=90&&scoredata.skill>=90">今日成才，给自己点个赞 (*^__^*)</p>

    <div id="myChart" :style="{width: '500px', height: '250px'}"></div>
    <div id="myChart1" :style="{width: '500px', height: '250px'}"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "",
  data() {
    return {
      role: localStorage.role,
      token: localStorage.token,
      scoredata: [],
      theory: [],
      skill: [],
      date: []
    };
  },
  components: {},
  computed: {},
  created() {
    /**
     * 获取个人成绩渲染头页面
     */
    axios
      .get("/api/getuserscore", {
        params: { id: localStorage.id },
        headers: { token: this.token }
      })
      .then(({ data }) => {
        if (data.code == 1) {
          this.scoredata = data.data[0];
        }
      });

    /**
     * 区间
     */
    axios
      .get("/api/area", { headers: { token: localStorage.token } })
      .then(({ data }) => {
        // console.log(data)
        if (data.code == 1) {
          this.areadata = data.arr;
        }
      });

    /**
     * 折线图
     */

    axios
      .get("/api/personscore", {
        params: { uid: localStorage.id },
        headers: { token: localStorage.token }
      })
      .then(({ data }) => {
        if (data.code === 1) {
          this.theory = data.theorys;
          this.skill = data.skills;
          this.date = data.date;
        }
      });
  },
  mounted() {
    this.drawLine();
    this.drawLine1();
  },

  methods: {
    myreturn() {
      this.$router.go(-1);
    },
    /**
     * 柱形图
     */

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      setTimeout(() => {
        myChart.setOption({
          title: {
            text: "今日班级成绩分布图"
          },
          legend: {},
          tooltip: {},
          dataset: {
            dimensions: ["product", "理论", "技能"],
            source: this.areadata.map(item => item)
          },
          xAxis: { type: "category", name: "分数区间" },
          yAxis: { name: "人数" },
          series: [{ type: "bar" }, { type: "bar" }]
        });
      }, 500);
    },

    /**
     * 折线图
     */

    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      setTimeout(() => {
        myChart.setOption({
          title: { text: "本月个人成绩" },
          tooltip: {},
          xAxis: {
            data: this.date,
            name: "日期"
          },
          yAxis: {
            name: "分数",
            maxInterval: 20
          },
          series: [
            {
              name: "技能",
              type: "line",
              data: this.skill
            },
            {
              name: "理论",
              type: "line",
              data: this.theory
            }
          ]
        });
      }, 500);
    }
  }
};
</script>
<style scoped>
.stuhome {
  width: 100%;
  height: 100%;
}
.stuhome .return {
  display: inline-block;
  width: 25px;
  height: 25px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
}
.stuhome b {
  display: block;
  padding: 30px;
  font-weight: 600;
  font-size: 18px;
}
.stuhome p {
  height: 45px;
  line-height: 45px;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
}
.stuhome .today {
  display: block;
  height: 45px;
  font-weight: 600;
  font-size: 18px;
}
</style>