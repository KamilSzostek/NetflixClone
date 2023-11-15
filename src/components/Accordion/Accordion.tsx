import {FC} from 'react';
import AccordionTab from './subcomponents/AccordionTab';
import styles from  './Accordion.module.scss'
import { IQA } from '@/helpers/interfaces';

interface IAccordionProps {
    data: IQA[]
}

const Accordion: FC<IAccordionProps> = ({ data }) => {
    const tabs = data.map((tab, index) => (
        <AccordionTab key={index} title={tab.question} text={tab.answer}/>
    ))
    return (
        <div className={styles.accordion}>
            {tabs}
        </div>
    );
};

export default Accordion;
