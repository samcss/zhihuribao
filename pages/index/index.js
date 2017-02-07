
var utils = require('../../utils/util.js');

Page({
    data: {
        topStories: {},
        stories: {},
        open: false,
        mark: 0,
        newmark: 0,
        istoright: true,
        theme_list: {}
    },
    onLoad: function() {
        var that = this;
        wx.request({
            url: 'http://news-at.zhihu.com/api/4/news/latest',
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                //console.log(res.data);
                that.setData({
                    topStories: res.data.top_stories,
                    stories: res.data.stories
                })
            }
        });
        this.index = 0;
    },

    onNewsTap: function(event) {
        var newsID = event.currentTarget.dataset.newsid;
        wx.navigateTo({
            url: '/pages/newsItem/newsItem?id=' + newsID
        })
    },

    //加载更多新闻
    onMoreTap: function(event) {
        this.index++;
        var date = new Date();
        var nextDay = utils.formatDate(date) - this.index;
       // console.log(1,a);
        var that = this;
        this.setData({
                open: false
        });
        wx.request({
            url: 'http://news-at.zhihu.com/api/4/news/before/' + nextDay,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                that.setData({
                    stories: that.data.stories.concat(res.data.stories)
                })
            }
        });
    },

    //侧滑菜单
    tap_start: function(event) {
        this.data.mark = this.data.newmark = event.touches[0].pageX;
    },
    tap_drag: function(event) {
        this.data.newmark = event.touches[0].pageX;

        if(this.data.newmark - this.data.mark > 50) {
            this.data.istoright = true;
        } else if (this.data.newmark < this.data.mark) {
            this.data.istoright = false;
        }
    },
    tap_end: function(event) {
        this.data.mark = this.data.newmark = 0;
        if(this.data.istoright) {
            this.setData({
                open: true
            })
        } else {
             this.setData({
                open: false
            })
        };

        var that = this;
        wx.request({
            url: 'http://news-at.zhihu.com/api/4/themes',
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                that.setData({
                    theme_list: res.data.others
                })
            }
        })
    },

    onThemeTap: function(event) {
        var that = this;
        var themeID = event.currentTarget.dataset.themeid;
        wx.navigateTo({
            url: '/pages/themeItem/themeItem?id=' + themeID
        });
        that.setData({
                open: false
        });

    },

    onHomeTap: function(event) {
        var that = this;
        wx.redirectTo({
            url: 'pages/index/index'
        });
        that.setData({
                open: false
        });
    }



})