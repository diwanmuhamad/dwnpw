import React from 'react';
import axios from '../../../src/axios';
import BaseAdmin from '../../../src/baseadmin';
import styleMessage from '../../../styles/message.module.css';
import styleBlog from '../../../styles/Blog.module.css';
import Link from 'next/link';
function ListBlogContent() {
    const [blog, setBlog] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [trigger, setTrigger] = React.useState(false)
    const handleDelete = (id) => {
        axios({
            method:"DELETE",
            url: '/api/blogAPI',
            params: {id: id},
            headers: {'content-type': 'application/json'},
        }).then((res)=> {
            if (trigger) return setTrigger(false)
            else return setTrigger(true) 
        }).catch((err) => {
            console.log(err);
        })
    }
    React.useEffect(()=> {
        axios({
            method: "GET",
            url: '/api/blogAPI',
            params: {page: page},
            headers:{"content-type" : "application/json"}
        }).then((res)=> {
            if (res.status == 200) {
                setBlog(res.data.data.splice(0, 10))
            }
        }).catch((err)=>{
            console.log(err);
        })

    }, [trigger, page])
  return (
    <div className={styleMessage.cardMessage}>
        <div className={styleBlog.headerBlogList}>
            <h3>Blog</h3>
            <Link href="/admin-secret/admins/blog/Add"><button className={styleBlog.buttonAdd} type="button">Add data</button></Link>
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
                                    <Link href={`/admin-secret/admins/blog/${el._id}`}>                                    
                                        <button type="button">Edit</button>
                                    </Link>
                                    <button onClick={()=>{handleDelete(el._id)}} type="button">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                    :
                    <tr></tr>
                }

            </tbody>
        </table>
        <button onClick={() => {
            if (page - 1 > 0) {
                setPage((page) => page - 1)
            }
        }}>Prev</button>
        <button onClick={() => setPage((page) => page+1)}>Next</button>
    </div>
  )
}
export default function ListBlog() {
   
  return (
    <BaseAdmin content={<ListBlogContent/>}/>
  )
}