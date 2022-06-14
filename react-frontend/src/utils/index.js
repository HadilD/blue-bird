import { Constants } from "../constants/api";
import jwt_decode from "jwt-decode";

export const saveUserDetails = (res) => {
    try {
        let decoded = jwt_decode(res.access);
        localStorage.setItem(Constants.STORAGE_ITEM_ACCESS_TOKEN, res.access)
        localStorage.setItem(Constants.STORAGE_ITEM_REFRESH_TOKEN, res.refresh)
        if (decoded.is_superuser){
            localStorage.setItem(Constants.STORAGE_ITEM_USER_ROLE, 'admin')
        } else {
            localStorage.setItem(Constants.STORAGE_ITEM_USER_ROLE, 'user')
        }
    } catch (err) {
        console.log('Error while saving data to local storage:', err)
        throw err
    }
}