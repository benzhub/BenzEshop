import axios, { AxiosResponse } from "axios";
import { ProductEditStatusProps, type ProductInfo, type ProductInfoSerialized } from "../types/Product";
import { handleAxiosError } from "../utils/handleAxiosError";
import { getAuthToken } from "../utils/getAuthToken";
const apiUrl = import.meta.env.VITE_API_URL;

export async function getProducts(): Promise<ProductInfoSerialized[]> {
  const authToken = getAuthToken();
  try {
    const config = {
      method: "get",
      url: `${apiUrl}/store/manage/products/`,
      headers: {
        Authorization: `JWT ${authToken}`,
      },
    };
    const response: AxiosResponse<ProductInfo[]> = await axios.request(config);
    const products: ProductInfoSerialized[] = response.data.map(
      (product: any) => {
        const { unit_price, is_deleted, ...productCopied } = product;
        return {
          ...productCopied,
          unitPrice: product.unit_price,
          isDeleted: product.is_deleted,
        };
      },
    );
    return products;
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function getProduct(productId: number): Promise<ProductInfoSerialized> {
  const authToken = getAuthToken();
  try {
    const config = {
      method: "get",
      url: `${apiUrl}/store/manage/products/${productId}/`,
      headers: {
        Authorization: `JWT ${authToken}`,
      },
    };
    const response: AxiosResponse<ProductInfo> = await axios.request(config);
    return {
      ...response.data,
      unitPrice: response.data.unit_price,
      isDeleted: response.data.is_deleted,
    };
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function setProductStatus(productStatus: ProductEditStatusProps): Promise<ProductInfo> {
  const authToken = getAuthToken();
  try {
    const config = {
      method: 'patch',
      url: `${apiUrl}/store/manage/products/${productStatus.productId}/`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `JWT ${authToken}`
      },
      data : JSON.stringify({
        "is_deleted": !productStatus.status
      })
    };
    const response: AxiosResponse<ProductInfo> = await axios.request(config);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
  
}