
import { useEffect, useState } from "react";
import type { Konyvek } from "../types/konyv";

interface AdminProps {
    konyv: Konyvek[];
    setKonyvek: (konyvek: Konyvek[]) => void;
}

export function Admin({ konyv, setKonyvek }: AdminProps) {

    const [cim, setCim] = useState("");
    const [szerzo, setSzerzo] = useState("");
    const [megjelenes, setMegjelenes] = useState(2026);
    const [kolcsonozheto, setKolcsonozheto] = useState(true);
    const [felvetelDatuma, setFelvetelDatuma] = useState("");
    const [ertekeles, setErtekeles] = useState(0);
    const [kategoria, setKategoria] = useState("");

    const [hiba, setHiba] = useState("");

    const url = "http://localhost:3000/konyvek";

    async function handleKonyvFelvetel(e) {

        e.preventDefault();
        setHiba("");

        const ujKonyvAdat = {
            cim: cim,
            szerzo: szerzo,
            megjelenes: megjelenes,
            kolcsonozheto: kolcsonozheto,
            felvetelDatuma: felvetelDatuma,
            ertekeles: ertekeles,
            kategoria: kategoria
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ujKonyvAdat)
            });

            if (!response.ok) {
                throw new Error("A könyv felvétele nem sikerült!");
            }

            const ujKonyv: Konyvek = await response.json();
            setKonyvek([...konyv, ujKonyv]);

            setCim("");
            setSzerzo("");
            setMegjelenes(2026);
            setKolcsonozheto(true);
            setFelvetelDatuma("");
            setErtekeles(5);
            setKategoria("");

        } catch (err) {
            console.log("Hiba történt a felvételnél:", err);
            setHiba("A könyv felvétele nem sikerült!");
        }
    }

    async function konyvTorles(id: number) {
        setHiba("");

        try {
            const response = await fetch(url + "/" + id, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("A könyv törlése nem sikerült!");
            }

            setKonyvek(konyv.filter((k) => k.id !== id));

        } catch (err) {
            console.log("Hiba történt a törlésnél:", err);
            setHiba("A könyv törlése nem sikerült!");
        }
    }

    async function konyvKolcsonozhetoseg(id: number) {

        const kivalasztottKonyv = konyv.find((k) => k.id === id);

        if (!kivalasztottKonyv) {
            return;
        }

        try {
            const response = await fetch(url + "/" + id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    kolcsonozheto: !kivalasztottKonyv.kolcsonozheto
                })
            });

            if (!response.ok) {
                throw new Error("A módosítás nem sikerült!");
            }

            const modositottKonyv: Konyvek = await response.json();

            setKonyvek(
                konyv.map((k) =>
                    k.id === id ? modositottKonyv : k
                )
            );

        } catch (err) {
            console.log("Hiba történt a módosításnál:", err);
            setHiba("A kölcsönözhetőség módosítása nem sikerült!");
        }
    }

    async function konyvErtekeles(id: number, valtozas: number) {

        const kivalasztottKonyv = konyv.find((k) => k.id === id);

        if (!kivalasztottKonyv) {
            return;
        }

        const ujErtekeles = kivalasztottKonyv.ertekeles + valtozas;

        if (ujErtekeles < 1 || ujErtekeles > 10) {
            return;
        }

        try {
            const response = await fetch(url + "/" + id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ertekeles: ujErtekeles
                })
            });

            if (!response.ok) {
                throw new Error("Az értékelés módosítása nem sikerült!");
            }

            const modositottKonyv: Konyvek = await response.json();

            setKonyvek(
                konyv.map((k) =>
                    k.id === id ? modositottKonyv : k
                )
            );

        } catch (err) {
            console.log("Hiba történt az értékelés módosításánál:", err);
            setHiba("Az értékelés módosítása nem sikerült!");
        }
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Admin oldal</h2>
            {hiba && (
                <div className="alert alert-danger">
                    {hiba}
                </div>
            )}

            <div className="card mb-4">
                <div className="card-header">
                    <h4 className="mb-0">Új könyv felvétele</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleKonyvFelvetel}>
                        <div className="mb-3">
                            <label className="form-label">                                Könyv címe
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={cim}
                                onChange={(e) => setCim(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Szerző
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={szerzo}
                                onChange={(e) => setSzerzo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Megjelenés éve
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                value={megjelenes}
                                onChange={(e) => setMegjelenes(Number(e.target.value))}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Felvétel dátuma
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                value={felvetelDatuma}
                                onChange={(e) => setFelvetelDatuma(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Értékelés (1–10)
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                value={ertekeles}
                                min="1"
                                max="10"
                                onChange={(e) => setErtekeles(Number(e.target.value))}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Kategória
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={kategoria}
                                onChange={(e) => setKategoria(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={kolcsonozheto}
                                onChange={(e) => setKolcsonozheto(e.target.checked)}
                            />
                            <label className="form-check-label">
                                Kölcsönözhető
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Könyv felvétele
                        </button>
                    </form>
                </div>
            </div>


            <h3 className="mb-3">Könyvek listája</h3>
            <div className="row">
                {konyv.map((k) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={k.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {k.cim}
                                </h5>
                                <p className="card-text">
                                    <strong>Szerző:</strong> {k.szerzo}
                                </p>
                                <p className="card-text">
                                    <strong>Megjelenés:</strong> {k.megjelenes}
                                </p>
                                <p className="card-text">
                                    <strong>Kategória:</strong> {k.kategoria}
                                </p>
                                <p className="card-text">
                                    <strong>Felvétel dátuma:</strong> {k.felvetelDatuma}
                                </p>
                                <p className="card-text">
                                    <strong>Kölcsönözhető:</strong>{" "}
                                    {k.kolcsonozheto ? "Igen" : "Nem"}
                                </p>
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <strong>Értékelés: {k.ertekeles}/10</strong>
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => konyvErtekeles(k.id, -1)}
                                        disabled={k.ertekeles <= 1}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => konyvErtekeles(k.id, 1)}
                                        disabled={k.ertekeles >= 10}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="btn btn-outline-primary btn-sm me-2"
                                    onClick={() => konyvKolcsonozhetoseg(k.id)}
                                >
                                    Kölcsönözhetőség kapcsolása
                                </button>
                                <button
                                    className="btn btn-danger btn-sm mt-2"
                                    onClick={() => konyvTorles(k.id)}
                                >
                                    Törlés
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
