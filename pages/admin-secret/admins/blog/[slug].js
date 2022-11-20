import React from 'react';
import axios from '../../../../src/axios';
import BaseAdmin from '../../../../src/baseadmin';
import styleMessage from '../../../../styles/message.module.css';
import { useRouter } from 'next/router';
function BlogAddContent() {
    const router = useRouter();
    const {slug} = router.query;
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
        if (slug == "Add") {

            const data = new FormData(e.currentTarget)
            let temp = {
                title: data.get('title'),
                image: image,
                description: data.get('description'),
                createdAt: new Date()
            }
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
        else {
            const data = new FormData(e.currentTarget)
            let temp = {
                _id : slug,
                title: data.get('title'),
                image: image,
                description: data.get('description'),
                createdAt: new Date()
            }
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
    }
  return (
    <div className={styleMessage.cardMessage}>
        <h3>{slug != 'Add'? 'Edit' : 'Add'} Blog</h3>
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