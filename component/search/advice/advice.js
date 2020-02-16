import create from '../../../utils/store/create'
import store from '../../../store/index'
create.Component(store, {
    use: ['history'],
    properties: {

        name: {
            type: String,
            value: '',
        },
        hotWords: {
            type: Array,
            value: [],
        },
        type: {
            type: Number,
            value: 0,
        }

    },
    data: {
        advices: [],

    },
    methods: {
        // getHistory() {
        //     if (wx.getStorageSync('history')) {
        //         this.store.data.history = JSON.parse(wx.getStorageSync('history'));
        //     } else {
        //         this.store.data.history = []
        //     }
        // },
        changeAdvice() {
            console.log('object');
            let a = this.data.advices.slice(6)
            let b = this.data.advices.slice(0, 6)
            let c = a.concat(b)

            this.setData({
                advices: c
            })
        },
        goTo(e) {
            let item = e.currentTarget.dataset.item
            if (this.properties.type === 1) {
                wx.navigateTo({
                    url: `/pages/details/details?bid=${item.book}`,
                });
            } else {

                this.triggerEvent('search', item)
            }
        },
        // 删除搜索历史
        delHistory() {
            wx.showModal({
                title: '是否确认删除搜搜历史',
                content: '',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                    if (result.confirm) {
                        wx.removeStorageSync('history');
                    }
                },
                fail: () => {},
                complete: () => {}
            });

        }

    },
    created: function() {

    },
    attached: function() {

    },
    ready: function() {
        // this.getHistory()
        setTimeout(() => {
            this.setData({
                advices: this.properties.hotWords
            })

        }, 500)


    },
    moved: function() {

    },
    detached: function() {

    },
});