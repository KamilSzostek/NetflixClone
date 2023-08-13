import { FC } from 'react';
import Link from 'next/link';

import styles from './ChoosenPackage.module.scss'

interface IChoosenPackageProps {
    children?: React.ReactElement
}

const ChoosenPackage: FC<IChoosenPackageProps> = ({ children }) => {
    return (
        <section className={styles.package}>
            <div>
                <div>
                    <span>€17,99/month</span>
                    <span>Premium</span>
                </div>
                <Link href='/signup/planform'>Change</Link>
            </div>
            {children}
            { children && <label htmlFor="agree"><input id='agree' type='checkbox' /><span>You agree that your membership will begin immediately, and acknoledge that you will therefore lose your right of withdrawal.</span></label>}
        </section>)
};

export default ChoosenPackage;
