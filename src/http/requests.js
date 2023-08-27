import axios from "axios";
import {drawerClasses} from "@mui/material";

export const login = async (email, password) => {
    try {
        const res = await axios.post("http://localhost:5000/api/user/login", {
            email: email,
            password: password
        })
        if(res.data.token) {
            return {token: res.data.token}
        }
        return {error: "Invalid email or password"}
    } catch (e) {
        return {error: e.response.data}
    }
}

export const register = async (email, password, username) => {
    try {
        const res = await axios.post("http://localhost:5000/api/user/registration", {
            email: email,
            password: password,
            nickname: username
        })
        if(res.data.token) {
            return {token: res.data.token}
        }
        return {error: "User already exists"}
    } catch (e) {
        return {error: e.response.data}
    }
}

export const getTypes = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/type")
        return res.data
    } catch (e) {
        console.log(e)
        return {error: e.response.data}
    }
}

export const getBrands = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/brand")
        return res.data
    } catch (e) {
        console.log(e)
        return {error: e.response.data}
    }
}

export const getDevices = async (typeId, brandId, limit, page) => {
    try {
        let url = "http://localhost:5000/api/device"

        const config = {
            url: url,
            method: 'get',
            params: {
                typeId: typeId,
                brandId: brandId,
                limit: limit,
                page: page
            },
        }

        const res = await axios.request(config)
        return res.data
    } catch (e) {
        console.log(e)
        return {error: e.response.data}
    }
}

export const getTypeById = async (id) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/type/${id}`)
        return res.data
    } catch (e) {
        console.log(e)
        return {error: e.response.data}
    }
}

export const getBrandById = async (id) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/brand/${id}`)
        return res.data
    } catch (e) {
        console.log(e)
        return {error: e.response.data}
    }
}

export const addType = async (name) => {
    try {
        const res = await axios.post('http://localhost:5000/api/type', {
            name: name
        })

        return res
    } catch (e) {
        console.log(e)
        return {error: e.response.data}
    }
}

export const addBrand = async (name) => {
    try {
        const res = await axios.post('http://localhost:5000/api/brand', {
            name: name
        })

        return res
    } catch (e) {
        console.log(e)
        return {error: e.response.data}
    }
}

export const addDevice = async (name, price, typeId, brandId, info, img) => {
    try {
        const res = await axios.post('http://localhost:5000/api/device', {
            name: name,
            price: price,
            typeId: typeId,
            brandId: brandId,
            info: info,
            img: img
        })

        return res
    } catch (e) {
        console.log(e)
        return {error: e.response.data}
    }
}

export const getDeviceDetails = async (id) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/device/${id}`)
        return res.data
    } catch (e) {
        console.log(e)
        return {error: e.response.data}
    }
}

export const addRating = async (userId, deviceId, rate, message) => {
    try {
        const res = await axios.post("http://localhost:5000/api/rating", {
            userId,
            deviceId,
            rate,
            description: message
        })

        return res
    } catch (e) {
        console.log(e)
        return {error: e.response.data}
    }
}

export const recalculateRating = async (deviceId) => {
    try {
        const res = await axios.post("http://localhost:5000/api/device/recalculate-rating", {
            deviceId
        })

        return res
    } catch (e) {
        console.log(e)
        return {error: e.response.data}
    }
}

export const getRatings = async (deviceId) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/rating/${deviceId}`)
        return res.data
    } catch (e) {
        console.log(e)
        return {error: e.response.data}
    }
}

export const getUser = async (userId) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/user/${userId}`)
        return res.data
    } catch (e) {
        console.log(e)
        return {error: e.response.data}
    }
}

export const checkRating = async (userId, deviceId) => {
    try {
        const res = await axios.post("http://localhost:5000/api/rating/check", {
            userId,
            deviceId
        })
        if(res.data.value) {
            return res.data
        }
        return {status: 400, error: res.data}
    } catch (e) {
        console.log(e)
        return {status: e.status, error: e.response.data}
    }
}

export const deleteRating = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/rating/${id}`)
        return res.data
    } catch (e) {console.log(e)
        console.log(e)
        return {status: e.status, error: e.response.data}
    }
}

export const addToBasket = async (userId, item) => {
    try {
        const res = await axios.post("http://localhost:5000/api/basket/add", {
            userId: userId,
            item: item
        })
        return res.data
    } catch (e) {
        console.log(e)
        return {status: e.status, error: e.response.data}
    }
}

export const removeFromBasket = async (userId, id) => {
    try {
        const res = await axios.delete("http://localhost:5000/api/basket/remove", {data: {
            userId: userId,
            id: id
        }})

        return res.data
    } catch (e) {
        console.log(e)
        return {status: e.status, error: e.response.data}
    }
}

export const getBasket = async (userId, limit = 2, page = 1) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/basket/${userId}?limit=${limit}&page=${page}`)
        return res.data
    } catch (e) {
        console.log(e)
        return {status: e.status, error: e.response.data}
    }
}

export const getBasketTotal = async (userId) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/basket/${userId}/total`)
        return res.data
    } catch (e) {
        console.log(e)
        return {status: e.status, error: e.response.data}
    }
}

export const forgotPassword = async (email) => {
    try {
        const res = await axios.post(`http://localhost:5000/api/user/forgot-password`, {
            email: email
        })

        return res.data
    } catch (e) {
        console.log(e)
        return {status: e.status, error: e.response.data}
    }
}

export const resetPassword = async (id, token, newPassword) => {
    try {
        const res = await axios.post("http://localhost:5000/api/user/reset-password", {
            id, token, newPassword
        })

        return res.data
    } catch (e) {
        console.log(e)
        return {status: e.status, error: e.response.data}
    }
}

export const checkLink = async (id, token) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/user/check-link?id=${id}&token=${token}`)
        return res.data
    } catch (e) {
        console.log(e)
        return {status: e.status, error: e.response.data}
    }
}