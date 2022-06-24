const express = require("express");
//生成router 服务器实例对象
const router = express.Router();

//导入校验规则所需包
const expressjwt = require("@escook/express-joi");

//导入校验规则
const {
  reg_updade_userinfo,
  update_password_schema,
  update_avatar_schema,
} = require("../schema/user");

//导入结构出去的路由板块
const {
  getUserInfo,
  updateUserInfo,
  updatePwd,
  updateAvatar,
} = require("../router_handler/userinfo");

//获取用户信息
router.get("/userinfo", getUserInfo);

//更新用户信息
router.post("/userinfo", expressjwt(reg_updade_userinfo), updateUserInfo);

//更新密码
router.post("/updatepwd", expressjwt(update_password_schema), updatePwd);

//更新头像
router.post("/update/avatar", expressjwt(update_avatar_schema), updateAvatar);

//导出router
module.exports = router;
