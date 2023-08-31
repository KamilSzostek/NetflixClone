import { FC, useState } from 'react';
import Image from 'next/image';
import Red from '../../../public/assets/profiles/red.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import styles from './EditProfile.module.scss'

interface IEditProfileFormProps {
    isKidsProfile?: boolean
}

const EditProfileForm: FC<IEditProfileFormProps> = ({ isKidsProfile }) => {
    const nicknameMaxLength = 16

    const [name, setName] = useState('')
    const [nameValidMessage, setNameValidMessage] = useState('')
    const [nickname, setNickName] = useState('')
    const [nicknameValidMessage, setNickNameValidMessage] = useState('')
    const [autoplayEpisode, setAutoplayEpisode] = useState(true)
    const [autoplayPreview, setAutoplayPreview] = useState(true)


    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => nickname.length <= nicknameMaxLength && setNickName(e.target.value);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <h1>Edit profile</h1>
            <div>
                <div className={styles.image}>
                    <Image src={Red} alt='red face' width={50} height={50} />
                    <button><FontAwesomeIcon icon={faPencil} /></button>
                </div>
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
                <button>Save</button>
                <button>Cancel</button>
            </div>
        </form>
    );
};

export default EditProfileForm;
