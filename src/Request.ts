import { getResponseEvent } from './EditorEvent';
import ResponseListener from './ResponseListener';

interface Dispatcher {
  addEventListener: (eventType: string, listener: (event: unknown) => void) => void;
  removeEventListener: (eventType: string, listener: (event: unknown) => void) => void;
  dispatchEvent: (eventType: string, data?: unknown) => void;
}

class Request {
  private response: ResponseListener;

  constructor(
    dispatcher: Dispatcher,
    eventType: string,
    data: unknown = null,
    responseEventType = '',
  ) {
    this.response = new ResponseListener(
      dispatcher,
      responseEventType || getResponseEvent(eventType),
    );
    dispatcher.dispatchEvent(eventType, data);
  }

  get listening() {
    return this.response.listening;
  }

  then(handler: (value: unknown) => unknown) {
    return this.response.then(handler);
  }

  catch(handler: (reason: unknown) => unknown) {
    return this.response.catch(handler);
  }

  cancel() {
    this.response.cancel();
  }

  dispose() {
    this.response.dispose();
  }
}

export const createRequestFactory =
  (dispatcher: Dispatcher) =>
  (eventType: string, data: unknown = null) =>
    new Request(dispatcher, eventType, data);

export default Request;
