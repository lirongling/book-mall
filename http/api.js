import service from './index'
const API_HOST = 'https://api.zhuishushenqi.com' //接口地址
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
    },
    // 书籍详情
    // bookInfo: function(book_id) { // @param book_id 书籍id
    //     return API_HOST + '/book/' + book_id
    // },

    bookInfo(book_id) {
        return service.get(`/book/${book_id}`)
    },
    // 短评
    // shortReviews: function (book_id) {  // @param book_id 书籍id    完整接口 ?book=5816b415b06d1d32157790b1&limit=20&total=true&start=0&sortType=hottest
    //     return `${API_HOST}/post/short-review?book=${book_id}&total=true&sortType=newest`
    // },
    shortReviews(book_id, start) {
        return service.get(`/post/short-review?book=${book_id}&limit=20&total=true&start=${start}&sortType=hottest`)
    },
    // 相关推荐
    //  relatedRecommendedBooks: function (book_id) { // @param book_id 书籍id
    //     return `${API_HOST}/book/${book_id}/recommend`
    // },
    relatedRecommendedBooks(book_id) {
        return service.get(`book/${book_id}/recommend`)
    },
    // 书籍章节 根据书id
    // bookChaptersBookId: function (book_id) {
    //     return `${API_HOST}/mix-atoc/${book_id}?view=chapters`
    // },
    bookChaptersBookId(book_id) {
        return service.get(`mix-atoc/${book_id}?view=chapters`)
    },
    // 章节内容
    // chapterContent: function(link) { // @param link 章节link
    //     return `https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`
    // },
    chapterContent(link) {
        return service.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
    }




}