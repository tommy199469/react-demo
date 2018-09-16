import { put, takeLatest, all } from 'redux-saga/effects';


const api_url = "https://jsonplaceholder.typicode.com"


function* fetchUsers() {
  const json = yield fetch(`${api_url}/users`).then(response => response.json(), );    
  yield put({ type: "SET_USERS", users: json });
}

function* fetchUsersWatcher() {
     yield takeLatest('GET_USERS', fetchUsers)
}

function* fetchUser(action) {
  const json = yield fetch(`${api_url}/users/${action.id}`).then(response => response.json(), );    
  yield put({ type: "SET_USER", user: json });
}

function* fetchUserWatcher() {
     yield takeLatest('GET_USER', fetchUser)
}

function* fetchPhotos(action) {
  const json = yield fetch(`${api_url}/photos?userId=${action.userId}&albumId=${action.albumsId}`).then(response => response.json(), );  
  yield put({ type: "SET_PHOTOS", photos: json });
}

function* fetchPhotosWatcher() {
     yield takeLatest('GET_PHOTOS', fetchPhotos)
}

function* fetchAlbums(action) {
  const json = yield fetch(`${api_url}/albums?userId=${action.userId}`).then(response => response.json(), );  
  yield put({ type: "SET_ALBUMS", albums: json });
}

function* fetchAlbumsWatcher() {
     yield takeLatest('GET_ALBUMS', fetchAlbums)
}

function* fetchPosts(action) {
  const json = yield fetch(`${api_url}/posts?userId=${action.userId}`).then(response => response.json(), );  
  yield put({ type: "SET_POSTS", posts: json });
}

function* fetchPostsWatcher() {
     yield takeLatest('GET_POSTS', fetchPosts)
}

function* fetchComments(action) {
  const json = yield fetch(`${api_url}/comments?postId=${action.postId}`).then(response => response.json(), );  
  yield put({ type: "SET_COMMENTS", comments: json });
}

function* fetchCommentsWatcher() {
     yield takeLatest('GET_COMMENTS', fetchComments)
}

function* fetchTodos(action) {
  const json = yield fetch(`${api_url}/todos?userId=${action.userId}`).then(response => response.json(), );  
  yield put({ type: "SET_TODOS", todos: json });
}

function* fetchTodosWatcher() {
     yield takeLatest('GET_TODOS', fetchTodos)
}


export default function* rootSaga() {
    yield all([
      fetchUsersWatcher(),
      fetchUserWatcher(),
      fetchPhotosWatcher(),
      fetchAlbumsWatcher(),
      fetchPostsWatcher(),
      fetchCommentsWatcher(),
      fetchTodosWatcher()
    ]);
  }
