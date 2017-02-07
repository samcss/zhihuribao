Page({
    data: {
        data_list: []
    },

    onLoad: function() {
        var that = this;
        wx.request({
            url: 'http://news-at.zhihu.com/api/4/themes',
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                that.setData({
                    data_list: res.data.others
                })
            }
        })
    },

    onThemeTap: function(event) {
       var themeID = event.currentTarget.dataset.themeid;
       wx.navigateTo({
            url: '/pages/themeItem/themeItem?id=' + themeID
        })
    }
})