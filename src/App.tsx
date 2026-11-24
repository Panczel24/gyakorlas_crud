import { useEffect, useState } from 'react'
import './App.css'
import type { Konyvek } from './types/konyv'
import { UserKonyvLista } from './components/user'

function App() {
  const [count, setCount] = useState(0)
  const [konyvek, setKonyvek] = useState<Konyvek[]>([])


  useEffect(()=>{
    async function fetchKonyvek(){
       try {
        const response = await fetch("http://localhost:3000/konyvek")
        const data: Konyvek[] = await response.json();
        setKonyvek(data)

      } catch (err) {
        console.log("hiba történt:" + err.message)

      }
    }
    fetchKonyvek()
  },[])


  return (
    <>
    <UserKonyvLista konyv={konyvek}></UserKonyvLista>
    
    
    
    </>
  )
}

export default App
