// React context and a set of utility functions for managing the app state related to the current 
// todo list.  
import { createContext, useContext, useMemo, useState } from 'react';

const AppStateContext = createContext({
  currentList: null,
});
export function AppState({ children }) {
  // a functional component that serves as a provider for the AppStateContext. 
  const [currentList, setCurrentList] = useState(null);

  const value = useMemo(
    () => ({
      currentList,
      setCurrentList,
    }),
    [currentList]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a AppStateProvider');
  }

  return context;
}

// this code follows the Context API pattern to manage and share the app state related to the
// current todo list. The AppState component acts as a provider, and the useAppState hook is 
// used to conveniently access and update the state from within other components in the app. 
// This approach makes it easier to manage and pass around the app state without needing to
// prop-drill through multiple layers of components. 