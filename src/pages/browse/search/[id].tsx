import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { ICollection, IMovie } from '@/helpers/interfaces';
import LoggedHomePage from '@/components/LoggedHomePage/LoggedHomePage';
import { useShowPage } from '@/hooks/useShowPage';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export interface IBrowseProps {
   phrase: string
   data: ICollection
   token: Session | null
}

const BrowseSearch: FC<IBrowseProps> = ({ phrase, data, token }) => {
   const collections = [data]
   return useShowPage(token) && (<LoggedHomePage searchPhrase={phrase} moviesData={collections} />)
}

export default BrowseSearch;

export const getServerSideProps: GetServerSideProps<{ phrase: string | string[] | undefined, data: ICollection }> = async (context) => {
   const { params } = context
   let results: ICollection = {
      title: '',
      movies: []
   }
   const token = await getServerSession(
      context.req,
      context.res,
      authOptions
   )
   if(token){
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
      results = {
         title: 'Search',
         movies: filteredData
      }
   }
   else throw new Error('Invalid authorization')
   return {
      props: {
         phrase: params?.id,
         data: results,
         token
      },
   };
};
