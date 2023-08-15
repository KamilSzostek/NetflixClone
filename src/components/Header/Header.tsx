import { FC } from 'react';
import { useLogInState } from '@/hooks/useLogInState';
import NavBar from '../NavBar/NavBar';
import Membership from '../Memebership/Membership';
import BaseButton from '../ui/BaseButton/BaseButton';

import styles from './Header.module.scss'

const Header: FC = () => {
    const loggedIn = useLogInState()

    return (
        <header className={styles.header}>
            <NavBar showLanguageSelect showSignButton />
            <section>
                <h1>Unlimited films, TV programmes and more</h1>
                <h2>Watch anywhere. Cancel at any time.</h2>
            </section>
            {loggedIn ? <BaseButton text='finish sign up' linkPath='/signup' isBig /> : <Membership />}
            <div className={styles.herobg} />
        </header>
    );
};

export default Header;
