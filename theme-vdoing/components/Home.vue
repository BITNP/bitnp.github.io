<template>
  <div class="home-wrapper">
    <!-- banner块 s -->
    <div
      class="banner"
      :class="{ 'hide-banner': !showBanner }"
      :style="bannerBgStyle"
    >
      <div
        class="banner-conent"
        :style="
          !homeData.features && !homeData.heroImage && `padding-top: 7rem`
        "
      >
        <header class="hero">
          <img
            v-if="homeData.heroImage"
            :src="$withBase(homeData.heroImage)"
            :alt="homeData.heroAlt"
          />
          <h1 v-if="homeData.heroText" id="main-title">
            {{ homeData.heroText }}
          </h1>
          <p v-if="homeData.tagline" class="description">
            {{ homeData.tagline }}
          </p>
          <p class="action" v-if="homeData.actionText && homeData.actionLink">
            <NavLink class="action-button" :item="actionLink" />
          </p>
          <!-- <button id="detail-btn">了解更多</button> -->
        </header>
        <div class="info-panel">
          <div class="intro-category">
            <div class="intro-category-item" :class="introtype==0?'selected':''" @click="introtype=0">服务支持</div>
            <div class="intro-category-item" :class="introtype==1?'selected':''" @click="introtype=1">部门介绍</div>
          </div>
          <div class="intro-main">
            <div class="intro-img-title">
              <img class="intro-img" :src="$withBase(getDataItem(introtype,introid).imgUrl)"/>
              <h2> {{ getDataItem(introtype,introid).title }} </h2>
            </div>
            <p class="intro-content"> {{ getDataItem(introtype,introid).content }} </p>
          </div>
          <div class="intro-toggle-button-list">
            <div class="toggle-btn" @click="subItemCnt">&lt;</div>
            <div class="toggle-btn" @click="addItemCnt">&gt;</div>
          </div>
        </div>
      </div>
    </div>
    <!-- banner块 e -->

    <MainLayout>
      <template #mainLeft>
        <!-- 简约版文章列表 -->
        

        <!-- <EventsLecs></EventsLecs> -->
        <!-- <ArticleLists></ArticleLists> -->
        <CategoryList :category="mainCategories[0].msg" :categoryName="mainCategories[0].title"></CategoryList>
        <CategoryList :category="mainCategories[1].msg" :categoryName="mainCategories[1].title"></CategoryList>
        <CategoryList :category="mainCategories[2].msg" :categoryName="mainCategories[2].title"></CategoryList>

      </template>

      <!-- <template #mainRight>
        <BloggerBar v-if="$themeConfig.blogger" />
        <CategoriesBar
          v-if="
            $themeConfig.category !== false &&
            $categoriesAndTags.categories.length
          "
          :categoriesData="$categoriesAndTags.categories"
          :length="10"
        />
        <TagsBar
          v-if="$themeConfig.tag !== false && $categoriesAndTags.tags.length"
          :tagsData="$categoriesAndTags.tags"
          :length="30"
        />
        <div
          class="custom-html-box card-box"
          v-if="homeSidebarB"
          v-html="homeSidebarB"
        ></div>
      </template> -->
    </MainLayout>
  </div>
</template>

<script>
import NavLink from "@theme/components/NavLink";
import BScroll from "@better-scroll/core"
import Slide from "@better-scroll/slide"
import MainLayout from '@theme/components/MainLayout'
import PostList from '@theme/components/PostList'
import UpdateArticle from '@theme/components/UpdateArticle'
import Pagination from '@theme/components/Pagination'
import BloggerBar from '@theme/components/BloggerBar'
import CategoriesBar from '@theme/components/CategoriesBar'
import TagsBar from '@theme/components/TagsBar'
// import EventsLecs from '@theme/components/EventsLecs'
// import ArticleLists from '@theme/components/ArticleLists'
import CategoryList from '@theme/components/CategoryList'

const MOBILE_DESKTOP_BREAKPOINT = 720 // refer to config.styl

