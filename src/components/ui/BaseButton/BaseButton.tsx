import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';

import styles from './BaseButton.module.scss'

interface IBaseButtonProps {
  text: string,
  isBig?: boolean,
  icon?: IconDefinition,
  linkPath?: string
}

const BaseButton: FC<IBaseButtonProps> = ({ text, isBig, icon, linkPath }) => {
  const style = isBig ? `${styles.bigbutton} ${styles.button}` : styles.button

  return linkPath ? (<Link className={style} href={linkPath}>{text}</Link>) : (<button className={style}>
    {text}
    {icon && <FontAwesomeIcon className={styles.icon} icon={icon} />}
  </button>)
};

export default BaseButton;
