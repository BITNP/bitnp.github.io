<template>
  <div class="footer"
    :style="footerBackgroundImage">

    <div class="recruiting-info">
      <img :src="footerQRCode" alt="二维码">
      <div class="img-info">
        微信公众号搜索<br/>“北理工网络开拓者”<br>或“bitwangxie”<br>即可关注公众号
      </div>
      <div class="lnks">
        <div class="lnk-title">友情连接</div>
        <ul>
          <li><a href="">北京理工大学</a></li>
          <li><a href="">乐学</a></li>
        </ul>
      </div>
    </div>

    <div
      class="icons"
      v-if="social && social.icons"
    >
      <a
        :href="item.link"
        :title="item.title"
        :class="['iconfont', item.iconClass]"
        v-for="(item, index) in social.icons"
        :key="index"
        target="_blank"
      ></a>
    </div>

    <!--Vdoing主题遵循MIT协议，完全开源且免费。如果您对主题的修改并不大，希望您保留主题的链接。-->
    Theme by
    <a
      href="https://github.com/xugaoyi/vuepress-theme-vdoing"
      target="_blank"
      title="本站主题"
    >Vdoing</a>
    <template v-if="footer">
      | Copyright © {{ footer.createYear }}-{{ new Date().getFullYear() }}
      <span
        v-html="footer.copyrightInfo"
      ></span>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    social () {
      return this.$themeConfig.social
    },
    footer () {
      return this.$themeConfig.footer
    },
    footerBackgroundImage() {
      return `background: url(${this.$withBase('/img/footerbg.png')}) center center / cover no-repeat`
    },
    footerQRCode() {
      return this.$withBase('/img/QRCode.jpg');
    }
  }
}
</script>

<style lang='stylus'>
// $mobileSidebarWidth = $sidebarWidth * 0.82
.footer
  padding 5rem 1.5rem 2.5rem
  text-align center
  color #666
  box-sizing border-box
  font-size 0.85rem
  transition all 0.2s ease
  .recruiting-info 
    display flex
    justify-content space-around
    flex-wrap wrap
    img
      margin auto 8em
      flex 2
      max-width 12em
    .img-info
      flex 1
      text-align center
      min-width 12em
      color white
    .lnks
      flex 1
      min-width 10em
      .lnk-title
        font-weight bold
        color white
      ul li
        text-align center
        color gray
  .icons
    margin-bottom 12px
    .iconfont
      padding 0 10px
      font-size 1.3rem
  a
    color inherit
    &:hover
      color $accentColor
@media (min-width ($MQMobile + 1px))
  .sidebar-open .footer
    width auto
    padding-left ($sidebarWidth + 1.5rem)
@media (min-width 1520px)
  .have-rightmenu .footer
    padding-right ($rightMenuWidth + 1.5rem)
.no-sidebar .footer
  width auto
  padding-left 1.5rem
@media (max-width 800px) 
  .footer  
    .recruiting-info 
      img 
        margin-bottom 3em
@media (max-width 400px)
  .footer  
    .recruiting-info 
      .img-info 
        margin-bottom 3em
</style>
