<template>
    <div class="article-wrapper">
        <div class="category-title">文章</div>
        <div class="article-lst post card-box"
            v-for="item in sortPosts"
            :key="item.key">
            <div class="title-wrapper">
                <h2>
                    <router-link :to="item.path">
                        {{item.title}}
                    </router-link>
                </h2>
                <div class="sub-info">
                    <div class="article-info article-date">
                        <span
                        title="日期"
                        v-if="item.frontmatter.date"
                        class="iconfont icon-riqi"
                        > {{item.frontmatter.date}}</span>
                    </div>
                    <div class="article-info article-author">
                        <span
                        title="作者"
                        v-if="item.frontmatter.author"
                        class="iconfont icon-touxiang">{{item.frontmatter.author}}</span>
                    </div>
                </div>
            </div>
            <div class="excerpt-wrapper">
            <div class="excerpt"
              v-html="item.excerpt"></div>
            <router-link :to="item.path" class="readmore iconfont icon-jiantou-you">阅读全文</router-link>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        perPage: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            sortPosts: []
        }
    },
    created() {
        this.setPosts()
    },
    methods: {
        setPosts() {
            this.sortPosts = this.$groupPosts.categories['Article'].slice(0, this.perPage)
        }
    }
}
</script>

<style lang="stylus">
.article-wrapper
  margin .5rem auto 0 auto
  max-width .6 * $homePageWidth
  padding 0 0.9rem
  box-sizing border-box
  position relative
  .category-title
    color #ED7E33
    font-size 1.4rem
    padding-top .5rem
    &::before 
      content '#' 
  .card-box
    padding 1rem 1.5rem
    margin-bottom 0.9rem
    margin-top .9rem
    h2
      margin 0 0 1rem 0
      padding-bottom .8rem
      text-align center
    .sub-info
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content space-around
    .home-content
      padding 1rem 1.5rem 0
    .article-info
      span
        padding .2rem
        font-size .8rem
</style>