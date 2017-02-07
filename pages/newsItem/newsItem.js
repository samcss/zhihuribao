
Page({
    data: {
        content: {},
        title: 'Sam',
        author: 'Sam',
        artilce: 'Sam'
    },
    onReady: function() {
        wx.setNavigationBarTitle({
          title: '详情页面'
        })
    },

    onLoad: function(options) {
        var that = this;
        wx.request({
            url: 'http://news-at.zhihu.com/api/4/news/' + options.id,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                //正则获取标题
                var title = res.data.body.match(/<h2 class=\"question-title\">(.)+<\/h2>/)[0];
                title = title.replace(/<h2 class=\"question-title\">/,'').replace(/<\/h2>/,'');

                //正则获取作者
                var author = res.data.body.match(/<span class=\"author\">(.){1,10}<\/span>/)[0];
                author = author.replace(/<span class=\"author\">/,'').replace(/<\/span>/,'');

                //正则获取文章正文
                var article = res.data.body.match(/<p>(.)+<\/p>/g);
                article = article.join(' ');
                article = article.replace(/<(\/)*([a-z])+>/g,'');
                article = article.replace(/&rdquo/g,'').replace(/&ldquo/g,'');
                that.setData({
                    content: res.data,
                    title: title,
                    author: author,
                    article: article
                });
                
            }
        })
    }
})