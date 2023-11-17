import { FC, useEffect, useState } from 'react';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import SignUpLayout from '@/components/ui/SignUpLayout/SignUpLayout';
import StepCounter from '@/components/StepCounter/StepCounter';
import Footer from '@/components/Footer/Footer';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import { footerLinkArr2 } from '@/helpers/footerLinkLists';
import { GetServerSideProps } from 'next';
import { getCookieOnServerSide } from '@/helpers/cookies';
import { decrypt } from '@/helpers/dataEncryption';
import { getCollectionDB } from '@/helpers/dbConnection';

import styles from '../../../styles/configureAccount.module.scss'

const ConfigureAccount: FC = () => {
    const [email, setEmail] = useState('')
    useEffect(() => {
        const email = sessionStorage.getItem('newMember')
        email && setEmail(email)
    }, [])

    return (
        <SignUpLayout children2={<Footer linkList={footerLinkArr2} lightBg />}>
            <SignUpSection showSection={true} width='small' isTextLeftAllign>
                <>
                    <StepCounter currentStep={1} totalStepInteger={5} />
                    <h2>Welcome in Netflix!</h2>
                    <article className={styles.article}>
                        <p>You are already a user of our website. We sent detailed information to <b>{email}</b></p>
                        <p>Remember that you can cancel your membership online at any time in the section Account.</p>
                    </article>
                    <BaseButton text='Next' linkPath='/signup/configureAccount/devices' />
                </>
            </SignUpSection>
        </SignUpLayout>
    );
}

export default ConfigureAccount;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const contextCookie = context.req.headers.cookie
    const emailEncrypted = contextCookie && getCookieOnServerSide('email_session', contextCookie)
    const email = emailEncrypted && decrypt(emailEncrypted, process.env.CRYPTO_SECRET!)
    if (email) {
        const db = await getCollectionDB('NetflixUsers')
        const user = await db.collection.findOne({ email: email })
        if (user) {
            if(!user.isMembershipPaid) {
                if (user.plan.price === '') {
                    return {
                        redirect: {
                            destination: '/signup/planform',
                            permanent: false
                        },
                    }
                }
                else {
                    return {
                        redirect: {
                            destination: '/signup/paymentPicker',
                            permanent: false
                        },
                    }
                }
            }
            else {
                return {
                    props: {}
                }
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