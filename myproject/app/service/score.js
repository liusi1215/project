const Service = require('egg').Service;

const moment = require('moment');

class ScoreService extends Service {

    /**uid */
    async uid(username) {
        return await this.app.mysql.query("select * from userlist where username=?", [username])
    }

    /**
      * 录入成绩
      */
    async getscore(theory, skill, username, time, uid) {
        console.log(time, "====")
        await this.app.mysql.query('insert into scorelist (theory, skill, username,time,uid ) values (?,?,?,?,?)',
            [theory, skill, username, time, uid])
    }

    /**
     * 删除成绩
    */

    async scoredelete(id) {
        return await this.app.mysql.query('delete from scorelist where id=?', [id])
    }

    /**
     * 修改成绩
    */
    async scoreedit(theory, skill, id) {
        return await this.app.mysql.query('update scorelist set theory=?,skill=?  where id=?', [theory, skill, id])
    }

    /**
     * 获取有成绩的所有同学
    */

    async scoreall() {
        return await this.app.mysql.query('select * from scorelist')
    }

    /**
     * 分页器
     */

    async scorelimit(start, pagesize) {
        /**
         * 获取当前时间
         */
        return await this.app.mysql.query(`select * from scorelist limit ${start} ,${pagesize}`)
    }
    /**
     * 获取总页数
     */

    async scoretotal() {
        return await this.app.mysql.query("select count(*) from scorelist")
    }

    /**
     * 获取某个人的成绩
     */

    async getuserscore(id) {
        let time = moment().format('YYYY-MM-DD')
        return await this.app.mysql.query("select * from scorelist where uid=? and DATE_FORMAT(scorelist.time,'%Y-%m-%d')=?", [id, time])
    }

    /**
     * 获取学生理论，技能，日期
     */

    async getskill(num) {
        return await this.app.mysql.query('select * from scorelist where num=?', [num]);
    }

    /**
      * 获取今日班级的数据
      */

    // async dayclass(time) {
    //     return await this.app.mysql.query('select * from scorelist where date_format(time,"%Y-%m-%d")=?', [time])
    // }

    // 班级今日成才人员
    async todayyes(time) {
        return await this.app.mysql.query("select * from scorelist where (scorelist.theory>=90 and scorelist.skill>=90) and DATE_FORMAT(scorelist.time,'%Y-%m-%d')=?", [time])
    }

    /**
     *   班级今日不成才人员
     */
    async todayno(time) {
        return await this.app.mysql.query("select * from scorelist where (scorelist.theory<90 or scorelist.skill<90) and DATE_FORMAT(scorelist.time,'%Y-%m-%d')=?", [time])
    }

    /**
     * 区间
     */
    async area(areas, string) {
        // console.log(22222222222222)
        let min = areas.split("-")[0];
        let max = areas.split("-")[1];
        let time = moment().format('YYYY-MM-DD')
        return await this.app.mysql.query(`select count(*) from scorelist where (scorelist.${string}>=${min} and scorelist.${string}<=${max}) and DATE_FORMAT(scorelist.time,'%Y-%m-%d')=?`, [time])
    }

    // 本月成材折线图
    async days() {
        let time = moment().format('YYYY-MM');
        return await this.app.mysql.query("select * from scorelist where DATE_FORMAT(scorelist.time,'%Y-%m')=?", [time])
    }
    async daysyes(time) {
        return await this.app.mysql.query("select count(*) from scorelist where (scorelist.theory>=90 and scorelist.skill>=90) and DATE_FORMAT(scorelist.time,'%Y-%m-%d')=?", [time])
    }

    /**
    * 获取单个同学整月成绩折线图
    */
    async personscore(uid, time) {
        return await this.app.mysql.query('select * from scorelist where uid=? and date_format(time,"%Y-%m")=?', [uid, time])
    }
}

module.exports = ScoreService