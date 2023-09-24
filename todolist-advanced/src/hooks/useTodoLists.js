// React custom hook. This hook leverages the SWR library to handle fetching and updating data 
// related to todo lists. SWR (Stale-While-Revalidate) is a React data fetching library that 
// makes it easy to fetch and manage data in components.
import useSWR from 'swr';

import { APIs, fetcher, putter } from '../utils.js';

export function useTodoLists() {
  // The hook utilizes the useSWR hook to fetch data from an API endpoint. It uses the fetcher 
  // function defined in utils.js to fetch data related to todo lists. The data is returned along
  // with a mutate function, which is used to update the cached data. 
  const { data = [], mutate } = useSWR({ url: APIs.TodoLists }, fetcher);

  return {
    // the fetched data related to todo lists
    data,
    // asynchronous function that adds a new todo list. It uses the putter function from utils.js 
    // to perform the API call. The mutate function is used to update the cached data optimistically 
    // without waiting for the API response. 
    async newList(newListName, icon) {
      return await mutate(
        await putter({
          url: APIs.TodoLists,
          icon: icon || 'List', // note: not using default param since an empty string is the default and won't be falsy
          name: newListName,
        }),
        {
          populateCache: false,
          optimisticData: oldData => [
            ...oldData,
            { name: newListName, icon: icon || 'List', data: [] },
          ],
        }
      );
    },
    // asynchronous function that updates the name of a todo list. It also uses the putter 
    // function to update the list's name. The mutate function is used to optimistically update 
    // the cached data. 
    async updateList(listToUpdate, newListName) {
      await mutate(
        await putter({
          url: APIs.TodoListsUpdate,
          id: listToUpdate,
          name: newListName,
        }),
        {
          populateCache: false,
          optimisticData: oldData =>
            oldData.map(d => {
              if (d.id === listToUpdate) {
                return { ...d, name: newListName };
              }
              return d;
            }),
        }
      );
    },
  };
}
