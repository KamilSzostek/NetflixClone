import { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar/NavBar';
import BaseButton from '../BaseButton/BaseButton';
import { eraseCookie } from '@/helpers/cookies';

import styles from './SignUpLayout.module.scss'

interface ISignUpLayoutProps {
  children?: ReactNode,
  children2?: ReactNode
}

const SignUpLayout: FC<ISignUpLayoutProps> = ({ children, children2 }) => {
  const router = useRouter()

  const signOutHandler = () => {
    sessionStorage.removeItem('newMember')
    eraseCookie('email_session')
    router.push('/')
  }

  return (
    <div className={styles.signup}>
      <NavBar linkLogo isStatic >
        <BaseButton text='Sign Out' onClick={signOutHandler}/>
      </NavBar>
      <main className={styles.main}>
        {children}
      </main>
      {children2}
    </div>
  );
};

export default SignUpLayout;
