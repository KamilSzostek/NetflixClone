import { FC, LegacyRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';

import styles from './BaseButton.module.scss'
import { RefType } from 'mongoose';

interface IBaseButtonProps {
  text: string,
  isBig?: boolean,
  icon?: IconDefinition,
  linkPath?: string,
  onClick?: ()=>void,
  ref?: LegacyRef<HTMLButtonElement>
}

const BaseButton: FC<IBaseButtonProps> = ({ text, isBig, icon, linkPath, onClick, ref }) => {
  const style = isBig ? `${styles.bigbutton} ${styles.button}` : styles.button

  return linkPath ? (<Link className={style} href={linkPath} onClick={onClick}>{text}</Link>) : (<button className={style} ref={ref} onClick={onClick}>
    {text}
    {icon && <FontAwesomeIcon className={styles.icon} icon={icon} />}
  </button>)
};

export default BaseButton;
