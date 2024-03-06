//用户相关小仓库
import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";

import { LoginFormData } from '@/api/type'
const useUserStore = defineStore("User", {
    state: () => {
        return {
            token: localStorage.getItem("TOKEN")
        };
    },
    actions: {
        async userLogin(data: LoginFormData) {
            const result: any = await reqLogin(data);
            if (result.code == 200) {
                this.token = result.data.token
                localStorage.setItem("TOKEN", result.data.token)
                return 'ok'
            }
            //ERROR
            else {
                return new Promise.reject(new Error(result.data.message))
            }
        },
    },
    getters: {},
});

export default useUserStore;
