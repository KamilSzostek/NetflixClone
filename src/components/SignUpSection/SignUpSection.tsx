import { FC, ReactElement, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './SignUpSection.module.scss'

interface ISignUpSectionProps {
    children: ReactElement,
    showSection?: boolean
}

const SignUpSection: FC<ISignUpSectionProps> = ({ children, showSection }) => {
    const sectionRef = useRef<HTMLElement>(null)

    return (
        <CSSTransition
            in={showSection}
            nodeRef={sectionRef}
            timeout={300}
            unmountOnExit={true}
        >
            <section className={styles.section}>
                {children}
            </section>
        </CSSTransition>
    );
};

export default SignUpSection;
