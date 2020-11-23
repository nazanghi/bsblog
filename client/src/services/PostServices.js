import ApiClient from './ApiClient'

export const __UploadPost = async (formData, userId) => {
    try {
        const response = await ApiClient.post(`/posts/${userId}/?active=true`, formData)
        return response.data
    } catch(error){throw error}
}
export const __GetPosts = async (page, limit) => {
    try {
        const response = await ApiClient.get(
            `/posts?page=${page || 1}&limit=${limit||10}`
        )
        return response.data
    } catch(error){throw error}
}
export const __GetPost = async (postId) => {
    try {
        const response = await ApiClient.get(`/posts/${postId}`)
        return response.data
    } catch(error){throw error}
}
export const __UpdatePost = async (formData, postId) => {
    try {
        const response = await ApiClient.put(`/posts/${postId}?active=true`, formData)
        return response.data
    } catch(error){throw error}
}
export const __DeletePost = async (postId) => {
    try {
        const response = await ApiClient.delete(`/posts/${postId}?active=true`)
        return response
    } catch(error){throw error}
}