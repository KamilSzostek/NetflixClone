import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { ICollection, IMovie } from '@/helpers/interfaces';
import LoggedHomePage from '@/components/LoggedHomePage/LoggedHomePage';
import { createDataLimit } from '@/helpers/createDataLimit';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export interface IBrowseNotifyProps {
   data: ICollection
}

const BrowseSearch: FC<IBrowseNotifyProps> = ({ data }) => {
   const collections = [data]
   return (<LoggedHomePage moviesData={collections} />)
}

export default BrowseSearch;

async function selectCollection(key: string | string[] | undefined) {
   const options = {
      method: 'GET',
      headers: {
         accept: 'application/json',
         Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`
      }
   };

   let res
   switch (key) {
      case 'popular':
         res = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
         return await res.json()
      case 'oldgold':
         res = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
         return await res.json()
      case 'cinema':
         res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
         return await res.json()
      case 'horror':
         res = await fetch('https://api.themoviedb.org/3/search/collection?query=horror&include_adult=false&language=en-US&page=1', options)
         return await res.json()
   }
}

export const getServerSideProps: GetServerSideProps<IBrowseNotifyProps> = async (context) => {
   const token = await getServerSession(
      context.req,
      context.res,
      authOptions
   )
   if (token) {
      const { params } = context
      let results = {
         title: '',
         movies: [] as IMovie[]
      }
      const data = await selectCollection(params?.id)
      const filteredData = data.results.filter((movie: IMovie) => movie.poster_path !== null && movie.backdrop_path !== null && movie.overview !== '')

      results = {
         title: 'Notification',
         movies: createDataLimit(filteredData, 10)
      }
      return {
         props: {
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
         data: {
            title: '',
            movies: []
         }
      }
   }
};
