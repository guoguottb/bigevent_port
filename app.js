//导入第三方模块包
const express = require("express");
const { expressjwt: expressjwt } = require("express-jwt");
const config = require("./config");
const joi = require("joi");

//处理浏览器跨越问题的第三方包
const cors = require("cors");

//生成服务器实例对象
const app = express();
//利用中间件 封装res.send方法   简化代码
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    console.log(err);
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

//解决浏览器跨越问题
app.use(cors());

//配置解析 格式的表单数据的中间件：application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
  expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
);

app.use('/uploads', express.static('./uploads'))

//导入登录注册模块接口
const router = require("./router/user");
app.use("/api", router);

// 导入用户信息模块 /my/userinfo
const userinfoRouter = require("./router/userinfo");
app.use("/my", userinfoRouter);

//导入文章测试模块
const artCateRouter = require("./router/artcate");
app.use('/my',artCateRouter)

//导入并注册文章管理路由模块
const articleRouter = require("./router/article")
app.use("/my/article",articleRouter)

// token 测试接口
app.get("/my/token", (req, res) => {
  res.send("ok");
});

// 设置错误中间件
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    return res.cc(err.message);
  }
  // tokekn 错误/失效 中间件
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
  res.cc(err);
});

//监测端口
app.listen(80, () => {
  console.log("Server is running on port 80");
});
