import { FC } from 'react';
import ResponsiveSelect from '../ResponsiveSelect/ResponsiveSelect';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import styles from './Footer.module.scss'

const Footer: FC = (props) => {
    return (<footer className={styles.footer}>
        <h3>Questions? Contact us.</h3>
        <ul>
            <li>FAQ</li>
            <li>Help Center</li>
            <li>Account</li>
            <li>Media Center</li>
            <li>Investor Relations</li>
            <li>Jobs</li>
            <li>Redeem gift cards</li>
            <li>Buy gift cards</li>
            <li>Ways to watch</li>
            <li>Terms of Use</li>
            <li>Privacy</li>
            <li>Cookie Preferences</li>
            <li>Corporate Information</li>
            <li>Contact Us</li>
            <li>Speed Test</li>
            <li>Legal Guarantee</li>
            <li>Legal Notices</li>
            <li>Only on Netflix</li>
        </ul>
        <ResponsiveSelect icon={faGlobe} name='language' id='lang' />
        <h4>Netflix Poland</h4>
    </footer>);
};

export default Footer;
