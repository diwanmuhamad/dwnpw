import React from 'react';
import axios from '../../../../src/axios';
import BaseAdmin from '../../../../src/baseadmin';
import styleMessage from '../../../../styles/message.module.css';
import {useRouter} from 'next/router';
function WorkAddContent() {
    const [image, setImage] = React.useState("")
    const router = useRouter()
    const {slug} = router.query;
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
                url: data.get('url'),
                createdAt: new Date()
            }
            axios({
                method: "POST",
                url: '/api/workAPI',
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
                _id: slug,
                title: data.get('title'),
                image: image,
                description: data.get('description'),
                url: data.get('url'),
                createdAt: new Date()
            }
            axios({
                method: "POST",
                url: '/api/workAPI',
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
        <h3>Add Work</h3>
        <form className={styleMessage.formWork} onSubmit={handleSubmitBlog}>
            <div>
                <label  htmlFor="titleInputWork">Title</label>
                <input name="title" id="titleInputWork"></input>
            </div>
            <div>
                <label  htmlFor="imageInputWork">Upload Work Image</label>
                <input name="image"  accept="image/*" id="imageInputWork" type="file" onChange={(event) => encodeImageFileAsURL(event)}></input>
            </div>
            <div>
                <label  htmlFor="descInputWork">Description</label>
                <textarea name="description" id="descInputWork" className={styleMessage.descWork}></textarea>
            </div>
            <div>
                <label  htmlFor="urlInputWork">Url</label>
                <input name="url" id="urlInputWork"></input>
            </div>
            <button>Save</button>
        </form>
    </div>
  )
}
export default function AddBlog() {
   
  return (
    <BaseAdmin content={<WorkAddContent/>}/>
  )
}