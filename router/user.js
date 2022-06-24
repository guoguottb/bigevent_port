const express = require("express");

const router = express.Router();

const expressJoi = require("@escook/express-joi");
const { reg_login_schema } = require("../schema/user");
//导入router_handler 下面的结构模块
const { userLogin, userRigister } = require("../router_handler/user");
//登录接口
router.post("/login", expressJoi(reg_login_schema), userLogin);
//注册接口
router.post("/register", expressJoi(reg_login_schema), userRigister);
//挂载导出路由
module.exports = router;
