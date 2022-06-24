const express = require("express");
//生成服务器实例对象router
const router = express.Router();
//导入路由板块
const {
  getArtCate,
  addArticleCates,
  deleteCateById,
  getArtcateById,
  updatecateById,
} = require("../router_handler/artcate");

//导入解析joi的包
const expressjoi = require("@escook/express-joi");
//校验规则会挂载在router路由第二个形参上，作为局部生效的中间件使用
const {
  add_cate_schema,
  delete_cate_schema,
  get_cate_schema,
  update_cate_schema,
} = require("../schema/artcate");

//获取文章分类
router.get("/cates", getArtCate);

//新增文章分类
router.post("/addcates", expressjoi(add_cate_schema), addArticleCates);

//根据文章分类 id 删除文章分类
router.get("/deletecate/:id", expressjoi(delete_cate_schema), deleteCateById);

//id获取文章分类信息
router.get("/cates/:id", expressjoi(get_cate_schema), getArtcateById);

//更新文章分类
router.post("/updatecate", expressjoi(update_cate_schema), updatecateById);

//导出router
module.exports = router;
