import { 
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS,

    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,

    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,

    ORDER_PROMO_CODE_LIST_FAIL,
    ORDER_PROMO_CODE_LIST_REQUEST,
    ORDER_PROMO_CODE_LIST_SUCCESS,

    ORDER_PROMO_CODE_DELETE_FAIL,
    ORDER_PROMO_CODE_DELETE_REQUEST,
    ORDER_PROMO_CODE_DELETE_SUCCESS,

    ORDER_PROMO_CODE_CREATE_FAIL,
    ORDER_PROMO_CODE_CREATE_REQUEST,
    ORDER_PROMO_CODE_CREATE_SUCCESS,

    ORDER_PROMO_CODE_DETAILS_FAIL,
    ORDER_PROMO_CODE_DETAILS_REQUEST,
    ORDER_PROMO_CODE_DETAILS_SUCCESS,

    ORDER_PROMO_CODE_UPDATE_FAIL,
    ORDER_PROMO_CODE_UPDATE_REQUEST,
    ORDER_PROMO_CODE_UPDATE_SUCCESS,

    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,

    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import axios from 'axios'


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/orders/add/`,
            order,
            config
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/${id}/`,
            config
        )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/pay/${id}/`,
            paymentResult,
            config
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            paymentResult,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/deliver/${order._id}/`,
            {},
            config
        )

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/myorders/`,
            config
        )

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/`,
            config
        )

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listPromoCodes = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PROMO_CODE_LIST_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get('/api/orders/promocodes/', config)

        dispatch({
            type: ORDER_PROMO_CODE_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_PROMO_CODE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deletePromoCode = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PROMO_CODE_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/orders/promocodes/delete/${id}/`,
            config
        )

        dispatch({
            type: ORDER_PROMO_CODE_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PROMO_CODE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createPromoCode = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PROMO_CODE_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/orders/promocodes/create/`,
            {},
            config
        )

        dispatch({
            type: ORDER_PROMO_CODE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: ORDER_PROMO_CODE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listPromoCodeDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: ORDER_PROMO_CODE_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/orders/promocodes/${id}`)
        dispatch({
            type: ORDER_PROMO_CODE_DETAILS_SUCCESS,
            payload: data,
        })
    } catch(error){
        dispatch({
            type: ORDER_PROMO_CODE_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.detail
                : error.message
        })
    }

}


export const updatePromoCode = (promoCode) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PROMO_CODE_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/promocodes/update/${promoCode.id}/`,
            promoCode,
            config
        )

        dispatch({
            type: ORDER_PROMO_CODE_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({type: ORDER_PROMO_CODE_DETAILS_SUCCESS, payload: data})

    } catch (error) {
        dispatch({
            type: ORDER_PROMO_CODE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}