import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { ICollection, IMovie } from '@/helpers/interfaces';
import LoggedHomePage from '@/components/LoggedHomePage/LoggedHomePage';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export interface IBrowseSearchProps {
   phrase: string | string[] | undefined
   data: ICollection
}

const BrowseSearch: FC<IBrowseSearchProps> = ({ phrase, data }) => {
   const collections = [data]
   return <LoggedHomePage searchPhrase={phrase} moviesData={collections} />
}

export default BrowseSearch;

export const getServerSideProps: GetServerSideProps<IBrowseSearchProps> = async (context) => {
   const token = await getServerSession(
      context.req,
      context.res,
      authOptions
   )
   if(token){
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
            data: results,
         },
      };
   }
   else return {
      redirect: {
         destination: '/',
         permament: false
      },
      props: {
         phrase: '',
         data: {
            title: '',
            movies: []
         }
      }
   }
};
