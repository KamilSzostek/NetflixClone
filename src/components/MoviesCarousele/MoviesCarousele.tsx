import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IMovie } from '@/helpers/interfaces';
import Poster from '../Poster/Poster';

import styles from './MoviesCarousele.module.scss'


interface IMoviesCarouseleProps {
    title: string
    movies: IMovie[]
}
export const baseURL = 'https://image.tmdb.org/t/p/'
export const baseSize = 'w500'

const MoviesCarousele: FC<IMoviesCarouseleProps> = ({ title, movies }) => {
    const transitionDelay = 0.7

    const [firstImageIndex, setFirstImageIndex] = useState(0)
    const [numberOfImagesOnTheScreen, setNumberOfImagesOnTheScreen] = useState(2)
    const [isInfiniteScrollActive, setIsInfiniteScrollActive] = useState(false)
    const [trackPosition, setTrackPosition] = useState(-100)
    const [transformTransition, setTransformTransition] = useState(transitionDelay)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [touchStartPosition, setToucheStartPosition] = useState(0)

    const rigthButtonRef = useRef(null)
    const leftButtonRef = useRef(null)
    const containerRef = useRef(null)

    useLayoutEffect(() => window.addEventListener('resize', () => setWindowWidth(window.innerWidth)), [])
    useEffect(() => {
        switch (true) {
            case windowWidth < 576: setNumberOfImagesOnTheScreen(2)
                break
            case windowWidth < 768: setNumberOfImagesOnTheScreen(3)
                break
            case windowWidth < 992: setNumberOfImagesOnTheScreen(4)
                break
            case windowWidth < 1400: setNumberOfImagesOnTheScreen(6)
                break
            default: setNumberOfImagesOnTheScreen(8)
        }
    }, [windowWidth])

    function startBackRange() {
        const index = firstImageIndex - numberOfImagesOnTheScreen < 0 ? firstImageIndex + movies.length - numberOfImagesOnTheScreen : firstImageIndex - numberOfImagesOnTheScreen
        return index
    }
    function startFrontRange() {
        const index = firstImageIndex >= movies.length - numberOfImagesOnTheScreen ? firstImageIndex + numberOfImagesOnTheScreen - movies.length : firstImageIndex + numberOfImagesOnTheScreen
        return index
    }
    function nextArr(startIndex: number) {
        const next = movies.slice(0, startIndex + numberOfImagesOnTheScreen > movies.length ? startIndex + numberOfImagesOnTheScreen - movies.length : -movies.length)
        return next
    }

    const scrollRight = () => {
        setIsInfiniteScrollActive(true)
        setTrackPosition(prevPosition => {
            const rigthButton: HTMLButtonElement = rigthButtonRef.current!
            rigthButton.disabled = true
            setTimeout(() => {
                setTransformTransition(0)
                setTrackPosition(prevPosition)
                setFirstImageIndex(startFrontRange())
                rigthButton.disabled = false

            }, transitionDelay * 1000)
            setTransformTransition(transitionDelay)
            return prevPosition - 100
        })
    }
    const scrollLeft = () => {
        setTrackPosition(prevPosition => {
            const leftButton: HTMLButtonElement = leftButtonRef.current!
            leftButton.disabled = true
            setTimeout(() => {
                setTransformTransition(0)
                setTrackPosition(prevPosition)
                setFirstImageIndex(startBackRange())
                leftButton.disabled = false
            }, transitionDelay * 1000)
            setTransformTransition(transitionDelay)
            return prevPosition + 100
        })
    }

    const dragStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const container: HTMLDivElement = containerRef.current!
        container.blur()
        setToucheStartPosition(e.changedTouches[0].clientX)
    }
    const dragStop = (e: React.TouchEvent<HTMLDivElement>) => {
        !isInfiniteScrollActive && setIsInfiniteScrollActive(true)
        if (touchStartPosition - e.changedTouches[0].clientX > 10 || touchStartPosition - e.changedTouches[0].clientX < -10) {
            const moveLeft = touchStartPosition < e.changedTouches[0].clientX ? true : false

            setTrackPosition(prevPosition => {
                setTimeout(() => {
                    setTransformTransition(0)
                    setTrackPosition(prevPosition)
                    setFirstImageIndex(moveLeft ? startBackRange() : startFrontRange())
                }, transitionDelay * 1000)
                setTransformTransition(transitionDelay)
                return moveLeft ? prevPosition + 100 : prevPosition - 100
            })
        }
    }

    const slideOne = movies.length > 0 && [...movies.slice(startBackRange(), startBackRange() + numberOfImagesOnTheScreen), ...nextArr(startBackRange())].map((movie: IMovie) => (
        <Poster key={movie.id} movie={movie} />
    ))

    const slideTwo = movies.length > 0 && [...movies.slice(firstImageIndex, firstImageIndex + numberOfImagesOnTheScreen), ...nextArr(firstImageIndex)].map((movie: IMovie) => (
        <Poster key={movie.id} movie={movie} />
    ))

    const slideThree = movies.length > 0 && [...movies.slice(startFrontRange(), startFrontRange() + numberOfImagesOnTheScreen), ...nextArr(startFrontRange())].map((movie: IMovie) => (
        <Poster key={movie.id} movie={movie} />
    ))

    return (
        <section className={styles.carousele}>
            <h2>{title}</h2>
            <div ref={containerRef}>
                {isInfiniteScrollActive && <button ref={leftButtonRef} onClick={scrollLeft}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>}
                <div onTouchStart={dragStart} onTouchEnd={dragStop}>
                    <div className='slide'>
                        {slideOne}
                    </div>
                    <div className='slide'>
                        {slideTwo}
                    </div>
                    <div className='slide'>
                        {slideThree}
                    </div>
                </div>
                <button ref={rigthButtonRef} onClick={scrollRight}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            <style jsx>{`
                    .slide{
                        transform: translateX(calc(${trackPosition}% + 26.5px));
                        transition: transform ${transformTransition}s;
                    }
                    .slide:first-child{
                        transform: translateX(${!isInfiniteScrollActive && -100}%);
                    }
            `}</style>
        </section>
    );
};

export default MoviesCarousele;
