import React = require("react");
import ReactDOM = require("react-dom/client");

import url = require("url");

import * as defaults from "./defaults";
import { SessionStorageAutosaver } from "./autosaver";
import App from "./app";

let defaultSketchJS = require("raw-loader!./default-sketch.js") as string;

require("../node_modules/codemirror/lib/codemirror.css");
require("../css/style.css");
require("../css/p5-widget-codemirror-theme.css");

function start() {
  let embeddingPageURL = document.referrer;
  let qs = url.parse(window.location.search, true).query;
  let id = embeddingPageURL + '_' + qs['id'];
  let baseSketchURL = qs['baseSketchURL'] as string || embeddingPageURL;
  let autoplay = (qs['autoplay'] === 'on');
  let initialContent = qs['sketch'] as string || defaultSketchJS;
  let p5version = qs['p5version'] as string || defaults.P5_VERSION;
  let previewWidth = parseInt(qs['previewWidth'] as string);
  let maxRunTime = parseInt(qs['maxRunTime'] as string)
  if (isNaN(previewWidth)) {
    previewWidth = defaults.PREVIEW_WIDTH;
  }

  if (isNaN(maxRunTime)) {
    maxRunTime = defaults.MAX_RUN_TIME;
  }

  initialContent = initialContent.replace(/\r\n/g, '\n').trim();
  const container = document.getElementById('app-holder');
  const root = ReactDOM.createRoot(container!);
  root.render(
    <App initialContent={initialContent}
         autosaver={new SessionStorageAutosaver(id)}
         baseSketchURL={baseSketchURL}
         p5version={p5version}
         previewWidth={previewWidth}
         maxRunTime={maxRunTime}
         autoplay={autoplay} />
  );
}

window.addEventListener('load', start);
