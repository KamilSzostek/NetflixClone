import { FC, ReactElement, useRef} from 'react';
import { CSSTransition } from 'react-transition-group';

interface ISignUpSectionProps {
    children: ReactElement,
    showSection?: boolean
}

const SignUpSection: FC<ISignUpSectionProps> = ({children, showSection}) => {
    const sectionRef = useRef<HTMLElement>(null)

    return (
        <CSSTransition
            in={showSection}
            nodeRef={sectionRef}
            timeout={300}
            unmountOnExit={true}
        >
            {children}
        </CSSTransition>
    );
};

export default SignUpSection;
