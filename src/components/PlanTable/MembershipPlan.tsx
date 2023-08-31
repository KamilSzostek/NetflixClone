import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './MembershipPlan.module.scss'

interface IMembershipPlanProps {
    selectedPlanId: string,
    setSelectedPlanId: (id: string) => void
}

const PlanTable: FC<IMembershipPlanProps> = ({ selectedPlanId, setSelectedPlanId }) => {
    const [plans, setPlans] = useState([])
    const [showAllPlans, setShowAllPlans] = useState(false)
    const extraPlanId = 2
    const [prices] = useState(new Map())
    const [videoQuality] = useState(new Map())
    const [resolution] = useState(new Map())

    useEffect(() => {
        fetch('/api/plans').then(res => res.json()).then(data => {
            let counterPlan = 1;
            for (const plan of data) {
                prices.set(`price${counterPlan}`, plan.price)
                videoQuality.set(`quality${counterPlan}`, plan.quality)
                resolution.set(`resolution${counterPlan}`, plan.resolution)
                counterPlan++
            }
            setPlans(data)
        }).catch(err => console.error(err))
    }, [])
    const plansTableHeader = plans.map((plan: any, key) => {
        if (key !== extraPlanId)
            return <th key={key} id={key.toString()} className={selectedPlanId === key.toString() ? styles.selected : ''} onClick={() => setSelectedPlanId(key.toString())}>{plan.name}</th>
        else {
            if (showAllPlans)
                return <th key={key} id={key.toString()} className={selectedPlanId === key.toString() ? styles.selected : ''} onClick={() => setSelectedPlanId(key.toString())}>{plan.name}</th>
        }
    })

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th></th>
                        {plansTableHeader}
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.smwidth}><td>Monthly price</td></tr>
                    <tr>
                        <td>Monthly price</td>
                        <td id='1' className={selectedPlanId === '1' ? styles.selected : ''} onClick={() => setSelectedPlanId('1')}>€{prices.get('price1')}</td>
                        {showAllPlans && <td id='2' className={selectedPlanId === '2' ? styles.selected : ''} onClick={() => setSelectedPlanId('2')}>€{prices.get('price2')}</td>}
                        <td id='3' className={selectedPlanId === '3' ? styles.selected : ''} onClick={() => setSelectedPlanId('3')}>€{prices.get('price3')}</td>
                        <td id='4' className={selectedPlanId === '4' ? styles.selected : ''} onClick={() => setSelectedPlanId('4')}>€{prices.get('price4')}</td>
                    </tr>
                    <tr className={styles.smwidth}><td>Video quality</td></tr>
                    <tr>
                        <td>Video quality</td>
                        <td id='1' className={selectedPlanId === '1' ? styles.selected : ''} onClick={() => setSelectedPlanId('1')}>{videoQuality.get('quality1')}</td>
                        {showAllPlans && <td id='2' className={selectedPlanId === '2' ? styles.selected : ''} onClick={() => setSelectedPlanId('2')}>{videoQuality.get('quality2')}</td>}
                        <td id='3' className={selectedPlanId === '3' ? styles.selected : ''} onClick={() => setSelectedPlanId('3')}>{videoQuality.get('quality3')}</td>
                        <td id='4' className={selectedPlanId === '4' ? styles.selected : ''} onClick={() => setSelectedPlanId('4')}>{videoQuality.get('quality4')}</td>
                    </tr>
                    <tr className={styles.smwidth}><td>Resolution</td></tr>
                    <tr>
                        <td>Resolution</td>
                        <td id='1' className={selectedPlanId === '1' ? styles.selected : ''} onClick={() => setSelectedPlanId('1')}>{resolution.get('resolution1')}</td>
                        {showAllPlans && <td id='2' className={selectedPlanId === '2' ? styles.selected : ''} onClick={() => setSelectedPlanId('2')}>{resolution.get('resolution2')}</td>}
                        <td id='3' className={selectedPlanId === '3' ? styles.selected : ''} onClick={() => setSelectedPlanId('3')}>{resolution.get('resolution3')}</td>
                        <td id='4' className={selectedPlanId === '4' ? styles.selected : ''} onClick={() => setSelectedPlanId('4')}>{resolution.get('resolution4')}</td>
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
