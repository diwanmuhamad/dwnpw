import React from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [message, setMessage] = React.useState([])
    React.useEffect(()=> {
        axios({
            method: "GET",
            url: '/api/posts',
            headers:{"content-type" : "application/json"}
        }).then((res)=> {
            if (res.status == 200) {
                console.log(res);
                setMessage(res.data.data)
            }
        }).catch((err)=>{
            console.log(err);
        })
    }, [])
  return (
    <div>Hi Admin
        {
            message?
            message.map((el) => {
                return(
                    <div>
                        <p>{el.names}</p>
                        <p>{el.email}</p>
                        <p>{el.message}</p>
                    </div>
                )
            }) 
            : null
        }
    </div>
  )
}