import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {Row,Col, Menu, Icon} from 'antd'
import axios from 'axios'

import urlPath from '../../../config/url'

import '../../../assets/css/header.css'

const { getTypeInfo: typeUrl } = urlPath

const PageHeader = () => {

  const [typeList, setTypeList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${typeUrl}`).then((res) => {
        return res.data.data
      })
      console.log(result);
      setTypeList(result)
    }
    fetchData()
  }, [])

  const handleClick = (e) => {
    console.log(e);
    if (e.key === '0') {
      Router.push({
        pathname: '/'
      })
    } else {
      Router.push({
        pathname: '/list',
        query: {
          id: e.key,
        },
      })
    }
  }

  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col className="memu-div" xs={0} sm={0} md={14} lg={9} xl={9}>
            <Menu 
              mode="horizontal"
              onClick={handleClick}
            >
                <Menu.Item key="0">
                    <Icon type="home" />
                    首页
                </Menu.Item>
                {
                  typeList.map((item)=>{
                  const keyId = item.id
                  return(
                    <Menu.Item key={keyId}>
                        <Icon type={item.icon} />
                        {item.typeName}
                    </Menu.Item>
                  )
                  }) 
                }
            </Menu>
        </Col>
        <Col className="menu-right" xs={24} sm={24} md={10} lg={15} xl={12}>
            <span className="header-writer">
              <Link href={{pathname: '/edit'}}>
                <a>
                  <Icon type="highlight" />
                  写博客
                </a>
              </Link>
            </span>
            <span className="header-logo">
              <Link href={{pathname: '/'}}>
                <a>self-blog</a>
              </Link>
            </span>
            <span className="header-txt">blog-demo学习</span>
        </Col>
      </Row>
    </div>
  )
}

export default PageHeader
