// pages/booksCar/booksCar.js
import api from '../../http/api'

Page({
    /**
     * 页面的初始数据
     */
    onShareAppMessage() {
        return {
            title: 'scroll-view',
            path: 'page/component/pages/scroll-view/scroll-view'
        }
    },
    data: {
        indexItem: 0,
        indexItems: 0,
        gender: '',
        major: '',
        booksData: [],
        typeList: [{
                id: 'hot',
                name: '热门'
            },
            {
                id: 'new',
                name: '新书'
            },
            {
                id: 'reputation',
                name: '好评'
            },
            {
                id: 'over',
                name: '完结'
            },
            {
                id: 'monthly',
                name: 'VIP'
            }
        ],
        smallClassify: [],
        minor: null,
        type: 'hot',
        start: 0,
        toView: 'green',
        contentHeight: 0



    },
    scrollToTop() {
        this.setAction({
            scrollTop: 0
        })
    },
    upper(e) {
        console.log(e);
    },
    lower(e) {
        this.getCatsBook()
    },
    getCatsBook() {
        wx.showLoading({
            title: '加载中',
        });
        api.getCatsBooks(this.data.gender, this.data.type, this.data.major, this.data.start, this.data.minor).then(res => {
            console.log(res);
            if (res.ok) {
                if (res.length === 0) {
                    wx.showToast({
                        title: '没有数据了',
                        icon: 'none',
                    });
                }
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                this.data.start++

                    res.books.map(item => {
                        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
                    })
                this.data.booksData = this.data.booksData.concat(res.books)
                console.log(this.data.booksData);
                this.setData({
                        booksData: this.data.booksData,
                        start: this.data.start,
                    })
                    // this.store.data.classifyData = JSON.stringify(res)
            } else {
                wx.hideLoading();
                wx.hideNavigationBarLoading();
            }

        }).catch(err => {
            console.log(err);
            wx.hideLoading();
            wx.hideNavigationBarLoading();
        })
    },

    // 获取小类
    getMinor() {
        wx.showLoading({
            title: '加载中',
        });
        api.getMinor().then(res => {
            if (res.ok) {
                wx.hideLoading();
                for (let i in res) {
                    if (this.data.gender === i) {
                        res[i].map(item => {
                            if (item.major === this.data.major) {
                                item.mins.unshift('全部')
                                this.setData({
                                    smallClassify: item.mins
                                })
                            }
                        })

                    }
                }

            } else {
                wx.hideLoading();
            }

        }).catch(err => {
            console.log(err);
            wx.hideLoading();
        })
    },

    clickItem(e) {
        this.setData({
            booksData: [],
            start: 0,
        })
        this.setData({
            indexItem: e.currentTarget.dataset.index,
            type: e.currentTarget.dataset.ids
        })

        this.getCatsBook()


    },
    clickItems(e) {
        this.setData({
            booksData: [],
            start: 0,
        })
        console.log(e);
        this.setData({
            indexItems: e.currentTarget.dataset.index,
            minor: e.currentTarget.dataset.ids === '全部' ? null : e.currentTarget.dataset.ids
        })
        console.log(this.data.minor);
        this.getCatsBook()

    },
    getHeight() {
        let query = wx.createSelectorQuery()
        query.select('#index-nav').boundingClientRect((rect) => {
            let top = rect.top
            console.log(rect.top);
            console.log(rect.bottom);
            this.setData({
                contentHeight: rect.bottom
            })
        }).exec()

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(wx.getSystemInfoSync().windowHeight);
        this.setData({
            major: options.name,
            gender: options.gender
        })
        wx.setNavigationBarTitle({
            title: options.name

        });
        this.getCatsBook()
        setTimeout(() => {
            this.getMinor()
        }, 400)
        this.getHeight()

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
        // 显示下拉刷新时导航条的loading
        wx.showNavigationBarLoading();
        this.getCatsBook()
            // setTimeout(() => {

        //     console.log('刷新');
        // }, 2000)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})