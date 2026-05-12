interface Dispatcher {
  addEventListener: (eventType: string, listener: (event: unknown) => void) => void;
  removeEventListener: (eventType: string, listener: (event: unknown) => void) => void;
}

class ResponseListener {
  private dispatcher: Dispatcher;
  private eventType: string;
  private resolvePromise!: (value: unknown) => void;
  private rejectPromise!: (reason?: unknown) => void;
  private promise: Promise<unknown>;
  listening: boolean;

  constructor(dispatcher: Dispatcher, eventType: string) {
    this.dispatcher = dispatcher;
    this.eventType = eventType;
    this.listening = true;
    this.promise = new Promise<unknown>((resolve, reject) => {
      this.resolvePromise = resolve;
      this.rejectPromise = reject;
    });
    dispatcher.addEventListener(eventType, this.requestHandler);
  }

  private stopListening() {
    this.dispatcher.removeEventListener(this.eventType, this.requestHandler);
    this.listening = false;
  }

  requestHandler = (event: unknown) => {
    this.resolvePromise(event);
    this.stopListening();
  };

  cancel = () => {
    if (this.listening) {
      this.stopListening();
    }
  };

  reject = (data: unknown = null) => {
    if (this.listening) {
      this.rejectPromise(data);
      this.stopListening();
    }
  };

  then(handler: (value: unknown) => unknown) {
    return this.promise.then(handler);
  }

  catch(handler: (reason: unknown) => unknown) {
    return this.promise.catch(handler);
  }

  dispose = () => {
    this.cancel();
  };
}

export const createResponseListenerFactory =
  (dispatcher: Dispatcher) =>
  (eventType: string) =>
    new ResponseListener(dispatcher, eventType);

export default ResponseListener;
