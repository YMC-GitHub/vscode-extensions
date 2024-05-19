"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.commandNameFunctionMap = exports.commandPrefix = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
exports.commandPrefix = "code-as-sample";
exports.commandNameFunctionMap = {
    jsdocTs: (s) => {
        let l = s.split(/\r?\n/);
        l = l.map((line) => `\n * ${line}`);
        let head = `/*\n * @sample\n * \`\`\`ts`;
        let tail = `\n * \`\`\`\n *\/`;
        let body = l.join("");
        return [head, body, tail].join("");
    },
};
// refer:
// https://github.com/marclipovsky/vscode-string-manipulation/blob/master/extension.js
const codeFunction = async (commandName, context) => {
    const editor = vscode.window.activeTextEditor;
    const selectionMap = {};
    if (!editor) {
        return;
    }
    editor.selections.forEach(async (selection, index) => {
        const text = editor.document.getText(selection);
        const textParts = text.split("\n");
        // let stringFunc;
        let replaced;
        replaced = exports.commandNameFunctionMap[commandName](text);
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
function activate(context) {
    context.globalState.setKeysForSync(["lastAction"]);
    context.subscriptions.push(vscode.commands.registerCommand(`${exports.commandPrefix}.repeatLastAction`, () => {
        const lastAction = context.globalState.get("lastAction");
        if (lastAction) {
            return codeFunction(lastAction, context);
        }
    }));
    Object.keys(exports.commandNameFunctionMap).forEach((commandName) => {
        context.subscriptions.push(vscode.commands.registerCommand(`${exports.commandPrefix}.${commandName}`, () => codeFunction(commandName, context)));
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
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map