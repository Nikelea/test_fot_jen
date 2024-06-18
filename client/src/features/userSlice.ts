import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '@/helpers/axiosApiClient';
import { AxiosError, isAxiosError } from 'axios';

interface IUser {
  id: number;
  username: string;
  password?: string;
}

interface UserState {
  user: IUser | null;
  loading: boolean;
  registerError: string | null | UserResponseValidateError;
  loginError: string | null;
}

export type UserRequest = {
  username: string;
  password: string;
};

type UserResponseError = {
  error: { message: string };
};

type UserResponseValidateError = {
  type: string;
  message: string[];
}[];

export const registerUser = createAsyncThunk<
  IUser,
  UserRequest,
  { rejectValue: UserResponseError | UserResponseValidateError }
>('auth/register', async (userData: UserRequest, { rejectWithValue }) => {
  try {
    const response = await axiosApiClient.post<IUser>('users', userData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e)) {
      const error: AxiosError<UserResponseError> = e;
      return rejectWithValue(error?.response?.data || { error: { message: 'An error occurred' } });
    }
    throw e;
  }
});

export const loginUser = createAsyncThunk<IUser, UserRequest, { rejectValue: string }>(
  'auth/login',
  async (userData: UserRequest, { rejectWithValue }) => {
    try {
      const response = await axiosApiClient.post<IUser>('users/sessions', userData);
      localStorage.setItem('token', response.headers['authorization']);
      return response.data;
    } catch (e) {
      if (isAxiosError(e)) {
        const error: AxiosError<UserResponseError> = e;
        return rejectWithValue(error?.response?.data?.error?.message || 'An error occured');
      }
      throw e;
    }
  }
);

const initialState: UserState = {
  user: null,
  loading: false,
  registerError: null,
  loginError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.registerError = action.payload;
        } else {
          state.registerError = action?.payload?.error.message ?? 'Something went wrong';
        }
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action?.payload ?? 'Something went wrong';
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
