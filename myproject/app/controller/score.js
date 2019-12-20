
const Controller = require('egg').Controller;

const moment = require('moment');

class ScoreController extends Controller {

    /**
     * 录入成绩
    */

    async getscore() {
        const { ctx, service } = this;
        let { theory, skill, username } = ctx.request.body
        // console.log("11111111111111111111", theory, skill, username, num) //100 90 胖胖 18


        // console.log("22222222222222", time) //2019-12-12
        if (theory && skill && username) {
            /**
         *  获取当前时间
        */
            let time = moment().format('YYYY-MM-DD');
            try {
                let uid = await service.score.uid(username)
                let data = await service.score.getscore(theory, skill, username, time, uid[0]['id'])
                ctx.body = {
                    code: 1,
                    msg: "录入成功",
                    data
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    msg: e
                }
            }
        } else {
            ctx.body = {
                code: 2,
                msg: "缺失参数"
            }
        }
    }

    /**
     * 修改
     */

    async scoreedit() {
        let { ctx, service } = this;
        let { theory, skill, id } = ctx.request.body
        if (theory && skill && id) {
            try {
                await service.score.scoreedit(theory, skill, id)
                ctx.body = {
                    code: 1,
                    msg: "修改成功"
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    msg: e
                }
            }
        } else {
            ctx.body = {
                code: 2,
                msg: "缺少参数"
            }
        }
    }

    /**
     * 删除成绩
     */

    async scoredelete() {
        let { ctx, service } = this;
        let { id } = ctx.query
        try {
            await service.score.scoredelete(id)
            ctx.body = {
                code: 1,
                msg: "删除成功"
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }
    }

    /**
     * 获取录入过成绩的同学
     */

    // async scoreall() {
    //     let { ctx, service } = this;
    //     try {
    //         let scoredata = await service.score.scoreall()
    //         console.log(scoredata)
    //         ctx.body = {
    //             code: 1,
    //             scoredata
    //         }
    //     } catch (e) {
    //         ctx.body = {
    //             code: 0,
    //             msg: e
    //         }
    //     }
    // }
    /**
     * 分页器
     */

    async scorelimit() {
        let { ctx, service } = this;
        let { page, pagesize } = ctx.request.body
        if (page && pagesize) {
            let start = (page - 1) * pagesize //起始下标
            let total = await service.score.scoretotal() //总条数
            // console.log(total)
            try {
                let limitdata = await service.score.scorelimit(start, pagesize) //每页多少条
                // console.log(limitdata)
                ctx.body = {
                    code: 1,
                    data: limitdata,
                    total: total[0]['count(*)']
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    msg: e
                }
            }
        } else {
            ctx.body = {
                code: 0,
                msg: "缺失参数"
            }
        }
    }

    /**
     * 获取单个学生的成绩
     */
    async getuserscore() {
        let { ctx, service } = this;
        let { id } = ctx.query
        try {
            let data = await service.score.getuserscore(id)
            // console.log(data)
            ctx.body = {
                code: 1,
                data
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }
    }

    /**
   * 获取学生理论，技能，日期
   */

    async getskill() {
        let { ctx, service } = this;
        let { num } = ctx.request.body;
        let theorys = [];
        let skills = [];
        let date = [];
        try {
            let data = await service.score.getskill(num)
            data.forEach(item => {
                theorys.push(item.theory)
                skills.push(item.skill)
                date.push(`${new Date(item.time).getMonth()+1}-${new Date(item.time).getDate()}`)
            })
            ctx.body = {
                code: 1,
                theorys,
                skills,
                date
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }

    }

    /**
  * 获取今日班级的数据
  */
    // async dayclass() {
    //     let { ctx, service } = this;
    //     let time = moment().format('YYYY-MM-DD');
    //     let data = await service.score.dayclass(time);
    //     let theorys = [];
    //     let skills = [];
    //     let date = [];
    //     data.forEach(item => {
    //         theorys.push(item.theory)
    //         skills.push(item.skill)
    //         date.push(`${new Date(item.time).getMonth()+1}-${new Date(item.time).getDate()}`)
    //         // date.push(item.username)
    //     })
    //     ctx.body = {
    //         code: 1,
    //         theorys,
    //         skills,
    //         date
    //     }
    // }

    /**
     * 今日成才和不成材人员
     */
    async todayyes() {
        let { ctx, service } = this;
        let time = moment().format('YYYY-MM-DD')
        try {
            let yesArr = await service.score.todayyes(time)
            let noArr = await service.score.todayno(time)
            // console.log(yesArr,noArr)
            ctx.body = {
                code: 1,
                yesArr,
                noArr
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }
    }

    /**
      * 今日区间
    */
    async area() {
        let { ctx, service } = this;
        let areas = ['0-69', '70-79', '80-89', '90-100'];
        let arr = []
        // console.log(areas)
        // {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7}
        try {
            for (var i = 0; i < areas.length; i++) {
                // console.log(11)
                let aa = await service.score.area(areas[i], 'theory')
                let bb = await service.score.area(areas[i], 'skill')
                // console.log(aa, bb)
                arr.push({ product: areas[i], '理论': aa[0]['count(*)'], '技能': bb[0]['count(*)'] })
            }
            ctx.body = {
                code: 1,
                arr
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }
    }

    /**
   * 班级本月成材折线图
   */
    async days() {
        let { ctx, service } = this;
        try {
            let times = await service.score.days()
            let timesArr = []
            let data = []
            let daysArr = []

            for (let i = 0; i < times.length; i++) {
                if (!timesArr.find(item => new Date(item.time).getDate() == new Date(times[i].time).getDate())) {
                    timesArr.push(times[i])
                }
            }

            for (let i = 0; i < timesArr.length; i++) {
                data.push(`${new Date(timesArr[i].time).getMonth() + 1}-${new Date(timesArr[i].time).getDate()}`)
                let aa = await service.score.daysyes(`${new Date(timesArr[i].time).getFullYear()}-${new Date(timesArr[i].time).getMonth() + 1}-${new Date(timesArr[i].time).getDate()}`)
                let bb = aa[0]["count(*)"]
                daysArr.push(bb)

            }

            ctx.body = {
                code: 1,
                data,
                daysArr
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }
    }

    /**
     * 获取单个同学整月成绩折线图
     */
    async personscore() {
        let { ctx, service } = this;
        let { uid } = ctx.query;
        if (uid) {
            try {
                let time = moment().format('YYYY-MM')
                let theorys=[]
                let skills=[]
                let date=[]
                let arr = await service.score.personscore(uid,time)
                for(let i=0;i<arr.length;i++){
                    theorys.push(arr[i].theory)
                    skills.push(arr[i].skill)
                    date.push(`${new Date(arr[i].time).getMonth() + 1}-${new Date(arr[i].time).getDate()}`)
                }
                ctx.body = {
                    code: 1,
                    theorys,
                    skills,
                    date
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    msg: e
                }
            }
        } else {
            ctx.body = {
                code: 2,
                msg: "缺少参数"
            }
        }
    }
}

module.exports = ScoreController