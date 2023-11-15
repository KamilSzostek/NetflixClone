import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { IMovie } from '@/helpers/interfaces';
import { baseURL, baseSize } from '../MoviesCarousele/MoviesCarousele';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlay, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import AddFavButton from '../ui/AddFavButton/AddFavButton';
import AddLikeButton from '../ui/AddLikeButton/AddLikeButton';

import styles from './Poster.module.scss'

interface IPosterProps {
    movie: IMovie
}

const Poster: FC<IPosterProps> = ({ movie }) => {
    const router = useRouter()
    const isSearchResult = router.asPath.includes('search')
    const isNotify = router.asPath.includes("notifi")

    const [showInfo, setShowInfo] = useState(false)
    const [showDescription, setShowDescription] = useState(isSearchResult ? true : false)
    const figureRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        window.addEventListener('click', (e: MouseEvent) => {
            const target = e.target
            const figure: HTMLElement | null = figureRef.current
            if (figure && (!figure.contains(target as Node))) closeInfo()
        })
    }, [])

    function closeInfo() {
        setShowInfo(false)
        !isSearchResult && setShowDescription(false)
    }
    return (
        <div ref={figureRef} className={styles.main} onClick={() => setShowInfo(true)} onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => closeInfo()}>
            <figure className={movie.index ? styles.isNumber : ''} >
                {movie.index && <span className={movie.index === 10 ? `${styles.number} ${styles.last}` : styles.number}>{movie.index}</span>}
                <img className={styles.firstImg} src={`${baseURL}${baseSize}${movie.poster_path}`} alt={`${baseURL}${baseSize}${movie.backdrop_path}`} />
            </figure>
            <figure className={`${styles.figure} info`}>
                <img className={styles.img} src={`${baseURL}${baseSize}${movie.backdrop_path}`} alt={`${baseURL}${baseSize}${movie.poster_path}`} />
                <figcaption>
                    <div className={styles.icons}>
                        <button><FontAwesomeIcon icon={faPlay} /></button>
                        {!isSearchResult && <>
                            <AddFavButton />
                            {!isNotify && <AddLikeButton />}
                            <button className={showDescription ? styles.selected : ''} onClick={() => setShowDescription(!showDescription)}><FontAwesomeIcon icon={faChevronDown} /></button>
                        </>}
                    </div>
                    <h4>{movie.title ? movie.title : movie.name}</h4>
                    {showDescription && <p className='description'>
                        {movie.overview}
                    </p>}
                    <div className={styles.vote}>
                        {movie.vote_count && <p>Vote count: <span>{movie.vote_count}</span></p>}
                        {movie.vote_average && <div>
                            <span><FontAwesomeIcon icon={faThumbsUp} /></span>
                            <span>{movie.vote_average}</span>
                        </div>}
                    </div>
                    <div>
                        <span className='age-group'>{movie.adult && '+18'}</span>
                        {movie.release_date && <p>Release date: <span>{movie.release_date}</span></p>}
                    </div>
                </figcaption>
            </figure>
            <style jsx>
                {`
                    .info{
                        position: absolute;
                        display: ${showInfo ? 'block' : 'none'}
                        transition: transform .7s .1s;
                        transform: scale(${showInfo ? 1 : 0});
                    }
                `}
            </style>
        </div>
    )
};

export default Poster;
