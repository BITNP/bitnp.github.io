<template>
  <!-- <transition-group
      tag="div"
      name="post"
  > -->
    <div class="events-lecs-wrapper">
      <div class="left-events">
        <div class="category-title">
          活动
        </div>
        <div class="event-lst post card-box"
          v-for="item in sortEventPosts"
          :key="item.key">
          <div class="title-wrapper">
            <h2>
              <router-link :to="item.path">
              {{item.title}}
              </router-link>
            </h2>
            <div class="sub-info">
                <div class="event-status event-time">
                <span
                  title="日期"
                  v-if="item.frontmatter.eventdate"
                  class="iconfont icon-riqi"
                > {{item.frontmatter.eventdate.split('T')[0]}}
                </span>
              </div>
              <div class="event-status event-locate">
                <span
                  title="活动地点"
                  v-if="item.frontmatter.location"
                  class="iconfont icon-home">{{item.frontmatter.location}}</span>
              </div>
              <div class="event-status event-finish">
                <span 
                  title="活动状态"
                  v-if="item.frontmatter.status == 'finished'"
                  class="event-complete">已完成
                </span>
                <span
                  title="活动状态"
                  v-else
                  class="event-uncomplete">未完成
                </span>    
              </div>
            </div>
            
          </div>
          <div class="excerpt-wrapper">
            <div class="excerpt"
              v-html="item.excerpt"></div>
            <router-link :to="item.path" class="readmore iconfont icon-jiantou-you">阅读全文</router-link>
          </div>
          
        </div>
        <div class="clear-fix more-link">
          <router-link
            to="categories/?category=Event"
            class="more"
          >更多活动</router-link>
        </div>
        
      </div>
      <div class="right-lecs">
        <div class="category-title">
          技术沙龙
        </div>
        <div class="event-lst post card-box"
          v-for="item in sortLecPosts"
          :key="item.key">
          <div class="title-wrapper">
            <h2>
              <router-link :to="item.path">{{item.title}}</router-link>
            </h2>
            <div class="sub-info">
                <div class="event-status event-time">
                <span
                  title="日期"
                  v-if="item.frontmatter.eventdate"
                  class="iconfont icon-riqi"
                > {{item.frontmatter.eventdate.split('T')[0]}}
                </span>
              </div>
              <div class="event-status event-locate">
                <span
                  title="活动地点"
                  v-if="item.frontmatter.location"
                  class="iconfont icon-home">{{item.frontmatter.location}}</span>
              </div>
              
              <div class="event-status event-finish">
                <span 
                  title="活动状态"
                  v-if="item.frontmatter.status == 'finished'"
                  class="event-complete">已完成
                </span>
                <span
                  title="活动状态"
                  v-else
                  class="event-uncomplete">未完成
                </span>    
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
    </div>
  <!-- </transition-group> -->
</template>

<script>
export default {
  props: {
    tag: {
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
      sortEventPosts: [],
      sortLecPosts: []
    }
  },
  created() {
    this.setPosts()
  },
  methods: {
    setPosts() {
      this.sortEventPosts = this.$groupPosts.categories['Event'].slice(0,this.perPage)
      this.sortLecPosts = this.$groupPosts.categories['Lecture'].slice(0,this.perPage)
      this.sortEventPosts.forEach(e=>console.log(e.frontmatter))
      this.sortLecPosts.forEach(e=>console.log(e.frontmatter))
      
    }
  }
}
</script>

<style lang="stylus">
.events-lecs-wrapper
  margin .5rem auto 0 auto
  max-width $homePageWidth
  padding 0 0.9rem
  box-sizing border-box
  position relative
  display flex
  .left-events 
    flex 1
    margin .8rem 2rem
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
        .event-status
          span
            padding .2rem
            font-size .8rem
        .event-finish
          .event-complete
            font-size .8rem
            padding .2rem
            border-radius .2rem
            color white
            background-color #11a8cd
          .event-uncomplete
            font-size .8rem
            padding .2rem
            border-radius .2rem
            color white
            background-color #ed7e33
    .more-link
      position relative
      a
        font-size 1.2rem
        position absolute
        right 1rem
  .right-lecs
    flex 1
    margin .8rem 2rem
    .category-title
      color #ED7E33
      font-size 1.4rem
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
        .event-status
          span
            padding .2rem
            font-size .8rem
        .event-finish
          .event-complete
            font-size .8rem
            padding .2rem
            border-radius .2rem
            color white
            background-color #11a8cd
          .event-uncomplete
            font-size .8rem
            padding .2rem
            border-radius .2rem
            color white
            background-color #ed7e33
      .card-list
        display flex 
        flex-direction column
        flex-wrap wrap
        .card-item
          width 80% !important
          margin .5rem auto
// 719px以下                                                    
@media (max-width $MQMobile)
  .home-wrapper
    margin 0.9rem 0
    padding 0
    display block
    .home-left
      width 100%
      .post-list
        margin-bottom 3rem
        .post
          border-radius 0
      .pagination
        margin-bottom 3rem
    .home-middle
      width 100%
      .post-list
        margin-bottom 3rem
        .post
          border-radius 0
      .pagination
        margin-bottom 3rem
    .home-right
      width 100%
      .post-list
        margin-bottom 3rem
        .post
          border-radius 0
      .pagination
        margin-bottom 3rem
</style>