BScroll.use(Slide)

export default {
  data () {
    return {
      isMQMobile: false,
      introtype: 0,
      introid: 0,
      slide: null,
      currentPageIndex: 0,
      playTimer: 0,
      mark: 0,

      total: 0, // 总长
      perPage: 10, // 每页长
      currentPage: 1, // 当前页
      mainCategories: [
        {msg: 'Event', title: '活动'}, 
        {msg: 'Lecture', title: '讲座'}, 
        {msg: 'Article', title: '文章'}]
    }
  },
  computed: {
    homeData () {
      return {
        ...this.$page.frontmatter
      }
    },
    hasFeatures () {
      return !!(this.homeData.features && this.homeData.features.length)
    },
    homeSidebarB () {
      const { htmlModules } = this.$themeConfig
      return htmlModules ? htmlModules.homeSidebarB : ''
    },
    showBanner () { // 当分页不在第一页时隐藏banner栏
      return this.$route.query.p
        && this.$route.query.p != 1
        && (!this.homeData.postList || this.homeData.postList === 'detailed')
        ? false : true
    },
    bannerBgStyle () {
      let bannerBg = this.homeData.bannerBg
      if (!bannerBg || bannerBg === 'auto') { // 默认
        if (this.$themeConfig.bodyBgImg) { // 当有bodyBgImg时，不显示背景
          return ''
        } else { // 网格纹背景
          return 'background: rgb(40,40,45) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABOSURBVFhH7c6xCQAgDAVRR9A6E4hLu4uLiWJ7tSnuQcIvr2TRYsw3/zOGGEOMIcYQY4gxxBhiDDGGGEOMIcYQY4gxxBhiDLkx52W4Gn1tuslCtHJvL54AAAAASUVORK5CYII=)'
        }
      } else if (bannerBg === 'none') { // 无背景
        if (this.$themeConfig.bodyBgImg) {
          return ''
        } else {
          return 'background: var(--mainBg);color: var(--textColor)'
        }
      } else if (bannerBg.indexOf('background') > -1) { // 自定义背景样式
        return bannerBg
      } else if (bannerBg.indexOf('.') > -1) { // 大图
        return `background: url(${this.$withBase(bannerBg)}) center center / cover no-repeat`
      }

    },
    actionLink () {
      return {
        link: this.homeData.actionLink,
        text: this.homeData.actionText
      };
    }
  },
  components: { NavLink, MainLayout, PostList, UpdateArticle, BloggerBar, CategoriesBar, TagsBar, Pagination,  CategoryList },
  created () {
    this.total = this.$sortPosts.length
  },
  beforeMount () {
    this.isMQMobile = window.innerWidth < MOBILE_DESKTOP_BREAKPOINT ? true : false; // vupress在打包时不能在beforeCreate(),created()访问浏览器api（如window）
  },
  mounted () {
    if (this.$route.query.p) {
      this.currentPage = Number(this.$route.query.p)
    }

    if (this.hasFeatures && this.isMQMobile && (!this.$route.query.p || this.$route.query.p == 1)) {
      this.init()
    }

    if (this.hasFeatures) {
      window.addEventListener('resize', () => {
        this.isMQMobile = window.innerWidth < MOBILE_DESKTOP_BREAKPOINT ? true : false;
        if (this.isMQMobile && !this.slide && !this.mark) {
          this.mark++
          setTimeout(() => {
            this.init()
          }, 60)
        }
      })
    }
  },
  beforeDestroy () {
    clearTimeout(this.playTimer)
    this.slide && this.slide.destroy()
  },
  watch: {
    '$route.query.p' () {
      if (!this.$route.query.p) {
        this.currentPage = 1
      } else {
        this.currentPage = Number(this.$route.query.p)
      }

      if (this.hasFeatures && this.currentPage === 1 && this.isMQMobile) {
        setTimeout(() => {
          this.slide && this.slide.destroy()
          this.init()
        }, 0)
      }
    }
  },
  methods: {
    init () {
      clearTimeout(this.playTimer)
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true, // x轴滚动
        scrollY: false, // y轴滚动
        slide: {
          loop: true,
          threshold: 100
        },
        useTransition: true, // 使用css3 transition动画
        momentum: false,
        bounce: false, // 回弹
        stopPropagation: false, // 是否阻止事件冒泡
        probeType: 2,
        preventDefault: false
      })

      // user touches the slide area
      this.slide.on('beforeScrollStart', () => {
        clearTimeout(this.playTimer)
      })
      // user touched the slide done
      this.slide.on('scrollEnd', () => {
        this.autoGoNext()
      })
      this.slide.on('slideWillChange', (page) => {
        this.currentPageIndex = page.pageX
      })
      this.autoGoNext()
    },
    autoGoNext () {
      clearTimeout(this.playTimer)
      this.playTimer = setTimeout(() => {
        this.slide.next()
      }, 4000)
    },
    handlePagination (i) { // 分页
      this.currentPage = i
    },
    getScrollTop () {
      return window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop
    },
    getDataItem(type, id) {
      if (type == 0) {
        return this.homeData.introduction[id]
      } else {
        return this.homeData.departments[id]
      }
    },
    addItemCnt() {
      let len = this.introtype == 0 ? this.homeData.introduction.length : this.homeData.departments.length
      ++this.introid 
      if(this.introid == len) 
        this.introid = 0;
    }, 
    subItemCnt() {
      let len = this.introtype == 0 ? this.homeData.introduction.length : this.homeData.departments.length
      --this.introid
      if(this.introid < 0) 
        this.introid = len - 1;
    }
  },

};
</script>

