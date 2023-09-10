import { FC, ReactElement, useRef } from 'react';
import styles from './SignUpSection.module.scss'

interface ISignUpSectionProps {
    children: ReactElement,
    showSection?: boolean,
    showSectionHandler?: () => void
    width?: 'small' | 'medium' | 'large',
    isTextLeftAllign?: boolean
}

const SignUpSection: FC<ISignUpSectionProps> = ({ children, showSection, width, isTextLeftAllign }) => {
    const sectionRef = useRef<HTMLElement>(null)

    const sectionStyle = width && (width === 'small' ? `${styles.section} ${styles.small}` : (width === 'medium' ? `${styles.section} ${styles.medium}` : `${styles.section} ${styles.large}`))
    const textStyle = isTextLeftAllign && styles.left
    return (
        showSection && <section ref={sectionRef} className={`${sectionStyle} ${textStyle}`}>
            {children}
        </section>

    );
};

export default SignUpSection;
