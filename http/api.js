import service from './index'

export default {
    // 获取轮播图
    // getBanners() {
    //     return service.get('banner')
    // },
    // // 登录
    // login(params) {
    //     return service.post('login', params)
    // },
    // 获取大分类
    getCats() {
        return service.get('/cats/lv2/statistics')
    },
    //获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
    getCatsBooks(gender, type, major, start, minor) {
        if (minor) {
            return service.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`)
        } else {
            return service.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`)
        }
    },
    //获取小类

    getMinor() {
        return service.get('/cats/lv2')
    }


}