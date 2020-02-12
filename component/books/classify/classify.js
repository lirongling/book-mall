//Component Object
import create from '../../../utils/store/create'
import store from '../../../store/index'
create.Component(store, {
    properties: {
        myProperty: {
            type: String,
            value: ''

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
        classifyData: []
    },
    methods: {
        goCar(e) {
            let name = e.currentTarget.dataset.name
            wx.navigateTo({
                url: `/pages/booksCar/booksCar?name=${name}&gender=${this.properties.gender}`,
            });
        }
    },
    lifetimes: {
        ready() {

        }
    },

});