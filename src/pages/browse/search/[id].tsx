import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '@/helpers/cookies';
import { GetServerSideProps } from 'next';
import { ICollection, IMovie } from '@/helpers/interfaces';
import LoggedHomePage from '@/components/LoggedHomePage/LoggedHomePage';

export interface IBrowseProps {
   phrase: string
   data: ICollection
}

const BrowseSearch: FC<IBrowseProps> = ({ phrase, data }) => {
   const router = useRouter()
   const [showPage, setShowPage] = useState(false)

   useEffect(() => {
      const id = getCookie('ActiveUserId')
      if (!id)
         router.push('/')
      else
         setShowPage(true)
   }, [])

   const collections = [data]
   return showPage && (<LoggedHomePage searchPhrase={phrase} moviesData={collections}/>)
}

export default BrowseSearch;

export const getServerSideProps: GetServerSideProps<{ phrase: string | string[] | undefined, data: ICollection }> = async (context) => {
   const { params } = context
   const options = {
      method: 'GET',
      headers: {
         accept: 'application/json',
         Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`
      }
   };
   const res = await fetch(`https://api.themoviedb.org/3/search/collection?query=${params?.id}&language=en-US`, options)
   const data = await res.json()
   const filteredData = data.results.filter((movie: IMovie) => movie.poster_path !== null && movie.backdrop_path !== null && movie.overview !== '')
   const results = {
      title: 'Search',
      movies: filteredData
   }
   return {
      props: {
         phrase: params?.id,
         data: results
      },
   };
};
