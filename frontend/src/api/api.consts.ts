export const API_BASE_PATH = '/api';
export const AUTH_URL = 'test_url';

export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export const MESSAGES = {
    SIGNIN_FAIL_MESSAGE:
        'Что то пошло не так!\nПроверьте правильность введенных данных.',
    PROFILE_CHANGE_SUCCESS_MESSAGE: 'Данные успешное обновлены!',
    PROFILE_CHANGE_FAIL_MESSAGE:
        'Не удалось обновить данные.\nЧто то пошло не так!',
    FAIL_MESSAGE_CORS: 'Ваш доступ ограничен CORS-ом',
    FAIL_MESSAGE_500_DEFAULT: 'Ошибка сервера!',
    FAIL_MESSAGE_DEFAULT: 'Что то пошло не так!',
    FAIL_AUTH: 'Ваш токен не действительный',
};

let isDev = 'production';

if (
    process.env.NODE_ENV === 'development' ||
    process.env.SEGMENT === 'development'
) {
    isDev = 'development';
}

export const isDevelopment = isDev === 'development';
