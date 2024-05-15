const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const AUTH_ENDPOINTS = {
    ADMIN_LOGIN: `${BASE_URL}/admin/sign-in`,
    ADMIN_UPDATE_PROFILE:`${BASE_URL}/admin/account-settings`,
    ADMIN_CHANGE_PASSWORD:`${BASE_URL}/admin/change-password`
}

export const CHART_ENDPOINTS = {
    GET_CHART_DATA_LAST_WEEK: `${BASE_URL}/admin/feeds/metrics?value=lastweek`,
    GET_CHART_DATA_LAST_MONTH: `${BASE_URL}/admin/feeds/metrics?value=lastmonth`,
    GET_CHART_DATA_CURRENT_YEAR: `${BASE_URL}/admin/feeds/metrics?value=currentyear`,
}
export const USERS_ENDPOINTS = {
    GET_ALL_USERS: `${BASE_URL}/admin/users?offset=0&limit=10`,
    GET_USERS_RECORD:`${BASE_URL}/admin/users`,
    GET_USER_DETAILS: `${BASE_URL}/admin/user`,
    TOGGLE_USER_STATUS:`${BASE_URL}/admin/user-status`,
    DELETE_USER: `${BASE_URL}/admin/delete-user`,
}
export const ADS_ENDPOINTS = {
    GET_ALL_ADS: `${BASE_URL}/admin/ads?offset=1&limit=10`,
    GET_ADS_RECORD:`${BASE_URL}/admin/ads`,
    GET_ADS_DETAILS: `${BASE_URL}/number`,
    TOGGLE_ADS_BANNER_STATUS:`${BASE_URL}/admin/banner-ads`,
    TOGGLE_ADS_STATUS:`${BASE_URL}/admin/toggle-status`,
    DELETE_ADS: `${BASE_URL}/admin/delete-ad`
}