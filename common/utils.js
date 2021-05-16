//Constantes genéricas y para el log
module.exports = {

    REQUEST_MESSAGE_SEPARATOR: " - ", 
    REQUEST_ERROR_CONTAINER_RIGHT: "]",
    REQUEST_ERROR_CONTAINER_LEFT: "[",
    JSON_CREATE_LEFT: "{",
    JSON_CREATE_RIGHT: "}",
    JSON_CREATE_AUX: '"',
    JSON_CREATE_AUX_POINT: ":",

    //Mensajes de error para el log:
    ERROR: "[ERROR]",
    ERROR_UNAUTHORIZED: "[UNAUTHORIZED]",
    ERROR_CONFLICT: "[CONFLICT]",
    ERROR_PARAMETER: "[WRONG PARAMETERS]",
    ERROR_METHOD_NOT_ALLOWED: "[METHOD NOT ALLOWED]",
    ERROR_MAX_PAGINATION: "Pagination:",

    //Códigos HTTP:
    HTTP_CODE_UNAUTHORIZED: 401,
    HTTP_CODE_CONFLICT: 409,
    HTTP_CODE_OK: 200,
    HTTP_CODE_METHOD_NOT_ALLOWED: 405,
    HTTP_CODE_FORBIDDEN: 403,
    
    //Mensajes de petición
    GET_COMPANIES: "GET /companies",
    GET_COMPANIES_FIND: "GET /companies/find",
    POST_COMPANIES: "POST /companies",
    PUT_COMPANIES: "PUT /companies/",
    
    POST_FAVORITES: "POST /favorites",

    GET_OWNERS: "GET /owners",

    //Errores provocados
    LESS_THAN_THREE_CHARACTER: "La petición tiene menos de 3 carácteres",
    ROUTE_NOT_FOUND: "Ruta no encontrada"

}