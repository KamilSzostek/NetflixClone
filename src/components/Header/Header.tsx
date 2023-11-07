import { FC } from 'react';
import { useLogInState } from '@/hooks/useLogInState';
import NavBar from '../NavBar/NavBar';
import Membership from '../Memebership/Membership';
import BaseButton from '../ui/BaseButton/BaseButton';
import ResponsiveSelect from '../ResponsiveSelect/ResponsiveSelect';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss'

const Header: FC = () => {
    const loggedIn = useLogInState()

    const logoutHandler = () => sessionStorage.removeItem('newMember')

    return (
        <header className={styles.header}>
            <NavBar>
                <div>
                    <ResponsiveSelect icon={faGlobe} name='language' id='lang' />
                    {loggedIn ? <BaseButton text='sign out' linkPath='/' onClick={logoutHandler} /> : <BaseButton text='sign in' linkPath='/login' />}
                </div>
            </NavBar>
            <section>
                <h1>Unlimited films, TV programmes and more</h1>
                <h3>Watch anywhere. Cancel at any time.</h3>
            </section>
            {loggedIn ? <BaseButton text='finish sign up' linkPath='/signup' isBig /> : <Membership />}
            <div className={styles.herobg} />
        </header>
    );
};

export default Header;
