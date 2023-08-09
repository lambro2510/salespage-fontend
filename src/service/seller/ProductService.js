import axios from "axios";
import { URL } from "../../constant";
import { Authorization, getErrorFromResponse, notificationFromResponse } from "../../utils";
const ProductService = {
    async getAllProduct(productFilter) {
        try {
            const response = await axios.get(URL + `/api/v1/seller/product`,
                {
                    params : {
                        storeName : productFilter?.storeName
                    },
                    headers: Authorization()
                },

            );
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async getProductDetail(productId) {
        try {
            const response = await axios.get(URL + `/api/v1/seller/product/detail`,
                {
                    params : {
                        productId : productId
                    },
                    headers: Authorization()
                },

            );
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },


    async createProduct(product) {
        try {
            const response = await axios.post(URL + '/api/v1/seller/product', {
                productName: product?.productName,
                description: product?.description,
                categoryId: product?.categoryId,
                productPrice: product?.productPrice,
                sellingAddress: product?.sellingAddress,
                storeId: product?.storeId,
                imageUrl: product?.imageUrl
            }, {
                headers: Authorization()
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async updateProduct(product) {
        try {
            const response = await axios.put(URL + '/api/v1/seller/product', {
                productName: product?.productName,
                description: product?.description,
                categoryId: product?.categoryId,
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

    async deleteProduct(id) {
        try {
            const response = await axios.delete(URL + '/api/v1/seller/product', {
                params: {
                    productId : id
                },
                headers: Authorization()
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    

    async uploadProductImage(productId, file) {
        try {
            const response = await axios.post(
                URL + `/api/v1/seller/product/upload?productId=${productId}`,
                file,
                {
                    headers: { ...Authorization(), 'Content-Type': 'multipart/form-data' }
                }
            );
            return notificationFromResponse(response);
        } catch (error) {
            getErrorFromResponse(error)
        }
    },

    async updateProductImage(productId, imageUrl) {
        try {
            const response = await axios.put(URL + `/api/v1/seller/product/image?productId=${productId}&imageUrl=${imageUrl}`,
                {},
                {
                    headers: Authorization(),
                });

            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async deleteProductImages(productId, images) {
        try {
            const response = await axios.delete(URL + '/api/v1/seller/product/delete-images',
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
    },

}

export default ProductService;