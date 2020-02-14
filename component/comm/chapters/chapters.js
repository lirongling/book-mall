//Component Object
import create from '../../../utils/store/create'
import store from '../../../store/index'
import api from '../../../http/api'
create.Component(store, {
    use: ['chapters', 'bid', 'title'],
    properties: {
        bid: {
            type: Number,
            value: null,
        },

    },
    data: {
        url: ''
    },
    methods: {
        closeChapters(e) {
            this.triggerEvent('close', false)
        },
        jumpChapters(e) {
            if (this.data.url === 'pages/read/read') {
                this.triggerEvent('change', e.currentTarget.dataset.index)
            } else {
                wx.redirectTo({
                    url: `/pages/read/read?bid=${this.store.data.bid}&title=${this.store.data.title}&num=${e.currentTarget.dataset.index}`
                })
            }
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
                }
            }).catch(err => {
                console.log(err);
                wx.hideLoading();
            })
        },

    },
    created: function() {

    },
    attached: function() {

    },
    ready: function() {
        var pages = getCurrentPages() //获取加载的页面
        var currentPage = pages[pages.length - 1] //获取当前页面的对象
        this.setData({
            url: currentPage.route
        })
        let url = currentPage.route
        if (url !== 'pages/read/read') {
            this.bookChapters()
        }
    },
    moved: function() {

    },
    detached: function() {

    },
});