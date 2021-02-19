
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext"
import Dropzone from "./createPost/Dropzone"
import Posts from "../Posts"
import ProfileCard from "./ProfileCard";


export default function Dashboard() {
    const [previewImages, setPreviewImages] = useState([]);
    const [images, setImages] = useState([])
    const user = useContext(UserContext)  



    return (
        <div>

            <ProfileCard profile={user}/>
            <Dropzone images={images} setImages={setImages} previewImages={previewImages} setPreviewImages={setPreviewImages} />
            <Posts profile={user}/> 
            {/* <img src="/uploads/money/posts/imageProfile.jpg" alt=""/> */}
        </div>
    );
}