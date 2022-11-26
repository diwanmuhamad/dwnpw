import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styleBlog from '../../styles/Blog.module.css';
import styles from '../../styles/Home.module.css';
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useRouter} from 'next/router';

// import the icons you need
import {
  faBars, faX
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';


export default function Home() {
    const router = useRouter();
    const {slug} = router.query;
  const [navIcon, setNavIcon ] = React.useState('hamburger');
  const [data, setData] = React.useState({});
  const changeIcon = () => {
    if (navIcon === 'hamburger') return setNavIcon('xMark');
    return setNavIcon('hamburger')
  }
  React.useEffect(() => {
    axios({
        method: "GET",
        params: {title: slug ? slug.split("-").join(" ") : ""},
        url: '/api/blogAPI',
        headers:{"content-type" : "application/json"}
    }).then((res)=> {
        setData(res.data.data[0])
        
    }).catch((err)=>{
        console.log(err)
    })
  },[])

  React.useEffect(() => {
    if (data.description) {
      let div = document.getElementById('desc');
      div.innerHTML = data.description ? data.description:"";
    }
  }, [data])
  return (
    <div >
      <Head>
        <title>Diwan's Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <main className={styles.mainContainer}>
        <nav className={styles.navbarComponent}>
          <div>
            <p className={styles.titleLogo} style={{cursor: 'pointer'}}><span style={{color: 'yellow'}}>	&#123;</span>Diwan<span style={{color: 'yellow'}}>.&#125;</span></p>
          </div>
          <ul className={styles.menuNavbar}>
            <li><Link href="/">Home<span style={{color: 'yellow'}}>.</span></Link></li>
            <li><Link href="/about">About<span style={{color: 'yellow'}}>.</span></Link></li>
            <li><Link href="/work">Work<span style={{color: 'yellow'}}>.</span></Link></li>
            <li><Link href="/blog">Blog<span style={{color: 'yellow'}}>.</span></Link></li>
            <li><Link href="/contact">Contact<span style={{color: 'yellow'}}>.</span></Link></li>
          </ul>
          <FontAwesomeIcon onClick={changeIcon} icon={navIcon  === "hamburger" ?faBars : faX} className={styles.hamburger}/>
        </nav>
        {
          navIcon !== 'hamburger' ?
          <div className={styles.floatingNavbar}>
            <FontAwesomeIcon onClick={changeIcon} icon={navIcon  === "hamburger" ?faBars : faX} className={styles.xmarks}/>
            <ul>
              <li onClick={()=> setNavIcon('hamburger')}><Link href="/">Home<span style={{color: 'yellow'}}>.</span></Link></li>
              <li onClick={()=> setNavIcon('hamburger')}><Link href="/about">About<span style={{color: 'yellow'}}>.</span></Link></li>
              <li onClick={()=> setNavIcon('hamburger')}><Link href="/work">Work<span style={{color: 'yellow'}}>.</span></Link></li>
              <li onClick={()=> setNavIcon('hamburger')}><Link href="/blog">Blog<span style={{color: 'yellow'}}>.</span></Link></li>
              <li onClick={()=> setNavIcon('hamburger')}><Link href="/contact">Contact<span style={{color: 'yellow'}}>.</span></Link></li>
            </ul>
          </div>
          : null
        }
        <div className={styleBlog.mainBlogUserContent}>
            
                {
                    data &&
                    <div className={styleBlog.blogContent}>
                        <h3>{data.title}</h3>
                        {
                          data.createdAt && 
                          <small><em>Published on {(new Date(data.createdAt)).getDate() + " " + ((new Date(data.createdAt)).toLocaleString('default', { month: 'long' })) + " " + (new Date(data.createdAt)).getFullYear() }</em></small>
                        }
                        {
                            data.image &&
                            <Image
                            width={100}
                            height={100}
                            src={data.image}
                            alt="Image Blog"
                            className={styleBlog.blogImageUser}
                            />
                        }
                        
                        {
                            data.description &&
                            <div id="desc">
                                
                            </div>
                        }
            
                    </div>
                    
                }
                
        </div>
        
      </main>
    </div>
  )
}
