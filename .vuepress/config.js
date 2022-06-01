const navConf = require("./nav.js")
const sidebarConf = require("./sidebar.js")
module.exports = {
  "title": "刘杨的博客🎈",
  "description": "道阻且长，行则将至 .",
  "dest": "public",
  "port": "9000",
  "head": [
    ["link", { "rel": "icon", "href": "/favicon.ico" }],
    ["meta", { "name": "viewport", "content": "width=device-width,initial-scale=1,user-scalable=no" }]
  ],
  "theme": "reco",
  "themeConfig": {
    "type": "blog",
    "nav": navConf,
    "sidebar": sidebarConf,
    
    // 博客设置
    "blogConfig": {
      "category": {
        "location": 2, // 在导航栏菜单中所占的位置，默认2
        "text": "分类" // 默认 “分类”
      },
      "tag": {
        "location": 3, // 在导航栏菜单中所占的位置，默认3
        "text": "标签" // 默认 “标签”
      }
    },
    // "friendLink": [
    //    {
    //      "title": "午后南杂",
    //      "desc": "Enjoy when you can, and endure when you must.",
    //      "email": "1156743527@qq.com",
    //      "link": "https://www.recoluan.com"
    //    },
    //    {
    //      "title": "vuepress-theme-reco",
    //      "desc": "A simple and beautiful vuepress Blog & Doc theme.",
    //      "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
    //      "link": "https://vuepress-theme-reco.recoluan.com"
    //    },
    // ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    // 自动形成侧边导航
    //"sidebar": "auto",
    "lastUpdated": "上次更新",
    "author": "刘杨",
    // 作者头像
    "authorAvatar": "/avatar.png",
    // ICP备案
    "record": "鲁ICP备xxxx号",
    "recordLink": "http://www.beian.miit.gov.cn",
    // 公网安备备案
    "cyberSecurityRecord": "鲁公网安备 xxxx号",
    "cyberSecurityLink": "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=xxxxxx",
    // "serviceWorker": {
    //     "updatePopup": {
    //         "message": "有新的内容.",
    //         "buttonText": "更新"
    //     }
    // },
    // "editLinks": true,
    // "editLinkText": "在 GitHub 上编辑此页 ！",
    // 项目开始时间
    "startYear": "2022"
  },
  "markdown": {
    "lineNumbers": true
  }
}  
