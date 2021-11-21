<template>
    <div class="article-wrapper">
        <div class="category-title">
            <p>{{this.categoryName}}</p>
            <router-link :to="'/categories/?category='+categoryName">
                &gt;更多
            </router-link>
            <!-- <p>&gt;更多</p> -->
        </div>      
        <div class="article-group">
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
                            > {{item.frontmatter.date.split(' ')[0]}}</span>
                        </div>
                        <div v-show="dcategory=='Article'" class="article-info article-author">
                            <span
                            title="作者"
                            v-if="item.frontmatter.author"
                            class="iconfont icon-touxiang">{{item.frontmatter.author}}</span>
                        </div>
                        <div v-show="dcategory=='Event' || dcategory=='Lecture'" class="article-info event-locate">
                            <span
                            title="活动地点"
                            v-if="item.frontmatter.location"
                            class="iconfont icon-home">{{item.frontmatter.location}}</span>
                        </div>
                    </div>
                </div>
                <div class="excerpt-wrapper">
                <div class="excerpt"
                v-html="item.excerpt"></div>
                
          </div>
          <router-link :to="item.path" class="readmore iconfont icon-jiantou-you">阅读全文</router-link>
        </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        category : {
            type: String,
            default: ''
        },
        categoryName : {
            type: String,
            default: ''
        },
        perPage: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            dcategory: this.category,
            sortPosts: []
        }
    },
    methods: {
        handleDate: function(date) {
            console.log(typeof date)
        }
    },
    created() {
        this.setPosts()
    },
    methods: {
        setPosts() {
            this.sortPosts = this.$groupPosts.categories[this.category].slice(0, this.perPage)
        }
    }
}
</script>

<style lang="stylus">
.article-wrapper
  margin .5rem auto 0 auto
  max-width 85%
  padding 0 0.9rem
  box-sizing border-box
  .category-title
    border-bottom .1rem solid #ed7e33
    padding-top .5rem
    display flex 
    p, a  
      color #ED7E33
      margin .1rem 0
      &:first-child 
        font-size 1.6rem
        &::before 
          content '#' 
      &:last-child 
        padding-top .6rem
        margin-left auto
  .article-group 
    display flex 
    justify-content flex-start
    flex-wrap wrap
    .card-box
      flex calc(30% - 48px) 0 0
      padding 1rem 1.5rem
      margin 0.9rem
      min-height 5rem
      display flex 
      flex-direction column
      h2
        margin 0 0 1rem 0
        padding-bottom .8rem
        text-align center
      .sub-info
        display flex
        flex-direction row
        flex-wrap wrap
        justify-content space-around
        font-size .6rem
      .home-content
        padding 1rem 1.5rem 0
      .article-info
        span
          padding .2rem
          font-size .8rem
      .card-item 
        width calc(100% - .7rem) !important
      &:nth-child(3n+1)
        margin .9rem 0
      .readmore
        display block
        margin-top auto
        text-align right
@media (max-width $MQMobile)
  .article-wrapper
    .article-group 
      .card-box
        flex calc(45% - 48px) 0 0
        .card-item  
        &:nth-child(2n+1)
          margin .9rem 0
@media (max-width $MQMobileNarrow)
  .article-wrapper
    .article-group 
      .card-box
        flex calc(90% - 48px) 0 0
        margin .2rem 5% !important
</style>