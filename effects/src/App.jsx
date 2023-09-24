import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from '../counter';
import QuoteFetcher from '../QuoteFetcher';
import QuoteFetchLoader from '../QuoteFechLoader';
import ProfileViewerWithSearch from './ProfileViewerWithSearch';

function App() {

  return (
    <>
      {/* <Counter /> */}
      {/* <QuoteFetchLoader/> */}
      <ProfileViewerWithSearch />
    </>
  )
}

export default App
