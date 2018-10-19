import { getResponseEvent } from './EditorEvent';
import ResponseListener from './ResponseListener';

class Request {
  constructor(dispatcher, eventType, data = null, responseEventType = '') {
    this.response = new ResponseListener(
      dispatcher,
      responseEventType || getResponseEvent(eventType),
    );
    dispatcher.dispatchEvent(eventType, data);
  }

  get listening() {
    return this.response.listening;
  }

  then(handler) {
    return this.response.then(handler);
  }

  catch(handler) {
    return this.response.catch(handler);
  }

  cancel() {
    this.response.cancel();
  }

  dispose() {
    this.response.dispose();
    this.response = null;
  }
}

export const createRequestFactory = (dispatcher) => (eventType, data = null) => {
  const request = new Request(dispatcher, eventType, data);
  return request;
};

export default Request;
