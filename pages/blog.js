import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import styleBlog from '../styles/Blog.module.css';
import axios from "../src/axios";
import loading from "../public/assets/loading.gif";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
  faBars, faX
} from "@fortawesome/free-solid-svg-icons";


export default function Blog() {
  const [blog, setBlog] = React.useState([]);
  const [navIcon, setNavIcon ] = React.useState('hamburger');
  const changeIcon = () => {
    if (navIcon === 'hamburger') return setNavIcon('xMark');
    return setNavIcon('hamburger')
  }

  React.useEffect(()=> {
      axios({
          method: "GET",
          url: '/api/blogAPI',
          headers:{"content-type" : "application/json"}
      }).then((res)=> {
          if (res.status == 200) {
              setBlog(res.data.data)
          }
      }).catch((err)=>{
          console.log(err);
      })
  }, [])

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

        <div className={blog.length < 4 ? styleBlog.blogMainContent: styleBlog.blogMainContent2}>
            <div className={styleBlog.cardBlogContent}>
              {
                blog.length > 0?
                blog.map((el) => {
                  return (
                    <Link key={el._id} href={`/blogPage/${el.title.split(" ").join("-")}`}> 
                      <div className={styleBlog.card} >
                          <Image
                              width={100}
                              height={100}
                              src={el.image}
                              alt="Picture of the author"
                              className={styleBlog.blogImage}
                          />
                          <div className={styleBlog.cardText}>
                              <h5>{el.title}</h5> 
                              <p>{(new Date(el.createdAt)).getDate() + " " + ((new Date(el.createdAt)).toLocaleString('default', { month: 'long' })) + " " + (new Date(el.createdAt)).getFullYear() }</p> 
                              {/* <p>{el.description.substring(0,21) + "..."}</p>  */}
                          </div>
                      </div>
                    </Link>
                  )
                })
                : 
                <Image
                    width={100}
                    height={100}
                    src={loading}
                    alt="loading"
                    className={styleBlog.loadingImage}
                />
              }
               
            </div>
        </div>
      </main>
    </div>
  )
}
