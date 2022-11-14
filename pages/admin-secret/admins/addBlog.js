import React from 'react';
import axios from '../../../src/axios';
import BaseAdmin from '../../../src/baseadmin';
import styleMessage from '../../../styles/message.module.css';
function BlogAddContent() {
    const [message, setMessage] = React.useState([])
    const [image, setImage] = React.useState("")

    function encodeImageFileAsURL(element) {
        var file = element.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
          setImage(reader.result)
        }
        reader.readAsDataURL(file);
    }
    const handleSubmitBlog = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        let reader = new FileReader();
        let temp = {
            title: data.get('title'),
            image: image,
            description: data.get('description'),
            createdAt: new Date()
        }
        console.log(temp)
        axios({
            method: "POST",
            url: '/api/blogAPI',
            data: temp,
            headers:{"content-type" : "application/json"}
        }).then((res) => {
            if (res.status === 200) {
                console.log(res)
            }
        }).catch((err)=> {
            console.log(err)
        })
    }
  return (
    <div className={styleMessage.cardMessage}>
        <h3>Add Blog</h3>
        <form className={styleMessage.formBlog} onSubmit={handleSubmitBlog}>
            <div>
                <label  htmlFor="titleInputBlog">Title</label>
                <input name="title" id="titleInputBlog"></input>
            </div>
            <div>
                <label  htmlFor="imageInputBlog">Upload Blog Image</label>
                <input name="image"  accept="image/*" id="imageInputBlog" type="file" onChange={(event) => encodeImageFileAsURL(event)}></input>
            </div>
            <div>
                <label  htmlFor="descInputBlog">Description</label>
                <textarea name="description" id="descInputBlog" className={styleMessage.descBlog}></textarea>
            </div>
            <button>Save</button>
        </form>
    </div>
  )
}
export default function AddBlog() {
   
  return (
    <BaseAdmin content={<BlogAddContent/>}/>
  )
}