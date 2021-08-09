import React from 'react'
import loadable from '@loadable/component'

import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'

// 静态路由
const Home = loadable(()=>import('@/views/home/index.tsx'))

// 文章的增删改查
const ArticleList = loadable(()=>import('@/views/article/ArticleList'))

// 用户管理
const UserManager = loadable(()=>import('@/views/user/UserManager'))

export const constRoutes = [
  {
    id: 1,
    text: '管理概况',
    icon: <UploadOutlined/>,
    children: [
      {
        id: 101,
        text: '任务面板',
        path: '/',
        component: Home
      }
    ]
  }
]

export default [
  {
    id: 10,
    text: '文章管理',
    icon: <UploadOutlined/>,
    permission: ['editor'],
    children: [
      {
        id: 1001,
        text: '文章列表',
        path: '/article/list',
        component: ArticleList,
        permission: ['editor']
      }
    ]
  },
  {
    id: 11,
    text: '用户管理',
    icon: <UserOutlined/>,
    permission: ['admin'],
    children: [
      {
        id: 1101,
        text: '用户列表',
        path: '/user/list',
        component: UserManager,
        permission: ['admin']
      }
    ]
  }
]
