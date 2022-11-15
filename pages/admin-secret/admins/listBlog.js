import React from 'react';
import axios from '../../../src/axios';
import BaseAdmin from '../../../src/baseadmin';
import styleMessage from '../../../styles/message.module.css';
import styleBlog from '../../../styles/Blog.module.css';
import Link from 'next/link';
function ListBlogContent() {
    const [blog, setBlog] = React.useState([])
    React.useEffect(()=> {
        axios({
            method: "GET",
            url: '/api/blogAPI',
            headers:{"content-type" : "application/json"}
        }).then((res)=> {
            if (res.status == 200) {
                console.log(res);
                setBlog(res.data.data.splice(0, 10))
            }
        }).catch((err)=>{
            console.log(err);
        })
    }, [])
  return (
    <div className={styleMessage.cardMessage}>
        <div className={styleBlog.headerBlogList}>
            <h3>Blog</h3>
            <button type="button"><Link href="/admin-secret/admins/addBlog">Add data</Link></button>
        </div>
        <table className={styleMessage.tableMessage}>
            <thead>
                <tr className={styleMessage.trMessage}>
                    <th>Title</th>
                    <th>CreatedAt</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    blog?
                    blog.map((el) => {
                        return (
                            <tr className={styleMessage.trMessage} key={el._id}>
                                <td>{el.title}</td>
                                <td>{(new Date(el.createdAt)).getDate() + "-" + ((new Date(el.createdAt)).getMonth()+1) + "-" + (new Date(el.createdAt)).getFullYear() }</td>
                                <td>
                                    <button type="button">Edit</button>
                                    <button type="button">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                    :
                    <tr></tr>
                }

            </tbody>
        </table>
    </div>
  )
}
export default function ListBlog() {
   
  return (
    <BaseAdmin content={<ListBlogContent/>}/>
  )
}