import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sort, setSort] = useState("Alphabetically");
  const [filter, setFilter] = useState("Tech");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then((stocks) => {
        setStocks(stocks);
      });
  }, []);

  function handleBuyStock(addStock) {
    const findStock = portfolio.find((stock) => stock.id === addStock.id);
    if (!findStock) {
      setPortfolio([...portfolio, addStock]);
    }
  }

  function handleRemoveStock(removeStock) {
    setPortfolio((portfolio) =>
      portfolio.filter((stock) => stock.id !== removeStock.id)
    );
  }

  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if (sort === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  });

  const filteredStocks = sortedStocks.filter((stock) => stock.type === filter);

  return (
    <div>
      <SearchBar
        sortBy={sort}
        onSortBy={setSort}
        filterBy={filter}
        onFilterBy={setFilter}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onAddStock={handleBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer
            stocks={portfolio}
            onRemoveStock={handleRemoveStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
