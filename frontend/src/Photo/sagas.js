import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createAxiosErrorNotification } from "../Notifications";
import {
  SEARCH_PHOTO,
  searchPhotoFulfilled,
  searchPhotoPending,
  searchPhotoRejected,
} from "./actions";

const apiUrl = "/api/images";

function* executeSearchPhoto(action) {
  yield put(searchPhotoPending());
  try {
    // const response = yield call(axios.post, photoApiUrl, {photo: action.payload.photo});
    const response = yield call(axios, {
      method: "POST",
      url: apiUrl,
      data: {
        image: action.payload.photo,
        user: localStorage.getItem('user'),
      },
    });
    yield put(searchPhotoFulfilled(response));
  } catch (error) {
    yield put(createAxiosErrorNotification(error));
    yield put(searchPhotoRejected(error));
  }
}

export function* watchSearchPhoto() {
  yield takeLatest(SEARCH_PHOTO, executeSearchPhoto);
}

export default [watchSearchPhoto()];
