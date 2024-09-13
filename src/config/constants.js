export const ENV_PRODUCTION = 'production'
export const ENV_DEVELOPMENT = 'dev'

export const LOCALSTORAGE_USER_AUTH_TOKEN_KEY = 'user-token'
export const LOCALSTORAGE_USER_AUTH_DETAILS_KEY = 'user-details'
export const SUCCESS_STATUS_CODE = 200
export const CREATED_STATUS_CODE = 201
export const DELETED_STATUS_CODE = 204
export const SERVER_AUTH_ERROR_STATUS_CODE = 401
export const SERVER_VALIDATION_STATUS_CODE = 417
export const BAD_REQUEST_STATUS_CODE = 400
export const NOT_FOUND_STATUS_CODE = 404
export const GENERIC_ERROR_MESSAGE =
  'Qualcosa è andato storto! Per favore riprova più tardi.'
export const DELETE_ERROR_MESSAGE =
  "Errore durante l'eliminazione dei dati. Per favore riprova"
export const LOGOUT_SUCCESS = 'Esci con successo!'
export const LOGIN_SUCCESS = 'Accedi con successo!'

export const roles = {
  SUPER_ADMIN: 'Super Administrator',
  ADMIN: 'Administrator',
  USER: 'User',
}

export const rolesList = [
  { title: roles.SUPER_ADMIN, value: 'SuperAdministrator' },
  { title: roles.ADMIN, value: 'Administrator' },
  { title: roles.USER, value: 'User' },
]

export const STATUS = {
  TUTTI: 'Tutti',
  ACTTIVI: 'Acttivi',
  INACTTIVI: 'Inacttivi',
}

export const FILE_TYPES = ['JPEG', 'PNG', 'JPG']
