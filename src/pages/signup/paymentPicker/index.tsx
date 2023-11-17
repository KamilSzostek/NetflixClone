import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import StepCounter from '@/components/StepCounter/StepCounter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Lock from '../../../../public/assets/Lock.png'
import Visa from '../../../../public/assets/VISA.png'
import Master from '../../../../public/assets/MASTERCARD.png'
import American from '../../../../public/assets/AMEX.png'
import Play from '../../../../public/assets/PLAYPL.png'
import Netflix from '../../../../public/assets/netflix.png'
import SignUpLayout from '@/components/ui/SignUpLayout/SignUpLayout';
import { GetServerSideProps } from 'next';
import { getCookieOnServerSide } from '@/helpers/cookies';
import { decrypt } from '@/helpers/dataEncryption';
import { getCollectionDB } from '@/helpers/dbConnection';

import divStyles from '../../../styles/PaymentPicker.module.scss'

const PaymentPicker: FC = () => {
    return (
        <SignUpLayout>
            <SignUpSection width='medium' showSection={true}>
                <>
                    <Image src={Lock} alt='Lock' width={50} height={50} />
                    <StepCounter currentStep={3} totalStepInteger={3} />
                    <h2>Choose how to pay</h2>
                    <h3>Your payment is encrypted and you can change how you pay anytime.</h3>
                    <h3><b>Secure for peace of mind.<br />Cancel easily online.</b></h3>
                    <div className={divStyles.paymentselect}>
                        <Link href='/signup/creditoption'>
                            <span>Credit or debit card </span>
                            <Image src={Visa} alt='visa' width={35} height={25} />
                            <Image src={Master} alt='master card' width={35} height={25} />
                            <Image src={American} alt='american express' width={35} height={25} />
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Link>
                        <Link href='/signup/dcboption'>
                            <span>Add to mobile bill</span>
                            <Image src={Play} alt='play' width={35} height={25} />
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Link>
                        <Link href='/signup/giftoption'>
                            <span>Gift Code</span>
                            <Image src={Netflix} alt='gift code' width={35} height={25} />
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Link>
                    </div>
                </>
            </SignUpSection>
        </SignUpLayout>
    );
};

export default PaymentPicker;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const contextCookie = context.req.headers.cookie
    const emailEncrypted = contextCookie && getCookieOnServerSide('email_session', contextCookie)
    const email = emailEncrypted && decrypt(emailEncrypted, process.env.CRYPTO_SECRET!)
    if (email) {
        const db = await getCollectionDB('NetflixUsers')
        const user = await db.collection.findOne({ email: email })
        if (user) {
            if(user.isMembershipPaid) {
                return {
                    redirect: {
                        destination: '/signup/configureAccount',
                        permanent: false
                    },
                }
            }
            else if (user.plan.price === '') {
                return {
                    redirect: {
                        destination: '/signup/planform',
                        permanent: false
                    },
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