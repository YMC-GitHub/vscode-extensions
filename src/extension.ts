// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

export const commandPrefix: string = "code-as-sample";
// name,handle

export interface CommandNameFunctionMap {
  [key: string]: (...args: any[]) => string;
}
export const commandNameFunctionMap: CommandNameFunctionMap = {
  jsdocTs: (s: string) => {
    let l: string[] = s.split(/\r?\n/);
    l = l.map((line) => `* ${line}`);
    let head = `/*\n * @sample\n * \`\`\`ts`;
    let tail = `\n * \`\`\``;
    let body = l.join("\n");
    return [head, body, tail].join("\n");
  },
};

// refer:
// https://github.com/marclipovsky/vscode-string-manipulation/blob/master/extension.js
const codeFunction = async (
  commandName: string,
  context: vscode.ExtensionContext
) => {
  const editor = vscode.window.activeTextEditor;
  const selectionMap: Record<
    number | string,
    { selection: any; replaced: string }
  > = {};
  if (!editor) {
    return;
  }
  editor.selections.forEach(async (selection, index) => {
    const text = editor.document.getText(selection);
    const textParts = text.split("\n");
    // let stringFunc;
    let replaced;
    replaced = commandNameFunctionMap[commandName](text);
    selectionMap[index] = { selection, replaced };
  });

  editor.edit((builder) => {
    Object.keys(selectionMap).forEach((index) => {
      const { selection, replaced } = selectionMap[index];
      builder.replace(selection, replaced);
    });
  });

  context.globalState.update("lastAction", commandName);
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.globalState.setKeysForSync(["lastAction"]);

  context.subscriptions.push(
    vscode.commands.registerCommand(`${commandPrefix}.repeatLastAction`, () => {
      const lastAction = context.globalState.get("lastAction");
      if (lastAction) {
        return codeFunction(lastAction as string, context);
      }
    })
  );

  Object.keys(commandNameFunctionMap).forEach((commandName) => {
    context.subscriptions.push(
      vscode.commands.registerCommand(`${commandPrefix}.${commandName}`, () =>
        codeFunction(commandName, context)
      )
    );
  });

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  //   let disposable = vscode.commands.registerCommand(
  //     "code-ts-sample.helloWorld",
  //     () => {
  //       vscode.window.showInformationMessage("hi Zero from code-ts-sample!");
  //     }
  //   );

  //   context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
