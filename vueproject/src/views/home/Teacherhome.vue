<!--  -->
<template>
  <div class="stuhome">
    <div id="myChart2" :style="{width: '700px', height: '220px'}"></div>
    <div id="myChart" :style="{width: '700px', height: '240px'}"></div>
    <div id="myChart1" :style="{width: '700px', height: '220px'}"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "",
  data() {
    return {
      token: localStorage.token,
      areadata: [],
      theory: [],
      date: [],
      yestoday: [],
      notoday: []
    };
  },
  components: {},
  computed: {},
  created() {
    /**
     * 折线图的数据
     */
    axios
      .get("/api/days", {
        headers: { token: localStorage.token }
      })
      .then(({ data }) => {
        // console.log(data);
        if (data.code === 1) {
          this.theory = data.daysArr;
          this.date = data.data;
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
     * 今日成材和未成材人数
     */
    axios
      .get("/api/todays", { headers: { token: localStorage.token } })
      .then(({ data }) => {
        // console.log(data)
        this.yestoday = data.yesArr;
        this.notoday = data.noArr;
      });
  },

  mounted() {
    this.drawLine();
    this.drawLine1();
    this.drawLine2();
  },

  methods: {
    /**
     * 扇形图
     */

    drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表 s
      setTimeout(() => {
        myChart.setOption({
          title: {
            text: "今日成材率"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            right: "right",
            data: ["成材", "不成材"]
          },
          series: [
            {
              name: "成材率",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: this.yestoday.length, name: "成材" },
                { value: this.notoday.length, name: "不成材" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        });
      }, 500);
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
            text: "今日成材分析"
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
      // 绘制图表 zhexian
      setTimeout(() => {
        myChart.setOption({
          title: { text: "本月成材情况" },
          tooltip: {},
          xAxis: {
            data: this.date,
            name: "日期"
          },
          yAxis: {
            name: "成材人数"
          },
          series: [
            {
              name: "成材人数",
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
#myChart{
  margin: 40px 0
} 
</style>