interface FejlecProps {
    setOldal: (oldal: string) => void

}

export function Fejlec({ setOldal }: FejlecProps) {
    return (
        <nav >
            <button className="btn btn-success" value="Kezdőlap" onClick={() => setOldal("Kezdőlap")}>Kezdőlap</button>
            <p/>
            <button  className="btn btn-success" value="Admin" onClick={() => setOldal("Admin")}>Admin</button>
            <p/>
            <button  className="btn btn-success" value="Moderátor" onClick={() => setOldal("Moderátor")}>Moderátor</button>
        </nav>
    )
}

