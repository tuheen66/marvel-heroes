import { useEffect } from "react";
import "./Home.css";
import { useState } from "react";
import Cart from "./../Cart/Cart";
import swal from "sweetalert";

const Home = () => {
  const [allActors, setAllActors] = useState([]);

  const [selectedActors, setSelectedActors] = useState([]);

  const [totalCost, setTotalCost] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setAllActors(data));
  }, []);

  const handleSelectActor = (actor) => {
    const ifExist = selectedActors.find((item) => item.id == actor.id);
    let count = actor.salary;

    if (ifExist) {
      return swal("Already booked!");
    } else {
      selectedActors.forEach((item) => {
        count = count + item.salary;
      });

      const budget = 20000;
      const totalRemaining = budget - count;

      if (count > budget) {
        return swal("No more Money!");
      } else {
        setTotalCost(count);
        setRemaining(totalRemaining);

        setSelectedActors([...selectedActors, actor]);
      }
    }
  };
  console.log(selectedActors);

  return (
    <div className='mx-4 my-8 flex gap-4'>
      {/* card-container */}
      <div className='flex flex-wrap w-9/12 gap-4'>
        {/* card */}
        {allActors.map((actor) => (
          // eslint-disable-next-line react/jsx-key
          <div
            key={actor.id}
            className=' card w-52 h-76 border text-white text-center'
          >
            <div className='text-center p-4 '>
              <img
                className='w-16 rounded-full mx-auto'
                src={actor.image}
                alt=''
              />
            </div>
            <h2 className='text-2xl mb-4'>{actor.name}</h2>
            <p className='text-xs'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, laboriosam?
            </p>
            <div className='flex gap-4 justify-evenly my-4'>
              <p>salary: $ {actor.salary}</p>
              <p>{actor.role}</p>
            </div>
            <button
              onClick={() => handleSelectActor(actor)}
              className='  bg-red-400 py-2 px-4 rounded-lg'
            >
              Select
            </button>
          </div>
        ))}
      </div>
      {/* cart */}
      <div className='text-white w-3/12'>
        <Cart
          selectedActors={selectedActors}
          remaining={remaining}
          totalCost={totalCost}
        ></Cart>
      </div>
    </div>
  );
};

export default Home;
