//Component Object
Component({
    properties: {
        myProperty: {
            type: String,
            value: '',
            observer: function() {}
        },

    },
    data: {

    },
    methods: {
        help() {
            wx.navigateTo({
                url: '/pages/help/help',

            });
        },
        edit() {
            this.triggerEvent('edit', 'item')
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