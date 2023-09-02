import { FC } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { planSelector } from '@/store/typePlan';

import styles from './ChoosenPackage.module.scss'

interface IChoosenPackageProps {
    children?: React.ReactElement
}

const ChoosenPackage: FC<IChoosenPackageProps> = ({ children }) => {
    const plan = useSelector(planSelector)
    return (
        <section className={styles.package}>
            <div>
                <div>
                    <span>€{plan.price}/month</span>
                    <span>{plan.name}</span>
                </div>
                <Link href='/signup/planform'>Change</Link>
            </div>
            {children}
            { children && <label htmlFor="agree"><input id='agree' type='checkbox' /><span>You agree that your membership will begin immediately, and acknoledge that you will therefore lose your right of withdrawal.</span></label>}
        </section>)
};

export default ChoosenPackage;
