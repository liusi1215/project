const Service = require('egg').Service;

const moment = require('moment');

class UserService extends Service {

    /**
     * 注册
     */
    async register(username, hcmpasd, num, role) {
        return await this.app.mysql.query('insert into userlist (username , password , num,role) values (?,?,?,?)', [username, hcmpasd, num, role]);
    }

    /**
     * 登录
     */

    async login(username, hcmpasd) {
        return await this.app.mysql.query('select * from userlist where username=? and password=? ', [username, hcmpasd]);
    }


    /**
     * 去重
     */
    async norepeat(num) {
        return await this.app.mysql.query('select * from userlist where num=?', [num]);
    }

    /**
     * 根据角色分配主菜单   （用模糊搜索）
     */
    async rolemenu(roleId) {
        return await this.app.mysql.query(`select * from menulist where power like '%${roleId}%'`, [roleId]);
    }

    /**
     * 获取今天所有还没有录入成绩的同学
     */
    async student() {
        let time = moment().format('YYYY-MM-DD');
        /**
         * 多表联查
         * 学生表内的人不在成绩表内再录入成绩
         */
        return await this.app.mysql.query('select * from userlist where userlist.id not in (select uid  from scorelist where DATE_FORMAT(scorelist.time,"%Y-%m-%d")=?) and userlist.role in (2,3)', [time])
    }

    /**
     * 删除
     */
    async userdelete(id) {
        return await this.app.mysql.query('delete from userlist where id=?', [id]);
    }

    /**
    * 模糊搜索
    */
    async search(keyword) {
        return await this.app.mysql.query(`select * from scorelist where username like '%${keyword}%'`);
    }

    /**
    * 获取所有学生
    */
    async allstudent() {
        return await this.app.mysql.query('select * from userlist where role not in (1)');
    }
    /**
    * 修改学生身份
    */
    async editstudent(role, id) {
        return await this.app.mysql.query('update userlist set role=? where id=?', [role, id]);
    }
}

module.exports = UserService;