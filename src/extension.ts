import * as vscode from 'vscode';
import { OptionsProvider } from './OptionsProvider';

export function activate(context: vscode.ExtensionContext) {
  // Register the Tree View for the sidebar
  const optionsProvider = new OptionsProvider();
  vscode.window.registerTreeDataProvider('video-player-options', optionsProvider);

  // Register the command that will open the webview panel
  context.subscriptions.push(
    vscode.commands.registerCommand('video-player.openPage', (initialView: 'docs' | 'video') => {
      // Create and show a new webview panel
      const panel = vscode.window.createWebviewPanel(
        'videoPlayerPage', // Identifies the type of the webview. Used internally
        'Player / Docs', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
          // Enable javascript in the webview
          enableScripts: true,
		  retainContextWhenHidden: true 
        }
      );

      // And set its HTML content.
      panel.webview.html = getWebviewContent(initialView);
    })
  );
}

function getWebviewContent(initialView: 'docs' | 'video') {
  // The HTML and JavaScript for the new page
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Player and Docs</title>
      <style>
          body, html {
              margin: 0;
              padding: 5px;
              height: 100vh;
              color: white;
              font-family: Arial, Helvetica, sans-serif;
              background-color: #252526;
          }
          .container {
              display: flex;
              flex-direction: column;
              height: calc(100vh - 10px);
              width: 100%;
          }
          .controls {
              margin-bottom: 10px;
              flex-shrink: 0;
              height: 40px;
          }
          .controls input {
              padding: 8px;
              width: 60%;
              margin-right: 10px;
          }
          .controls button {
              padding: 8px 15px;
              cursor: pointer;
          }
          .content-area {
              flex: 1;
              border: 1px solid #444;
              height: calc(100vh - 120px);
          }
          iframe, video {
              width: 100%;
              height: 100%;
              border: none;
              display: block;
          }
          .hidden {
            display: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div id="docs-view" class="${initialView === 'docs' ? '' : 'hidden'}">
              <h2>Documentation Viewer</h2>
              <div class="controls">
                  <input type="text" id="doc-url" placeholder="https:// ...">
                  <button id="load-doc">Load Website</button>
              </div>
              <div class="content-area">
                  <iframe id="doc-frame" src="https://code.visualstudio.com/api"></iframe>
              </div>
          </div>

          <div id="video-view" class="${initialView === 'video' ? '' : 'hidden'}">
              <h2>Video Player</h2>
              <div class="controls">
                  <input type="text" id="video-url" placeholder="https:// ... .mp4">
                  <button id="load-video">Load Video</button>
              </div>
              <div class="content-area">
                  <video id="video-player" controls></video>
              </div>
          </div>
      </div>

      <script>
          const docUrlInput = document.getElementById('doc-url');
          const loadDocButton = document.getElementById('load-doc');
          const docFrame = document.getElementById('doc-frame');

          const videoUrlInput = document.getElementById('video-url');
          const loadVideoButton = document.getElementById('load-video');
          const videoPlayer = document.getElementById('video-player');

          loadDocButton.addEventListener('click', () => {
              const url = docUrlInput.value;
              if (url) {
                  docFrame.src = url;
              }
          });

          loadVideoButton.addEventListener('click', () => {
              const url = videoUrlInput.value;
              if (url) {
                  videoPlayer.src = url;
                  videoPlayer.play();
              }
          });
      </script>
  </body>
  </html>`;
}