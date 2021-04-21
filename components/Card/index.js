export default function Card({ children }) {
  return (
    <>
      <div className="card shadow">{children}</div>
      <style jsx>{`
        .card {
          max-width: 350px;
          width: 100%;
          padding: 0.5em;
          border-radius: 0.75em;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  );
}
