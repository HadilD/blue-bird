const APIConstant = {
  CONTENT_TYPE: 'application/json',
}

const PathPram = {
  PATH_PARAM_USER_ID: '{user_id}'
}

const Constants = {
  STORAGE_ITEM_ACCESS_TOKEN: 'accessToken',
  STORAGE_ITEM_REFRESH_TOKEN: 'refreshToken',
  STORAGE_ITEM_USER_ROLE: ''
} 

const Request = {
  GET_USERS: 'users/',
  UPLOAD_MEDIA: 'api/medias/',
  UPLOAD_ATTACHMENT: 'api/attachments/',
  GET_MEDIA: 'api/medias',
  LOGIN_USER: 'api/auth/login',
  REGISTER_USER: 'api/auth/register',
  REFRESH_TOKEN: 'api/auth/login/refresh',
  ADMIN: 'admin',
}

export {
  APIConstant,
  PathPram,
  Request,
  Constants,
}