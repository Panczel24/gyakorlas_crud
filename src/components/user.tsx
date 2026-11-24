import type { Konyvek } from "../types/konyv";

interface UserProps {
    konyv: Konyvek[];
}

export function UserKonyvLista({ konyv }: UserProps) {
    return (
        <div className="container mt-4">
            <h2 className="mb-3">Könyvek</h2>

            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Szerző</th>
                            <th>Cím</th>
                            <th>Megjelenés</th>
                            <th>Kölcsönözhető</th>
                            <th>Felvétel dátuma</th>
                            <th>Értékelés</th>
                            <th>Kategória</th>
                        </tr>
                    </thead>

                    <tbody>
                        {konyv.map((konyvek) => (
                            <tr key={konyvek.id}>
                                <td>{konyvek.szerzo}</td>
                                <td>{konyvek.cim}</td>
                                <td>{konyvek.megjelenes}</td>
                                <td>
                                    {konyvek.kolcsonozheto ? (
                                        <span className="badge bg-success">Igen</span>
                                    ) : (
                                        <span className="badge bg-danger">Nem</span>
                                    )}
                                </td>
                                <td>{konyvek.felvetelDatuma}</td>
                                <td>{konyvek.ertekeles}/10</td>
                                <td>{konyvek.kategoria}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}