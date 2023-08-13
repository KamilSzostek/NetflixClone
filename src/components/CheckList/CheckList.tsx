import {FC} from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './CheckList.module.scss'
interface ICheckListProps {
    content: string[]
}

const CheckList: FC<ICheckListProps> = ({content}) => {
  const listElements = content.map((element, key)=>(<li key={key}><FontAwesomeIcon className={styles.icon} icon={faCheck} />{element}</li>))

    return (
    <ul className={styles.list}>
        {listElements}
    </ul>
  );
};

export default CheckList;
