import fetcher from './fetcher';

export default class Methods {
  getAllUsers(callback) {
    const options = {
      method: 'GET',
      query: 'method=getAllUsers',
      callback,
    };

    return fetcher(options);
  }

  createUser(data, callback) {
    const options = {
      method: 'POST',
      query: 'method=createUser',
      data,
      callback,
    };

    return fetcher(options);
  }

  createPost(data, callback) {
    const options = {
      method: 'POST',
      query: 'method=createPost',
      data,
      callback,
    };

    return fetcher(options);
  }

  getIndex(id, callback) {
    const options = {
      method: 'GET',
      query: `method=getUserByName&name=${name}`,
      callback,
    };

    return fetcher(options);
  }
}
