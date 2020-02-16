import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {
    use: ['bookList'],
    data: {
        bookList: [],
        animation: '',
        isAnimation: false,
    },
    // 删除书架
    del(e) {

        wx.showModal({
            title: '是否确认删除？',
            content: '',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                if (result.confirm) {
                    let a = e.currentTarget.dataset.index
                    this.data.bookList.splice(a, 1)
                    this.setData({
                        bookList: this.data.bookList
                    })
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success',

                    });
                    wx.setStorageSync('bookList', this.data.bookList);

                }
            },
            fail: () => {},
            complete: () => {}
        });
    },
    goRead(e) {

        if (!this.data.isAnimation) {
            wx.redirectTo({
                url: `/pages/read/read?bid=${e.currentTarget.dataset.item._id}&title=${e.currentTarget.dataset.item.title}&num=${e.currentTarget.dataset.item.chaptersNum}`
            })
        }
    },
    getBookList() {

        if (wx.getStorageSync('bookList')) {
            this.data.bookList = wx.getStorageSync('bookList');
            this.setData({
                bookList: this.data.bookList
            })

        }
    },
    edit(e) {

        this.setData({
            isAnimation: !this.data.isAnimation
        })
    },
    //options(Object)
    onLoad: function(options) {

    },
    onReady: function() {

    },
    onShow: function() {
        this.getBookList()

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});