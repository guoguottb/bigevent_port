const express = require("express");
const router = express.Router();
// 导入解析 formdata 格式表单数据的包
const multer = require("multer");
//导入处理路径的核心模块
const path = require("path");
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, "../oploads") });
// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
const expressjoi = require("@escook/express-joi");
const { add_article_schema } = require("../schema/article");
//导入路由
const { addArticle } = require("../router_handler/article");

router.post("/add", upload.single("cover_img"),expressjoi(add_article_schema), addArticle);

module.exports = router;
