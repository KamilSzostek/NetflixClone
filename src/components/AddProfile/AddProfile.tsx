import { FC, useId, useState, useRef } from 'react';
import Image from 'next/image';
import Default from '../../../public/assets/profiles/default.png'
import KidsIcon from '../../../public/assets/profiles/kids.png'
import { ageGroups } from '@/helpers/ageGroup';
import { IProfile } from '@/helpers/interfaces';
import { useSession } from 'next-auth/react';

import styles from './AddProfile.module.scss'

interface IAddProfileProps {
    closeSectionHandler: (newProfiles?: IProfile[]) => void
}

const AddProfile: FC<IAddProfileProps> = ({ closeSectionHandler }) => {
    const { data: session } = useSession()
    const [name, setName] = useState('')
    const [isKid, setIsKid] = useState(false)
    const newId = useId()

    const inputErrorRef = useRef<HTMLElement>(null)
    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(inputErrorRef.current && e.currentTarget.value.length > 0) inputErrorRef.current.textContent = ''
        setName(e.currentTarget.value)
    }

    const addProfileHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputErrorRef.current && name === '')
            inputErrorRef.current.textContent = 'Fill profile name'
        else {
            console.log(session?.user?.email);
            fetch(`/api/users/${session?.user?.email}`).then(res => res.json()).then(user => {
                const newProfile = {
                    _id: newId,
                    name,
                    image: isKid ? KidsIcon : Default,
                    nickname: '',
                    preferedLanguage: [],
                    ageGroup: isKid ? ageGroups[3] : {},
                    autoNextEpisode: true,
                    autoPreview: true,
                }
                console.log(user);
                const profiles = user.profiles
                const isProfileAlreadyExist = profiles.find((profile: IProfile) => profile.name === newProfile.name)
                if (inputErrorRef.current && isProfileAlreadyExist) {
                    inputErrorRef.current.textContent = "Profile with that name already exist"
                    setName('')
                }
                else {
                    profiles.push(newProfile)
                    const newUser = {
                        email: user.email,
                        profiles: profiles
                    }
                    fetch('/api/users', {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newUser)
                    }).then(res => {
                        if (res.status === 202)
                            closeSectionHandler(profiles)
                    })
                }
            })
        }
    }
    return (
        <section className={styles.addProfile}>
            <h2>Add profile</h2>
            <p>Add profile for another person which use that account</p>
            <hr />
            <form onSubmit={addProfileHandler}>
                <div>
                    <Image src={Default} alt='default icon' width={80} height={80} />
                    <div className={styles.container}>
                        <input type='text' placeholder='Name' value={name} onChange={nameHandler} />
                        <small ref={inputErrorRef}></small>

                    </div>
                    <label htmlFor="kids">
                        <input id='kids' type="checkbox" checked={isKid} onChange={() => setIsKid(!isKid)} />
                        <span>Kids?</span>
                    </label>
                </div>
                <hr />
                <div>
                    <button>Continue</button>
                    <button type='button' onClick={() => closeSectionHandler()}>Cancel</button>
                </div>
            </form>
        </section>
    );
};

export default AddProfile;
