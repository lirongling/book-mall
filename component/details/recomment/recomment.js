//Component Object
Component({
    properties: {
        recommend: {
            type: Array,
            value: [],
        },

    },
    data: {

    },
    methods: {
        changes() {
            this.triggerEvent('send', '111')
        },
        changeBook(e) {
            console.log(e);
            this.triggerEvent('book', e.currentTarget.dataset.bid)
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