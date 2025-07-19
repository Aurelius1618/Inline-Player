import * as vscode from 'vscode';
import { VideoViewProvider } from './VideoViewProvider';

export function activate(context: vscode.ExtensionContext) {

  const provider = new VideoViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(VideoViewProvider.viewType, provider));
}

export function deactivate() {}