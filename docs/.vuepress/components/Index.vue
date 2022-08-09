<template>
    <div class="index">
        <div class="index-con">
            <a class="index-con-li" href="/v2_vite/">
                <h2> v2.0 <Badge text="vite"/></h2>
                <p>Ant Design React 18.x Admin</p>
            </a>
            <a class="index-con-li" href="/v1_umijs/">
                <h2>v1.0 <Badge text="umijs"/></h2>
                <p>Ant Design React Admin</p>
            </a>
           
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'Index'
}
</script>
<style lang="stylus" scoped >
.index
  .index-con
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-content stretch
    justify-content space-between
  .index-con-li
    display block
    flex-grow 1
    max-width 45%
    background #fbfbfb!important
    border-radius 5px
    transition all .2s ease-in-out
    border 1px solid #f1f1f1
    text-align center
    margin 10px 0
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
    &:hover
        box-shadow 0 18px 32px -18px #000!important
        transform translateY(-3px)
@media (max-width: $MQMobile)
  .index
    .index-con
      flex-direction column
    .index-con-li
      max-width 100%
      padding 0 2.5rem
@media (max-width: $MQMobileNarrow)
  .index
    .index-con-li
      max-width 100%
      h2
        font-size 1.25rem
</style>