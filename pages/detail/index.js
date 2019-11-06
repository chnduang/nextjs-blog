import React, { Fragment, useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import MarkNav from 'markdown-navbar'
import { Row, Col, Breadcrumb, Icon, Affix, notification} from 'antd'

import Header from '../../components/common/Header'
import Writer from '../../components/common/Writer'
import AdContent from '../../components/common/Ad'
import Tocify from '../../components/tocify.tsx'
import urlPath from '../../config/url'

import 'highlight.js/styles/monokai-sublime.css'
import 'markdown-navbar/dist/navbar.css'
import '../../assets/css/detail.css'

const { getDetailList: detailList, updateContent } = urlPath

const PageDetail = (props) => {
  console.log(props);
  const [ detail, setDetail ] = useState(props.data[0])
  
  useEffect(() => {
    const update = async () => {
      const result = await axios.put(`${updateContent}`, {
        id: detail.id,
        view_count: detail.view_count + 1,
      })
      if (result) {
        notification.open({
          message: '文章',
          description:
            '已进入文章详情',
          icon: <Icon type="smile" theme="twoTone" />,
        });
      }
    };
    update()
  }, [])

  const tocify = new Tocify()
  const renderer = new marked.Renderer();
    renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
   
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  const html = marked(detail.article_content) 

  return(
    <Fragment>
      <Head>
        <title>详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={0} sm={0} md={7} lg={5} xl={6}>
          <Writer />
          <AdContent />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
        <Col className="comm-box" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{detail.typeName}</Breadcrumb.Item>
                  <Breadcrumb.Item> {detail.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div>
                <div className="detailed-title">
                  {detail.title}
                </div>
                <div className="list-icon center">
                    <span><Icon type="calendar" /> {detail.addTime}</span>
                    <span><Icon type="folder" /> {detail.typeName}</span>
                    <span><Icon type="fire" /> {detail.view_count}</span>
                </div>
                <div className="detailed-content"  
                  dangerouslySetInnerHTML = {{__html:html}}   >
                </div>
              </div>   
            </div>
        </Col>
      </Row>
    </Fragment>
  )
}

PageDetail.getInitialProps = async (ctx) => {
  const id = ctx.query.id
  const promise = new Promise((resolve) => {
    axios.get(`${detailList}/${id}`).then((res) =>{
      resolve(res.data)
    })
  })
  return await promise
}

export default PageDetail
