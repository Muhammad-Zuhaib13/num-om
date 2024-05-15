import { apiClient } from 'config/apiHandler';
import { CHART_ENDPOINTS } from 'config/endPoints';
export async function getChartDataLastWeek() {
  try {
    const response = await apiClient.get<any>(CHART_ENDPOINTS.GET_CHART_DATA_LAST_WEEK);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
export async function getChartDataLastMonth() {
  try {
    const response = await apiClient.get<any>(CHART_ENDPOINTS.GET_CHART_DATA_LAST_MONTH);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
export async function getChartDataCurrentYear() {
  try {
    const response = await apiClient.get<any>(CHART_ENDPOINTS.GET_CHART_DATA_CURRENT_YEAR);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
export async function getChartDataTotalUsers() {
  try {
    const response = await apiClient.get<any>(CHART_ENDPOINTS.GET_CHART_DATA_CURRENT_YEAR);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
export async function getChartDataTotalAds() {
  try {
    const response = await apiClient.get<any>(CHART_ENDPOINTS.GET_CHART_DATA_CURRENT_YEAR);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
