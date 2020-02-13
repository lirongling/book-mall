//Component Object
Component({
    properties: {
        details: {
            type: Object,
            value: {},

        },

    },
    data: {

    },
    methods: {
        changes() {
            // this.num = item;
            let rgb1 = parseInt(Math.random() * 255);
            let rgb2 = parseInt(Math.random() * 255);
            let rgb3 = parseInt(Math.random() * 255);
            let rag = `rgb(${rgb1},${rgb2},${rgb3})`;
            return rag

        },
        goTo(e) {
            console.log(e);
            let bid = e.currentTarget.dataset.bid
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

    },
    moved: function() {

    },
    detached: function() {

    },
});