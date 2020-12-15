// const { path } = require('@vuepress/shared-utils')

module.exports = ctx => ({
  title: 'Freesims',
  description: '记录个人前端技术成长点滴',
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    ['link', { rel: 'apple-touch-icon', href: `/apple-touch-icon.png` }],
  ],
  themeConfig: {
    // repo: 'vuejs/vuepress',  // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    // // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    // repoLabel: '查看源码',
    // docsRepo: 'vuejs/vuepress', // 假如你的文档仓库和项目本身不在一个仓库：
    // docsDir: 'docs', // 假如文档不是放在仓库的根目录下：

    smoothScroll: true,
    // logo: '/logo.png',
    nav: [
      { text: 'JavaScript', link: '../my-docs/js/' },
      { text: 'TypeScript', link: '../my-docs/ts/' },
      { text: 'CSS', link: '../my-docs/css/' },
      { text: 'Vue', link: '../my-docs/vue/' },
      { text: 'Webpack', link: '../my-docs/webpack/' },
      { text: 'NestJs', link: '../my-docs/nestjs/' },
      { text: '收藏', link: '../my-docs/collection/' },
    ],
    sidebar: 'auto',
    // algolia: ctx.isProd
    //   ? {
    //       apiKey: '3a539aab83105f01761a137c61004d85',
    //       indexName: 'vuepress',
    //     }
    //   : null,
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
  // ],
  // evergreen: true, // 禁止 ESNext 到 ES5 的转译以及对 IE 的 polyfills，同时会带来更快的构建速度和更小的文件体积
})
