import { FC } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer/Footer';
import CheckList from '@/components/CheckList/CheckList';
import PlanTable from '@/components/PlanTable/MembershipPlan';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import NavBar from '@/components/NavBar/NavBar';
import StepCounter from '@/components/StepCounter/StepCounter';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import styles from '../../../styles/SignUp.module.scss'

const PlanForm: FC = () => {
    const planArr = ['Watch all you want.', 'Recommendations just for you.', 'Change or cancel your plan anytime.']
    const linkArr = ['FAQ', 'Cancel Membership', 'Help Center', 'Netflix Shop', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Information', 'Impressum']
    return (
        <div className={styles.signup}>
            <NavBar isStatic linkLogo showSignButton />
            <main>
                <SignUpSection width='medium' showSection isTextLeft>
                    <section>
                        <StepCounter currentStep={2} totalStepInteger={3} />
                        <h2>Choose the plan that's right for you</h2>
                        <CheckList content={planArr} />
                        <PlanTable />
                        <div className={styles.adplan}><FontAwesomeIcon className={styles.icon} icon={faLock} /><span>An ad-supported plan includes a few differences. <Link href='https://help.netflix.com/en'>Learn how it works.</Link></span></div>
                        <article>
                            <p>If you select an ad-supported plan, you will be required to provide your date of birth for ads personalization and other purposes consistent with the <Link href='https://help.netflix.com/legal/privacy'>Netflix Privacy Statement.</Link></p>
                            <p>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our <Link href='https://help.netflix.com/legal/termsofuse'>Terms of Use</Link> for more details.
                            </p>
                            <p>Only people who live with you may use your account. Add 1 extra member with Standard or up to 2 with Premium. <Link href='https://help.netflix.com/en/node/24926/'>Learn more.</Link> Watch on 4 different devices at the same time with Premium, 2 with Standard or Standard with ads, and 1 with Basic.
                            </p>
                        </article>
                        <BaseButton text='Next' linkPath='/signup/paymentPicker' />
                    </section>
                </SignUpSection>
            </main>
            <Footer linkList={linkArr} lightBg />
        </div>)
};

export default PlanForm;
