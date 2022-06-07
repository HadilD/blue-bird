import { Constants } from "../constants/api";

export const saveUserDetails = (res) => {
    try {
        localStorage.setItem(Constants.STORAGE_ITEM_ACCESS_TOKEN, res.access)
        localStorage.setItem(Constants.STORAGE_ITEM_REFRESH_TOKEN, res.refresh)
    } catch (err) {
        console.log('Error while saving data to local storage:', err)
        throw err
    }
}