const joi = require("joi");

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

//添加文章分类校验规则
const name = joi.string().required(); //
const alias = joi.string().required().alphanum();
exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
};

//删除文章分类校验规则
const id = joi.number().integer().min(1).required()
exports.delete_cate_schema = {
  params: {
    id,
  },
};

//根据id获取文章分类信息的校验规则
const getid = joi.number().integer().min(1).required()
exports.get_cate_schema = {
  params: {
   id:getid
  },
};

//更新文章分类校验规则
exports.update_cate_schema = {
    body :{
        id,
        name,
        alias
    }
}