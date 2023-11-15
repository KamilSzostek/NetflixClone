import { FC } from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '@/components/Header/Header'
import HomePage from '@/components/HomePage/HomePage'
import Footer from '@/components/Footer/Footer'
import { footerLinkArr } from '@/helpers/footerLinkLists'
import { GetServerSideProps } from 'next'
import { getCollectionDB } from '@/helpers/dbConnection'
import { IQA } from '@/helpers/interfaces'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { Session } from 'next-auth/core/types'

interface IHomeProps {
  qa: IQA[]
  token: Session | null
}

const Home: FC<IHomeProps> = ({ qa, token }) => {
  const router = useRouter()
  const [showPage, setShowPage] = useState(false)
  useEffect(() => {
    token ? router.push('/browse') : setShowPage(true)
  }, [])

  if (showPage)
    return (
      <>
        <Head>
          <title>Netflix</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <HomePage data={qa} />
        <Footer linkList={footerLinkArr} />
      </>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps<IHomeProps> = async (context) => {
  const db = await getCollectionDB('QA')
  const qa = await db.collection.find().toArray() 
  const token = await getServerSession(
    context.req,
    context.res,
    authOptions
 )
  return {
    props: {
      qa: qa.map(element => ({
        _id: element._id.toString(),
        question: element.question,
        answer: element.answer,
      })),
      token: token
    }
  }
}
