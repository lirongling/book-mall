import api from '../../http/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tid: null,
        booksData: [],
        bookIdx: 20,
    },
    lower(e) {


    },
    rankInfo() {
        wx.showLoading({
            title: '加载中',
        });
        api.rankInfo(this.data.tid).then(res => {
            console.log(res);
            if (res.ok) {
                wx.hideLoading();
                res.ranking.books.map(item => {
                    item.cover = 'https://statics.zhuishushenqi.com' + item.cover
                })
                this.setData({
                    booksData: res.ranking.books
                })

            } else {
                wx.hideLoading();
            }

        }).catch(err => {
            console.log(err);
            wx.hideLoading();
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: options.name + '  ' + options.title
        });
        this.setData({
            tid: options.tid
        })
        this.rankInfo()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (this.data.bookIdx >= this.data.booksData.length) {
            wx.showToast({
                title: '没有更多了哟',
                icon: 'none',
            });
        } else {
            wx.showLoading({
                title: '正在加载更多',
                mask: true,

            });
            this.data.bookIdx += 20
            this.setData({
                bookIdx: this.data.bookIdx
            })
            setTimeout(() => {
                wx.hideLoading();
            }, 150)
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})