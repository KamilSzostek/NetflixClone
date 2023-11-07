import { FC, ReactElement, useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import LogoNetflix from '../../../public/assets/logo.png'

import styles from './NavBar.module.scss'

interface INavBarProps {
    children: ReactElement
    linkLogo?: boolean,
    isStatic?: boolean,
    isFixedScroll?: boolean
}

const NavBar: FC<INavBarProps> = ({ children, linkLogo, isStatic, isFixedScroll }) => {
    const [scrollY, setScrollY] = useState(0)
    useEffect(()=>{
        window.addEventListener('scroll', ()=>setScrollY(window.scrollY))
    }, [])
    let navStyle = isFixedScroll && scrollY >= 100 ? `${styles.navbar} ${styles.fixed}` : (isStatic ? `${styles.navbar} ${styles.static}` : `${styles.navbar}`)
    return (<nav className={navStyle}>
        {linkLogo ? <Link href='/'><Image src={LogoNetflix} alt="logo netflix" priority/></Link> : <Image src={LogoNetflix} alt="logo netflix" priority/>}
        {children}
    </nav>);
};

export default NavBar;
