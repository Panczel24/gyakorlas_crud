import type { Konyvek } from "../types/konyv";

interface AdminProps{
    konyv: Konyvek[];
    setKonyvek:(konyv: Konyvek[])=> void;
}

export function adminKonyvek({konyv, setKonyvek}: AdminProps){
}