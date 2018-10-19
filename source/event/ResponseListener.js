import deferred from '@actualwave/deferred';

const stopListening = (target) => {
  const { dispatcher, eventType, requestHandler } = target;

  dispatcher.removeEventListener(eventType, requestHandler);
  target.listening = false;
};

class ResponseListener {
  constructor(dispatcher, eventType) {
    this.dispatcher = dispatcher;
    this.eventType = eventType;
    this.deferred = deferred();
    this.listening = true;
    dispatcher.addEventListener(this.eventType, this.requestHandler);
  }

  requestHandler = (event) => {
    this.deferred.resolve(event);
    stopListening(this);
  };

  cancel = () => {
    if (this.listening) {
      stopListening(this);
    }
  };

  reject = (data = null) => {
    if (this.listening) {
      this.deferred.reject(data);
      stopListening(this);
    }
  };

  then(handler) {
    return this.deferred.promise.then(handler);
  }

  catch(handler) {
    return this.deferred.promise.catch(handler);
  }

  dispose = () => {
    this.cancel();
    delete this.dispatcher;
    delete this.deferred;
  };
}

export const createResponseListenerFactory = (dispatcher) => (eventType) =>
  new ResponseListener(dispatcher, eventType);

export default ResponseListener;
