// exports.config = {
//     BASE_URL: "http://localhost:5000/",
// }
exports.config = {
    BASE_URL: "https://iitp-portal.herokuapp.com/",
}
exports.ClassView = {
    PROFILE: "PROFILE",
    CLASS_MENU: "CLASS_MENU",
    CLASS_SCREEN: "CLASS_SCREEN",
    ADD_CLASS_SCREEN: "ADD_CLASS_SCREEN"
}
exports.getRequestHeaders = (token) => {
    const reqConfig = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return reqConfig
}