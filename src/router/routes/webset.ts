export default [
  /** ----- 网站管理 -> 轮播图 ----- */
  {
    path: '/webset/swiper',
    name: 'WebsetSwiper',
    component: () => import('@/views/webset/swiper/index.vue'),
    meta: {
      name: 'WebsetSwiper',
      keepAlive: true,
    },
  },
  /** ----- 网站管理 -> 邮件模版 ----- */
  {
    path: '/webset/mail',
    name: 'WebsetMail',
    component: () => import('@/views/webset/mail/index.vue'),
    meta: {
      name: 'WebsetMail',
      keepAlive: true,
    },
  },
  /** ----- 网站管理 -> 文章管理 ----- */
  {
    path: '/webset/article',
    name: 'WebsetArticle',
    component: () => import('@/views/webset/article/index.vue'),
    meta: {
      name: 'WebsetArticle',
      keepAlive: true,
    },
  },
  // 网站管理 - 文章管理 - 添加
  {
    path: '/webset/article/add',
    name: 'WebsetArticleAdd',
    component: () => import('@/views/webset/article/add.vue'),
    meta: {
      name: 'WebsetArticle',
      keepAlive: true,
    },
  },
  // 网站管理 - 文章管理 - 编辑
  {
    path: '/webset/article/edit/:id',
    name: 'WebsetArticleEdit',
    component: () => import('@/views/webset/article/edit.vue'),
    meta: {
      name: 'WebsetArticle',
      keepAlive: true,
    },
  },
  /** ----- 网站管理 -> 增值服务 ----- */
  {
    path: '/webset/addserve',
    name: 'WebsetAddserve',
    component: () => import('@/views/webset/addserve/index.vue'),
    meta: {
      name: 'WebsetAddserve',
      keepAlive: true,
    },
  },
  // 网站管理 - 增值服务 - 添加
  {
    path: '/webset/addserve/add',
    name: 'WebsetAddserveAdd',
    component: () => import('@/views/webset/addserve/add.vue'),
    meta: {
      name: 'WebsetAddserve',
      keepAlive: true,
    },
  },
  // 网站管理 - 增值服务 - 编辑
  {
    path: '/webset/addserve/edit/:id',
    name: 'WebsetAddserveEdit',
    component: () => import('@/views/webset/addserve/edit.vue'),
    meta: {
      name: 'WebsetAddserve',
      keepAlive: true,
    },
  },
]
