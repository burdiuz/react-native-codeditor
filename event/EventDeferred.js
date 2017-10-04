class EventDeferred {
  constructor(dispatcher, eventType) {
    this.promise = new Promise((resolve, reject) => {
      this._internals = {
        dispatcher,
        eventType,
        resolve,
        reject,
        handler: (event) => {
          const { resolve } = this._internals;
          this.cancel();
          resolve(event);
        },
      };
    });
    dispatcher.addEventListener(eventType, this._internals.handler);
  }

  get dispatcher() {
    return this._internals.dispatcher;
  }

  get eventType() {
    return this._internals.eventType;
  }

  get listening() {
    return !this._internals.resolve;
  }

  cancel = () => {
    const { dispatcher, eventType, handler } = this._internals;
    dispatcher.removeEventListener(eventType, handler);
    delete this._internals.resolve;
  };

  reject = (data = null) => {
    const { reject } = this._internals;
    this.cancel();
    reject(data);
  };

  dispose = () => {
    delete this._internals;
  };
}

export default EventDeferred;
