import { configureStore } from '@reduxjs/toolkit';
import artistsReducer from '@/features/artistsSlice';
import albumsReducer from '@/features/albumsSlice';
import tracksReducer from '@/features/tracksSlice';
import userReducer from '@/features/userSlice.ts';
import trackHistoryReducer from '@/features/trackHistorySlice';

const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    user: userReducer,
    trackHistory: trackHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
