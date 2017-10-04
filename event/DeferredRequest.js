import EventDeferred from './EventDeferred';

class DeferredRequest {
  constructor(dispatcher, event, responseEventType, data = null) {
    if (responseEventType) {
      const deferred = new EventDeferred(dispatcher, responseEventType);
      this.promise = deferred.promise;
      this._internals = deferred;
    } else {
      this.promise = Promise.resolve();
    }
    dispatcher.dispatchEvent(event, data);
  }

  get listening() {
    return this._internals && this._internals.listening || false;
  }

  cancel = () => {
    this._internals && this._internals.cancel();
  };

  dispose = () => {
    this._internals && this._internals.dispose();
    delete this._internals;
  };
}

export const requestResolverFactory = (resolver) => (dispatcher) => (eventType, data = null) => {
  const deferred = new DeferredRequest(dispatcher, eventType, resolver(eventType), data);
  return deferred.promise;
};

export default DeferredRequest;
