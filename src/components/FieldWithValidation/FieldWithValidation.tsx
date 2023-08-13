import {FC, ReactElement} from 'react';
import styles from './FieldWithValidation.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

interface IFieldWithValidationProps {
    children: ReactElement
    message: string
}

const FieldWithValidation: FC<IFieldWithValidationProps> = ({ children, message }) => {
    return (
        <div className={styles.validfield}>
            {children}
            <small>{message !== '' && <FontAwesomeIcon className={styles.icon} icon={faCircleXmark}/>}<span>{message}</span></small>
        </div>);
};

export default FieldWithValidation;
