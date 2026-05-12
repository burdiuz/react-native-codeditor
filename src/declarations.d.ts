declare module '@actualwave/messageport-dispatcher' {
  export default class MessagePortDispatcher {
    constructor(
      target: {
        postMessage: (data: unknown) => void;
        addEventListener: (type: string, listener: (event: unknown) => void) => void;
      },
      customPostMessageHandler: null | ((data: unknown, targetOrigin: string) => void),
      incomingMessagePreprocessor?:
        | ((event: { type: string; data: unknown }) => { type: string; data: unknown })
        | null,
    );
    addEventListener(eventType: string, listener: (event: unknown) => void, priority?: number): void;
    hasEventListener(eventType: string): boolean;
    removeEventListener(eventType: string, listener: (event: unknown) => void): void;
    dispatchEvent(eventType: string, data?: unknown): void;
  }
}

