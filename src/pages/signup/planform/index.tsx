import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { selectPlan } from '@/store/typePlan';
import Footer from '@/components/Footer/Footer';
import CheckList from '@/components/CheckList/CheckList';
import PlanTable from '@/components/PlanTable/MembershipPlan';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import StepCounter from '@/components/StepCounter/StepCounter';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import SignUpLayout from '@/components/ui/SignUpLayout/SignUpLayout';

import styles from '../../../components/ui/SignUpLayout/SignUpLayout.module.scss'

export interface IPlan {
    [key: string]: any
    _id: string
    name: string
    price: string
    quality: string
    resolution: string
}

const planArr = ['Watch all you want.', 'Recommendations just for you.', 'Change or cancel your plan anytime.']
const linkArr = ['FAQ', 'Cancel Membership', 'Help Center', 'Netflix Shop', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Information', 'Impressum']

export const initialSelectedPlan = {
    _id: '',
    name: '',
    price: '',
    quality: '',
    resolution: ''
}

const PlanForm: FC = () => {
    const dispatch = useDispatch()
    const newAccountToAdd = sessionStorage.getItem('newMembership')
    const router = useRouter()
    const [selectedPlan, setSelectedPlan] = useState(initialSelectedPlan)
    const selectPlanHandler = (plan: IPlan) => setSelectedPlan(plan)

    const clickHandler = () => {
        if (newAccountToAdd) {
            if (selectedPlan === initialSelectedPlan)
                alert('Select any plan')
            else {
                dispatch(selectPlan(selectedPlan))
                router.push('/signup/paymentPicker')
            }
        }
        else
            router.push('/signup')
    }

    return (
        <SignUpLayout children2={<Footer linkList={linkArr} lightBg />}>
            <SignUpSection width='medium' showSection isTextLeft>
                <section>
                    <StepCounter currentStep={2} totalStepInteger={3} />
                    <h2>Choose the plan that's right for you</h2>
                    <CheckList content={planArr} />
                    <PlanTable selectedPlan={selectedPlan} selectPlan={selectPlanHandler} />
                    <div className={styles.adplan}><FontAwesomeIcon className={styles.icon} icon={faLock} /><span>An ad-supported plan includes a few differences. <Link href='https://help.netflix.com/en'>Learn how it works.</Link></span></div>
                    <article>
                        <p>If you select an ad-supported plan, you will be required to provide your date of birth for ads personalization and other purposes consistent with the <Link href='https://help.netflix.com/legal/privacy'>Netflix Privacy Statement.</Link></p>
                        <p>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our <Link href='https://help.netflix.com/legal/termsofuse'>Terms of Use</Link> for more details.
                        </p>
                        <p>Only people who live with you may use your account. Add 1 extra member with Standard or up to 2 with Premium. <Link href='https://help.netflix.com/en/node/24926/'>Learn more.</Link> Watch on 4 different devices at the same time with Premium, 2 with Standard or Standard with ads, and 1 with Basic.
                        </p>
                    </article>
                    <BaseButton text='Next' onClick={clickHandler} />
                </section>
            </SignUpSection>
        </SignUpLayout>
    )
};

export default PlanForm;
