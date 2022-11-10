import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css';
import styleLogin from '../../styles/adminlogin.module.css';
import {hashpass} from '../../helperFunc/cryptpass';
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
  faBars, faX
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';


export default function LoginRegister() {
  const [navIcon, setNavIcon ] = React.useState('hamburger');
  const [inRegLog, setInRegLog] = React.useState('');
  const changeIcon = () => {
    if (navIcon === 'hamburger') return setNavIcon('xMark');
    return setNavIcon('hamburger')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inRegLog == 'register') {
        const data = new FormData(e.currentTarget);
        let temp = {
            email: data.get('email'),
            createdAt: new Date(),
        }
        hashpass(data.get('password')).then((res) => {
            temp = {...temp, password: res}
            axios({
                method: "POST",
                url: '/api/register',
                data: temp,
                headers:{"content-type" : "application/json"}
            }).then((res)=> {
                if (res.status == 200) {
                    console.log(res)
                }
            }).catch((err)=>{
                console.log(err);
            })
            
        })
    }
    else if (inRegLog == 'login') {
        const data = new FormData(e.currentTarget);
        let temp = {
            email: data.get('email'),
            password: data.get('password'),
        }
        axios({
            method: "GET",
            url: '/api/register',
            params: temp,
            headers:{"content-type" : "application/json"}
        }).then((res)=> {
            if (res.status == 200) {
                console.log(res)
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
   
  }

  return (
    <div >
      <Head>
        <title>Diwan's Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins" />
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

        <div className={styleLogin.loginMainContent}>
            <form onSubmit={handleSubmit} className={styleLogin.formLogin}>
                <div className={styleLogin.inputFormLogin}>
                    <label htmlFor='email'>Email<span style={{color: 'yellow'}}>.</span></label>
                    <input id='email' name='email'></input>
                </div>
                <div className={styleLogin.inputFormLogin}>
                    <label htmlFor='password'>Password<span style={{color: 'yellow'}}>.</span></label>
                    <input id='password' type='password' name='password'></input>
                </div>
                <button onClick={() => setInRegLog('login')}>Login</button>
                <button onClick={() => setInRegLog('register')}>Register</button>
            </form>
        </div>  
      </main>
    </div>
  )
}
