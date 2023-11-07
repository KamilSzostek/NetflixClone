import { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Dune from '../../../public/assets/trailers/dune.mp4'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPlay, faRotateLeft, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import DuneTitle from '../../../public/assets/dune2.png';
import MoviesCarousele from '../MoviesCarousele/MoviesCarousele';
import { IMovie } from '@/helpers/interfaces';

import styles from './Openning.module.scss';

interface IOpenningProps {
    top10: IMovie[]
}

const Openning: FC<IOpenningProps> = ({ top10 }) => {
    const [isMuted, setIsMuted] = useState(true)
    const [videoIsEnded, setVideoIsEnded] = useState(false)

    const videoRef = useRef<HTMLVideoElement>(null)
    const descRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLImageElement>(null)
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = 0.3
            videoRef.current.poster = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.cdn.newsbytesapp.com%2Fimages%2Fl90220220516104335.jpeg&f=1&nofb=1&ipt=68f176a70541d105624c3b93c99a2a1b4a3c4766ba30244bf68ec1f64e75da3a&ipo=images";
            videoRef.current.addEventListener('ended', () => {
                setVideoIsEnded(true)
                setTimeout(() => {
                    if (descRef.current && titleRef.current) {
                        descRef.current.style.transform = 'translateY(0)'
                        descRef.current.style.opacity = '1'
                        titleRef.current.style.transform = 'translateY(0)'
                    }
                }, 1000)
            })
            videoRef.current.addEventListener('play', () => showDescription())
        }
    }, [])

    function showDescription() {
        setTimeout(() => {
            if (descRef.current && titleRef.current) {
                descRef.current.style.transform = 'translateY(100%)'
                descRef.current.style.opacity = '0'
                titleRef.current.style.transform = 'translateY(25%) scale(.8)'
            }
        }, 15000)
    }
    const playVideoHandler = () => {
        videoRef.current?.play()
        setVideoIsEnded(false)
        showDescription()
    }
    return (
        <>
            <div className={styles.openning}>
                {videoIsEnded ? (<figure>
                    <img className={styles.poster} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.cdn.newsbytesapp.com%2Fimages%2Fl90220220516104335.jpeg&f=1&nofb=1&ipt=68f176a70541d105624c3b93c99a2a1b4a3c4766ba30244bf68ec1f64e75da3a&ipo=images" alt="Dune part 2" />
                </figure>)
                    : (<video ref={videoRef} autoPlay muted={isMuted}>
                        <source src={Dune} type='video/mp4' />
                    </video>)}
                <div className={styles.label}>
                    <div>
                        <figure>
                            <Image ref={titleRef} src={DuneTitle} alt='Dune part 2' width={600} height={200} priority />
                            <figcaption ref={descRef}>Prince Paul Atreides adopts the nickname Muad'Dib and begins a spiritual-physical journey to become the prophesied liberator of the people of Dune.</figcaption>
                        </figure>
                    </div>
                </div>
                <div className={styles.controls}>
                    <div>
                        <button className={styles.play}>
                            <FontAwesomeIcon icon={faPlay} />
                            Play
                        </button>
                        <button className={styles.info}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            More Info
                        </button>
                    </div>
                    <button className={styles.sound} onClick={videoIsEnded ? playVideoHandler : () => setIsMuted(!isMuted)}>
                        <FontAwesomeIcon icon={videoIsEnded ? faRotateLeft : (isMuted ? faVolumeMute : faVolumeHigh)} />
                    </button>
                </div>
            </div>
            <div className={styles.top10}>
                <MoviesCarousele title='Top 10 New Movies' movies={top10}/>
            </div>
        </>
    );
};
export default Openning;
