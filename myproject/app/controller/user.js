'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class UserController extends Controller {
    /**
     * 注册
    */
    async register() {
        const { ctx, service } = this;

        let { username, password, num, role = 3 } = ctx.request.body
        // console.log(username, password, num)

        if (username && password && num) {
            /**
             * 加密密码
            */
            let hcmpasd = ctx.helper.hmc(password)
            // console.log(hcmpasd)
            let user = await service.user.norepeat(num)
            // console.log(user)  // []
            if (user.length) {
                ctx.body = {
                    code: 3,
                    msg: "用户已存在"
                }
            } else {
                try {
                    let redisteruser = await service.user.register(username, hcmpasd, num, role)
                    ctx.body = {
                        code: 1,
                        msg: "注册成功",
                        redisteruser
                    }
                } catch (e) {
                    ctx.body = {
                        code: 0,
                        msg: e
                    }
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
      * 登录
    */

    async login() {
        const { ctx, service } = this;
        let { username, password } = ctx.request.body
        let hcmpasd = ctx.helper.hmc(password)
        let arr = await service.user.login(username, hcmpasd)
        // console.log(arr[0])
        if (arr.length) {
            //  生成token查看权限  （数据  自己写的秘钥  时间）
            let token = jwt.sign({ username, roleId: arr[0].role }, '1706e', { expiresIn: 60 * 60 * 48 })
            // console.log(token)
            ctx.body = {
                code: 1,
                msg: "登录成功",
                role:arr[0]['role'],
                id:arr[0]["id"],
                token
            }
        } else {
            ctx.body = {
                code: 0,
                msg: "用户名或密码不正确"
            }
        }
    }

    /**
      * 根据角色查询菜单  （模糊搜索）
    */

    async menu() {
        const { ctx, service } = this
        let { roleId } = ctx.info
        // console.log(roleId)
        // console.log("ctx.info--------------------", ctx.info) //{ username: '胖胖', roleId: '3', iat: 1576129146, exp: 1576215546 }
        if (roleId) {
            try {
                let data = await service.user.rolemenu(roleId)
                ctx.body = {
                    code: 1,
                    data,
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
     * 删除
    */
    async userdelete() {
        const { ctx, service } = this
        let { id } = ctx.query
        try {
            await service.user.userdelete(id)
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
     * 获取所有学生
    */

    async student() {
        let { ctx, service } = this;
        /**
         * 没有录入成绩的同学
         */
        let data = await service.user.student()
        // console.log(data)
        ctx.body = {
            code: 1,
            data
        }
    }

    /**
     * 模糊搜索
     */

    async search() {
        let { ctx, service } = this;
        let { keyword } = ctx.query
        if (keyword) {
            let data = await service.user.search(keyword)
            data.forEach(item=>item.time=`${new Date(item.time).getMonth()+1}-${new Date(item.time).getDate()}`)
            ctx.body = {
                code: 1,
                data
            }
        } else {
            ctx.body = {
                code: 0,
                msg: "暂无数据"
            }
        }
    }

    /**
     * 获取所有学生
      */
    async allstudent() {
        let { ctx, service } = this;
        try {
            let data = await service.user.allstudent()
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
     * 修改学生身份
     */

    async editstudent() {
        let { ctx, service } = this;
        let { role, id } = ctx.request.body
        if (id) {
           await service.user.editstudent(role, id)
            ctx.body = {
                code: 1,
                msg: "修改成功"
            }
        } else {
            ctx.body = {
                code: 0,
                msg: "不做修改"
            }
        }
    }
}

module.exports = UserController;