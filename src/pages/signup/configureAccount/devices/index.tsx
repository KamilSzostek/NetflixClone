import { FC, useLayoutEffect, useState } from 'react';
import SignUpLayout from '@/components/ui/SignUpLayout/SignUpLayout';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import StepCounter from '@/components/StepCounter/StepCounter';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import DeviceCard, { IDevice } from '@/components/DeviceCard/DeviceCards';
import Footer from '@/components/Footer/Footer';
import { footerLinkArr2 } from '@/helpers/footerLinkLists';

import stylesDevices from '../../../../styles/ConfigureDevices.module.scss'
import styles from '../../../../styles/configureAccount.module.scss'
import { useConfigureAccountNavGuard } from '@/hooks/useConfigureAccountNavGuard';

const ConfigureDevices: FC = () => {
    const [devices, setDevices] = useState<IDevice[]>([])

    useConfigureAccountNavGuard()
    useLayoutEffect(() => {
        fetch("/api/devices")
            .then((res) => res.json())
            .then((data) => { setDevices(data) })
            .catch((err) => console.log(err))
    }, [])

    const devicesElement = devices.map((device: IDevice) => <DeviceCard key={device._id} device={device} />)
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
                        <BaseButton text='Next' linkPath='/signup/configureAccount/profiles' />
                    </section>
                </div>
            </SignUpSection>
        </SignUpLayout>
    )
};

export default ConfigureDevices;
