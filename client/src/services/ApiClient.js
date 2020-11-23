import axios from 'axios'

const ApiClient = axios.create({
    baseURL:
    process.env.NOE_ENV === 'production'
    ? `${window.location.origin}/api`
    : 'http://localhost:3001/api'
})

ApiClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token')
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default ApiClient