import api from '../../http/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tid: null,
        booksData: [],
        bookIdx: 20,
        total: [],
        arr: [
            { name: '周榜' },
            { name: '月榜' },
            { name: '总榜' }
        ],
        bookNum: 0
    },
    lower(e) {


    },
    send(e) {
        if (e.detail !== this.data.bookNum) {
            if (e.detail === 0) {
                this.data.booksData = this.data.total.filter(item => {
                    return !item.allowMonthly
                })
            } else if (e.detail === 1) {
                this.data.booksData = this.data.total.filter(item => {
                    return item.allowMonthly
                })
            } else {
                this.data.booksData = this.data.total
            }
            if (this.data.booksData.length === 0) {
                wx.showToast({
                    title: '暂无此数据',
                    icon: 'none',

                });
            }
            this.setData({
                bookNum: e.detail,
                bookIdx: 20,
                booksData: this.data.booksData,
            })
        }


    },
    onPageScroll(e) {
        // console.log(e);
    },
    rankInfo() {
        wx.showLoading({
            title: '加载中',
        });
        api.rankInfo(this.data.tid).then(res => {
            wx.hideLoading();
            if (res.ok) {
                res.ranking.books.map(item => {
                        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
                    })
                    // this.data.mouth = res.ranking.books.filter(item => {
                    //     return item.allowMonthly
                    // })
                this.data.booksData = res.ranking.books.filter(item => {
                    return !item.allowMonthly
                })
                if (this.data.booksData.length === 0) {
                    wx.showToast({
                        title: '暂无此数据',
                        icon: 'none',

                    });
                }
                this.setData({
                    booksData: this.data.booksData,
                    total: res.ranking.books,


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