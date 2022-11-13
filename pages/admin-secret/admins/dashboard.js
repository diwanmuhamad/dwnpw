import React from 'react';
import axios from '../../../src/axios';
import BaseAdmin from '../../../src/baseadmin';
import styleMessage from '../../../styles/message.module.css';
function DashboardContent() {
    const [message, setMessage] = React.useState([])
    React.useEffect(()=> {
        axios({
            method: "GET",
            url: '/api/posts',
            headers:{"content-type" : "application/json"}
        }).then((res)=> {
            if (res.status == 200) {
                console.log(res);
                setMessage(res.data.data.splice(0, 10))
            }
        }).catch((err)=>{
            console.log(err);
        })
    }, [])
  return (
    <div className={styleMessage.cardMessage}>
        <h3>Messages</h3>
        <table className={styleMessage.tableMessage}>
            <thead>
                <tr className={styleMessage.trMessage}>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                {
                    message?
                    message.map((el) => {
                        return (
                            <tr className={styleMessage.trMessage} key={el._id}>
                                <td>{el.names}</td>
                                <td>{el.email}</td>
                                <td>{el.message}</td>
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
export default function Dashboard() {
   
  return (
    <BaseAdmin content={<DashboardContent/>}/>
  )
}