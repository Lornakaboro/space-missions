import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://api.spacexdata.com/v4/rockets';
const FETCH_ROCKETS = 'spaceX/rockets/FETCH_ROCKETS';
const LIST_ROCKETS = 'spaceX/rockets/LIST_ROCKETS';
const RESERVE_ROCKET = 'spaceX/rockets/RESERVE_ROCKET';

export const list = (rockets) => ({ type: LIST_ROCKETS, rockets });
export const reserve = (id) => ({ type: RESERVE_ROCKET, id });

const getRockets = async () => {
  const response = await fetch(url);
  const rocketz = await response.json();
  const rockets = rocketz.map((rocket) => {
    const {
      id, name, description, flickr_images: images,
    } = rocket;
    return {
      id, name, description, image: images[0], reserved: false,
    };
  });
  return rockets;
};

export const fetchRockets = createAsyncThunk(
  FETCH_ROCKETS,
  async (args, thunkAPI) => {
    try {
      let rockets;
      switch (args.method) {
        case 'GET':
          rockets = await getRockets();
          thunkAPI.dispatch(list(rockets));
          return rockets;
        default:
          return null;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error, args.method);
    }
  },
);

export default function reducer(state = { rockets: [], status: false }, action) {
  switch (action.type) {
    case LIST_ROCKETS:
      return { rockets: action.rockets, status: true };
    case RESERVE_ROCKET:
      return {
        rockets: state.rockets.map((rocket) => {
          if (rocket.id === action.id) {
            return { ...rocket, reserved: !rocket.reserved };
          }
          return rocket;
        }),
        status: true,
      };
    default:
      return state;
  }
}
