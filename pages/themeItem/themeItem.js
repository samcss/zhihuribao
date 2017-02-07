Page({
    data: {
        themeList: {},
        themeDes: '',
        name: ''
    },

    onReady: function(){
        wx.setNavigationBarTitle({
          title: this.data.name
        });
    },

    onLoad: function(options) {
        var that = this;

        wx.request({
            url: 'http://news-at.zhihu.com/api/4/theme/' + options.id,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
               console.log(res.data);
               that.setData({
                   themeDes: res.data.description,
                   themeList: res.data.stories,
                   name: res.data.name
               }) 
            }
        });
    }
})