import create from '../../../utils/store/create'
import store from '../../../store/index'
create.Component(store, {
    use: ['search', 'searchText1'],
    properties: {
        details: {
            type: Object,
            value: {},

        },

    },
    data: {
        url: ''
    },
    methods: {
        // 保存搜索历史
        saveHistory(title) {
            console.log(store.data.searchText1);
            let history = []
            let flage = false
            if (store.data.searchText1.trim().length > 0) {
                if (wx.getStorageSync('history')) {
                    history = wx.getStorageSync('history');
                    flage = history.some((item) => {
                        return item === store.data.searchText1
                    })
                }
                if (!flage) {
                    this.triggerEvent('add', store.data.searchText1)
                    history.unshift(store.data.searchText1)
                    history = history.slice(0, 12)
                    wx.setStorageSync('history', history);
                }
            }
        },
        changes() {
            // this.num = item;
            let rgb1 = parseInt(Math.random() * 255);
            let rgb2 = parseInt(Math.random() * 255);
            let rgb3 = parseInt(Math.random() * 255);
            let rag = `rgb(${rgb1},${rgb2},${rgb3})`;
            return rag

        },
        goTos(e) {
            let item = e.currentTarget.dataset.item
            console.log(this.store.data.searchText);
            this.store.data.searchText = item
            wx.switchTab({
                url: `/pages/search/search`,
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });

        },
        goTo(e) {

            let bid = e.currentTarget.dataset.bid
            let title = e.currentTarget.dataset.title
            console.log(this.data.url);
            if (this.data.url === 'pages/search/search') {
                this.saveHistory(title)
            }
            wx.navigateTo({
                url: `/pages/details/details?bid=${bid}`,
            });

        }
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

    },
    moved: function() {

    },
    detached: function() {

    },
});