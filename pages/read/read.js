// pages/read/read.js
import api from '../../http/api'
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {

    /**
     * 页面的初始数据
     */
    data: {
        bid: null,
        isChapters: false,
        title: '',
        body: null,
        num: 0,
        contentSize: 32,
        contenBack: '',
        showColors: false,
        showSets: false,
        contentHeight: 0

    },
    // 关闭目录
    closeChapters(e) {
        this.setData({
            isChapters: e.detail,
        })


    },
    changes(e) {
        this.setData({
            num: e.detail,
            isChapters: false,
        })
        this.chapterContent()
    },
    chapterContent() {
        wx.showLoading({
            title: '加载中',
        });
        let link = this.store.data.chapters[this.data.num].link
        api.chapterContent(link).then(res => {
            wx.hideLoading();

            if (res.ok) {
                // this.store.data.chapters = res.mixToc.chapters
                res.chapter.body = res.chapter.body.replace(/\r\n\r\n/g, '<br/><br/>&emsp;&emsp;');
                this.setData({
                    title: this.store.data.chapters[this.data.num].title,
                    body: res.chapter.body,
                    num: this.data.num++
                })


            }
        }).catch(err => {
            console.log(err);
            wx.hideLoading();
        })
    },
    // 书籍章节
    bookChapters() {
        wx.showLoading({
            title: '加载中',
        });
        api.bookChaptersBookId(this.store.data.bid).then(res => {
            wx.hideLoading();
            if (res.ok) {
                this.store.data.chapters = res.mixToc.chapters
                this.chapterContent()
            }
        }).catch(err => {
            console.log(err);
            wx.hideLoading();
        })
    },
    // 上一章
    up() {
        if (this.data.num === 0) {
            wx.showToast({
                title: '已经是第一章了',
                icon: 'none',
            });
        } else {
            this.data.num--
                this.setData({
                    num: this.data.num
                })
            this.chapterContent()

        }
    },
    // 下一章
    down() {
        if (this.data.num >= this.store.data.chapters.length) {
            wx.showToast({
                title: '已经是最新一章了',
                icon: 'none',
            });
        } else {
            this.data.num++
                this.setData({
                    num: this.data.num
                })
            this.chapterContent()

        }
    },
    // 展示目录
    showChapters() {
        this.setData({
            isChapters: true
        })
    },
    // 改变字体
    changeSize(e) {
        this.data.contentSize += e.currentTarget.dataset.num
        if (this.data.contentSize < 15) {
            wx.showToast({
                title: '不能减小了，会影响视力哟',
                icon: 'none',
            });
            return
        } else if (this.data.contentSize > 65) {
            wx.showToast({
                title: '不能再增大了，会影响阅读体验哟',
                icon: 'none',
            });
            return
        } else {
            this.data.contentSize += e.currentTarget.dataset.num
            this.setData({
                contentSize: this.data.contentSize
            })
        }


    },
    changeColor(e) {
        this.setData({
            contenBack: e.currentTarget.dataset.color,
            showColors: false
        })

    },

    showColor() {
        this.setData({
            showColors: !this.data.showColors
        })
    },
    showSet() {
        this.setData({
            showSets: true
        })
    },
    HiddenSet() {
        this.setData({
            showSets: false
        })
    },
    getHeight() {
        let query = wx.createSelectorQuery()
        query.select('#index-nav').boundingClientRect((rect) => {
            let top = rect.top
                // console.log(rect);
                // // console.log(wx.getSystemInfoSync().windowHeight);
                // console.log(rect.top);
            console.log(rect.bottom);
            let a = rect.bottom * 2
            this.setData({
                contentHeight: a
            })
        }).exec()

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options.num);
        this.setData({
            num: options.num
        })
        wx.setNavigationBarTitle({
            title: options.title,
        });

        // this.store.data.bid = options.bid
        this.bookChapters()
        setTimeout(() => {
            this.getHeight()
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