import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {Row,Col, Menu, Icon, Input, Button} from 'antd'
import axios from 'axios'

import '../../assets/css/edit-header.css'

const EditHeader = () => {

  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col className="edit-left" xs={0} sm={0} md={14} lg={6} xl={6}>
            <Menu 
              mode="horizontal"
            >
              <Menu.Item key="0">
                  <Icon type="edit" />
                  文章标题
              </Menu.Item>
            </Menu>
        </Col>
        <Col xs={0} sm={0} md={14} lg={6} xl={12}>
            <Input size="large" placeholder="输入文章标题" />
        </Col>
        <Col className="edit-right" xs={24} sm={24} md={10} lg={12} xl={6}>
            <Button type="primary" size="large">发表文章</Button>
            <span className="header-logo">
              <Link href={{pathname: '/'}}>
                <a>self-blog</a>
              </Link>
            </span>
        </Col>
      </Row>
    </div>
  )
}

export default EditHeader
