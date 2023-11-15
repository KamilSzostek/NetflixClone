import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import MoviesCarousele from '../MoviesCarousele/MoviesCarousele';
import NavBar from '../NavBar/NavBar';
import LoggedList from '../LoggedList/LoggedList';
import LoggedMenu from '../LoggedMenu/LoggedMenu';
import { ICollection, IMovie } from '@/helpers/interfaces';
import Footer from '../Footer/Footer';
import { footerLinkArr2 } from '@/helpers/footerLinkLists';
import Openning from '../Openning/Openning';
import Poster from '../Poster/Poster';
import { adultContentSelector } from '@/store/selectedProfile';

import styles from './LoggedHomePage.module.scss';
import { useSelector } from 'react-redux';

interface ILoggedHomePageProps {
  moviesData: ICollection[] 
  searchPhrase?: string
}

const LoggedHomePage: FC<ILoggedHomePageProps> = ({ searchPhrase, moviesData }) => {
  const router = useRouter()
  const adultContentAvalible = useSelector(adultContentSelector)

  useEffect(() => {
    if (!adultContentAvalible) {
      for (const collection of moviesData) {
        collection.movies.filter(movie => movie.adult)
      }
    }
  }, [])

  const collections = moviesData.length > 0 && moviesData.map((collection, key) => (<MoviesCarousele key={key} title={collection.title} movies={collection.movies} />))
  const collection = moviesData.length === 1 && moviesData[0].movies.map((movie, key) => (
    <div key={key}>
      {moviesData[0].title === 'Notification' && <span className={styles.number}>{key + 1}</span>}
      <Poster key={movie.id} movie={movie} />
    </div>
  ))

  function createTop10(collection: IMovie[]) {
    const top10: IMovie[] = []
    for (let index = 0; index < 10; index++) {
      const tmp = Object.create(collection[index])
      top10.push(tmp);
      top10[index].index = index + 1
    }
    return top10
  }
  return (
    <>
      <header className={styles.header}>
        <NavBar isFixedScroll>
          <>
            <LoggedList />
            <LoggedMenu />
          </>
        </NavBar>
        {router.asPath === '/browse' && <Openning top10={createTop10(moviesData[1].movies)} />}
      </header >
      <main className={styles.main}>
        {
          moviesData.length === 1 ? (<>
            <div className={styles.results}>
              {collection}
            </div>
            {moviesData[0].title === 'Search' && <p className={styles.searchPhrase}><span>Search phrase: '{searchPhrase}'</span><span> Results: {moviesData[0].movies.length}</span></p>}
          </>)
            : collections}
      </main>
      <Footer linkList={footerLinkArr2} />
    </>
  );
};

export default LoggedHomePage;



