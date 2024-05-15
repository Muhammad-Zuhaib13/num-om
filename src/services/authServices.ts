import { apiClient } from 'config/apiHandler';
import { AUTH_ENDPOINTS } from 'config/endPoints';
export async function loginAdmin(values: any) {
  try {
    const response = await apiClient.post<any>(AUTH_ENDPOINTS.ADMIN_LOGIN, values);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
export async function updateAdminProfile(adminProfileData: any) {
  try {
    const response = await apiClient.patch<any>(AUTH_ENDPOINTS.ADMIN_UPDATE_PROFILE, adminProfileData);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
export async function updateAdminPassword( newPasswordData: any) {
  try {
    const response = await apiClient.post<any>(AUTH_ENDPOINTS.ADMIN_CHANGE_PASSWORD, newPasswordData);
    return response?.data;
  } catch (error) {
    throw error;
  }
}