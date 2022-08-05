import axios from "axios";
import React, { useEffect, useState } from "react";
import CarItem from "./CardItem";
import "./ListItem.css";

function ListItem() {
  const [listingData, setListingData] = useState();
  const [queryParam, setQueryParam] = useState({ offset: 0, limit: 20 });
  const pokemomdataFunc = async (queryParam) => {
    const data = await axios
      .get(
        `https://pokeapi.co/api/v2/ability/?offset=${queryParam?.offset}&limit=${queryParam?.limit}`
      )
      .then((res) => {
        return res.data;
      });
    setListingData(data);
  };

  useEffect(() => {
    pokemomdataFunc(queryParam);
  }, [queryParam]);

  const getPokemonNextData = () => {
    if (listingData.next) {
      let newOffset = queryParam.offset + 20;
      setQueryParam({ ...queryParam, offset: newOffset });
    }
  };
  const getPokemonPreviousData = () => {
    if (listingData.previous) {
      let newOffset = queryParam.offset - 20;
      setQueryParam({ ...queryParam, offset: newOffset });
    }
  };
  return (
    <div className="conatiner">
      <div className="ItemConatiner">
        {listingData &&
          listingData?.results?.map((item, index) => {
            return (
              <CarItem
                key={`card${index}`}
                name={item.name}
                id={queryParam.offset + 1 + index}
                url={item.url}
              />
            );
          })}
      </div>
      <div className="btnContainer">
        {listingData && listingData.previous && (
          <button onClick={() => getPokemonPreviousData()}>Previous</button>
        )}
        {listingData && listingData.next && (
          <button onClick={() => getPokemonNextData()}>Next</button>
        )}
      </div>
    </div>
  );
}

export default ListItem;
