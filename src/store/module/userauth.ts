import { defineStore } from "pinia";
const userAuthStore = defineStore("userAuth", {

    state: () => {
        return {
            user: ""
        }
    },
    getters: {
        getauth: (state) => {
            if (state.user == "ssp") {
                return ["sys:add","sys:edit", "sys:delete", "sys:search"];
            }
            if (state.user == "sp")
                return ["sys:add", "sys:edit", "sys:search"];
            if (state.user == "user")
                return ["sys:search"];

        }
    }
})
export default userAuthStore;