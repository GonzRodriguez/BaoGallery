import axios from 'axios';

const headers = {
            withCredentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://localhost:5000"
                    }
            }


export const fetchPost = (postId) => axios.get(`/api/post/${postId}`);
export const fetchPosts = (collection, query) => axios.post("/api/posts/", {collection, query});
export const getProfile = (username) => axios.get(`/api/get-user/${username}`, headers);
export const search = (query) => axios.get(`/api/search/${query}`, headers);
// export const isAuth = (refreshToken) => axios.post(`${url}/is-auth`, refreshToken, )
export const uploadImage = (image) => axios.post("/api/upload-image", image, headers)
export const createPost = (newPost) => axios.post("/api/create-post", newPost, { 'Content-Type': 'multipart/form-data' });
export const signup = (credentials) => axios.post("/api/signup", credentials, headers);
export const login = (credentials) => axios.post("/apilogin", credentials, headers);
export const getlogin = () => axios.get("/api/login", headers);
export const logout = (userId) => axios.post("/api/logout", userId, headers);
export const editProfile = (id, profileData) => axios.post(`/api/edit-profile/${id}`, profileData);
export const likePost = (id) => axios.patch(`/api/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`/api/${id}`, updatedPost);
export const deletePost = (id, userId) => axios.delete(`/api/delete-post/${id}/${userId}`);