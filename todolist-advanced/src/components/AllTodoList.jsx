import * as Icons from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { useEffect } from 'react';
// fetch data related to todo lists. It gets the data from the hook's return value. 
import { useTodoLists } from '../hooks/useTodoLists.js';
// manage the application state. It provides access to currentList and setCurrentList.
import { useAppState } from '../providers/AppState.jsx';

export function AllTodoLists() {
  const { data } = useTodoLists(); // add loading
  const { currentList, setCurrentList } = useAppState();
  // The useEffect hook is used to set the current list when the component mounts. 
  // If currentList is not set (falsy), it sets it to the ID of the first list in the fetched data. 
  // The currentList, data, and setCurrentList are included in the dependency array to ensure that 
  // the effect runs when these values change.
  useEffect(() => {
    if (!currentList) {
      setCurrentList(data[0]?.id);
    }
  }, [currentList, data, setCurrentList]);

  return (
    <Drawer
      sx={{
        width: 0.25,
        minWidth: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 0.25,
          minWidth: 200,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/*Empty Toolbar for spacing*/}
      <Toolbar />
      <List>
      {/* Each todo list is represented by a ListItem containing a ListItemButton with an icon and 
      the list name. The icon is dynamically selected based on the icon property of each list. 
      If an icon is not available for a specific list, the default Icons.List icon is used. */}
        {data.map(({ name, id, icon }) => {
          const Icon = Icons[icon];
          return (
            <ListItem key={id} disablePadding>
              {/* The ListItemButton onClick event sets the currentList state when a list item 
              is clicked. The selected prop of ListItemButton is used to indicate the currently 
              selected list. */}
              <ListItemButton
                onClick={() => {
                  setCurrentList(id);
                }}
                selected={currentList === id}
              >
                {Icon ? <Icon /> : <Icons.List />}
                <ListItemText sx={{ ml: 0.5 }} primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}