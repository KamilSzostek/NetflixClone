import { FC } from 'react';
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

import styles from './LoggedHomePage.module.scss';

interface ILoggedHomePageProps {
  moviesData: ICollection[]
  searchPhrase?: string
}

const LoggedHomePage: FC<ILoggedHomePageProps> = ({ searchPhrase, moviesData }) => {
  const router = useRouter()
  const collections = moviesData.map((collection, key) => (<MoviesCarousele key={key} title={collection.title} movies={collection.movies} />))

  const searchResults = moviesData[0].movies.map(movie => <Poster movie={movie} />)
  function createTop10() {
    const top10: IMovie[] = []
    for (let index = 0; index < 10; index++) {
      const tmp = Object.create(moviesData[1].movies[index])
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
        {router.asPath === '/browse' && <Openning top10={createTop10()} />}
      </header >
      <main className={styles.main}>
        {moviesData[0].title === 'Search'
          ? (<>
            <div className={styles.searchResults}>
              {searchResults}
            </div>
            <p className={styles.searchPhrase}><span>Search phrase: '{searchPhrase}'</span><span> Results: {moviesData[0].movies.length}</span></p>
          </>)
          : collections}
      </main>
      <Footer linkList={footerLinkArr2} />
    </>
  );
};

export default LoggedHomePage;



