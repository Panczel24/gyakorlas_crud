import { useEffect, useState } from 'react'
import './App.css'
import type { Konyvek } from './types/konyv'
import { UserKonyvLista } from './components/user'
import { Fejlec } from './components/fejlec';
import { Admin } from './components/admin';

function App() {
  const [oldal, setOldal] = useState('');
  const [konyvek, setKonyvek] = useState<Konyvek[]>([])


  useEffect(() => {
    async function fetchKonyvek() {
      try {
        const response = await fetch("http://localhost:3000/konyvek")
        const data: Konyvek[] = await response.json();
        setKonyvek(data)

      } catch (err) {
        console.log("hiba történt:" + err.message)

      }
    }
    fetchKonyvek()
  }, [])


  return (
    <>
      <Fejlec setOldal={setOldal} />
      {oldal === "Kezdőlap" && <UserKonyvLista konyv={konyvek} />}
      {oldal === "Admin" && (<Admin konyv={konyvek} setKonyvek={setKonyvek}/> )}




    </>
  )
}

export default App
