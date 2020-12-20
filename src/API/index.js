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

export const fetchPosts = () => axios.get(url);
export const getUser = () => axios.get(url + "/req-user", headers)
export const createPost = (newPost) => axios.post(url, newPost);
export const signup = (credentials) => axios.post(url + "/signup", credentials, headers);
export const login = (credentials) => axios.post(url + "/login", credentials, headers);
export const getlogin = () => axios.get(url + "/login", headers);
export const logout = () => axios.post(url + "/logout", headers);
export const editProfile = (editForm) => axios.post(url + "/edit-profile", editForm, headers);
export const tryProfile = (id, profileData) => axios.post(url + `/try-profile/${id}`, profileData); // Prueba
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);