import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './MembershipPlan.module.scss'

interface IMembershipPlanProps {
}

const PlanTable: FC<IMembershipPlanProps> = (props) => {
    const [showAllPlans, setShowAllPlans] = useState(false)
    const [selectedPlanId, setSelectedPlanId] = useState('1')
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th></th>
                        <th id='1' className={selectedPlanId === '1' ? styles.selected : ''} onClick={() => setSelectedPlanId('1')}>Standard with ads</th>
                        {showAllPlans && <th id='2' className={selectedPlanId === '2' ? styles.selected : ''} onClick={() => setSelectedPlanId('2')}>Basic</th>}
                        <th id='3' className={selectedPlanId === '3' ? styles.selected : ''} onClick={() => setSelectedPlanId('3')}>Standard</th>
                        <th id='4' className={selectedPlanId === '4' ? styles.selected : ''} onClick={() => setSelectedPlanId('4')}>Premium</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.smwidth}><td>Monthly price</td></tr>
                    <tr>
                        <td>Monthly price</td>
                        <td id='1' className={selectedPlanId === '1' ? styles.selected : ''} onClick={() => setSelectedPlanId('1')}>€4,99</td>
                        {showAllPlans && <td id='2' className={selectedPlanId === '2' ? styles.selected : ''} onClick={() => setSelectedPlanId('2')}>€7,99</td>}
                        <td id='3' className={selectedPlanId === '3' ? styles.selected : ''} onClick={() => setSelectedPlanId('3')}>€12,99</td>
                        <td id='4' className={selectedPlanId === '4' ? styles.selected : ''} onClick={() => setSelectedPlanId('4')}>€17,99</td>
                    </tr>
                    <tr className={styles.smwidth}><td>Video quality</td></tr>
                    <tr>
                        <td>Video quality</td>
                        <td id='1' className={selectedPlanId === '1' ? styles.selected : ''} onClick={() => setSelectedPlanId('1')}>Great</td>
                        {showAllPlans && <td id='2' className={selectedPlanId === '2' ? styles.selected : ''} onClick={() => setSelectedPlanId('2')}>Good</td>}
                        <td id='3' className={selectedPlanId === '3' ? styles.selected : ''} onClick={() => setSelectedPlanId('3')}>Great</td>
                        <td id='4' className={selectedPlanId === '4' ? styles.selected : ''} onClick={() => setSelectedPlanId('4')}>Best</td>
                    </tr>
                    <tr className={styles.smwidth}><td>Resolution</td></tr>
                    <tr>
                        <td>Resolution</td>
                        <td id='1' className={selectedPlanId === '1' ? styles.selected : ''} onClick={() => setSelectedPlanId('1')}>1080p</td>
                        {showAllPlans && <td id='2' className={selectedPlanId === '2' ? styles.selected : ''} onClick={() => setSelectedPlanId('2')}>720p</td>}
                        <td id='3' className={selectedPlanId === '3' ? styles.selected : ''} onClick={() => setSelectedPlanId('3')}>1080p</td>
                        <td id='4' className={selectedPlanId === '4' ? styles.selected : ''} onClick={() => setSelectedPlanId('4')}>4K+HDR</td>
                    </tr>
                    <tr className={styles.smwidth}><td>Watch on your TV, computer, mobile phone and tablet</td></tr>
                    <tr>
                        <td>Watch on your TV, computer, mobile phone and tablet</td>
                        <td className={selectedPlanId === '1' ? styles.selected : ''} onClick={() => setSelectedPlanId('1')}><FontAwesomeIcon icon={faCheck} /></td>
                        {showAllPlans && <td className={selectedPlanId === '2' ? styles.selected : ''} onClick={() => setSelectedPlanId('2')}><FontAwesomeIcon icon={faCheck} /></td>}
                        <td className={selectedPlanId === '3' ? styles.selected : ''} onClick={() => setSelectedPlanId('3')}><FontAwesomeIcon icon={faCheck} /></td>
                        <td className={selectedPlanId === '4' ? styles.selected : ''} onClick={() => setSelectedPlanId('4')}><FontAwesomeIcon icon={faCheck} /></td>
                    </tr>
                    <tr className={styles.smwidth}><td>Downloads</td></tr>
                    <tr>
                        <td>Downloads</td>
                        <td className={selectedPlanId === '1' ? styles.selected : ''} onClick={() => setSelectedPlanId('1')}><FontAwesomeIcon icon={faMinus} /></td>
                        {showAllPlans && <td className={selectedPlanId === '2' ? styles.selected : ''} onClick={() => setSelectedPlanId('2')}><FontAwesomeIcon icon={faCheck} /></td>}
                        <td className={selectedPlanId === '3' ? styles.selected : ''} onClick={() => setSelectedPlanId('3')}><FontAwesomeIcon icon={faCheck} /></td>
                        <td className={selectedPlanId === '4' ? styles.selected : ''} onClick={() => setSelectedPlanId('4')}><FontAwesomeIcon icon={faCheck} /></td>
                    </tr>
                </tbody>
            </table>
            {!showAllPlans && <div className={styles.button} ><button onClick={() => setShowAllPlans(true)}>See All Plans</button></div>}
        </>)
};

export default PlanTable;
