import React from 'react'
// import AddToList from './AddToList'

const AnimeList = ({animeList, setAnimeInfo, animeComponent, handleList }) => {

  // const AddToList = animeComponent
  // need to const another function name to get it work, since its component define fucntion?
  const AddOrRemove = animeComponent

//Can I do this way, handleClickfunction???????, if handleClick needs to run a function that needs a parameter from 
// the running area Element, then you cannot use handleClick to do it, you have to run it in the onClick in side the element!
  // const handleClick = ()=>{
  //   handleList(anime)
  // }

  return (
    <>
      {animeList ? 
        animeList.map((anime, animeIdx)=>{
          return(
            <div className='card' key={animeIdx} onClick={()=>setAnimeInfo(anime)}>
                <img src={anime.images.jpg.large_image_url} alt='animeImage'/>
                <div className='anime-info'>
                  <h4>{anime.title}</h4>
                  <h3>SYNOPSIS</h3>
                  {/* <div className='overlay' onClick={handleClick}> */}
                  {/* So now addTolist is just AddTo function, this line is like, run addTo function
                  just like pass set function, use parameter in this component to run this function, which change 
                  the local state in another component */}
                  {/* <div className='overlay' onClick={()=> addToList(anime)}> */}
                  <div className='overlay' onClick={()=> handleList(anime)}>
                    <h4>{anime.title_japanese}</h4>
                    <div className='synopsis'>
                      <p>{anime.synopsis}</p>
                    </div>
                    {/* <AddToList/> */}
                    <AddOrRemove/>
                    {/* following directly use, not working!
                    <animeComponent/> */}
                  </div>
                </div>
            </div>
          )
        })
        : 'Not found'
      }
    </>
  )

}

export default AnimeList