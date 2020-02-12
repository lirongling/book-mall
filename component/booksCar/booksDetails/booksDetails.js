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