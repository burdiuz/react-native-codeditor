# DDA Generic Types — Task Notes

## Goal

Add TypeScript generic support to `@actualwave/deferred-data-access` and
`@actualwave/webview-interface` so the remote root type flows through automatically,
and the correct async wrapper type is applied depending on DDA mode.

## Background

Currently `initialize()` / `initializeHost()` / `initializeGuest()` return
`{ root: unknown, ... }`. Callers must cast manually:

```typescript
const { root } = await connection;
const editor = root as RemoteEditorController; // manual cast, no safety
```

## Proposed solutions

### Option A — Manual interface + cast (no dep changes)

Write `RemoteEditorController` by hand in this project with all methods already typed
as `Promise<T>`. Cast the resolved root on use. Simple, self-contained.

### Option B — Add generics to DDA + webview-interface

Add a `Promisify<T>` mapped type to DDA and make `initialize`, `initializeHost`, and
`initializeGuest` generic so the type flows through automatically.

```typescript
type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<Awaited<R>>
    : never;
};

// Usage:
const { root } = await initializeHost<EditorController>({ webView, root: hostApi });
// root typed as Promisify<EditorController> automatically
```

Requires changes to:
- `/Users/burdiuz/Documents/GitHub/js-deferred-data-access/packages/deferred-data-access`
- `/Users/burdiuz/Documents/GitHub/js-deferred-data-access/packages/webview-interface`
Then `yalc push` + `yalc update` in this project.

## Open question — lazy vs reactive mode

DDA has two modes:

- **Lazy** (default): handler fires once on `await`. The proxy accumulates the full
  command chain before executing. This is what webview-interface uses.
- **Reactive** (`handle(h, false)`): handler fires on every operation individually.

In lazy mode not every property access is a Promise — only awaiting the final
expression triggers the handler. `Promisify<T>` as written (wraps every method return
in `Promise`) matches lazy method-call semantics correctly, but property access chains
(GET → GET → APPLY) behave differently at runtime than the type suggests.

The correct type transform may need to differ between modes, or a single
`DDAProxy<T>` type that recursively wraps the whole object graph may be more accurate.
This needs further thought before implementing Option B.

## Deferred: implement after the main refactor

The main refactor (exposing `EditorController` directly as the DDA guest root instead
of the hand-crafted `editorTarget` facade) should be done first. Once that is working
with a manual cast, revisit this task to add proper generic types.
