import { FC } from 'react';
import NavBar from '../NavBar/NavBar';
import Newsletter from '../Newsletter/Newsletter';

import styles from './Header.module.scss'

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <NavBar showLanguageSelect showSignButton/>
            <section>
                <h1>Unlimited films, TV programmes and more</h1>
                <h2>Watch anywhere. Cancel at any time.</h2>
            </section>
            <Newsletter />
            <div className={styles.herobg} />
        </header>
    );
};

export default Header;
