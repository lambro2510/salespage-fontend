import axios from "axios";
import { URL } from "../constant";
import { getErrorFromResponse,Authorization, notificationFromResponse } from "../utils";
const FavoriteProductService = {
    async getFavorite(favoriteType) {
        try {
            const response = await axios.get(URL + `/api/v1/favorite?favoriteType=${favoriteType}`,
            {
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async createFavorite(favoriteInfo) {
        try {
            const response = await axios.post(URL + `/api/v1/favorite`,
            {
                refId: favoriteInfo?.refId,
                favoriteType: favoriteInfo?.favoriteType,
                isLike: favoriteInfo?.isLike
            },
            {
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },
}

export default FavoriteProductService;