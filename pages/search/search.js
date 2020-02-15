import api from '../../http/api'
import create from '../../utils/store/create'
import store from '../../store/index'

create.Page(store, {
    /**
     * 页面的初始数据
     */
    data: {
        hotWords: [],
        newHotWords: [],
        inputValue: '',
        history: [],
        booksData: [],
        bookIdx: 20,
    },
    bindinput: function(e) {
        this.setData({
            inputValue: e.detail.value
        })
        console.log(this.data.inputValue);
        if (e.detail.value.trim() !== '') {
            this.bookSearch()
        } else {
            this.setData({
                booksData: [],
            })
        }
    },
    search(e) {

        this.setData({
            inputValue: e.detail
        })
        this.bookSearch()

    },
    // 搜索
    bookSearch() {
        wx.showLoading({
            title: '加载中',
        });
        api.bookSearch(this.data.inputValue).then(res => {
            console.log(res);
            if (res.ok) {
                wx.hideLoading();
                // util.keyWord(res.books, this.data.inputValue)
                res.books.map(item => {
                    item.cover = 'https://statics.zhuishushenqi.com' + item.cover
                })
                this.setData({
                    booksData: res.books,
                })

            } else {
                wx.hideLoading();
            }
            if (this.data.inputValue.trim().length === 0) {
                this.setData({
                    booksData: []
                })
            }

        }).catch(err => {
            console.log(err);
            wx.hideLoading();
        })
    },
    // 删除输入框的值
    delValues() {
        this.setData({
            inputValue: '',
            booksData: [],
        })
    },
    hotWord() {
        wx.showLoading({
            title: '加载中',
        });
        api.hotWord().then(res => {
            console.log(res);
            if (res.ok) {
                wx.hideLoading();
                this.setData({
                    newHotWords: res.newHotWords,
                    hotWords: res.hotWords,
                })

            } else {
                wx.hideLoading();
            }

        }).catch(err => {
            console.log(err);
            wx.hideLoading();
        })
    },
    // 获取搜索历史
    getHistory() {
        if (wx.getStorageSync('history')) {
            let a = wx.getStorageSync('history');
            this.setData({
                history: a
            })
        }
    },
    addHistory(e) {
        this.data.history.unshift(e.detail)
        this.setData({
            history: this.data.history
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        wx.setNavigationBarTitle({
            title: '搜索',
        });
        this.hotWord()
        this.getHistory()
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