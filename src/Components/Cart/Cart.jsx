/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
const Cart = ({ selectedActors, remaining, totalCost }) => {
  console.log(selectedActors);

  return (
    <div>
      <h5>Total actors : {selectedActors.length} </h5>
      <h2>Total cost: {totalCost}</h2>
      <h2>Total Remaining: {remaining} </h2>
      {selectedActors.map((actor, idx) => (
        <li className='list-none' key={idx}>
          {actor.name}
        </li>
      ))}
    </div>
  );
};

export default Cart;
