function Dashboard() {
  const interns = [
    { id: 1, name: "Rahul", score: 92, isPresent: true },
    { id: 2, name: "Priya", score: 78, isPresent: true },
    { id: 3, name: "Amit", score: 45, isPresent: false },
    { id: 4, name: "Sneha", score: 95, isPresent: true },
  ];

  return (
    <>
      {interns.map((intern) => (
        <div key={intern.id}>
          <h1>{intern.name}</h1>

          <p>Score: {intern.score}</p>

          <p style={{ color: intern.score >= 50 ? "green" : "red" }}>
            {intern.score >= 50 ? "Pass" : "Fail"}
          </p>

          {intern.score >= 90 && <span>Top Performer</span>}

          <p style={{ color: intern.isPresent ? "green" : "red" }}>
            {intern.isPresent ? "Present" : "Absent"}
          </p>

          <hr />
        </div>
      ))}

      <p>
        Showing {interns.length} interns —{" "}
        {interns.filter((intern) => intern.isPresent).length} present
      </p>
    </>
  );
}

export default Dashboard;