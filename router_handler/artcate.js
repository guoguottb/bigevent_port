//与服务器关联
const db = require("../db/index");
//获取文章分类
exports.getArtCate = (req, res) => {
  //定义sql查询语句 并且让id以升序展示
  const sql = `select * from ev_article_cate where is_delete = 0 order by id asc`;
  //执行sql语句
  db.query(sql, (err, result) => {
    //sql语句执行错误
    if (err) {
      return res.cc(res);
    }
    //查询文章分类失败
    if (result.length <= 0) {
      return res.cc("获取文章分类列表失败");
    }
    //获取文章分类列表成功
    res.send({
      status: 0,
      message: "获取文章分类列表成功",
      data: result,
    });
  });
};

//新增文章分类
exports.addArticleCates = (req, res) => {
  //定义sql 语句
  const sql = `SELECT * FROM ev_article_cate where name=? or alias=?`;
  //执行sql 语句
  db.query(sql, [req.body.name, req.body.alias], (err, result) => {
    //先判断sql 语句执行错误
    if (err) {
      return res.cc(err);
    }
    //判断分类名称和别名都被占用
    if (result.length === 2) {
      return res.cc("分类名称和别名都被占用");
    }
    if (
      result.length === 1 &&
      result[0].name === req.body.name &&
      result[0].alias === req.body.alias
    ) {
      return res.cc("已存在分类，请稍后重试");
    }
    //判断 查询行数为1的时候 分类名称和分类别名是否被占用
    if (result.length === 1 && result[0].name === req.body.name) {
      return res.cc("分类名称被占用");
    }
    if (result.length === 1 && result[0].alias === req.body.alias) {
      return res.cc("分类别名被占用");
    }
    // 以上都不满足，没有发生名称冲突，即插入文章分类
    //定义插入文章分类的sql语句
    const addSql = `insert into ev_article_cate set ?`;
    //执行命令
    db.query(addSql, req.body, (err, result) => {
      //数据库执行错误
      if (err) {
        return res.cc(err);
      }
      // 添加失败
      if (result.affectedRows !== 1) {
        return res.cc("添加文章分类失败");
      }
      //添加成功
      res.cc("添加文章分类成功", 0);
    });
  });
};

//删除文章分类
exports.deleteCateById = (req, res) => {
  //定义sql
  const sql = `update ev_article_cate set is_delete = 1 where id = ?`;
  //执行sql
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      return res.cc(err);
    }
    if (result.affectedRows !== 1) {
      return res.cc("删除文章分类失败");
    }
    res.cc("删除分类成功", 0);
  });
};

//根据文章分类id，获取对应的文章分类信息
exports.getArtcateById = (req, res) => {
  //定义sql
  const sql = `select * from ev_article_cate where id = ?`;
  //执行sql
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      return res.cc(err);
    }
    if (result.length !== 1) {
      return res.cc("获取文章分类失败");
    }
    if (result[0].is_delete === 1) {
      return res.cc("该文章分类已被删除");
    }
    res.send({
      status: 0,
      message: "获取文章分类成功",
      data: result[0],
    });
  });
};

//更新文章分类
exports.updatecateById = (req, res) => {
  //定义sql
  const sql = `select * from ev_article_cate where id <> ? and (name=? or alias=?)`;
  //执行sql
  db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, result) => {
    //先判断sql 语句执行错误
    if (err) {
      return res.cc(err);
    }
    //判断分类名称和别名都被占用
    if (result.length === 2) {
      return res.cc("分类名称和别名都被占用");
    }
    if (
      result.length === 1 &&
      result[0].name === req.body.name &&
      result[0].alias === req.body.alias
    ) {
      return res.cc("已存在分类，请稍后重试");
    }
    //判断 查询行数为1的时候 分类名称和分类别名是否被占用
    if (result.length === 1 && result[0].name === req.body.name) {
      return res.cc("分类名称被占用");
    }
    if (result.length === 1 && result[0].alias === req.body.alias) {
      return res.cc("分类别名被占用");
    }
    //更新文章分类
    const sql = `update ev_article_cate set ? where id = ?`;
    //执行sql
    db.query(sql,[req.body,req.body.id],(err,result)=>{
      if(err) {
        return res.cc(err)
      }
      if(result.affectedRows !== 1) {
        return res.cc("更新文章分类失败")
      }
      res.cc("更新文章分类成功",0)
    })
  });
};
