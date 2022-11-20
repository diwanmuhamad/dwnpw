import React from 'react';
import axios from '../../../src/axios';
import BaseAdmin from '../../../src/baseadmin';
import styleMessage from '../../../styles/message.module.css';
function DashboardContent() {
    const [page, setPage] = React.useState(1);
    const [message, setMessage] = React.useState([])
    React.useEffect(()=> {
        axios({
            method: "GET",
            url: '/api/posts',
            params: {page: page},
            headers:{"content-type" : "application/json"}
        }).then((res)=> {
            if (res.status == 200) {
                setMessage(res.data.data.splice(0, 7))
            }
        }).catch((err)=>{
            console.log(err);
        })
    }, [page])
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
        <button onClick={() => {
            if (page - 1 > 0) {
                setPage((page) => page - 1)
            }
        }}>Prev</button>
        <button onClick={() => setPage((page) => page+1)}>Next</button>
    </div>
  )
}
export default function Dashboard() {
   
  return (
    <BaseAdmin content={<DashboardContent/>}/>
  )
}