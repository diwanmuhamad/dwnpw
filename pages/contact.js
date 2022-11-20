import React from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css';
import styleContact from '../styles/contact.module.css';
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../src/axios';

import "izitoast-react/dist/iziToast.css";

// import the icons you need
import {
  faBars, faX
} from "@fortawesome/free-solid-svg-icons";


export default function Contact() {
  const [navIcon, setNavIcon ] = React.useState('hamburger');
  const changeIcon = () => {
    if (navIcon === 'hamburger') return setNavIcon('xMark');
    return setNavIcon('hamburger')
  }

 
  
  function isEmailValid(email) {
    const emailRegexp = new RegExp(
      /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
    )
  
    return emailRegexp.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = new FormData(e.currentTarget);
    let temp = {
      names: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
      createdAt : new Date(),
    }
    const {useToast} = (await import("izitoast-react"))

    const failMessage = useToast({
      title: "Send Failed",
      message: "You have incorrect input",
      theme: "light",
      icon: "material-icons",
      color: "red",
      position: 'topCenter',
      maxWidth: '80%'
    });

    const successMessage = useToast({
      title: "Send Success",
      message: "Your message was successfully sent",
      theme: "light",
      icon: "check",
      color: "green",
      position: 'topCenter',
      maxWidth: '80%'
    });
   

    let inputName = document.getElementById('name');
    let inputEmail = document.getElementById('email'); 
    let inputMessage = document.getElementById('message'); 

    if (!temp.names || !isEmailValid(temp.email) || !temp.message) {
      failMessage();
      return;
    }

    axios({
      method: 'POST',
      url: '/api/posts',
      data: temp,
      headers:{"content-type" : "application/json"}
    }).then((res)=> {
      if (res.status == 200) {
        inputName.value = "";
        inputEmail.value = "";
        inputMessage.value = "";
        successMessage();
      }
    }).catch((err)=> {
      const failMessages = useToast({
        title: "Send Failed",
        message: "Something went wrong",
        theme: "light",
        icon: "material-icons",
        color: "red",
        position: 'topCenter',
        maxWidth: '80%'
      });
      failMessages();
      console.log(err);
    })
  }

  return (
    <div >
      <Head>
        <title>Contact Me</title>
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

        <div className={styleContact.contactMainContent}>
            <div className={styleContact.formContent}>
                <form onSubmit={handleSubmit}>
                    <div className={styleContact.formInput}>
                        <label htmlFor="name">Name<span style={{color: 'yellow'}}>.</span></label>
                        <input name="name" id="name"></input>
                    </div>
                    <div className={styleContact.formInput}>
                        <label htmlFor="email">Email<span style={{color: 'yellow'}}>.</span></label>
                        <input name="email" id="email"></input>
                    </div>
                    <div className={styleContact.formInput}>
                        <label htmlFor="message">Message<span style={{color: 'yellow'}}>.</span></label>
                        <textarea name="message" id="message"></textarea>
                    </div>
                    <button className={styleContact.btnSend}>Send</button>
                </form>
                <div className={styleContact.contactContent}>
                    <h3>Contact <span style={{color: 'yellow'}}>Me.</span></h3>
                    <p>Feel free to send me a <span style={{color: 'yellow'}}>message</span> if you have any <span style={{color: 'yellow'}}>question</span> or anything you want to say to <span style={{color: 'yellow'}}>me.</span> I<span style={{color: 'yellow'}}>'</span>ll gladly reply to your <span style={{color: 'yellow'}}>message.</span></p>
                </div>
                
            </div>
            <footer className={styleContact.footerContact}>
                <p style={{color: 'white'}}>You could also <span style={{color: 'yellow'}}>find me here.</span></p>
                <div className={styleContact.iconSocial}>
                    <a href="https://github.com/diwanmuhamad" target="_blank">
                        <div className={styleContact.githubIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 256 249" preserveAspectRatio="xMinYMin meet"><g fill="#161614"><path d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0"/><path d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398"/></g></svg>
                        </div>
                    </a>
                    <a href="https://www.instagram.com/diwanqw/" target="_blank"> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2.842170943040401e-14 0 3364.7 3364.7" width="2500" height="2500"><defs><radialGradient id="a" cx="217.76" cy="3290.99" r="4271.92" gradientUnits="userSpaceOnUse"><stop offset=".09" stopColor="#fa8f21"/><stop offset=".78" stopColor="#d82d7e"/></radialGradient><radialGradient id="b" cx="2330.61" cy="3182.95" r="3759.33" gradientUnits="userSpaceOnUse"><stop offset=".64" stopColor="#8c3aaa" stopOpacity="0"/><stop offset="1" stopColor="#8c3aaa"/></radialGradient></defs><path d="M853.2 3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5s-116.4-140.1-153.5-235.9c-28.2-72.3-61.5-181-70.6-381.1-10-216.3-12-281.2-12-829.2s2.2-612.8 11.9-829.3C21 653.1 54.5 544.6 82.5 472.1 119.8 376.3 164.3 308 236 236c71.8-71.8 140.1-116.4 236-153.5C544.3 54.3 653 21 853.1 11.9 1069.5 2 1134.5 0 1682.3 0c548 0 612.8 2.2 829.3 11.9 200.1 9.1 308.6 42.6 381.1 70.6 95.8 37.1 164.1 81.7 236 153.5s116.2 140.2 153.5 236c28.2 72.3 61.5 181 70.6 381.1 9.9 216.5 11.9 281.3 11.9 829.3 0 547.8-2 612.8-11.9 829.3-9.1 200.1-42.6 308.8-70.6 381.1-37.3 95.8-81.7 164.1-153.5 235.9s-140.2 116.2-236 153.5c-72.3 28.2-181 61.5-381.1 70.6-216.3 9.9-281.3 11.9-829.3 11.9-547.8 0-612.8-1.9-829.1-11.9" fill="url(#a)"/><path d="M853.2 3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5s-116.4-140.1-153.5-235.9c-28.2-72.3-61.5-181-70.6-381.1-10-216.3-12-281.2-12-829.2s2.2-612.8 11.9-829.3C21 653.1 54.5 544.6 82.5 472.1 119.8 376.3 164.3 308 236 236c71.8-71.8 140.1-116.4 236-153.5C544.3 54.3 653 21 853.1 11.9 1069.5 2 1134.5 0 1682.3 0c548 0 612.8 2.2 829.3 11.9 200.1 9.1 308.6 42.6 381.1 70.6 95.8 37.1 164.1 81.7 236 153.5s116.2 140.2 153.5 236c28.2 72.3 61.5 181 70.6 381.1 9.9 216.5 11.9 281.3 11.9 829.3 0 547.8-2 612.8-11.9 829.3-9.1 200.1-42.6 308.8-70.6 381.1-37.3 95.8-81.7 164.1-153.5 235.9s-140.2 116.2-236 153.5c-72.3 28.2-181 61.5-381.1 70.6-216.3 9.9-281.3 11.9-829.3 11.9-547.8 0-612.8-1.9-829.1-11.9" fill="url(#b)"/><path d="M1269.25 1689.52c0-230.11 186.49-416.7 416.6-416.7s416.7 186.59 416.7 416.7-186.59 416.7-416.7 416.7-416.6-186.59-416.6-416.7m-225.26 0c0 354.5 287.36 641.86 641.86 641.86s641.86-287.36 641.86-641.86-287.36-641.86-641.86-641.86S1044 1335 1044 1689.52m1159.13-667.31a150 150 0 1 0 150.06-149.94h-.06a150.07 150.07 0 0 0-150 149.94M1180.85 2707c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28 7.27-505.15c5.55-121.87 26-188 43-232.13 22.72-58.36 49.78-100 93.5-143.78s85.32-70.88 143.78-93.5c44-17.16 110.26-37.46 232.13-43 131.76-6.06 171.34-7.27 505-7.27S2059.13 666 2191 672c121.87 5.55 188 26 232.13 43 58.36 22.62 100 49.78 143.78 93.5s70.78 85.42 93.5 143.78c17.16 44 37.46 110.26 43 232.13 6.06 131.87 7.27 171.34 7.27 505.15s-1.21 373.28-7.27 505.15c-5.55 121.87-25.95 188.11-43 232.13-22.72 58.36-49.78 100-93.5 143.68s-85.42 70.78-143.78 93.5c-44 17.16-110.26 37.46-232.13 43-131.76 6.06-171.34 7.27-505.15 7.27s-373.28-1.21-505-7.27M1170.5 447.09c-133.07 6.06-224 27.16-303.41 58.06-82.19 31.91-151.86 74.72-221.43 144.18S533.39 788.47 501.48 870.76c-30.9 79.46-52 170.34-58.06 303.41-6.16 133.28-7.57 175.89-7.57 515.35s1.41 382.07 7.57 515.35c6.06 133.08 27.16 223.95 58.06 303.41 31.91 82.19 74.62 152 144.18 221.43s139.14 112.18 221.43 144.18c79.56 30.9 170.34 52 303.41 58.06 133.35 6.06 175.89 7.57 515.35 7.57s382.07-1.41 515.35-7.57c133.08-6.06 223.95-27.16 303.41-58.06 82.19-32 151.86-74.72 221.43-144.18s112.18-139.24 144.18-221.43c30.9-79.46 52.1-170.34 58.06-303.41 6.06-133.38 7.47-175.89 7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43s-139.24-112.27-221.33-144.18c-79.56-30.9-170.44-52.1-303.41-58.06-133.3-6.09-175.89-7.57-515.3-7.57s-382.1 1.41-515.45 7.57" fill="#fff"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/diwanmuhamad/" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256"><g fill="none"><path d="M0 18.338C0 8.216 8.474 0 18.92 0h218.16C247.53 0 256 8.216 256 18.338v219.327C256 247.79 247.53 256 237.08 256H18.92C8.475 256 0 247.791 0 237.668V18.335z" fill="#069"/><path d="M77.796 214.238V98.986H39.488v115.252H77.8zM58.65 83.253c13.356 0 21.671-8.85 21.671-19.91-.25-11.312-8.315-19.915-21.417-19.915-13.111 0-21.674 8.603-21.674 19.914 0 11.06 8.312 19.91 21.169 19.91h.248zM99 214.238h38.305v-64.355c0-3.44.25-6.889 1.262-9.346 2.768-6.885 9.071-14.012 19.656-14.012 13.858 0 19.405 10.568 19.405 26.063v61.65h38.304v-66.082c0-35.399-18.896-51.872-44.099-51.872-20.663 0-29.738 11.549-34.78 19.415h.255V98.99H99.002c.5 10.812-.003 115.252-.003 115.252z" fill="#fff"/></g></svg>
                    </a>
                </div>
            </footer>
        </div>  
      </main>
    </div>
  )
}
