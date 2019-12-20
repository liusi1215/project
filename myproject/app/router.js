'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  /*
   * 注册
   */
  router.post('/api/register', controller.user.register);

  /*
   * 登录
   */
  router.post('/api/login', controller.user.login);

  /*
   * 根据角色查询菜单
   */

  router.get('/api/menu', controller.user.menu);

  /*
   * 删除学生
   */

  router.get('/api/userdelete', controller.user.userdelete);

  /*
   * 获取所有学生
   */

  router.get('/api/student', controller.user.student);

  /*
   * 录入成绩
   */

  router.post('/api/getscore', controller.score.getscore);

  /*
   * 分页器
   */
  router.post('/api/scorelimit', controller.score.scorelimit)

  /*
   * 删除成绩
   */

  router.get('/api/scoredelete', controller.score.scoredelete);

  /**
   * 修改
  */

  router.post('/api/scoreedit', controller.score.scoreedit);

  /**
   * 获取录入过成绩的所有同学
  */

  // router.get('/api/scoreall', controller.score.scoreall)

  /**
   * 模糊搜索
  */

  router.get('/api/search', controller.user.search)

  /**
   * 获取所有学生
  */

  router.get("/api/allstudent", controller.user.allstudent)

  /**
   * 修改学生身份
   */

  router.post('/api/editstudent', controller.user.editstudent)

  /**
   * 获取单个学生的成绩
   */

  router.get('/api/getuserscore', controller.score.getuserscore)

  /**
   * 获取学生理论，技能，日期
   */

  router.post('/api/getskill', controller.score.getskill)

  /**
   * 获取今日班级的数据
   */

  // router.get('/api/dayclass', controller.score.dayclass)

  /**
   * 班级今日是否成才数据
   */
  router.get('/api/todays', controller.score.todayyes);

  /**
   * 班级今日成才区间
   */
  router.get('/api/area', controller.score.area);
  /**
   * 班级本月成材折线图
   */
  router.get('/api/days', controller.score.days);

  /**
   * 获取单个同学正月成绩折线图
   */
  router.get('/api/personscore', controller.score.personscore);
};
