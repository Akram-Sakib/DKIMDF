import "./reached-to.css";

const ReachedTo = () => {
  const reachedTo = [
    { id: 1, name: "Imam" },
    { id: 2, name: "Muazzain" },
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
    <section className="mt-10 py-20">
      {/* text heading with a border bottom */}
      <h2 className=" text-center text-3xl font-bold max-w-[12rem] pb-3 mx-auto">
        We Reach To
      </h2>
      {/* card should be 12 card */}
      <div className="grid grid-cols-4 gap-5 mt-14 [&>*]:text-2xl">
        {/*  card */}
        {reachedTo.map((reach) => (
          // <div
          //   key={reach.id}
          //   className="overflow-hidden border-2 bg-blue-950 text-white font-semibold rounded-lg h-[4rem] flex flex-col justify-center items-center relative text-center hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:-left-full before:bg-purple-800 before:transition-all before:z-[-1] before:duration-300 before:ease-in-out before:hover:top-0 before:hover:-left-0 before:hover:translate-x-0 before:hover:border-0 fade-in-80"
          // >
          //   <h2 className="text-lg">{reach.name}</h2>
          // </div>
          <div
            key={reach.id}
            className="relative flex flex-row transition duration-300 ease-in-out bg-purple-50 p-4 rounded-lg items-center text-center justify-center cursor-pointer animated__hover hover:text-white font-semibold"
          >
            <h2 className="text-lg">{reach.name}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReachedTo;
