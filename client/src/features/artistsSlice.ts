import { axiosApiClient } from '@/helpers/axiosApiClient';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Artist {
  id: number;
  name: string;
  photo: string;
}

interface State {
  artists: Artist[];
  error: string | null;
  loading: boolean;
}

const initialState: State = {
  artists: [],
  error: null,
  loading: false,
};

export const fetchArtists = createAsyncThunk('artists/fetchArtists', async () => {
  const response = await axiosApiClient.get('/artists');
  return response.data;
});

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload;
        state.error = null;
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load artists';
      });
  },
});

export default artistsSlice.reducer;