<style lang="stylus" scoped>
.home-wrapper
  .banner
    width 100%
    // min-height 450px
    margin-top $navbarHeight
    color $bannerTextColor
    position relative
    overflow hidden
    background #F1F3F4 !important
    .banner-conent
      color black
      max-width $homePageWidth
      margin 0px auto
      position relative
      z-index 1
      overflow hidden
      .hero
        text-align center
        margin-top 3rem
        img
          max-width 60%
          max-height 120px
          display block
          margin 2rem auto 1.5rem
        h1
          margin 0
          font-size 1.5rem
        .description, .action
          margin 1.5rem auto
        .description
          max-width 40rem
          font-size 1.1rem
          line-height 1.3
          opacity 0.9
        .action-button
          display inline-block
          font-size 1.2rem
          background-color $accentColor
          padding 0.8rem 1.6rem
          border-radius 4px
          transition background-color 0.1s ease
          box-sizing border-box
          border-bottom 1px solid darken($accentColor, 10%)
          color #fff
          &:hover
            background-color lighten($accentColor, 10%)
        #detail-btn 
          font-size 1.2rem
          padding .4rem 1.4rem
          background-color #FEAE1B
          border-radius .4rem
          border 2px solid #FEAE1B
          color white 
          &:hover 
            background-color #FEBC43
            border-color #FEBC43
      .info-panel 
        display flex 
        background-color white 
        border-radius 5px
        flex-direction column
        margin 3rem auto
        width 70%
        min-height 20rem 
        .intro-category 
          display flex 
          padding 1rem 1rem 0 1rem
          background-color #FEBC43
          border-radius 5px 5px 0 0
          .intro-category-item
            padding .2rem .6rem 
            height 2rem
            line-height 2rem
            color gray 
            &.selected 
              background-color white
              color black
            &:hover 
              color black
        .intro-main 
          display flex 
          .intro-img-title 
            margin 10px 0 0 10px
            flex 220px 0 0
            display flex     
            flex-direction column 
            align-items center
            .intro-img 
              display inline-block
              height 80px
              width auto
            h2 
              border none
              font-size 1.2rem
              text-align center
              // width 150px
          .intro-content 
            flex 1
            margin-right 10px
        .intro-toggle-button-list 
          margin-top auto 
          display flex 
          justify-content flex-end
          .toggle-btn  
            font-weight bold
            // color white
            font-size 30px 
            line-height 30px
            color white 
            margin 10px
            width 30px 
            height 30px
            background-color #FEBC43
            border-radius 3px 
            text-align center
      // pc端features
      // .features
      //   padding 2rem 0
      //   margin-top 2.5rem
      //   display flex
      //   flex-wrap wrap
      //   align-items flex-start
      //   align-content stretch
      //   justify-content space-between
      // .feature
      //   flex-grow 1
      //   flex-basis 30%
      //   max-width 30%
      //   text-align center
      //   a
      //     // color lighten($bannerTextColor,10%)
      //     color inherit
      //     .feature-img
      //       width 10rem
      //       height 10rem
      //       animation heart 1.2s ease-in-out 0s infinite alternate
      //       animation-play-state paused
      //     h2
      //       font-weight 500
      //       font-size 1.3rem
      //       border-bottom none
      //       padding-bottom 0
      //     p
      //       opacity 0.8
      //       padding 0 0.8rem
      // .feature:hover
      //   .feature-img
      //     animation-play-state running
      //   h2, p
      //     color $accentColor
    // 移动端滑动图标
    .slide-banner
      margin-top 2rem
      .banner-wrapper
        position relative
      .slide-banner-scroll
        min-height 1px
        overflow hidden
      .slide-banner-wrapper
        height 300px
        .slide-item
          display inline-block
          height 300px
          width 100%
          text-align center
          a
            // color lighten($bannerTextColor,10%)
            color inherit
            .feature-img
              width 10rem
              height 10rem
            h2
              font-size 1.1rem
              font-weight 500
              border-bottom none
              padding-bottom 0
            p
              opacity 0.8
              padding 0 0.8rem
      .docs-wrapper
        position absolute
        bottom 25px
        left 50%
        transform translateX(-50%)
        .doc
          display inline-block
          margin 0 4px
          width 8px
          height 8px
          border-radius 50%
          background var(--textColor)
          opacity 0.9
          &.active
            opacity 0.5
  // 分页不在第一页时，隐藏banner栏
  .banner.hide-banner
    display none
    & + .main-wrapper
      margin-top: ($navbarHeight + 0.9rem)
  .main-wrapper
    margin-top 2rem
    .main-left
      .card-box
        margin-bottom 0.9rem
      .pagination
        margin-bottom 4rem
      .theme-vdoing-content
        padding 0 2rem
        overflow hidden
        &>:first-child
          padding-top 2rem
        &>:last-child
          padding-bottom 2rem
    .main-right
      .custom-html-box
        padding 0
        overflow hidden
