import React from 'react';
import axios from '../../../src/axios';
import BaseAdmin from '../../../src/baseadmin';
import styleMessage from '../../../styles/message.module.css';
import styleBlog from '../../../styles/Blog.module.css';
import Link from 'next/link';
function ListWorkContent() {
    const [work, setWork] = React.useState([])
    React.useEffect(()=> {
        axios({
            method: "GET",
            url: '/api/workAPI',
            headers:{"content-type" : "application/json"}
        }).then((res)=> {
            if (res.status == 200) {
                console.log(res);
                setWork(res.data.data.splice(0, 10))
            }
        }).catch((err)=>{
            console.log(err);
        })
    }, [])
  return (
    <div className={styleMessage.cardMessage}>
        <div className={styleBlog.headerBlogList}>
            <h3>Work</h3>
            <button type="button"><Link href="/admin-secret/admins/addWork">Add data</Link></button>
        </div>
        <table className={styleMessage.tableMessage}>
            <thead>
                <tr className={styleMessage.trMessage}>
                    <th>Title</th>
                    <th>url</th>
                    <th>CreatedAt</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    work?
                    work.map((el) => {
                        return (
                            <tr className={styleMessage.trMessage} key={el._id}>
                                <td>{el.title}</td>
                                <td>{el.url}</td>
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
    <BaseAdmin content={<ListWorkContent/>}/>
  )
}