

import { FC, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Red from '../../../public/assets/profiles/red.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { IProfile } from '@/helpers/interfaces';

import styles from './EditProfile.module.scss'

import Default from '../../../public/assets/profiles/default.png'
import Bad from '../../../public/assets/profiles/badboy.png'
import Kids from '../../../public/assets/profiles/kids.png'
import Women from '../../../public/assets/profiles/women.png'

interface IEditProfileFormProps {
    closeEditHandler: () => void
    profileData?: IProfile,
    isKidsProfile?: boolean,
}

const profIcons = [Default, Red, Bad, Kids, Women]

function addIconsToDB(icon: StaticImageData){
    fetch('/api/profileIcons', {
        method:'POST',
        headers: {
            "ContentType": "application/json"
        },
        body: JSON.stringify(icon)
    }).then(res => res.json()).then(icon => console.log(icon))
}


const EditProfileForm: FC<IEditProfileFormProps> = ({ isKidsProfile, profileData, closeEditHandler }) => {
    const nicknameMaxLength = 16

    const [name, setName] = useState(profileData?.name || "")
    const [image, setImage] = useState<StaticImageData>()
    const [icons ,setIcons] = useState<StaticImageData[]>([])
    const [nameValidMessage, setNameValidMessage] = useState('')
    const [nickname, setNickName] = useState(profileData?.nickname || "")
    const [nicknameValidMessage, setNickNameValidMessage] = useState('')
    const [autoplayEpisode, setAutoplayEpisode] = useState(profileData?.autoNextEpisode)
    const [autoplayPreview, setAutoplayPreview] = useState(profileData?.autoPreview)
    const [showIconSelector, setShowIconSelector] = useState(false)


    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => nickname.length <= nicknameMaxLength && setNickName(e.target.value);

    // useEffect(() => {
    //     fetch('/api/icons').then(res => res.json()).then(icons => setIcons(icons)).catch(err => console.log(err))
    // }, [])

    const changeIconHandler = () => {
        profIcons.forEach((icon) => addIconsToDB(icon))
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const profile = JSON.stringify({
            name,
            image,
            nickname,
            preferedLanguage: profileData?.preferedLanguage,
            ageGroup: 'adult',
            autoNextEpisode: autoplayEpisode,
            autoPreview: autoplayPreview
        })
        fetch('/api/users', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: profile
        }).then(res => res.json()).then(() => closeEditHandler()).catch(err => console.log(err))
    }

    const iconsElement = icons
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <h1>Edit profile</h1>
            <div>
                <div className={styles.image} onClick={changeIconHandler}>
                    <Image src={Red} alt='red face' width={50} height={50} />
                    <button><FontAwesomeIcon icon={faPencil} /></button>
                </div>
                {showIconSelector && (
                    <div className={styles.iconSelector}>

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
                            <select>
                                <option value="polish">Polish</option>
                                <option value="english">English</option>
                            </select>
                        </label>
                        <fieldset>
                            <label htmlFor="nickname">Nickname:</label>
                            <p>Your nickname is uniqe user name, which will be use during every Netflix Game with another users. <button>Clik for more.</button></p>
                            <input type='text' value={nickname} placeholder='Enter the nickname' onChange={nicknameHandler} maxLength={16} />
                            <div className={styles.validnick}>
                                <small>{nicknameValidMessage}</small>
                                <span>{nickname.length}/{nicknameMaxLength}</span>
                            </div>
                        </fieldset>
                    </section>
                    <section>
                        <h4>Age group preferences</h4>
                        <div>
                            <span>Every age group</span>
                            <p>Show on this profile titles from every age group.</p>
                        </div>
                        <button>Edit</button>
                    </section>
                    <section>
                        <h4>Autoplay settings</h4>
                        <div>
                            <input id='autoplayEpisode' type="checkbox" checked={autoplayEpisode} onChange={() => setAutoplayEpisode(!autoplayEpisode)} />
                            <label htmlFor="autoplayEpisode">Autoplay next episode on all devices</label>
                        </div>
                        <div>
                            <input id='autoplayPreview' type="checkbox" checked={autoplayPreview} onChange={() => setAutoplayEpisode(!autoplayPreview)} />
                            <label htmlFor="autoplayPreview">Autoplay preview on all devices</label>
                        </div>
                    </section>
                </div>
            </div>
            <div>
                <button type='submit'>Save</button>
                <button onClick={closeEditHandler}>Cancel</button>
            </div>
        </form>
    );
};

export default EditProfileForm;


// Generated by CodiumAI

describe('addIconsToDB', () => {

    // Handles large icons without crashing
    it('should handle large icons without crashing', async () => {
      // Mock the fetch function
      const mockFetch = jest.fn().mockResolvedValue({ json: () => Promise.resolve({}) });
      global.fetch = mockFetch;

      // Create a large icon
      const largeIcon = createLargeIcon();

      // Call the function with the large icon and expect it to not throw an error
      await expect(addIconsToDB(largeIcon)).resolves.not.toThrow();
    });
});