@keyframes heart
  from
    transform translate(0, 0)
  to
    transform translate(0, 8px)
// 1025px以下
@media (max-width 1025px)
  .home-wrapper
    .banner
      .banner-conent
        .hero
          h1
            font-size 1.5rem
          .description
            font-size 1rem
        .feature
          a
            h2
              font-size 1.1rem
            .feature-img
              width 9rem
              height 9rem
// 719px以下
@media (max-width $MQMobile)
  .home-wrapper
    .banner
      .banner-conent
        .features
          display none !important
        .info-panel 
          width 90%
          .intro-main 
            .intro-img-title 
              flex 180px 0 0
              .intro-img 
                height 60px
// 419px以下
@media (max-width $MQMobileNarrow)
  .home-wrapper
    .banner 
      .banner-conent
        padding-left 1.5rem
        padding-right 1.5rem
        .hero
          img
            max-height 160px
            margin 2rem auto 1.2rem
          h1
            font-size 1.5rem
          h1, .description, .action
            margin 1.2rem auto
          .description
            font-size 1.2rem
          .action-button
            font-size 1rem
            padding 0.6rem 1.2rem
        .info-panel 
          .intro-main 
            flex-direction column
            .intro-img-title 
              flex calc(60px + 2em) 0 0
              .intro-img 
                height 60px
            .intro-content 
              margin 0 10px
</style>
