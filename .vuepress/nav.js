// 模块导航栏
module.exports = [
    { "text": "主页", link: "/", icon: "reco-home" },
    { "text": "笔记&教程", "icon": "reco-message", 
		"items": [
			{ "text": "Docker", "link": "/docs/docker/" },
            { "text": "初级开发篇", "link": "/docs/zero/"},
            { "text": "中高进阶篇", "link": "/docs/high/"}

        ]
    },
    {
        "text": "参考文档", "icon": "reco-message",
        "items": [
            {
                "text": "项目🎈",
                "items": [{
                    "text": "My Project",
                    "link": "/other/project",
                }]
            }, {
                "text": "实用网站🎈",
                "items": [{
                    "text": "Java SE API Documentation",
                    "link": "https://docs.oracle.com/javase/8/docs/api/index.html",
                }, {
                    "text": "Program Creek",
                    "link": "https://www.programcreek.com/",
                }, {
                    "text": "Spring",
                    "link": "https://spring.io/",
                }, {
                    "text": "Stackoverflow",
                    "link": "https://stackoverflow.com/",
                }, {
                    "text": "LeetCode",
                    "link": "https://leetcode-cn.com/",
                }, {
                    "text": "Vue.js",
                    "link": "https://cn.vuejs.org/v2/guide/",
                }, {
                    "text": "BootCDN",
                    "link": "https://www.bootcdn.cn/",
                }, {
                    "text": "Linux命令大全",
                    "link": "https://www.linuxcool.com/",
                }, {
                    "text": "编程语言排行榜",
                    "link": "https://www.tiobe.com/tiobe-index/",
                }]
            },]
    },
    {
        "text": "工具箱", "icon": "reco-message",
        "items": [
			{
                "text": "在线编辑",
				"items": [
					{"text": "图片压缩", "link": "https://tinypng.com/"}
				]
            },
			{
                "text": "在线服务",
				"items": [
					{"text": "阿里云", "link": "https://www.aliyun.com/"},
					{"text": "腾讯云", "link": "https://cloud.tencent.com/"}
				]
            },
			{
                "text": "博客指南",
				"items": [
					{"text": "掘金", "link": "https://juejin.im/"},
					{"text": "CSDN", "link": "https://blog.csdn.net/"}
				]
            }
        ]
    },
    { "text": "时间轴", "link": "/timeline/", "icon": "reco-date" },
	{ "text": "联系我", 
        "icon": "reco-message",
        "items": [
          { "text": "GitHub", "link": "https://github.com/liuyangv", "icon": "reco-github" }
        ]
    }
]