
import React from 'react'
import { Avatar,Divider } from 'antd'
import '../../../assets/css/writer.css'

const Writer =()=>{
    return (
      <div className="author-div comm-box">
        <div> <Avatar size={100} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"  /></div>
        <div className="author-introduction">
            blog-demo演示
            <Divider>账号</Divider>
            <Avatar size={28} icon="github" className="account"  />
            <Avatar size={28} icon="qq"  className="account" />
            <Avatar size={28} icon="wechat"  className="account"  />
        </div>
      </div>
    )

}

export default Writer