import {apiClient}from 'config/apiHandler';
import { USERS_ENDPOINTS } from 'config/endPoints';
export async function getAllUsersData() {
  try {
    const response = await apiClient.get<any>(USERS_ENDPOINTS.GET_ALL_USERS);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
export async function getUsersRecord(count: number) {
  try {
    const response = await apiClient.get<any>(`${USERS_ENDPOINTS.GET_USERS_RECORD}?offset=0&limit=${count}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserDetails(id: number) {
  try {
    const response = await apiClient.get<any>(`${USERS_ENDPOINTS.GET_USER_DETAILS}/${id}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
export async function toggleUserStatus(id: any, is_active: boolean) {
  try {
    const response = await apiClient.put<any>(`${USERS_ENDPOINTS.TOGGLE_USER_STATUS}/${id}`, { is_active });
    return response?.data;
  } catch (error) {
    throw error;
  }
}
export async function changeUserStatus(id: any, is_active: boolean) {
  try {
    const response = await apiClient.put<any>(`${USERS_ENDPOINTS.TOGGLE_USER_STATUS}/${id}`, { is_active });
    return response?.data;
  } catch (error) {
    throw error;
  }
}
export async function deleteUser(id: any) {
  try {
    const response = await apiClient.delete<any>(`${USERS_ENDPOINTS.DELETE_USER}/${id}`);
    // console.log(response);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
