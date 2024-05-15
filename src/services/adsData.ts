import { apiClient } from 'config/apiHandler';
import { ADS_ENDPOINTS } from 'config/endPoints';
export async function getAllAdsData() {
  try {
    const response = await apiClient.get<any>(ADS_ENDPOINTS.GET_ALL_ADS);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
export async function getAdsRecord(count:number){
  try{
    const response = await apiClient.get<any>(`${ADS_ENDPOINTS.GET_ADS_RECORD}?offset=0&limit=${count}`)
    return response?.data;
  }
  catch(error){
    throw error;
  }
}
export async function getAdsDetails(id: number) {
  try {
    const response = await apiClient.get<any>(`${ADS_ENDPOINTS.GET_ADS_DETAILS}/${id}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export async function toggleAdsBannerStatus(id: any, banner: boolean) {
  try {
    const response = await apiClient.put<any>(`${ADS_ENDPOINTS.TOGGLE_ADS_BANNER_STATUS}/${id}`, { banner });
    return response?.data;
  } catch (error) {
    throw error;
  }
}
export async function toggleAdsDetailsBannerStatus(id: any, banner: boolean) {
  try {
    const response = await apiClient.put<any>(`${ADS_ENDPOINTS.TOGGLE_ADS_BANNER_STATUS}/${id}`, { banner });
    return response?.data;
  } catch (error) {
    throw error;
  }
}
export async function toggleAdsStatus(id: any, status: string) {
  try {
    const response = await apiClient.put<any>(`${ADS_ENDPOINTS.TOGGLE_ADS_STATUS}/${id}`, { status });
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteAds(id: any) {
  try {
    const response = await apiClient.delete<any>(`${ADS_ENDPOINTS.DELETE_ADS}/${id}`);
    console.log(response);
    return response?.data;
  } catch (error) {
    throw error;
  }
}