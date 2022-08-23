import { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'
import Player from '../components/Player'

const Home = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">

    <h1>this is a DOPE spotify clone</h1>

    <main className='flex'>
      <Sidebar />
      {/* center */}
      <Center />
    </main>

    <div className='sticky bottom-0'>
      <Player />
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    }
  }
}
