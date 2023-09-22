import axios from "axios"

const $api = axios.create({
    withCredentials: true,
    baseURL: 'https://hmel-avto.ru/',
})

const authIntercepter = config => {
    config.headers.authorization = `bearer ${localStorage.getItem('token')}`
    return config
}


$api.interceptors.request.use(authIntercepter)
$api.interceptors.response.use((config) => {
    return config
}, async(error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const responce = await axios.get('https://hmel-avto.ru/api/user/refresh', {withCredentials: true})
            localStorage.setItem('token', responce.data.accessToken);
            return $api.request(originalRequest)
        } catch (e) {
            console.log("Не авторизован");
        }
    }
    throw error
}
)

export default $api;