import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './MembershipPlan.module.scss'
import { IPlan } from '@/pages/signup/planform';

interface IMembershipPlanProps {
    selectedPlan: IPlan,
    selectPlan: (plan: IPlan) => void
}

const PlanTable: FC<IMembershipPlanProps> = ({ selectedPlan, selectPlan }) => {
    const [plans, setPlans] = useState([])
    const [showAllPlans, setShowAllPlans] = useState(false)
    const planMap = new Map()
    const extraPlanId = 2

    useEffect(() => {
        fetch('/api/plans').then(res => res.json()).then(data => setPlans(data)).catch(err => console.error(err))
    }, [])

    const plansTableHeader = plans.map((plan: IPlan, key) => {
        if (key !== extraPlanId)
            return <th key={key} id={key.toString()} className={selectedPlan._id === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}>{plan.name}</th>
        else {
            if (showAllPlans)
                return <th key={key} id={key.toString()} className={selectedPlan._id === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}>{plan.name}</th>
        }
    })

    const tableBodyFirstRow = plans.map((plan: IPlan, key) => {
        if (key !== extraPlanId)
            return <th key={key} id={key.toString()} className={selectedPlan._id === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}>{plan.price && '€'}{plan.price}</th>
        else {
            if (showAllPlans)
                return <th key={key} id={key.toString()} className={selectedPlan._id === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}>{plan.price && '€'}{plan.price}</th>
        }
    })
    const tableBodySecondRow = plans.map((plan: IPlan, key) => {
        if (key !== extraPlanId)
            return <th key={key} id={key.toString()} className={selectedPlan._id === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}>{plan.quality}</th>
        else {
            if (showAllPlans)
                return <th key={key} id={key.toString()} className={selectedPlan._id === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}>{plan.quality}</th>
        }
    })
    const tableBodyThirdRow = plans.map((plan: IPlan, key) => {
        if (key !== extraPlanId)
            return <th key={key} id={key.toString()} className={selectedPlan._id === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}>{plan.resolution}</th>
        else {
            if (showAllPlans)
                return <th key={key} id={key.toString()} className={selectedPlan._id === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}>{plan.resolution}</th>
        }
    })
    const tableBodyFourthRow = plans.map((plan: IPlan, key) => {
        if (key !== extraPlanId)
            return <td key={key} className={selectedPlan._id === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}><FontAwesomeIcon icon={faCheck} /></td>
        else {
            if (showAllPlans)
                return <td key={key} className={selectedPlan._id === plan._id ? styles.selected : ''} onClick={() => selectPlan(plan)}><FontAwesomeIcon icon={faCheck} /></td>
        }
    })
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
