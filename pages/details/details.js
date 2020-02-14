// pages/details/details.js
import api from '../../http/api'
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {
    use: ['chapters', 'bid', 'title'],
    /**
     * 页面的初始数据
     */
    data: {
        bid: null,
        bookDateils: {},
        arr: [{ name: '详情' },
            { name: '评价' }
        ],
        indexItem: 0,
        total: null,
        shortReview: [],
        start: 0,
        toView: 'green',
        recommend: [],
        recommends: [],
        isChapters: false,
        collectionText: '加入书架',
        bookList: [],
        flage: false,
    },
    send(e) {
        this.setData({
            indexItem: e.detail
        })

    },
    lower(e) {
        if (this.data.indexItem === 1) {
            this.shortReviews()
        }

    },
    // 获取书籍详情
    bookInfo() {
        wx.showLoading({
            title: '加载中',
        });
        // console.log(api.bookInfo());
        api.bookInfo(this.data.bid).then(res => {
            if (res.advertRead) {
                wx.hideLoading();
                res.cover = 'https://statics.zhuishushenqi.com' + res.cover
                this.setData({
                    bookDateils: res
                })
                this.store.data.title = res.title
                this.relatedRecommendedBooks()
                this.isCollection()

                // this.store.data.classifyData = JSON.stringify(res)
            } else {
                wx.hideLoading();
            }

        }).catch(err => {
            console.log(err);
            wx.hideLoading();
        })
    },
    // 短评
    shortReviews() {
        wx.showLoading({
            title: '加载中',
        });
        api.shortReviews(this.data.bid, this.data.start).then(res => {
            wx.hideLoading();
            if (res.ok) {
                this.data.start++
                    res.docs.map(item => {
                        item.author.avatar = 'https://statics.zhuishushenqi.com' + item.author.avatar
                    })
                this.data.shortReview = this.data.shortReview.concat(res.docs)
                this.setData({
                    shortReview: this.data.shortReview,
                    total: res.total,
                    arr: [{ name: '详情' },
                        { name: `评价(${res.total})` }
                    ],
                    start: this.data.start
                })

            }


        }).catch(err => {
            console.log(err);
            wx.hideLoading();
        })
    },
    //相关推荐
    relatedRecommendedBooks() {
        wx.showLoading({
            title: '加载中',
        });
        api.relatedRecommendedBooks(this.data.bid).then(res => {
            wx.hideLoading();
            if (res.ok) {
                res.books.map(item => {
                    item.cover = 'https://statics.zhuishushenqi.com' + item.cover
                })
                res.books = res.books.filter(item => {
                    return item.title !== this.data.bookDateils.title
                })
                this.setData({
                    recommends: res.books,
                    recommend: res.books.slice(0, 3),
                })
            }
            // recommends


        }).catch(err => {
            console.log(err);
            wx.hideLoading();
        })
    },
    changeRecommend() {
        let a = this.data.recommends.slice(3)
        let b = this.data.recommends.slice(0, 3)
        let c = a.concat(b)
        this.setData({
            recommend: b,
            recommends: c,
        })
    },
    changeBook(e) {

        this.setData({
            bid: e.detail,
            start: 0
        })
        this.bookInfo()
        this.shortReviews()

    },
    // 关闭目录
    closeChapters(e) {
        this.setData({
            isChapters: e.detail,
        })

    },
    // 开始阅读
    read() {
        wx.redirectTo({
            url: `/pages/read/read?bid=${this.data.bid}&title=${this.data.bookDateils.title}&num=${0}`
        })
    },
    // 显示目录
    showChapters() {
        this.setData({
            isChapters: true,
        })
    },
    // 显示大图长按后保存
    bigImg() {
        wx.previewImage({
            current: this.data.bookDateils.cover,
            urls: [ // 所有图片的URL列表，数组格式
                this.data.bookDateils.cover
            ],
            success: function(res) {
                console.log(res)
            }
        })
    },
    // 存书架
    addBookList() {
        let book = {
            _id: this.data.bookDateils._id,
            title: this.data.bookDateils.title,
            cover: this.data.bookDateils.cover
        }
        if (!this.data.flage) {
            this.data.bookList.unshift(book)
            wx.setStorageSync('bookList', JSON.stringify(this.data.bookList));
            this.setData({
                bookList: this.data.bookList,
                flage: true,
                collectionText: '已加入书架',
            })
            wx.showToast({
                title: '加入成功',
                icon: 'success',

            });
        } else {
            wx.showToast({
                title: '已加入书架',
                icon: 'none',

            });
        }

        // console.log(bookList);

    },
    // 判断是否已收藏
    isCollection() {
        this.data.flage = false
        this.data.collectionText = '加入书架'
        if (wx.getStorageSync('bookList')) {
            this.data.bookList = JSON.parse(wx.getStorageSync('bookList'));
            // console.log(wx.getStorageInfoSync('keys').bookList);
            this.data.flage = this.data.bookList.some(item => {
                return item._id === this.data.bookDateils._id
            })
            if (this.data.flage) {
                this.setData({
                    collectionText: '已加入书架',
                })
            } else {
                this.setData({
                    collectionText: '加入书架',
                })
            }
        } else {
            this.setData({
                flage: this.data.flage,
                bookList: this.data.bookList,
                collectionText: this.data.collectionText,
            })
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '详情'
        });
        this.setData({
            bid: options.bid
        })
        this.store.data.bid = options.bid

        this.bookInfo()
        this.shortReviews()


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