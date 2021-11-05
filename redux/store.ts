import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import interfaceReducer from './interfaceSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    interface: interfaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
