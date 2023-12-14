const ReachedTo = () => {
  const reachedTo = [
    { id: 1, name: "Imam" },
    { id: 2, name: "Muzzain" },
    { id: 3, name: "Khadem" },
    { id: 4, name: "Khatib" },
    { id: 5, name: "Kawmi Madrasa" },
    { id: 6, name: "Kawmi Madrasa Teacher" },
    { id: 7, name: "Kawmi Madrasa Student" },
    { id: 8, name: "Farmers" },
    { id: 9, name: "Fruit Business" },
    { id: 10, name: "Rice Business" },
    { id: 11, name: "Grocerry Business" },
    { id: 12, name: "Fertilizer Business" },
  ];

  return (
    <section className="mt-10">
      {/* text heading with a border bottom */}
      <h2 className="border-b-2 border-black text-center text-3xl max-w-[12rem] pb-3 mx-auto">
        We Reach To
      </h2>
      {/* card should be 12 card */}
      <div className="grid grid-cols-4 gap-5 mt-5 [&>*]:text-2xl">
        {/*  card */}
        {reachedTo.map((reach) => (
          <div
            key={reach.id}
            className="border-2 border-black h-[4rem] flex flex-col justify-center items-center relative"
          >
            <h2>{reach.name}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReachedTo;
