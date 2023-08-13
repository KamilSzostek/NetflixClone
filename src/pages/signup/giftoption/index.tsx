import { FC, useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import StepCounter from '@/components/StepCounter/StepCounter';
import FieldWithValidation from '@/components/FieldWithValidation/FieldWithValidation';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import ChoosenPackage from '@/components/ChoosenPackage/ChoosenPackage';
import BaseButton from '@/components/ui/BaseButton/BaseButton';

import styles from '../../../styles/SignUp.module.scss'
import Footer from '@/components/Footer/Footer';
import { footerLinkArr2 } from '@/helpers/footerLinkLists';

interface IGiftOptionProps {
}

const GiftOption: React.FunctionComponent<IGiftOptionProps> = (props) => {
    const [giftCode, setGiftCode] = useState('')
    const giftCodeHandler = (e:React.ChangeEvent<HTMLInputElement>) => setGiftCode(e.currentTarget.value)
    const errorHandler = (mes: string) => (`${mes} is required`)
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <div className={styles.signup}>
            <NavBar isStatic linkLogo showSignButton />
            <main>
                <SignUpSection width='medium' showSection={true} isTextLeft>
                    <>
                        <StepCounter currentStep={3} totalStepInteger={3} />
                        <h2>Enter your gift code</h2>
                        <form onSubmit={submitHandler}>
                            <FieldWithValidation message={errorHandler('Gift Card Pin or Code')}>
                                <CustomInput placeholder='Gift Card Pin or Code' inputValue={giftCode} changeHandler={giftCodeHandler} isLight />
                            </FieldWithValidation>
                            <ChoosenPackage />
                            <BaseButton text='Redeem Gift Code' />
                        </form>
                    </>
                </SignUpSection>
            </main>
            <Footer linkList={footerLinkArr2} lightBg/>
        </div>
    );
};

export default GiftOption;
