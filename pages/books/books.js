// pages/books/books.js
import api from '../../http/api'
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {

    /**
     * 页面的初始数据
     */
    data: {
        arr: [
            { name: '分类' },
            { name: '排行' },


        ],
        indexItem: 0,
        classifyData: null
    },
    // 获取大分类数据
    getCats() {
        wx.showLoading({
            title: '加载中',
        });
        api.getCats().then(res => {
            if (res.ok) {
                wx.hideLoading();
                console.log(res);
                this.setData({
                        classifyData: res
                    })
                    // this.store.data.classifyData = JSON.stringify(res)
            } else {
                wx.hideLoading();
            }

        }).catch(err => {
            console.log(err);
            wx.hideLoading();
        })
    },
    clickItem(e) {
        this.setData({
            indexItem: e.currentTarget.dataset.index
        })

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(api);
        this.getCats()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})