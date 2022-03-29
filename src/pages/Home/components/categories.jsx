import React, {useState, useEffect} from 'react';
import axios from 'axios'




//styles
import '../css/categories.css'

const Categories = () => {
    const URL = 'https://www.omdbapi.com/?t=Game%20of%20Thrones&Season=1&apikey=73aaa67b'
    const URL2 = 'https://www.omdbapi.com/?t=Game%20of%20Thrones&Season=2&apikey=73aaa67b'
    
    const [movie1, setMovie1] = useState([])
    const [movie2, setMovie2] = useState([])
    const [search, setsearch] = useState(null)
    useEffect(()=>{
        async function fetchMovies (){
            try{
                const response1 = await axios.get(URL)
                const response2 = await axios.get(URL2)

                //console.log(response2.data);
                setMovie1(response1.data)
                setMovie2(response2.data)
            }catch(err){
                console.log(err.response?.data);
            }
        }
        fetchMovies()
    }, [])

    const handleChange = async (e)=>{
        const episode = e.currentTarget.value
        const response = await axios.get(`https://www.omdbapi.com/?t=Game%20of%20Thrones&Season=2&apikey=73aaa67b&Episode=${episode}`)
        console.log(response.data);
        setsearch(response.data)
        
    }
    return ( 
        <div className="categories">
            <div className="search-box">
                <label htmlFor='label' className="search-label">Search</label>
                <input type="number" className="form-control search-input" placeholder='Enter movie episode' onChange={(e)=>handleChange(e)} />
            </div>

            {search? <div className="category">
                <div className="category-name" style={{color:'red', fontWeight:'bold'}}> Result for {movie1.Title} Season {search.Season} Episode {search.Episode} </div>
                <div className="category-display">
                    
                        <div className="movie-item" style={{backgroundImage:'url(../../../../../assets/img2.jpg)', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
                             {search.Title} 
                        </div>
                   
                  
                    
                </div>
            </div>:''}

            <div className="category">
                <div className="category-name">{movie1.Title} Season {movie1.Season}</div>
                <div className="category-display">
                    {movie1.Episodes?.map((item, i)=>
                        <div className="movie-item" style={{backgroundImage:'url(../../../../../assets/img2.jpg)', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}> {item.Title} </div>
                    )}
                  
                    
                </div>
            </div>

            <div className="category">
            <div className="category-name">{movie2.Title} Season {movie2.Season}</div>
                <div className="category-display">
                    {movie2.Episodes?.map((item, i)=>
                        <div className="movie-item" style={{backgroundImage:'url(../../../../../assets/img3.jpg)', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}> {item.Title} </div>
                    )}
                  
                    
                </div>
            </div>
        </div>
     );
}
 
export default Categories;