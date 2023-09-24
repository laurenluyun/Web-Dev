// a React functional component named AppHeader. It represents a header bar that includes 
// an AppBar from Material-UI, along with an IconButton that triggers a dialog for adding 
// new lists using the Material-UI Popup State hooks. 
import { Add } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
// This hook is used to manage the state of a popup, such as a dialog or a menu. 
import { usePopupState } from 'material-ui-popup-state/hooks';
import { NewListDialog } from './NewListDialog.jsx';

export function AppHeader() {
  // hook is used to manage the state of a popup. It's initialized with a dialogState variable, 
  // which represents the state of a dialog for adding new lists. The variant is set to 'dialog', 
  // and the popupId is set to 'new-list'. 
  const dialogState = usePopupState({ variant: 'dialog', popupId: 'new-list' });

  return (
    <>
      <NewListDialog dialogState={dialogState} />
      <AppBar
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Lists
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={dialogState.open}
          >
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}