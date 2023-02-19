import React, {useEffect, useState} from 'react'
import AnimeInfo from './components/AnimeInfo'
import AnimeList from './components/AnimeList'
import AddToList from './components/AddToList'
import RemoveFormList from './components/RemoveFromList'

const App = ()=> {

  const [search, setSearch] = useState('Naruto')
  const [animeData, setAnimedata] = useState()
  const [animeInfo, setAnimeInfo] = useState()
  const [myAnimelist, setMyAnimeList] = useState([])

  const addTo = (anime) =>{
    const index = myAnimelist.findIndex(myAnime => myAnime.mal_id === anime.mal_id)
    if (index < 0) {
      const newArr = [...myAnimelist, anime]
      setMyAnimeList(newArr)
    }
  }
  const removeFrom = (anime)=>{
    const newArr = myAnimelist.filter(myAnime => anime.mal_id !== myAnime.mal_id)
    setMyAnimeList(newArr)
  }

  const getData = async()=>{
    // const res = await fetch(`https://api.jikan.moe/v4/anime?q=naruto&sfw`)
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20`)
    const resData = await res.json()
    setAnimedata(resData.data)
  }

  useEffect(()=>{
    getData()
  },[search])

  return (
    <>
      <div className='header'>
        <h1>My Anime List!</h1>
        <div className='search-box'>
          <input type='search' placeholder='Search your anime' 
          onChange={(e)=>{setSearch(e.target.value)}}/>
        </div>
      </div>
      <div className='conatiner'>
        <div className='animeInfo'>
          {/* Only when animeInfo true, show <AnimeInfo/> */}
          {animeInfo && <AnimeInfo animeInfo={animeInfo}/>}
        </div>
        <div className='anime-row'>
          <h2 className='text-heading'>Anime</h2>
          <div className='row'>
            {/* local state can alse been changed from another component, pass set function to 
            another component as props */}
            <AnimeList 
              animeList={animeData} 
              setAnimeInfo={setAnimeInfo}
              // pass component define function as props
              animeComponent={AddToList}
              // addToList={addTo}
              //option1: hanldeList is addTo, so handleList(anime) is addTo(anime)
              //option2: handleList is (anime)=>{addTo(anime)}, is to run AddTo, so when handleList runs, addTo runs
              handleList={(anime)=>addTo(anime)}
            />
          </div>
          <h2 className='text-heading'>My List</h2>
          <div className='row'>
            {/* you can use the same component, but pass different props to show differnt info, and run different function */}
          <AnimeList 
              animeList={myAnimelist} 
              setAnimeInfo={setAnimeInfo}
              animeComponent={RemoveFormList}
              // handleList is to run removeFrom, so when handleList runs, removeFrom runs
              handleList={(anime)=>removeFrom(anime)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
