import { getResponseEvent } from './EditorEvent';
import ResponseListener from './ResponseListener';

class Request {
  constructor(dispatcher, eventType, data = null) {
    this.response = new ResponseListener(dispatcher, getResponseEvent(eventType));
    this.promise = this.response.promise;
    dispatcher.dispatchEvent(eventType, data);
  }

  get listening() {
    return this.response.listening;
  }

  then(handler) {
    return this.promise.then(handler);
  }

  catch(handler) {
    return this.promise.catch(handler);
  }

  cancel() {
    this.response.cancel();
  }

  dispose() {
    this.response.dispose();
    this.response = null;
    this.promise = null;
  }
}

export const createRequestFactory = (dispatcher) => (eventType, data = null) => {
  const request = new Request(dispatcher, eventType, data);
  return request;
};

export default Request;
