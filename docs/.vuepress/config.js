// const { path } = require('@vuepress/shared-utils')

module.exports = ctx => ({
  title: 'Freesims',
  description: '记录个人前端技术成长点滴',
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/apple-touch-icon.png` }],
  ],
  themeConfig: {
    repo: 'Fengfengfeng-up/personal-docs',
    repoLabel: 'GitHub',
    docsBranch: 'main',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    smoothScroll: true,
    // logo: '/logo.png',
    nav: [
      { text: 'JavaScript', link: '/my-docs/js/' },
      // { text: 'TypeScript', link: '/my-docs/ts/' },
      // { text: 'CSS', link: '/my-docs/css/' },
      // { text: 'Vue', link: '/my-docs/vue/' },
      // { text: 'Webpack', link: '/my-docs/webpack/' },
      // { text: 'NestJs', link: '/my-docs/nestjs/' },
      { text: '收藏', link: '/my-docs/collection/' },
      { text: '博客', link: 'https://www.striveforus.com/', target: '_blank' },
    ],
    sidebar: {
      '/my-docs/js/': getJsSidebar('基础部分', '进阶部分')
    },
    lastUpdated: '上次更新',
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    // ['@vuepress/pwa', {
    //   serviceWorker: true,
    //   updatePopup: true
    // }],
    ['@vuepress/medium-zoom', true],
    // ['@vuepress/google-analytics', {
    //   ga: 'UA-128189152-1'
    // }],
    // ['container', {
    //   type: 'vue',
    //   before: '<pre class="vue-container"><code>',
    //   after: '</code></pre>'
    // }],
    // ['container', {
    //   type: 'upgrade',
    //   before: info => `<UpgradePath title="${info}">`,
    //   after: '</UpgradePath>'
    // }],
    // ['flowchart']
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@': '/my-docs',
      },
    },
  },
  // extraWatchFiles: [
  //   './.vuepress'
  // ],
  // evergreen: true, // 禁止 ESNext 到 ES5 的转译以及对 IE 的 polyfills，同时会带来更快的构建速度和更小的文件体积
})

function getJsSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'basic-types'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'design-mode'
      ]
    }
  ]
}
