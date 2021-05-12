import { Button, Input } from 'antd';
import React, { useState, useEffect } from 'react'
import  app  from "../base"



const blog = app.firestore().collection('blog') 

const PostBlog = () => {

    const [postBlog, setpostBlog] = useState([]);
    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [image, setImage] = useState(null);



    const uploadImage = async (e) => {
        const file = e.target.files[0]
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setImage(await fileRef.getDownloadURL());
    }

    const pushUpload = async () => {
        await blog.doc().set({
            title,
            story,
            avatar: image,
            createdAt: Date.now().toLocaleString(),
    
        });
        window.location().reload();
    }


    return (
        <div>
            <div>Post Blog</div>
            <div style ={{}}>
                <Input type="file" />
                <Input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    style ={{
                        marginTop:"20px"
                    }}
                />
                <Button onClick = {pushUpload}>Submit</Button>
            </div>
        </div>
    )
}

export default PostBlog
