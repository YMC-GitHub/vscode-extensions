# code-ts-sample

make code to jsdoc as sample and add ts to code block.

## usage

- install:

```powershell
# install from local vsix
$name="vscode-extension-code-ts-sample";$org="yors";$repo="ymc-github/vscode-extensions";$version="0.1.0"
code --install-extension ${org}-${name}-${version}.vsix

# install from marketplace.visualstudio.com in cli ? do:
code --install-extension yemiancheng.yors-vscode-extension-code-ts-sample
```

- with code:

```ts
const ew = new ElementWheel();
ew.styleTransform = true;
ew.el = canvasRef.current;
// ew.listen();
const wheel = (e: unknown) => {
  let meta = {
    api: `mouse-wheel-in-elenment`,
    description: `zoom element when mouse wheel on element`,
  };
  setApi(meta.api);
  log(`[${api}] ${meta.description}`);

  ew.zoom(e as unknown as WheelEvent);
};
<canvas onWheel={wheel} />;
```

- expect :

````ts
/*
 * @sample
 * ```ts
 * const ew = new ElementWheel();
 * ew.styleTransform = true;
 * ew.el = canvasRef.current;
 * // ew.listen();
 * const wheel = (e: unknown) => {
 *   let meta = {
 *     api: `mouse-wheel-in-elenment`,
 *     description: `zoom element when mouse wheel on element`,
 *   };
 *   setApi(meta.api);
 *   log(`[${api}] ${meta.description}`);
 * 
 *   ew.zoom(e as unknown as WheelEvent);
 * };
 * <canvas onWheel={wheel} />
 * 

 * ```
 */
````

- action : select -> ctrl + shift + p -> jsdocts

## License

MIT

## todo

- ~~publish~~
- publish with github action
- move to packages as a mono repo.
- code as rs sample (`rsdoc`)
