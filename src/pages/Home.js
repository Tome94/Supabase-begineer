import supabase from "../config/SupabaseClient"
import { useEffect, useState } from "react"
//components
import SmoothieCard from "../component/SmoothieCard.js"
const Home = () => {
  const [fetcherror, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
      if (error) {
        setFetchError('could not fetch smoothies')
        setSmoothies(null)
        console.log(error)
      }
      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }
    fetchSmoothies()
  }, [])
  return (

    <div className="page home">
      {fetcherror && (<p>{fetcherror}</p>)}
      {smoothies && (
        <div className="smoothies">
          {/* order by button*/}
          <div className='smoothie-grid'>        
            {smoothies.map(smoothie => (
            <SmoothieCard key={smoothie.id} smoothie={smoothie} />
          ))}</div>
        </div>)}
    </div>
  )
}

export default Home