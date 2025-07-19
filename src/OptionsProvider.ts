import * as vscode from 'vscode';

export class OptionsProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      const openDocs = new vscode.TreeItem('Open Documentation');
      openDocs.contextValue = 'documentation';
      openDocs.command = {
        command: 'video-player.openPage',
        title: 'Open Documentation',
        arguments: ['docs'] // Pass an argument to know which item was clicked
      };

      const openVideo = new vscode.TreeItem('Open Video Player');
      openVideo.contextValue = 'video';
      openVideo.command = {
        command: 'video-player.openPage',
        title: 'Open Video Player',
        arguments: ['video'] // Pass an argument
      };

      return Promise.resolve([openDocs, openVideo]);
    }
  }
}