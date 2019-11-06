import React, { Fragment, useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import moment from 'moment'

import{ Comment, Avatar, Row, Col, List, Icon, Input, Form, Button, notification } from 'antd'

import EditHeader from '../../components/edit-header'
import urlPath from '../../config/url'
import axios from 'axios'

const { TextArea } = Input;
const { saveContent } = urlPath

// const CommentList = ({ comments }) => (
//   <List
//     dataSource={comments}
//     header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//     itemLayout="horizontal"
//     renderItem={props => <Comment {...props} />}
//   />
// );

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        提交文章
      </Button>
    </Form.Item>
  </div>
);

const EditPage = () => {

  const [comments, setComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')

  const handleSubmit = async () => {
    if (!value) {
      return;
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setValue('')
      setComments([{
          author: 'demo-blog',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
        ...comments,
      ])
    }, 1000);
    const result = await axios.post(saveContent,{
      type_id: 1,
      title: 'demo-1',
      article_content: value,
      introduce: 'demo-1',
      addTime: Math.round(new Date().getTime()/1000)
    });
    if (result) {
      console.log(result);
      const data = result.data.data;
      if (data.code === 1 && result.status === 200) {
        notification.open({
          message: '文章提交',
          description:
            '文章提交成功',
          icon: <Icon type="smile" theme="twoTone" />,
        });
        Router.push({
          pathname: '/',
        })
      } else {
        notification.open({
          message: '文章提交',
          description:
            '文章提交失败',
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        });
      }
    }
  };

  const handleChange = e => {
    setValue(e.target.value)
  };

  return (
    <Fragment>
      <Head>
        <title>编辑列表</title>
      </Head>
      <EditHeader />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-box" xs={24} sm={24} md={16} lg={18} xl={18}  >
          <div>
            <Comment
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="demo"
                />
              }
              content={
                <Editor
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}

export default EditPage
