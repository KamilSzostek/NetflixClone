import { FC, useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import { IAgeGroup, IProfile } from '@/helpers/interfaces';
import Red from '../../../public/assets/profiles/red.png'
import { ageGroups } from '@/helpers/ageGroup';
import { getActiveUser } from '@/helpers/getActiveUser';
import DeleteProfile from '../DeleteProfile/DeleteProfile';

import styles from './EditProfile.module.scss'

interface IEditProfileFormProps {
    closeEditHandler: () => void
    profileData?: IProfile,
    isKidsProfile?: boolean,
}

const EditProfileForm: FC<IEditProfileFormProps> = ({ isKidsProfile, profileData, closeEditHandler }) => {
    const nicknameMaxLength = 16

    const [name, setName] = useState(profileData?.name || "")
    const [image, setImage] = useState<StaticImageData>(profileData?.image || Red)
    const [icons, setIcons] = useState<StaticImageData[]>([])
    const [selectedAgeGroup, setSelectedAgeGroup] = useState<IAgeGroup>(profileData?.ageGroup || {
        name: "",
    })
    const [nameValidMessage, setNameValidMessage] = useState('')
    const [nickname, setNickName] = useState(profileData?.nickname || "")
    const [nicknameValidMessage, setNickNameValidMessage] = useState('')
    const [autoplayEpisode, setAutoplayEpisode] = useState(profileData?.autoNextEpisode)
    const [autoplayPreview, setAutoplayPreview] = useState(profileData?.autoPreview)
    const [showIconSelector, setShowIconSelector] = useState(false)
    const [editAgeGroup, setEditAgeGroup] = useState(false)
    const [showDeleteProfile, setShowDeleteProfile] = useState(false)


    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => nickname.length <= nicknameMaxLength && setNickName(e.target.value);

    useEffect(() => {
        fetch('/api/profileIcons').then(res => res.json()).then(icons => setIcons(icons)).catch(err => console.log(err))
    }, [])

    function selectIconHandler(icon: StaticImageData) {
        setImage(icon)
        setShowIconSelector(false)
    }

    function selectAgeGroupHandler(group: IAgeGroup) {
        setSelectedAgeGroup(group)
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const activeUser = await getActiveUser()
        if(profileData){
            const updatedProfile: IProfile = {
                _id: profileData._id,
                name,
                image,
                nickname,
                preferedLanguage: profileData?.preferedLanguage!,
                ageGroup: selectedAgeGroup,
                autoNextEpisode: autoplayEpisode!,
                autoPreview: autoplayPreview!,
                isMainProfile: profileData.isMainProfile
            }
    
            const updatedProfiles = activeUser.profiles.map((profile: IProfile) => {
                if (profile._id === profileData._id)
                    return updatedProfile
                else
                    return profile
            })
    
            const updatedUser = {
                email: activeUser.email,
                profiles: updatedProfiles
            }
            try{
                const res = await fetch('/api/users', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedUser)
                })
                if(res.status === 202)
                    closeEditHandler()
            }
            catch(err) {console.log(err)}
        }
    }

    const deleteProfileHandler = async () => {
        const activeUser = await getActiveUser()
        if(profileData){
            const updatedProfiles = activeUser.profiles.filter((profile: IProfile) => profile._id !== profileData?._id)
            const updatedUser = {
                email: activeUser.email,
                profiles: updatedProfiles
            }
            try{
                const res = await fetch('/api/users', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedUser)
                })
                if(res.status === 202)
                    closeEditHandler()
            }
            catch(err) {console.log(err)}
        }
    }

    const iconsElement = icons.map((icon, key) => (<Image key={key} src={icon.src} alt={icon.blurDataURL!} priority width={50} height={50} onClick={() => selectIconHandler(icon)} />))
    const ageGroupElement = ageGroups.filter(category => category.name !== selectedAgeGroup.name).map((category, key) => (
        <div key={key} className={styles.ageGroup} onClick={() => selectAgeGroupHandler(category)}>
            <span>{category.title}</span>
            <p>{category.description}</p>
        </div>))
    return showDeleteProfile? (<DeleteProfile icon={profileData ? profileData.image : Red} name={profileData ? profileData.name : ''} deleteProfileHandler={deleteProfileHandler} cancelAction={()=>setShowDeleteProfile(false)}/>):(
        <form className={styles.form} onSubmit={submitHandler}>
            <h1>Edit profile</h1>
            <div>
                <div className={styles.image} onClick={() => setShowIconSelector(true)}>
                    <Image src={image?.src} alt='' width={30} height={30} />
                    <button type='button'><FontAwesomeIcon icon={faPencil} /></button>
                </div>
                {showIconSelector && (
                    <div className={styles.iconSelector}>
                        <button type='button' onClick={() => setShowIconSelector(false)}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <span>Edit profile</span>
                        </button>
                        <div>
                            <h2>Select icon:</h2>
                            <div>
                                {iconsElement}
                            </div>
                        </div>
                    </div>
                )}
                <div className={styles.settings}>
                    <section>
                        <fieldset>
                            <input type="text" value={name} placeholder='Name' onChange={nameHandler} />
                            <small>{nameValidMessage}</small>
                        </fieldset>
                        <label htmlFor="language">
                            <p>Language:</p>
                            <select id='language'>
                                <option value="polish">Polish</option>
                                <option value="english">English</option>
                            </select>
                        </label>
                        {!isKidsProfile &&
                            <fieldset>
                                <label htmlFor="nickname">Nickname:</label>
                                <p>Your nickname is uniqe user name, which will be use during every Netflix Game with another users. <button>Clik for more.</button></p>
                                <input id='nickname' type='text' value={nickname} placeholder='Enter the nickname' onChange={nicknameHandler} maxLength={16} />
                                <div className={styles.validnick}>
                                    <small>{nicknameValidMessage}</small>
                                    <span>{nickname.length}/{nicknameMaxLength}</span>
                                </div>
                            </fieldset>}
                    </section>
                    <section>
                        <h4>Age group preferences</h4>
                        <div>
                            <span>{selectedAgeGroup.title}</span>
                            <p>{selectedAgeGroup.description}</p>
                        </div>
                        {editAgeGroup ? <section className={styles.ageGroupSelector}>{ageGroupElement} <button type='button' onClick={() => setEditAgeGroup(false)}>Save</button></section> : <button type='button' onClick={() => setEditAgeGroup(true)}>Edit</button>}
                    </section>
                    <section>
                        <h4>Autoplay settings</h4>
                        <div>
                            <input id='autoplayEpisode' type="checkbox" checked={autoplayEpisode} onChange={() => setAutoplayEpisode(!autoplayEpisode)} />
                            <label htmlFor="autoplayEpisode">Autoplay next episode on all devices</label>
                        </div>
                        <div>
                            <input id='autoplayPreview' type="checkbox" checked={autoplayPreview} onChange={() => setAutoplayPreview(!autoplayPreview)} />
                            <label htmlFor="autoplayPreview">Autoplay preview on all devices</label>
                        </div>
                    </section>
                </div>
            </div>
            <div>
                <button type='submit'>Save</button>
                <button type='button' onClick={closeEditHandler}>Cancel</button>
                {!profileData?.isMainProfile && <button type='button' onClick={() => setShowDeleteProfile(true)}>Delete profile</button>}
            </div>
        </form>
    );
};

export default EditProfileForm;
