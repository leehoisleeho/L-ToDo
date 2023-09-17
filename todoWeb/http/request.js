// 配置axios请求拦截器
import axios from "axios";
axios.defaults.timeout = 10000;
axios.interceptors.request.use(
    async (config) => {
        const router = useRouter()
        const token = localStorage.getItem('token')
        config.headers.Authorization = token ? token:''
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        // 统一拦截验证
        return response.data;
    },
    (error) => {
        const router = useRouter();
        // 处理错误
        if (error.response) {
            if(error.response.status===403 || error.response.status === 401) {
                console.log('没有权限')
                router.push('/')
            }
        }
    }
);
export default axios;
