import {FC, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import styles from './ResponsiveSelect.module.scss'

interface IResponsiveSelectProps {
    icon: IconDefinition,
    name: string,
    id: string
}

const ResponsiveSelect: FC<IResponsiveSelectProps> = ({ name, id, icon }) => {
    return (<div className={styles.select}>
        <FontAwesomeIcon className={styles.icon} icon={icon} />
        <select name={name} id={id}>
            <option value='english'>English</option>
            <option value='polish'>Polish</option>
        </select>
    </div>);
};

export default ResponsiveSelect;
