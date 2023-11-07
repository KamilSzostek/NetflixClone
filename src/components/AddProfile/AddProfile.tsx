import { FC, useId, useState } from 'react';
import Image from 'next/image';
import Default from '../../../public/assets/profiles/default.png'
import KidsIcon from '../../../public/assets/profiles/kids.png'
import { ageGroups } from '@/helpers/ageGroup';
import { getActiveUser } from '@/helpers/getActiveUser';
import { IProfile } from '@/helpers/interfaces';

import styles from './AddProfile.module.scss'

interface IAddProfileProps {
    closeSectionHandler: () => void
}

const AddProfile: FC<IAddProfileProps> = ({ closeSectionHandler }) => {
    const [name, setName] = useState('')
    const [isKid, setIsKid] = useState(false)
    const newId = useId()
    
    const addProfileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = await getActiveUser()
        if (name === '')
            alert('Enter profile name')
        else {
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
            const updatedProfiles = user.profiles
            const isProfileAlreadyExist = updatedProfiles.find((profile: IProfile) => profile.name === newProfile.name)
            if (isProfileAlreadyExist) {
                alert("Profile with that name already exist")
                setName('')
            }
            else {
                updatedProfiles.push(newProfile)
                const newUser = {
                    email: user.email,
                    profiles: updatedProfiles
                }
                const res = await fetch('/api/users', {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser)
                })
                if(res.status === 202)
                    closeSectionHandler()
            }
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
                    <input type='text' placeholder='Name' value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)} />
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
