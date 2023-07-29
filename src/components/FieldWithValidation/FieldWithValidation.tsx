import {FC, ReactElement} from 'react';
import styles from './FieldWithValidation.module.scss'

interface IFieldWithValidationProps {
    children: ReactElement
    message: string
}

const FieldWithValidation: FC<IFieldWithValidationProps> = ({ children, message }) => {
    return (
        <div className={styles.validfield}>
            {children}
            <small>{message}</small>
        </div>);
};

export default FieldWithValidation;
