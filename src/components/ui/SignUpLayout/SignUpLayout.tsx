import {FC, ReactNode} from 'react';
import NavBar from '@/components/NavBar/NavBar';

import styles from './SignUpLayout.module.scss'

interface ISignUpLayoutProps {
    children?: ReactNode,
    children2?: ReactNode
}

const SignUpLayout: FC<ISignUpLayoutProps> = ({children, children2}) => {
  return (
    <div className={styles.signup}>
            <NavBar linkLogo showSignButton isStatic />
            <main className={styles.main}>
                {children}
            </main>
            {children2}
        </div>
  );
};

export default SignUpLayout;
