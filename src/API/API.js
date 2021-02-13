import axios from 'axios';

const headers = {
            withCredentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://localhost:3001"
                    }
            }

const url = 'http://localhost:3000/api';

export const fetchPost = (postId) => axios.get(`${url}/post/${postId}`);
export const fetchPosts = (userId) => axios.get(`${url}/posts/${userId}`);
export const getUser = (userId) => axios.post(`${url}/get-user`, userId, headers)
// export const isAuth = (refreshToken) => axios.post(`${url}/is-auth`, refreshToken, )
export const uploadImage = (image) => axios.post(`${url}/upload-image`, image, headers)
export const createPost = (newPost) => axios.post(`${url}/create-post`, newPost, { 'Content-Type': 'multipart/form-data' });
export const signup = (credentials) => axios.post(`${url}/signup`, credentials, headers);
export const login = (credentials) => axios.post(`${url}/login`, credentials, headers);
export const getlogin = () => axios.get(`${url}/login`, headers);
export const logout = (userId) => axios.post(`${url}/logout`, userId, headers);
export const editProfile = (id, profileData) => axios.post(`${url}/edit-profile/${id}`, profileData); 
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id, userId) => axios.delete(`${url}/delete-post/${id}/${userId}`);