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
        }


    },
    data: {
        indexItem: 0,
    },
    methods: {
        clickItem(e) {

            this.setData({
                indexItem: e.currentTarget.dataset.index
            })
            this.triggerEvent('send', e.currentTarget.dataset.index)

        },
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