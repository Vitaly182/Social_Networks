import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "cdd3bfe2-fd96-44f2-8b73-c222490cb3a8"
    }
});


export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    acceptFollow (id) {
        return instance.post(`follow/${id}`, {})
            .then(response => response.data)
    },

    acceptUnfollow (id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    }
}

export const authAPI = {
    me () {
        return instance.get(`auth/me`)
            .then(response => response.data)
    }
}


export const profileAPI = {
    getProfile (userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    }
}


