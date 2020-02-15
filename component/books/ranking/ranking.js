//Component Object
Component({
    properties: {
        myProperty: {
            type: String,
            value: '',
            observer: function() {}
        },
        male: {
            type: Object,
            value: {}
        },
        name: {
            type: String,
            value: ''
        },
        gender: {
            type: String,
            value: ''
        }

    },
    data: {

    },
    methods: {
        goCar(e) {
            console.log('object');
            let tid = e.currentTarget.dataset.tid
            let title = e.currentTarget.dataset.title
            wx.navigateTo({
                url: `/pages/booksCars/booksCars?name=${this.properties.name}&tid=${tid}&title=${title}`,
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