import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '@/helpers/axiosApiClient';

interface TrackHistory {
  id: number;
  userId: number;
  trackId: number;
  datetime: string;
  trackTitle: string;
  artistName: string;
}

interface TrackHistoryState {
  history: TrackHistory[];
  loading: boolean;
  error: string | null;
}

const initialState: TrackHistoryState = {
  history: [],
  loading: false,
  error: null,
};

export const addTrackToHistory = createAsyncThunk(
  'trackHistory/addTrackToHistory',
  async (track: number, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      return await axiosApiClient
        .post('/track_history', { track }, { headers: { Authorization: token } })
        .then((res) => res.data);
    } catch (error) {
      return rejectWithValue('Failed to add track to history');
    }
  }
);

export const fetchTrackHistory = createAsyncThunk(
  'trackHistory/fetchHistory',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('Unauthorized');
    }
    try {
      const response = await axiosApiClient.get('/track_history', {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch track history');
    }
  }
);

const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTrackToHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTrackToHistory.fulfilled, (state, action) => {
        state.history.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addTrackToHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTrackHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrackHistory.fulfilled, (state, action) => {
        state.history = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTrackHistory.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch track history';
        state.loading = false;
      });
  },
});

export default trackHistorySlice.reducer;
