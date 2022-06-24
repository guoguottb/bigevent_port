//router/userinfo.js 结构出来的板块

//与服务器建立关联
const db = require("../db/index");
const bcrypt = require("bcryptjs");

//获取用户信息
exports.getUserInfo = (req, res) => {
  //req.auth对象中  记载了token解密之后的用户信息

  //定义sql查询语句
  const sql = `select * from ev_users where id = ?`;
  //执行sql查询语句
  db.query(sql, req.auth.id, (err, result) => {
    //首先判断sql查询语句失败
    if (err) {
      return res.cc(err);
    }
    // 判断sql 执行语句查询错误
    if (result.length !== 1) {
      res.cc("获取用户信息失败");
    }
    //获取用户信息成功
    res.send({
      status: 0,
      message: "获取用户信息成功",
      data: result[0],
    });
  });
};

//更新用户信息
exports.updateUserInfo = (req, res) => {
  //定义用户信息更新sql语句
  const sql = `update ev_users set ? where id = ?`;
  //执行sql 语句
  db.query(sql, [req.body, req.auth.id], (err, result) => {
    if (err) {
      return res.cc(err);
    }
    //执行sql语句失败
    if (result.affectedRows !== 1) {
      return res.cc("更新用户信息失败");
    }
    //更新用户信息成功
    res.cc("更新用户信息成功", 0);
  });
};

//修改密码
exports.updatePwd = (req, res) => {
  //1.0 判断用户信息是否存在
  //定义sql查询信息
  const sql = `select * from ev_users where id= ?`;
  // 执行sql查询语句
  db.query(sql, [req.auth.id], (err, result) => {
    // 查询错误
    if (err) {
      return res.cc(err);
    }
    // 未获取到用户信息
    if (result.length !== 1) {
      return res.cc("用户不存在！");
    }
    // compareResult 返回值是一个布尔值
    const compareResult = bcrypt.compareSync(
      req.body.oldPwd,
      result[0].password
    );
    if (!compareResult) {
      return res.cc("原密码错误");
    }
    //定义修改密码的sql 语句
    const sql = `update ev_users SET password =? WHERE id = ?`;
    //对新密码进行加密
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
    //执行sql 更新语句
    db.query(sql, [newPwd, req.auth.id], (err, result) => {
      if (err) {
        return res.cc(err);
      }
      if (result.affectedRows !== 1) {
        return res.cc("密码修改失败");
      }
      // 用户存在的情况
      res.cc("密码修改成功", 0);
    });
  });
};

//更新头像
exports.updateAvatar = (req, res) => {
  res.send("ok");
};
