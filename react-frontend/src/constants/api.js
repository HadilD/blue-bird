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
  GET_USERS: 'api/auth/me',
  SET_USERS: 'api/auth/update',
  UPLOAD_MEDIA: 'api/media',
  UPLOAD_ATTACHMENT: 'api/attachments',
  GET_MEDIA: 'api/media',
  LOGIN_USER: 'api/auth/login',
  REGISTER_USER: 'api/auth/register',
  REFRESH_TOKEN: 'api/auth/login/refresh',
  GET_ADMIN_MEDIA: 'api/media/approve',
  UPDATE_MEDIA_STATUS_ADMIN: 'api/media/approve',
  GET_ALL_ROOMS_FOR_USER: 'api/chat/rooms',
  GET_CURRENT_CHATS: 'api/chat/',
  CREATE_ROOM: 'api/chat/rooms',
  GET_MINE_MEDIAS: 'api/media/mine',
  GET_MY_ORDERS: 'api/orders/mine',
  ADMIN: 'admin',
}

export {
  APIConstant,
  PathPram,
  Request,
  Constants,
}