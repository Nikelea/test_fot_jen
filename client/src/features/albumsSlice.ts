import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '@/helpers/axiosApiClient';

export interface Album {
  id: number;
  title: string;
  coverImage: string;
  releaseYear: number;
  artistId: number;
}

interface State {
  albums: Album[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  albums: [],
  loading: false,
  error: null,
};

export const fetchAlbumsByArtist = createAsyncThunk(
  'albums/fetchAlbumsByArtist',
  async (artistId: number) => {
    const response = await axiosApiClient.get(`/albums?artist=${artistId}`);
    return response.data;
  }
);

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsByArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbumsByArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
        state.error = null;
      })
      .addCase(fetchAlbumsByArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load albums';
      });
  },
});

export default albumsSlice.reducer;
