import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '@/helpers/axiosApiClient';

export interface Track {
  id: number;
  title: string;
  trackNumber: number;
  duration: string;
}

interface State {
  tracks: Track[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  tracks: [],
  loading: false,
  error: null,
};

export const fetchTracksByAlbum = createAsyncThunk(
  'tracks/fetchTracksByAlbum',
  async (albumId: number, { rejectWithValue }) => {
    try {
      const response = await axiosApiClient.get(`/tracks?album=${albumId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Unable to fetch tracks');
    }
  }
);

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracksByAlbum.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTracksByAlbum.fulfilled, (state, action) => {
        state.tracks = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTracksByAlbum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tracksSlice.reducer;
