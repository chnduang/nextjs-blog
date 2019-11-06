import React, { Fragment, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'

import { Row, Col, List, Icon, notification } from 'antd'
import Header from '../components/common/Header'
import Writer from '../components/common/Writer'
import AdContent from '../components/common/Ad'
import urlPath from '../config/url'

import '../assets/css/index.css'

const { getArticleList: getList, getArticleListBy: getListBy, getTypeInfo: getType } = urlPath;

const Home = (props) => {
  const articleList = props.articleList.data
  const typeList = props.typeList.data
  const [myList, setMyList ] = useState(articleList)
  const [typeDataList, setDataList ] = useState(typeList)
  console.log(props);

  const handleNum = (name) => {
    const filterNum = myList.filter((item) => {
      return item.typeName === name
    })
    console.log(filterNum);
    return filterNum.length;
  }

  const handleOrder = async () => {
    const result = await axios.get(`${getListBy}`)
    if (result) {
      console.log(result);
      setMyList(result.data.data);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={0} sm={0} md={7} lg={5} xl={6}>
          <Writer />
          <AdContent />
          <div className="comm-box">
            <List
              header={<div className="">分类专栏</div>}
              itemLayout="vertical"
              dataSource={typeDataList}
              renderItem={item => (
                <List.Item>
                  <div>
                    <Link href={{pathname: '/list', query:{id: item.id}}}>
                      <a className="type-link">
                        <span className="type-text">
                          <img className="type-img" src="https://img-blog.csdnimg.cn/20190918140053667.png" alt=""/>
                          {item.typeName}
                        </span>
                        <span className="type-count">{handleNum(item.typeName)}篇</span>
                      </a>
                    </Link>
                  </div>
                </List.Item>
              )}
            />
          </div>
          <div className="comm-box">
            <List
              header={<div className="">最新文章</div>}
              itemLayout="vertical"
              dataSource={myList}
              renderItem={item => (
                <List.Item>
                  <div>
                    <Link href={{pathname: '/detail', query:{id: item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                </List.Item>
              )}
            />  
          </div>
        </Col>
        <Col className="comm-box" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <List
                header={
                  <div className="article-header">
                    <div className="article-title">文章日志</div>
                    <div>
                      <span onClick={() => handleOrder()}>按时间排序</span>
                      <span onClick={() => handleOrder()}>按浏览量排序</span>
                    </div>
                  </div>
                }
                itemLayout="vertical"
                dataSource={myList}
                renderItem={item => (
                  <List.Item>
                    <div className="list-title">
                      <Link href={{pathname: '/detail', query:{id: item.id}}}>
                        <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icon">
                      <span><Icon type="calendar" /> {item.addTime}</span>
                      <span><Icon type="folder" /> {item.typeName}</span>
                      <span><Icon type="fire" /> {item.view_count}人</span>
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

Home.getInitialProps = async () => {
  const promiseList = new Promise((resolve) => {
    axios.get(getList).then((res) => {
      resolve(res.data)
    })
  })
  const promiseType = new Promise((resolve) => {
    axios.get(getType).then((res) => {
      resolve(res.data)
    })
  })
  return {
    articleList: await promiseList, 
    typeList: await promiseType
  }
}

export default Home
