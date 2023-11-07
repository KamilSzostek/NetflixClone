import { FC } from 'react';
import SignInForm from '@/components/SignInForm/SignInForm';
import NavBar from '@/components/NavBar/NavBar';
import Head from 'next/head';
import ShortFooter from '@/components/ShortFooter/ShortFooter';
import BaseButton from '@/components/ui/BaseButton/BaseButton';

import styles from '@/styles/Login.module.scss';

const Login: FC = () => {
    return (
        <div className={styles.login}>
            <Head>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <title>Netflix</title>
            </Head>
            <div className={styles.shadow} />
            <NavBar linkLogo >
                <BaseButton text='sign in' linkPath='/login' />
            </NavBar>
            <main>
                <SignInForm />
            </main>
            <ShortFooter />
        </div>
    );
};

export default Login;
