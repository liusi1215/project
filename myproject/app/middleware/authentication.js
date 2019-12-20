
const jwt = require('jsonwebtoken')

module.exports = () => {
    return async (ctx, next) => {
        // 获取前端传递的token并进行校验
        let arr = ['/api/login', '/api/register'];
        // console.log("ctx.path:::::",ctx.path) //ctx.path::::: /api/login
        if (arr.includes(ctx.path)) {
            await next()
        } else {
            try {
                let token = ctx.get('token')
                ctx.info = jwt.verify(token, '1706e')
                await next()
            } catch (e) {
                if(e.name=="TokenExpiredError"||e.name=="JsonWebTokenError"){
                    ctx.status=401
                }
                ctx.body = {
                    code: 0,
                    msg: e
                }
            }
        }
    }
}