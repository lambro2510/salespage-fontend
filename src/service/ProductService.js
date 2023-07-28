import axios from "axios";
import { URL } from "../constant";
import { getErrorFromResponse, Authorization, notificationFromResponse } from "../utils";
const ProductService = {
    async findProduct(productFilter) {
        try {
            const response = await axios.get(URL + '/api/v1/public/product', {
                params: {
                    productId: productFilter?.productId,
                    productType: productFilter?.productType,
                    productName: productFilter?.productName,
                    minPrice: productFilter?.minPrice,
                    maxPrice: productFilter?.maxPrice,
                    storeName: productFilter?.storeName,
                    ownerStoreUsername: productFilter?.ownerStoreUsername,
                    page: productFilter?.page,
                    size: productFilter?.size,
                    sort: productFilter?.sort,
                },
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async updateProduct(product) {
        try {
            const response = await axios.put(URL + '/api/v1/product', {
                productName: product?.productName,
                description: product?.description,
                type: product?.type,
                productPrice: product?.productPrice,
                sellingAddress: product?.sellingAddress,
                storeId: product?.storeId,
                imageUrl: product?.imageUrl,
                productId: product?.productId
            }, {
                headers: Authorization()
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async getProductType() {
        try {
            const response = await axios.get(URL + '/api/v1/public/product/type', {});
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error)
        }
    },

    async getProductDetail(productId) {
        try {
            const response = await axios.get(URL + '/api/v1/public/product/detail' + `?productId=${productId}`, {});
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error)
        }
    },

    async uploadProductImage(productId, files) {
        try {
            const response = await axios.post(
                URL + '/api/v1/product/upload-images' + `?productId=${productId}`,
                files,
                {
                    headers: { ...Authorization(), 'Content-Type': 'multipart/form-data' }
                }
            );
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error)
        }
    },

    async deleteProductImages(productId, images) {
        try {
            const response = await axios.delete(URL + '/api/v1/product/delete-images',
                {
                    headers: Authorization(),
                    params: {
                        productId: productId,
                        imageIds: images
                    }
                });

                return notificationFromResponse(response?.data);
            } catch (error) {
            getErrorFromResponse(error);
        }
    }

}

export default ProductService;