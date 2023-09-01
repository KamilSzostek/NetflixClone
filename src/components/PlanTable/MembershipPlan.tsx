import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { IPlan } from '@/pages/signup/planform';

import styles from './MembershipPlan.module.scss'

interface IMembershipPlanProps {
    selectedPlan: IPlan,
    selectPlan: (plan: IPlan) => void
}

const PlanTable: FC<IMembershipPlanProps> = ({ selectedPlan, selectPlan }) => {
    const [plans, setPlans] = useState([])
    const [showAllPlans, setShowAllPlans] = useState(false)
    const extraPlanId = 2

    useEffect(() => {
        fetch('/api/plans').then(res => res.json()).then(data => setPlans(data)).catch(err => console.error(err))
    }, [])

    function extraColumnHandler(key: number, selectedPlanId: string, plan: IPlan, isBody: boolean, propsName?: string) {
        if (key !== extraPlanId) {
            if (isBody)
                return <td key={key} id={key.toString()} className={selectedPlanId === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}>{propsName ? plan[propsName] : <FontAwesomeIcon icon={faCheck} />}</td>
            else
                return <th key={key} id={key.toString()} className={selectedPlanId === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}>{propsName ? plan[propsName] : <FontAwesomeIcon icon={faCheck} />}</th>
        }
        else {
            if (showAllPlans) {
                if (isBody)
                    return <td key={key} id={key.toString()} className={selectedPlanId === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}>{propsName ? plan[propsName] : <FontAwesomeIcon icon={faCheck} />}</td>
                else
                    return <th key={key} id={key.toString()} className={selectedPlanId === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}>{propsName ? plan[propsName] : <FontAwesomeIcon icon={faCheck} />}</th>
            }

        }
    }

    const plansTableHeader = plans.map((plan: IPlan, key) => extraColumnHandler(key, selectedPlan._id, plan, false, 'name'))

    const tableBodyFirstRow = plans.map((plan: IPlan, key) => extraColumnHandler(key, selectedPlan._id, plan, true, 'price'))
    const tableBodySecondRow = plans.map((plan: IPlan, key) => extraColumnHandler(key, selectedPlan._id, plan, true, 'quality'))
    const tableBodyThirdRow = plans.map((plan: IPlan, key) => extraColumnHandler(key, selectedPlan._id, plan, true, 'resolution'))
    const tableBodyFourthRow = plans.map((plan: IPlan, key) => extraColumnHandler(key, selectedPlan._id, plan, true))
    const tableBodyFifthRow = plans.map((plan: IPlan, key) => {
        if (key !== extraPlanId) {
            if (key === 1)
                return <td key={key} className={selectedPlan._id === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}><FontAwesomeIcon icon={faMinus} /></td>
            else
                return <td key={key} className={selectedPlan._id === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}><FontAwesomeIcon icon={faCheck} /></td>
        }
        else {
            if (showAllPlans)
                return <td key={key} className={selectedPlan._id === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}><FontAwesomeIcon icon={faCheck} /></td>
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
                        {tableBodyFirstRow}
                    </tr>
                    <tr className={styles.smwidth}><td>Video quality</td></tr>
                    <tr>
                        <td>Video quality</td>
                        {tableBodySecondRow}
                    </tr>
                    <tr className={styles.smwidth}><td>Resolution</td></tr>
                    <tr>
                        <td>Resolution</td>
                        {tableBodyThirdRow}
                    </tr>
                    <tr className={styles.smwidth}><td>Watch on your TV, computer, mobile phone and tablet</td></tr>
                    <tr>
                        <td>Watch on your TV, computer, mobile phone and tablet</td>
                        {tableBodyFourthRow}
                    </tr>
                    <tr className={styles.smwidth}><td>Downloads</td></tr>
                    <tr>
                        <td>Downloads</td>
                        {tableBodyFifthRow}
                    </tr>
                </tbody>
            </table>
            {!showAllPlans && <div className={styles.button} ><button onClick={() => setShowAllPlans(true)}>See All Plans</button></div>}
        </>)
};

export default PlanTable;
