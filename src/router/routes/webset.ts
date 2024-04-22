export default [
  /** ----- 网站管理 -> 轮播图 ----- **/
  {
    path: '/webset/swiper',
    name: 'WebsetSwiper',
    component: () => import('@/views/webset/swiper/index.vue'),
    meta: {
      name: 'WebsetSwiper',
      keepAlive: true
    }
  },
  /** ----- 网站管理 -> 邮件模版 ----- **/
  {
    path: '/webset/mail',
    name: 'WebsetMail',
    component: () => import('@/views/webset/mail/index.vue'),
    meta: {
      name: 'WebsetMail',
      keepAlive: true
    }
  },
  /** ----- 网站管理 -> 文章管理 ----- **/
  {
    path: '/webset/article',
    name: 'WebsetArticle',
    component: () => import('@/views/webset/article/index.vue'),
    meta: {
      name: 'WebsetArticle',
      keepAlive: true
    }
  },
  // 网站管理 - 文章管理 - 添加
  {
    path: '/webset/article/add',
    name: 'WebsetArticleAdd',
    component: () => import('@/views/webset/article/add.vue'),
    meta: {
      name: 'WebsetArticle',
      keepAlive: true
    }
  },
  {
    path: '/webset/article/edit/:id',
    name: 'WebsetArticleEdit',
    component: () => import('@/views/webset/article/edit.vue'),
    meta: {
      name: 'WebsetArticle',
      keepAlive: true
    }
  }
]