import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'store/rootReducer';

const configureAppStore = (preloadedState) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware(),
        preloadedState
    });

    return store;
}

export default configureAppStore;