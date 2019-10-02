import { useState } from 'react';

const useSort = () => {
  const [sortedList, setSortedList] = useState([]);

  const createAscList = (list, compareAsc) => {
    setSortedList(list.map(item => item).sort(compareAsc));
  };

  const createDescList = (list, compareDesc) => {
    setSortedList(list.map(item => item).sort(compareDesc));
  };

  const setList = (list, sortOrderAndProp) => {
    if (list.hasOwnProperty('reviews')) {
      list = list.reviews;
    }

    if (list.length < 1) return setSortedList(list);

    const order = sortOrderAndProp[0];
    const prop = sortOrderAndProp[1];

    switch (order) {
      case 'asc': {
        const compareAsc = (itemA, itemB) => {
          if (itemA[prop] > itemB[prop]) return 1;

          if (itemA[prop] < itemB[prop]) return -1;

          return 0;
        };
        createAscList(list, compareAsc);
        return;
      }

      case 'desc': {
        const compareDesc = (itemB, itemA) => {
          if (itemA[prop] > itemB[prop]) return 1;

          if (itemA[prop] < itemB[prop]) return -1;

          return 0;
        };
        createDescList(list, compareDesc);
        return;
      }

      default: {
        setSortedList(list);
      }
    }
  };

  return {
    sortedList,
    setList
  };
};

export default useSort;
