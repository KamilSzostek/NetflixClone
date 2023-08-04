import * as React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ICheckListProps {
    content: string[]
}

const CheckList: React.FunctionComponent<ICheckListProps> = ({content}) => {
  const listElements = content.map((element, key)=>(<li key={key}><FontAwesomeIcon icon={faCheck} />{element}</li>))
  
    return (
    <ul>
        {listElements}
    </ul>
  );
};

export default CheckList;
