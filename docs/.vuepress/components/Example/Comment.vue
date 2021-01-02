<template>
  <div class="lib-example">
    <div ref="header" class="change-role">
      <div class="change" @click="changeUser">切换角色</div>
      <div class="current-role">
        <img :src="currentUser.avatar" />
        <span>{{ fullName }}</span>
      </div>
    </div>
    <div ref="comment" :style="wrapStyle" class="comment-wrap">
      <Comment
        v-model="data"
        :props="props"
        :user="currentUser"
        :before-submit="addComment"
        :before-delete="deleteComment"
        :before-like="likeComment"
        :upload-img="uploadImg"
      />
    </div>
  </div>
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
      wrapStyle: '',
    }
  },
  computed: {
    fullName() {
      const { name, author } = this.currentUser
      return name + (author ? '（作者）' : '（游客）')
    },
  },
  created() {
    this.addData(1)
  },
  mounted() {
    const header = this.$refs.header
    this.wrapStyle = `height: calc(100vh - ${header.clientHeight + 100}px)`
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

      console.log('deleteComment: ', res)
    },
    async likeComment(comment) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(comment)
        }, 0)
      })

      console.log('likeComment: ', res)
    },
    async uploadImg({ file, callback }) {
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

      console.log('uploadImg： ', res)
    },
    changeUser() {
      const users = this.users
      const index = users.findIndex((c) => c.name === this.currentUser.name)
      this.currentUser = users[index === users.length - 1 ? 0 : index + 1]
      this.$refs.comment.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    },
    addData(times) {
      setTimeout(() => {
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
      }, 0)
    },
  },
}
</script>

<style lang="scss">
@mixin scroll-style(
  $thumb: rgba(255, 255, 255, 0.6),
  $track: rgba(255, 255, 255, 0)
) {
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track {
    border: none;
    box-shadow: none;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: $thumb;
  }
  &::-webkit-scrollbar-track {
    background: $track;
  }
}

.change-role {
  background: #1c2433;
  color: #eee;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-content: center;
  .change {
    cursor: pointer;
    padding: 0.4rem;
    margin-right: 2rem;
    font-size: 0.9rem;
    border: 1px solid #e99210;
    border-radius: 5px;
    user-select: none;
    &:hover {
      opacity: 0.9;
    }
  }
  .current-role {
    min-width: 15rem;
    color: #e99210;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #e99210;
    padding: 0 1rem;
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      border: 1px solid #eee;
      border-radius: 50%;
    }
  }
}

.comment-wrap {
  overflow: auto;
  border: 1px solid #eee;
  @include scroll-style(#db8f1c, #b9b9b9);
}

@media screen and (max-width: 500px) {
  .change-role .current-role {
    min-width: 5rem;
    padding: 0 0.5rem;
  }
}
</style>
