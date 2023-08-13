import {FC} from 'react';
import AccordionTab from './subcomponents/AccordionTab';
import styles from  './Accordion.module.scss'

interface ITab {
    title: string,
    text: string
}
interface IAccordionProps {
    data: ITab[]
}

const Accordion: FC<IAccordionProps> = ({ data }) => {
    const tabs = data.map((tab, index) => (
        <AccordionTab key={index} title={tab.title} text={tab.text}/>
    ))
    return (
        <div className={styles.accordion}>
            {tabs}
        </div>
    );
};

export default Accordion;
