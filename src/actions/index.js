export const getUsers = () => ({
    type: 'GET_USERS',
});

export const getUser = (id) => ({
    type: 'GET_USER',
    id
});

export const setUser = (user) => ({
    type: 'SET_USER',
    user
});

export const getPhotos = (userId , albumsId) => ({
    type: 'GET_PHOTOS',
    userId,
    albumsId
});

export const getAlbums = (userId) => ({
    type: 'GET_ALBUMS',
    userId
});

export const getPosts = (userId) => ({
    type: 'GET_POSTS',
    userId
});

export const getComments = (postId) => ({
    type: 'GET_COMMENTS',
    postId
});

export const getTodos = (userId) => ({
    type: 'GET_TODOS',
    userId
});