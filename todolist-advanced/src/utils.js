import Dexie from 'dexie';

// initialize a new Dexie database instance and specifies the version of the database schema as 2  
// it defines 2 object stores: lists and listItems, each with specified indexed properties
export const db = new Dexie('todo-list-db');
db.version(2).stores({
  lists: '++id, name', // Primary key and indexed props
  listItems: '++id, name, checked, listId', // Primary key and indexed props
});
// API object is defined which contains keys representing different API endpoints related to the todo
// list application. These keys are used in the fetcher and putter functions to determine which operation
// to perform.
export const APIs = {
  TodoLists: 'todo-lists',
  TodoListsUpdate: 'todo-lists-update',
  TodoList: 'todo-list',
  TodoListDelete: 'todo-list-delete',
  TodoListUpdate: 'todo-list-update',
};
// fetcher function is defined to handle data retrieval from the client-side database based on 
// the provided URL. It switched based on the URL and fetches the corresponding data from the 
// Dexie database. 
export async function fetcher({ url, ...variables }) {
  switch (url) {
    case APIs.TodoLists:
      return db.lists.toArray();
    case APIs.TodoList:
      return {
        ...(await db.lists.get(variables.id)),
        items:
          (await db.listItems.where({ listId: variables.id }).toArray()) ?? [],
      };
    default:
      throw new Error(`Unknown API ${url}`);
  }
}
// putter function handles data insertion, update, and deletion based on the provided URL. It also
// switches based on the URL and performs the appropriate operation in the Dexie database. 
export async function putter({ url, id, ...variables }) {
  switch (url) {
    case APIs.TodoLists:
      return db.lists.add({ name: variables.name, icon: variables.icon });
    case APIs.TodoListsUpdate:
      return db.lists.update(id, { name: variables.name });
    case APIs.TodoList:
      return db.listItems.add({ listId: id, name: variables.name });
    case APIs.TodoListDelete:
      return db.listItems.delete(id);
    case APIs.TodoListUpdate:
      return db.listItems.update(id, variables);
    default:
      throw new Error(`Unknown API ${url}`);
  }
}
