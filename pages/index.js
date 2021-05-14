import { useState } from "react";

// Uzdevums:
// 1) Parādās cik grozā ieliktas preces V
// 2) Tiek sarēķināts cik jāmaksā kopā
// 3) Grozā parādās nevis daudz vienādas preces, bet, piemēram, Prece 3 x2
// 4) Nevar grozā ielikt vairāk kā ir noliktavā
// 5) No groza var arī izņemt

export default function IndexPage() {
  const dati = {
    virsraksts: "Produkti",
    produkti: [
      {
        id: 1,
        nosaukums: "Prece 1",
        cena: 20,
        pieejams: true,
        skaitsNoliktava: 4
      },
      {
        id: 2,
        nosaukums: "Prece 2",
        cena: 30,
        pieejams: false,
        skaitsNoliktava: 0
      },
      {
        id: 3,
        nosaukums: "Prece 3",
        cena: 40,
        pieejams: true,
        skaitsNoliktava: 10
      },
      {
        id: 4,
        nosaukums: "Prece 4",
        cena: 10,
        pieejams: true,
        skaitsNoliktava: 1
      }
    ]
  };

  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    setCart([...cart, id]);
  };

  return (
    <>
      <h1>{dati.virsraksts}</h1>
      <h2>Pieejami</h2>
      <ul>
        {dati.produkti
          .filter(({ pieejams }) => pieejams)
          .map(({ id, nosaukums, cena, skaitsNoliktava }) => (
            <li>
              {nosaukums} – {cena}€ <em>{skaitsNoliktava}</em>{" "}
              <button onClick={() => addToCart(id)}>Pievienot Grozam</button>
            </li>
          ))}
      </ul>
      <h2>
        Nepieejami{" "}
        <buton
          style={{
            border: "1px solid blue",
            cursor: "pointer",
            padding: "0 0.25em"
          }}
          onClick={() => setOpen(!open)}
        >
          {open ? "-" : "+"}
        </buton>
      </h2>
      {open && (
        <ul>
          {dati.produkti
            .filter(({ pieejams }) => !pieejams)
            .map(({ nosaukums, cena, skaitsNoliktava }) => (
              <li>
                {nosaukums} – {cena}€ <em>{skaitsNoliktava}</em>{" "}
              </li>
            ))}
        </ul>
      )}
      <h3>Grozā ielikti:</h3>
      {JSON.stringify(cart)}
      {cart.length > 0 ? (
        <ul>
          <p>
            <b>Grozā atrodas {cart.length}</b>
          </p>
          {cart.map((id) => {
            const produkts = dati.produkti.find((p) => p.id === id);
            return (
              <li>
                {produkts.nosaukums} – {produkts.cena}€
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Grozs šobrīd ir tukšs!</p>
      )}
    </>
  );
}
