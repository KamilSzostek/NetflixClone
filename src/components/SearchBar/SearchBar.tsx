import { FC, useRef } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchBar.module.scss'

const SearchBar: FC = () => {
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLFormElement>(null)

    const clickHandler = (e: React.MouseEvent<HTMLFormElement>) => {
        containerRef.current && containerRef.current.classList.add(`${styles.active}`)
        inputRef.current?.focus()
    }

    const blurHandler = () => {
        containerRef.current && containerRef.current.classList.remove(`${styles.active}`)
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/browse/search/${inputRef.current?.value}`)
    }
    return (
        <form ref={containerRef} className={styles.searchBar} onClick={clickHandler} onSubmit={submitHandler}>
            <span onClick={()=>inputRef.current?.value !== '' && router.push(`/browse/search/${inputRef.current?.value}`)}>
                <FontAwesomeIcon icon={faSearch} />
            </span>
            <input ref={inputRef} type="search" placeholder='Titles, people, genres' onBlur={blurHandler} />
        </form>
    );
};

export default SearchBar;
