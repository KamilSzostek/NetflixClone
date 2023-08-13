import { FC, ReactElement, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './SignUpSection.module.scss'

interface ISignUpSectionProps {
    children: ReactElement,
    showSection?: boolean,
    width: 'small' | 'medium' | 'large',
    isTextLeft?: boolean
}

const SignUpSection: FC<ISignUpSectionProps> = ({ children, showSection, width, isTextLeft }) => {
    const sectionRef = useRef<HTMLElement>(null)

    const sectionStyle = width === 'small' ? styles.section : (width === 'medium' ? `${styles.section} ${styles.medium}` : `${styles.section} ${styles.large}`)
    const textStyle = isTextLeft && styles.left
    return (
        <CSSTransition
            in={showSection}
            nodeRef={sectionRef}
            timeout={500}
            unmountOnExit={true}
            classNames='push'
        >
            <section className={`${sectionStyle} ${textStyle}`}>
                {children}
            </section>
        </CSSTransition>
    );
};

export default SignUpSection;
