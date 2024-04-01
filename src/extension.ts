// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    Executable,
} from 'vscode-languageclient/node';

let client: LanguageClient;

async function startLanguageClient(context: vscode.ExtensionContext) {
    try {
        const serverPath = vscode.workspace
            .getConfiguration("vscode-uwscr")
            .get<string>("serverPath");
        const serverOptions: ServerOptions = <Executable> {
            command: serverPath,
            args: ["--language-server"],
        };
        const clientOptions: LanguageClientOptions = {
            documentSelector: [
                {
                    scheme: "file",
                    language: "UWSCR",
                }
            ]
        };
        client = new LanguageClient(
            "UwscrLanguageServer",
            serverOptions,
            clientOptions
        );

        await client.start();
    } catch (error) {
        vscode.window.showErrorMessage(`${error}`);
    }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
    await startLanguageClient(context);
}

// This method is called when your extension is deactivated
export function deactivate() {
    if (client) {
        client.stop();
    }
}
