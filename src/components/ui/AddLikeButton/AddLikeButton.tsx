import {FC, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faHeart, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import styles from './AddLikeButton.module.scss'

const AddLikeButton: FC = () => {
    const [isSelected, setIsSelected] = useState(false)
    const [iconsArr, setIconsArr] = useState([faThumbsDown, faThumbsUp, faHeart])

    const iconsElement = iconsArr.map((icon, key) => <abbr key={key} title={icon === faThumbsDown ? 'Not for me' : (icon === faThumbsUp ? 'Like it' : 'Love it')}>
        <FontAwesomeIcon className={styleSelector(key, icon)} icon={icon} onClick={(e: React.MouseEvent<HTMLOrSVGElement>)=>{iconHandler(key)}}/>
    </abbr>)

    function iconHandler(key: number){
        let tmpArr = []
        switch(key){
            case 0:
                tmpArr = [iconsArr[1], iconsArr[0], iconsArr[2]]
                setIsSelected(true)
                setIconsArr(tmpArr)
                break;
            case 2:
                tmpArr = [iconsArr[0], iconsArr[2], iconsArr[1]]
                setIsSelected(true)
                setIconsArr(tmpArr)
                break;
            default:
                setIsSelected(!isSelected)
                return
        }
    }
    function styleSelector(key: number, icon: IconDefinition){
        if(key === 1 && isSelected){
            return  icon === faThumbsDown ? styles.red : styles.green
        }
        return ''
    }
    return (
    <button className={isSelected ? `${styles.likes} ${styles.white}` : styles.likes}>
        {iconsElement}
    </button>);
};

export default AddLikeButton;
