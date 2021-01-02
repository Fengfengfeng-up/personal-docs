# Vue-juejin-comment

一个[掘金](https://juejin.im/timeline)风格的**评论组件**✍。  

GitHub 地址：<https://github.com/Fengfengfeng-up/vue-comment-component/tree/main>

## 功能

* ✅ 支持评论、回复操作。
* ✅ 支持点赞、删除操作。
* ✅ 支持上传（复制）图片，表情输入。
* ✅ 自适应高度输入框。

## 安装

``` shell
npm install @fengfengfeng/vue-juejin-comment

# or yarn
yarn add @fengfengfeng/vue-juejin-comment
```

## 使用

``` vue
<template>
  <Comment
    v-model="data"
    :props="props"
    :user="currentUser"
    :before-submit="addComment"
    :before-delete="deleteComment"
    :before-like="likeComment"
    :upload-img="uploadOrCopyImg"
  />
</template>

<script>
import Comment from '@fengfengfeng/vue-juejin-comment'
import '@fengfengfeng/vue-juejin-comment/dist/vue-juejin-comment.css'

export default {
  data() {
    return {
      data: [],
      props: {},
      currentUser: {
        name: '',
        avatar: '',
        author: false
      }
    }
  },
  methods: {
    addComment(comment) {
      // ...
    },
    deleteComment(comment) {
      // ...
    },
    likeComment(comment) {
      // ...
    },
    uploadOrCopyImg({ file, callback }) {
      // ...
      
      callback(imgUrl) // 图片地址必传
    }
  }
}
</script>
```
  
## 示例

<ClientOnly>
  <Example-Comment/>
</ClientOnly>

::: details 查看代码

``` vue
<template>
  <Comment
    v-model="data"
    :props="props"
    :user="currentUser"
    :before-submit="addComment"
    :before-delete="deleteComment"
    :before-like="likeComment"
    :upload-img="uploadOrCopyImg"
  />
</template>

<script>
import Comment from '@fengfengfeng/vue-juejin-comment'
import '@fengfengfeng/vue-juejin-comment/dist/vue-juejin-comment.css'

export default {
  components: { Comment },
  data() {
    const users = [
      {
        name: 'Up&Up',
        avatar:
          'https://img.vim-cn.com/26/f000a8ac95ec13fe86445732d7309a3cce596d.jpg',
        author: true,
      },
      {
        name: '我叫白云',
        avatar:
          'https://img.vim-cn.com/46/60955e1965607e5a9e9af1ba37a2c1ed99de60.png',
      },
      {
        name: '我叫黑土',
        avatar:
          'https://img.vim-cn.com/b7/6c70f9dc921123f8f1ab754ec938a2b04b52a7.jpg',
      },
      {
        name: 'NARUTO',
        avatar:
          'https://img.vim-cn.com/4d/5cbfa03caa043dcb7b3b4e75f827535538776a.jpg',
      },
    ]
    return {
      data: [],
      props: {
        content: 'content',
        imgSrc: 'imgSrc',
        children: 'childrenComments',
        likes: 'likes',
        reply: 'reply',
        createAt: 'createAt',
        user: 'visitor',
      },
      currentUser: users[0],
      users,
    }
  },
  created() {
    this.addData(1)
  },
  methods: {
    async addComment(comment) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(comment)
        }, 0)
      })

      console.log('addComment: ', res)
    },
    async deleteComment(comment) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(comment)
        }, 0)
      })
    },
    async likeComment(comment) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(comment)
        }, 0)
      })
    },
    async uploadOrCopyImg({ file, callback }) {
      try {
        const res = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            resolve(reader.result)
          }
          reader.onerror = () => {
            reject(reader.error)
          }
        })

        callback(res)
      } catch (e) {
        console.log(e)
      }
    },
    addData(times) {
      this.data = new Array(times)
        .fill([
          {
            content: '梦芸\n近况如何\n算来已有十月未见你\n甚是思念',
            visitor: {
              name: '我叫白云',
              avatar:
                'https://img.vim-cn.com/46/60955e1965607e5a9e9af1ba37a2c1ed99de60.png',
            },
            createAt: '2020.11.24',
            likes: 1,
            childrenComments: [
              {
                content:
                  '此刻我能闻见漫天火药味道\n我随军藏身长江边一暗无天日的地窖底\n埋首台灯下写这些字却不知把心绪给寄向何地',
                visitor: {
                  name: 'NARUTO',
                  avatar:
                    'https://img.vim-cn.com/4d/5cbfa03caa043dcb7b3b4e75f827535538776a.jpg',
                },
                createAt: '2020.11.25',
              },
              {
                content: '\n如磐石般坚毅',
                visitor: {
                  name: '我叫黑土',
                  avatar:
                    'https://img.vim-cn.com/b7/6c70f9dc921123f8f1ab754ec938a2b04b52a7.jpg',
                },
                createAt: '2020.11.25',
                reply: {
                  name: 'NARUTO',
                  avatar:
                    'https://img.vim-cn.com/4d/5cbfa03caa043dcb7b3b4e75f827535538776a.jpg',
                },
              },
            ],
          },
          {
            content:
              '我想时光亦是用来磨的\n细细地磨慢慢地磨\n总能磨出些许墨香来',
            visitor: {
              name: '我叫黑土',
              avatar:
                'https://img.vim-cn.com/b7/6c70f9dc921123f8f1ab754ec938a2b04b52a7.jpg',
            },
            createAt: '2020.12.5',
            childrenComments: [
              {
                content:
                  '即使我鼻子已不灵\n眼睛生出疾\n侥幸你的照片还能辨出依稀',
                visitor: {
                  name: 'NARUTO',
                  avatar:
                    'https://img.vim-cn.com/4d/5cbfa03caa043dcb7b3b4e75f827535538776a.jpg',
                },
                createAt: '2020.12.6',
              },
            ],
          },
        ])
        .flat(1)
    },
  },
}
</script>

```

:::
