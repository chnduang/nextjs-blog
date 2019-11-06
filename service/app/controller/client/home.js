'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const result = await this.app.mysql.select('blog_title', {});
    // console.log(result);
    ctx.body = result;
  }

  async getArticleList() {
    const { ctx } = this;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime," +
                'article.view_count as view_count ,' +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id order by article.addTime desc';
    const results = await this.app.mysql.query(sql);
    ctx.body = {
      data: results,
    };
  }

  async getArticleListBy() {
    const { ctx } = this;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime," +
                'article.view_count as view_count ,' +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id order by article.view_count desc';
    const results = await this.app.mysql.query(sql);
    ctx.body = {
      data: results,
    };
  }

  async getDetailList() {
    const { ctx } = this;
    const id = ctx.params.id;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.article_content as article_content ,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime," +
                'article.view_count as view_count ,' +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'WHERE article.id=' + id;

    const results = await this.app.mysql.query(sql);
    ctx.body = {
      data: results,
    };
  }

  async getTypeList() {
    const { ctx } = this;
    const results = await this.app.mysql.select('type');
    ctx.body = {
      data: results,
    };
  }

  // 根据类别ID获得文章列表
  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE type_id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  // 存储文章
  async saveContent() {
    // const sql = {
    //   type_id: 1,
    //   title: 'blog_demo9',
    //   article_content: 'dsasfafa',
    //   introduce: 'demo_blog9',
    // };
    const { ctx } = this;
    const sql = ctx.request.body;
    // console.log(sql);
    try {
      const result = await this.app.mysql.insert('article', sql);
      if (result.affectedRows === 1) {
        ctx.body = {
          data: { code: 1, msg: '数据插入成功' },
        };
      }
    } catch (error) {
      ctx.body = error;
    }
  }

  // 更新文章
  async updateContent() {
    const { ctx } = this;
    const sql = ctx.request.body;
    // console.log(sql);
    try {
      const result = await this.app.mysql.update('article', sql);
      if (result.affectedRows === 1) {
        ctx.body = {
          data: { code: 1, msg: '数据更新成功' },
        };
      }
    } catch (error) {
      ctx.body = error;
    }
  }
}

module.exports = HomeController;
