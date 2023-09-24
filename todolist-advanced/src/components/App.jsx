import { Box, CssBaseline } from '@mui/material';

import { AppState } from '../providers/AppState.jsx';
import { AllTodoLists } from './AllTodoList.jsx';
import { AppHeader } from './AppHeader.jsx';
import { CurrentTodoList } from './CurrentTodoList.jsx';

export default function App() {
  return (
    <AppState>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppHeader />
        <AllTodoLists />
        <CurrentTodoList />
      </Box>
    </AppState>
  );
}