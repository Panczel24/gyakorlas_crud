import type { Konyvek } from "../types/konyv";

interface UserProps{
    konyv: Konyvek[];
}


export function UserKonyvLista({konyv}:UserProps){
    return(
    <div>
        <table>
            <thead>
                <td>Szerző</td>
                <td>Cím</td>
                <td>Megjelenés</td>
                <td>Kolcsonozheto</td>
                <td>Felvételdátuma</td>
                <td>értékelés</td>
                <td>kategória</td>
            </thead>
            <tbody>
                {konyv.map((konyvek)=>(
                    <tr>
                        <td>{konyvek.cim}</td>
                        <td>{konyvek.szerzo}</td>
                        <td>{konyvek.megjelenes}</td>
                        <td>{konyvek.kolcsonozheto? "kolcsonozheto" :"nem kolcsonozheto"}</td>
                        <td>{konyvek.felvetelDatuma}</td>
                        <td>{konyvek.ertekeles}</td>
                        <td>{konyvek.kategoria}</td>
                    </tr>

                ))}
            </tbody>
        </table>
    </div>
    )
}