import React from 'react';

export default function someFile() {
  return <div>rfc + TAB</div>;
}
import React from 'react';

const someFile = () => {
  return <div>rsc + TAB</div>;
};

export default someFile;

import axios from 'axios';
import { useEffect, useState } from 'react';

const [items, setItems] = useState([]);

useEffect(() => {
  axios
    .get('LINK')
    .then((response) => response.data)
    .then((arr) => {
      setItems(arr);
      setIsLoading(false);
    })
    .catch((err) => console.log(err));
}, []);

<div className="content__items">
  {items.map((obj) => (
    <PizzaBlock {...obj} key={obj.id} />
  ))}
</div>;
