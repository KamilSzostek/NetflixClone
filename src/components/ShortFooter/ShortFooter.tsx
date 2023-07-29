import { FC } from 'react';
import ResponsiveSelect from '@/components/ResponsiveSelect/ResponsiveSelect';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import styles from './ShortFooter.module.scss'

const ShortFooter: FC = (props) => {
    return (<footer className={styles.footer}>
        <h3>Questions? Contact us.</h3>
        <div>
            <span>FAQ</span>
            <span>Help Center</span>
            <span>Terms of Use</span>
            <span>Privacy</span>
            <span>Cookie Preferences</span>
            <span>Corporate Information</span>
        </div>
        <ResponsiveSelect icon={faGlobe} name='language' id='lang' />
    </footer>);
};

export default ShortFooter;
