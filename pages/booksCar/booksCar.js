// pages/booksCar/booksCar.js
import api from '../../http/api'

Page({
    /**
     * 页面的初始数据
     */
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



    },
    getCatsBook() {
        wx.showLoading({
            title: '加载中',
        });
        api.getCatsBooks(this.data.gender, this.data.type, this.data.major, 0, this.data.minor).then(res => {
            console.log(res);
            if (res.ok) {
                wx.hideLoading();

                res.books.map(item => {
                    item.cover = 'https://statics.zhuishushenqi.com' + item.cover
                })
                console.log(res.books);
                this.setData({
                        booksData: res.books
                    })
                    // this.store.data.classifyData = JSON.stringify(res)
            } else {
                wx.hideLoading();
            }

        }).catch(err => {
            console.log(err);
            wx.hideLoading();
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
            indexItem: e.currentTarget.dataset.index,
            type: e.currentTarget.dataset.ids
        })

        this.getCatsBook()

    },
    clickItems(e) {
        console.log(e);
        this.setData({
            indexItems: e.currentTarget.dataset.index,
            minor: e.currentTarget.dataset.ids === '全部' ? null : e.currentTarget.dataset.ids
        })
        console.log(this.data.minor);
        this.getCatsBook()

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})