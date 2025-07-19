import * as vscode from 'vscode';

export class VideoViewProvider implements vscode.WebviewViewProvider {

  public static readonly viewType = 'video-player-view';

  private _view?: vscode.WebviewView;

  constructor(
    private readonly _extensionUri: vscode.Uri,
  ) { }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [
        this._extensionUri
      ]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // You can get this video from a source like Pexels for testing
    const videoSrc = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Video Player</title>
        <style>
          body, html {
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #000;
          }
          video {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <video controls>
          <source src="${videoSrc}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </body>
      </html>`;
  }
}