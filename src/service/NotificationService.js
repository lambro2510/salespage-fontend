import axios from "axios";
import { URL } from "../constant";
import { getErrorFromResponse,Authorization, notificationFromResponse } from "../utils";
const NotificationService = {
    async getAllNotification(page, size) {
        try {
            const response = await axios.get(URL + '/api/v1/notification', {
                params: {
                    page: page,
                    size: size,
                    sort: '',
                },
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async getNotificationDetail(id) {
        try {
            const response = await axios.get(URL + `api/v1/notification/detail`,
            {
                params: {
                    notificationId: id
                },
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
            } catch (error) {
            getErrorFromResponse(error)
        }
    }
}

export default NotificationService;