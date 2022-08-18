import React from "react";

function Stock({ stock, onStockClick }) {
  const { name, price } = stock;
  function handleClick() {
    onStockClick(stock);
  }
  return (
    <div onClick={handleClick}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
