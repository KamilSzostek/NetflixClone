import { FC, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Footer from '@/components/Footer/Footer';
import CheckList from '@/components/CheckList/CheckList';
import PlanTable from '@/components/PlanTable/MembershipPlan';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import StepCounter from '@/components/StepCounter/StepCounter';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import SignUpLayout from '@/components/ui/SignUpLayout/SignUpLayout';
import Check from '../../../../public/assets/Checkmark.png'
import { GetServerSideProps } from 'next';
import { decrypt } from '@/helpers/dataEncryption';
import { getCollectionDB } from '@/helpers/dbConnection';

import styles from '../../../components/ui/SignUpLayout/SignUpLayout.module.scss'
import { getCookieOnServerSide } from '@/helpers/cookies';

export interface IPlan {
    [key: string]: any
    _id: string
    name: string
    price: string
    quality: string
    resolution: string
}

const preplanArr = ['No commitments, cancel anytime.', 'Endless entertainment for one low price.', 'Enjoy Netflix on all your devices.']
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
    const router = useRouter()

    const [selectedPlan, setSelectedPlan] = useState(initialSelectedPlan)
    const [showFirstSection, setShowFirstSection] = useState(selectedPlan._id === initialSelectedPlan._id ? true : false)
    const [showSecondSection, setShowSecondSection] = useState(selectedPlan._id === initialSelectedPlan._id ? false : true)
    const selectPlanHandler = (plan: IPlan) => setSelectedPlan(plan)

    const clickHandler = () => {
        const email = sessionStorage?.getItem('newMember')
        if (email) {
            if (selectedPlan === initialSelectedPlan)
                alert('Select any plan')
            else {
                fetch('/api/users', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT',
                    body: JSON.stringify({
                        email,
                        plan: selectedPlan
                    })
                }).then(res => res.json()).then(data => console.log(data))
                router.push('/signup/paymentPicker')
            }
        }
    }

    return (
        <SignUpLayout children2={<Footer linkList={linkArr} lightBg />}>
            <SignUpSection width='small' showSection={showFirstSection}>
                <>
                    <Image width={70} height={70} src={Check} alt='devices' />
                    <StepCounter currentStep={2} totalStepInteger={3} />
                    <h2>Choose your plan</h2>
                    <CheckList content={preplanArr} />
                    <BaseButton text='Next' onClick={() => { setShowFirstSection(false); setShowSecondSection(true) }} />
                </>
            </SignUpSection>
            <SignUpSection width='medium' showSection={showSecondSection} isTextLeftAllign>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const contextCookie = context.req.headers.cookie
    const emailEncrypted = contextCookie && getCookieOnServerSide('email_session', contextCookie)
    const email = emailEncrypted && decrypt(emailEncrypted, process.env.CRYPTO_SECRET!)
    if (email) {
        const db = await getCollectionDB('NetflixUsers')
        const user = await db.collection.findOne({ email: email })
        if (user) {
            return user.isMembershipPaid && {
                redirect: {
                    destination: '/signup/configureAccount',
                    permanent: false
                },
            }
        }
        else return {
            redirect: {
                destination: '/signup',
                permanent: false
            },
        }
    }
    else {
        return {
            redirect: {
                destination: '/signup',
                permanent: false
            },
        }
    }
}