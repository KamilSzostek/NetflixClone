import {FC} from 'react';
import styles from './BaseSection.module.scss'

interface IBaseSectionProps {
    title: string,
    text?: string,
    children: React.ReactElement,
    isRight?: boolean,
    onlyOneColumn?: boolean
}

const BaseSection: FC<IBaseSectionProps> = ({title, text, children, isRight, onlyOneColumn}) => {
    const style = isRight ? `${styles.section} ${styles.isRight}` : styles.section
    const style2 = onlyOneColumn ? `${styles.column}` : '' 
  return (<section className={`${style} ${style2}`}>
    <div>
        <h1>{title}</h1>
        <h3>{text}</h3>
    </div>
    <aside>
        {children}
    </aside>
  </section>);
};

export default BaseSection;
