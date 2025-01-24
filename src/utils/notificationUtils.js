const { default: axios } = require("axios");

const fetchNotificationCount = async () => {
    try {
        const response = await axios.get(`/api/common/get-notification-count/${user.userId}`)
        setNotificationCount(response.data.count)
    } catch (error) {
        setNotificationCount(0)
    }
}

module.exports = fetchNotificationCount;