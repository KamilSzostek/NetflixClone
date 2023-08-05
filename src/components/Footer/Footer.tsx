import { FC } from 'react';
import ResponsiveSelect from '../ResponsiveSelect/ResponsiveSelect';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import styles from './Footer.module.scss'

interface IFooterProps{
    linkList: string[],
    lightBg?: boolean 
}

const Footer: FC<IFooterProps> = ({linkList, lightBg}) => {
    const footerStyle = lightBg ? `${styles.footer} ${styles.lightbg}` : styles.footer
    const links = linkList.map((link, key) => (<li key={key}>{link}</li>))
    return (<footer className={footerStyle}>
        <h3>Questions? Contact us.</h3>
        <ul>
            {links}
        </ul>
        <ResponsiveSelect icon={faGlobe} name='language' id='lang' />
        <h4>Netflix Poland</h4>
    </footer>);
};

export default Footer;
