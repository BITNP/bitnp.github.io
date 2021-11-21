// nav
module.exports = [
  { text: '首页', link: '/' },
  // {
  //   text: '活动',
  //   link: '/categories/?category=Event', //目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
  // },
  {
    text: '讲座',
    link: '/categories/?category=Lecture'
  },
  {
    text: '文章',
    link: '/categories/?category=Article'
  },
  {
    text: '服务',
    link: '/',
    items: [
      { text: '网协直播', link: 'http://live.bitnp.net/' },
      { text: '电脑义诊', link: 'https://res.bitnp.net/' }
    ],
  }
]
