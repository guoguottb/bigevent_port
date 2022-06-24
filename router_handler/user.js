//router/user.js 结构出去的路由板块

const db = require("../db/index");
const bcrypt = require("bcryptjs");
// 用这个包来生成 Token 字符串
const jwt = require("jsonwebtoken");
const config = require("../config.js");
//登录方法
exports.userLogin = (req, res) => {
  //获取用户用户信息
  const userInfo = req.body;
  //定义sql 查询语句
  const sql = `select * from ev_users where username=?`;
  //执行sql 语句
  db.query(sql, userInfo.username, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);
    // 执行 SQL 语句成功，但是查询到数据条数不等于 1
    if (results.length !== 1) return res.cc("登录失败！");
    // 拿着用户输入的密码,和数据库中存储的密码进行对比
    const compareResult = bcrypt.compareSync(
      userInfo.password,
      results[0].password
    );
    // 如果对比的结果等于 false, 则证明用户输入的密码错误
    if (!compareResult) {
      return res.cc("登录失败！");
    }
    // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
    const user = { ...results[0], password: "", user_pic: "" };
    // 生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: "6h", // token 有效期为 10 个小时
    });
    //最后相应出去成功登录的信息
    res.send({
      status: 0,
      message: "登陆成功",
      token: `Bearer ` + tokenStr,
    });
  });
};
//注册方法
exports.userRigister = (req, res) => {
  const userInfo = req.body;
  if (!userInfo.username || !userInfo.password) {
    return res.cc("用户名或密码不能为空");
  }
  //定义sql语句
  const sql = `SELECT * FROM ev_users WHERE username= ?`;
  //执行sql语句
  db.query(sql, userInfo.username, (err, results) => {
    //首先判断执行错误
    if (err) {
      return res.cc(err);
    }
    //判断用户名是否被占用
    if (results.length > 0) {
      return res.cc("用户名已被占用");
    }
    //对密码进行加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);
    const sql = `INSERT INTO ev_users SET ?`;
    db.query(sql, userInfo, (err, results) => {
      //首先判断sql执行错误
      if (err) {
        return res.cc(err);
      }
      //判断是否成功插入数据库数据
      if (results.affectedRows !== 1) {
        return res.cc("注册失败");
      }
      //返回注册成功的信息
      res.cc("注册成功", 0);
    });
  });
};
