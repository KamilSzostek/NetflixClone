import { FC, ReactElement, useRef } from 'react';
import styles from './SignUpSection.module.scss'

interface ISignUpSectionProps {
    children: ReactElement,
    showSection?: boolean,
    showSectionHandler?: () => void
    width: 'small' | 'medium' | 'large',
    isTextLeft?: boolean
}

const SignUpSection: FC<ISignUpSectionProps> = ({ children, showSection, width, isTextLeft }) => {
    const sectionRef = useRef<HTMLElement>(null)

    const sectionStyle = width === 'small' ? styles.section : (width === 'medium' ? `${styles.section} ${styles.medium}` : `${styles.section} ${styles.large}`)
    const textStyle = isTextLeft && styles.left
    return (
        showSection && <section ref={sectionRef} className={`${sectionStyle} ${textStyle}`}>
            {children}
        </section>

    );
};

export default SignUpSection;
