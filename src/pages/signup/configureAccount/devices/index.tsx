import { FC } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import SignUpLayout from '@/components/ui/SignUpLayout/SignUpLayout';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import StepCounter from '@/components/StepCounter/StepCounter';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import DeviceCard, { IDevice } from '@/components/DeviceCard/DeviceCards';
import Footer from '@/components/Footer/Footer';
import { footerLinkArr2 } from '@/helpers/footerLinkLists';
import { getCookieOnServerSide } from '@/helpers/cookies';
import { decrypt } from '@/helpers/dataEncryption';
import { getCollectionDB } from '@/helpers/dbConnection';

import stylesDevices from '../../../../styles/ConfigureDevices.module.scss'
import styles from '../../../../styles/configureAccount.module.scss'


interface IConfigureDeviceProps {
    devices: IDevice[]
}

const ConfigureDevices: FC<IConfigureDeviceProps> = ({ devices }) => {
    const router = useRouter()
    const devicesElement = devices.map((device: IDevice) => <DeviceCard key={device._id} device={device} />)

    const clickHandler = () => router.push('/signup/configureAccount/profiles')

    return (
        <SignUpLayout children2={<Footer linkList={footerLinkArr2} lightBg />}>
            <SignUpSection showSection={true} width='large' isTextLeftAllign>
                <div className={styles.container}>
                    <section>
                        <StepCounter currentStep={1} totalStepInteger={5} />
                        <h2>What kind of devices do you use?</h2>
                        <article className={stylesDevices.article}>
                            <p className='fs-3'>Netflix is available on all of these devices. <b>Select the ones you use.</b></p>
                        </article>
                    </section>
                    <section className={stylesDevices.devices}>
                        {devicesElement}
                        <div className={stylesDevices.lastCard} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.classList.toggle(`${styles.selectedDevice}`)}>
                            <h3>Other device</h3>
                            <p>Use Netflix on other device with internet access</p>
                        </div>
                        <BaseButton text='Next' onClick={clickHandler} />
                    </section>
                </div>
            </SignUpSection>
        </SignUpLayout>
    )
};

export default ConfigureDevices;


export const getServerSideProps: GetServerSideProps<IConfigureDeviceProps> = async (context) => {
    const contextCookie = context.req.headers.cookie
    const emailEncrypted = contextCookie && getCookieOnServerSide('email_session', contextCookie)
    const email = emailEncrypted && decrypt(emailEncrypted, process.env.CRYPTO_SECRET!)
    if (email) {
        const db = await getCollectionDB('NetflixUsers')
        const user = await db.collection.findOne({ email: email })
        db.client.close()
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
                const db = await getCollectionDB('Devices')
                const devices = await db.collection.find().toArray()
                db.client.close()
                return {
                    props: {
                        devices: devices.map(device => ({
                            _id: device._id.toString(),
                            name: device.name,
                            icon: device.icon,
                            description: device.description
                        }))
                    }
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
