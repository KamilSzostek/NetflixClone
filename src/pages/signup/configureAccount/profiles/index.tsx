import { FC, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import SignUpLayout from '@/components/ui/SignUpLayout/SignUpLayout';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import StepCounter from '@/components/StepCounter/StepCounter';
import ProfileInput from '@/components/ui/ProfileInput/ProfileInput';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import Footer from '@/components/Footer/Footer';
import { footerLinkArr2 } from '@/helpers/footerLinkLists';
import DefaultIcon from '../../../../../public/assets/profiles/default.png'
import { IProfile } from '@/components/ProfileSelector/ProfileSelector';
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector';

import styles from '../../../../styles/configureAccount.module.scss'
import stylesProfiles from '../../../../styles/ConfigureProfiles.module.scss'
import { useConfigureAccountNavGuard } from '@/hooks/useConfigureAccountNavGuard';

export interface ILanguage {
    _id: string,
    code: string,
    name: string,
    nativeName: string
}

const ConfigureProfiles: FC = () => {
    const currentYear = new Date().getFullYear()
    const router = useRouter()

    const [showFirstStep, setShowFirstStep] = useState(true)
    const [showSecondStep, setShowSecondtStep] = useState(false)
    const [showThirdStep, setShowThirdStep] = useState(false)
    const [selectedYear, setSelectedYear] = useState(2022)
    const [profileCounter, setProfileCounter] = useState(0)
    const [profiles] = useState<IProfile[]>([])
    const [selectedLanguages, setSelectedLanguages] = useState<ILanguage[]>([])

    const profilesSectionRef = useRef<HTMLElement>(null)

    useConfigureAccountNavGuard()

    const selectedLanguageHandler = (langArr: ILanguage[]) => setSelectedLanguages(langArr)

    const secondStepHandler = () => {
        const profilesInputs = profilesSectionRef.current?.querySelectorAll('input')
        let nextStep = false;
        profilesInputs?.forEach(input => {
            if (input.value !== '') {
                nextStep = true
                profiles.push({
                    name: input.value,
                    image: DefaultIcon,
                    nickname: '',
                    preferedLanguage: [],
                    ageGroup: '',
                    autoNextEpisode: true,
                    autoPreview: true
                })
            }
        })
        if (nextStep) {
            setShowFirstStep(false)
            setShowSecondtStep(true)
        }
        else
            alert('Create at least one profile.')
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        profiles[profileCounter].ageGroup = ageGroupHandler()
        setProfileCounter(profileCounter + 1)
        if (profileCounter >= profiles.length - 1) {
            setShowSecondtStep(false)
            setShowThirdStep(true)
        }
    }

    const finishConfigurationHandler = () => {
        const email = sessionStorage?.getItem('newMember')
        if(email){
            for (const profile of profiles) {
                profile.preferedLanguage = selectedLanguages
            }
            const user = {
                email,
                profiles
            }
            fetch('/api/users', {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify(user)
            }).then(res => res.json()).then(data => {
    
            }).catch(err => console.log(err))
            sessionStorage.removeItem('newMemeber')
            router.push('/browse')
        }
    }

    const daysOptions = () => {
        const lastDayNumber = 31
        const days: JSX.Element[] = []
        for (let i = 1; i <= lastDayNumber; i++) {
            days.push(<option key={i} value={i}>{i}</option>)
        }
        return days
    }
    const monthOptions = () => {
        const lastMonthNumber = 12
        const months: JSX.Element[] = []
        for (let i = 1; i <= lastMonthNumber; i++) {
            months.push(<option key={i} value={i}>{i}</option>)
        }
        return months
    }
    const yearOptions = () => {
        const firstPossibleYear = currentYear - 100
        const lastPossibleYear = currentYear - 1
        const years: JSX.Element[] = []
        for (let i = firstPossibleYear; i <= lastPossibleYear; i++) {
            years.push(<option key={i} value={i}>{i}</option>)
        }
        return years.reverse()
    }

    function ageGroupHandler() {
        if ((currentYear - 16) <= selectedYear)
            return 'adult'
        else if ((currentYear - 12) <= selectedYear)
            return 'twelve'
        else
            return 'kids'
    }


    return (
        <SignUpLayout children2={<Footer linkList={footerLinkArr2} lightBg />}>
            <SignUpSection showSection={showFirstStep} width='large' isTextLeftAllign>
                <div className={styles.container}>
                    <section>
                        <StepCounter currentStep={3} totalStepInteger={5} />
                        <h2>Who will been using Netflix?</h2>
                        <h4>Add even 5 profiles, persons which live with you and earn</h4>
                        <ul>
                            <li>personalized recomedation</li>
                            <li>individaul settings</li>
                            <li>fun matched to preferences</li>
                        </ul>
                    </section>
                    <section className={stylesProfiles.profiles} ref={profilesSectionRef}>
                        <h4>Your profile</h4>
                        <ProfileInput />
                        <div className={stylesProfiles.otherProfiles}>
                            <h4>Are you wanting add other profiles?</h4>
                            <ProfileInput isAddProfileIcon />
                            <ProfileInput isAddProfileIcon />
                            <ProfileInput isAddProfileIcon />
                            <ProfileInput isAddProfileIcon />
                        </div>
                        <BaseButton text='Next' onClick={secondStepHandler} />
                    </section>
                </div>
            </SignUpSection>
            <SignUpSection showSection={showSecondStep} width='large' isTextLeftAllign>
                <div className={styles.container}>
                    <section>
                        <StepCounter currentStep={4} totalStepInteger={5} />
                        <h2>{profiles[profileCounter]?.name}, we need to add some information to your profile.</h2>
                        <h4>We need certain information to personalize advertisements, determine age groups and for other purposes consistent with Netflix's privacy policy.</h4>
                    </section>
                    <form onSubmit={submitHandler}>
                        <div>
                            <label>Date of birth</label>
                            <select>
                                <option value="placeholder">Day</option>
                                {daysOptions()}
                            </select>
                            <select>
                                <option value="placeholder">Month</option>
                                {monthOptions()}
                            </select>
                            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedYear(+e.currentTarget.value)}>
                                <option value="placeholder">Year</option>
                                {yearOptions()}
                            </select>
                        </div>
                        <div>
                            <label>Gender</label>
                            <select>
                                <option value="placeholder">Choose</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non">Non of above</option>
                            </select>
                        </div>
                        <BaseButton text='Next' />
                    </form>
                </div>
            </SignUpSection>
            <SignUpSection showSection={showThirdStep} width='large' isTextLeftAllign>
                <div className={styles.container}>
                    <section>
                        <StepCounter currentStep={5} totalStepInteger={5} />
                        <h2>In which languages do you like to watch movies series and programs?</h2>
                        <h4>This information will help you to configure sound or subtitle settings, you can change these settings at any time.</h4>
                    </section>
                    <LanguageSelector selectedLanguages={selectedLanguages} selectedLanguageHandler={selectedLanguageHandler}>
                        <BaseButton text='Finish' isBig onClick={finishConfigurationHandler} />
                    </LanguageSelector>
                </div>
            </SignUpSection>
        </SignUpLayout>
    );
};

export default ConfigureProfiles;
