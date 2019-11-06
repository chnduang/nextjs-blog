import React, { useState, useEffect, Fragment } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import { List, Icon, Row, Col } from 'antd'

import Header from '../../components/common/Header'
import Writer from '../../components/common/Writer'
import AdContent from '../../components/common/Ad'

import urlPath from '../../config/url'

const { getIdList: listUrl } = urlPath

const PageList = (ctx) => {

  const [ list, setList ] = useState(ctx.data)

  useEffect(()=>{
    setList(ctx.data)
  })

  return (
    <Fragment>
      <Head>
        <title>分类列表</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={0} sm={0} md={7} lg={5} xl={6}>
          <Writer />
          <AdContent />
        </Col>
        <Col className="comm-box" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <List
              header={<div className="article-title">文章分类/</div>}
              itemLayout="vertical"
              dataSource={list}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                      <Link 
                        href={{
                          pathname:'/detail',
                          query:{id:item.id}
                        }}
                      >
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" />{item.addTime}</span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" />  {item.view_count}人</span>
                  </div>
                  <div className="list-context">{item.introduce}</div>  
                </List.Item>
              )}
            />  
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}

PageList.getInitialProps = async (ctx) => {
  const id = ctx.query.id;
  const promise = new Promise((resolve)=> {
    axios.get(`${listUrl}/${id}`).then((res) => {
      resolve(res.data)
    })
  })
  return await promise
}

export default PageList
