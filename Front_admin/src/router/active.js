export default (req) => {
    // 获取那个点击的a的href
    let url = req.url
    $(`.sidebar-menu a[href="#${url}"]`).parent().addClass('active').siblings().removeClass('active')
  }