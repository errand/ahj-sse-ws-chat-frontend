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

  createTicket(data, callback) {
    const options = {
      method: 'POST',
      query: 'method=createTicket',
      data,
      callback,
    };

    return fetcher(options);
  }

  getIndex(id, callback) {
    const options = {
      method: 'GET',
      query: `method=getTicketById&id=${id}`,
      callback,
    };

    return fetcher(options);
  }

  delete(id, callback) {
    const options = {
      method: 'GET',
      query: `method=deleteTicket&id=${id}`,
      callback,
    };
    return fetcher(options);
  }

  toggleTicketStatus(id, callback) {
    const options = {
      method: 'GET',
      query: `method=toggleTicketStatus&id=${id}`,
      callback,
    };
    return fetcher(options);
  }

  editTicket(data, callback) {
    const options = {
      method: 'POST',
      query: 'method=editTicket',
      data,
      callback,
    };

    return fetcher(options);
  }
}
