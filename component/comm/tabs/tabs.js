//Component Object
Component({
    properties: {
        arr: {
            type: Array,
            value: [],
        },
        color: {
            type: String,
            value: ''
        },


    },
    data: {
        indexItem: 0,
    },
    methods: {
        clickItem(e) {
            var me = this;
            let a = 0
            var query = wx.createSelectorQuery().in(me);
            query.selectViewport().scrollOffset()
                // query.select("#index-nav").boundingClientRect();
            query.select('#box-tabs').boundingClientRect(function(res) {

                a = res.top
            }).exec()
            query.exec(function(res) {
                // console.log(res);
                // var miss = 0;
                wx.pageScrollTo({
                    scrollTop: a,
                    duration: 300
                });

            });
            // let query = wx.createSelectorQuery()
            // console.log(query.select('#index-nav').scrollTop);
            // console.log(wx.pageScrollTo);
            this.setData({
                indexItem: e.currentTarget.dataset.index
            })
            this.triggerEvent('send', e.currentTarget.dataset.index)

        },
    },
    onPageScroll(e) {
        console.log(e);
    },
    created: function() {

    },
    attached: function() {

    },
    ready: function() {

    },
    moved: function() {

    },
    detached: function() {

    },
});