import { FC } from 'react';
import NavBar from '../NavBar/NavBar';
import Membership from '../Memebership/Membership';

import styles from './Header.module.scss'

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <NavBar showLanguageSelect showSignButton/>
            <section>
                <h1>Unlimited films, TV programmes and more</h1>
                <h2>Watch anywhere. Cancel at any time.</h2>
            </section>
            <Membership />
            <div className={styles.herobg} />
        </header>
    );
};

export default Header;
