import { FC } from 'react'
import Link from 'next/link';
import BaseButton from '../ui/BaseButton/BaseButton';
import Image from 'next/image';
import ResponsiveSelect from '../ResponsiveSelect/ResponsiveSelect';
import LogoNetflix from '../../../public/assets/logo.png'
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import styles from './NavBar.module.scss'

interface INavBarProps {
    linkLogo?: boolean,
    showSignButton?: boolean,
    showLanguageSelect?: boolean,
    invertedButtonStyle?: boolean,
    isStatic?: boolean
}

const NavBar: FC<INavBarProps> = ({ linkLogo, showLanguageSelect, showSignButton, isStatic }) => {
    const navStyle = isStatic ? `${styles.navbar} ${styles.static}` : `${styles.navbar}`
    return (<nav className={navStyle}>
        {linkLogo ? <Link href='/'><Image src={LogoNetflix} alt="logo netflix" priority/></Link> : <Image src={LogoNetflix} alt="logo netflix" priority/>}
        {
            (<div>
                { showLanguageSelect && <ResponsiveSelect icon={faGlobe} name='language' id='lang' />}
                { showSignButton && <BaseButton text='sign in' linkPath='/login'/>}
            </div>)
        }
    </nav>);
};

export default NavBar;
