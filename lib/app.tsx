import React = require("react");

import PureComponent from "./pure-component";
import Toolbar from "./toolbar";
import Editor from "./editor";
import Preview from "./preview";
import { splitHiddenKaraCode, preparePreviewCode } from "./kara";
import { Autosaver } from "./autosaver";

interface ErrorMessage {
  message: string,
  line?: number
}

interface AppProps {
  initialContent: string,
  previewWidth: number,
  p5version: string,
  maxRunTime: number,
  baseSketchURL: string,
  autosaver?: Autosaver,
  autoplay?: boolean
}

// Ugh, in practice, not all of these are truly optional, but we need
// to declare them as such in order to actually use setState() without
// ridiculous amounts of repetition.
//
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/4809
interface AppState {
  canUndo?: boolean,
  canRedo?: boolean,
  isPlaying?: boolean
  startPlayTimestamp?: number
  previewContent?: string // JS code sent to the preview
  editorContent?: string  // JS code shown in the editor (with hidden content removed, and possibly the main function omitted)
  hiddenContent?: string  // JS content hidden from the editor (e.g. Kara world definition)
  lastError?: ErrorMessage
}

let ErrorMessage = (props: ErrorMessage) => (
  <div className="error-message">
    <span className="error-message-line">Line {props.line}:</span>
    {" " + props.message}
  </div>
);

export default class App extends PureComponent<AppProps, AppState> {
  constructor(props) {
    super(props);
    let splitCode = splitHiddenKaraCode(this.props.initialContent);
    this.state = {
      canUndo: false,
      canRedo: false,
      hiddenContent: splitCode.hidden,
      previewContent: preparePreviewCode(splitCode.hidden, splitCode.visible),
      editorContent: splitCode.visible
    };
  }

  componentDidMount() {
    let autosave = this.props.autosaver && this.props.autosaver.restore();

    if (autosave && autosave !== this.state.editorContent) {
      this.setState({ editorContent: autosave });
    } else if (this.props.autoplay) {
      this.handlePlayClick();
    }
  }

  handleEditorChange = (newValue: string, canUndo: boolean,
                        canRedo: boolean) => {
    this.setState({
      editorContent: newValue,
      canUndo: canUndo,
      canRedo: canRedo
    });
    this.props.autosaver.save(newValue);
  }

  handlePreviewError = (message: string, line?: number) => {
    this.setState({
      lastError: {
        message: message,
        line: line
      }
    });
  }

  handleRevertClick = () => {
    this.setState({
      isPlaying: false,
      editorContent: splitHiddenKaraCode(this.props.initialContent).visible
    });
  }

  handlePlayClick = () => {
    this.setState((prevState, props) => ({
      isPlaying: true,
      previewContent: preparePreviewCode(prevState.hiddenContent, prevState.editorContent),
      startPlayTimestamp: Date.now(),
      lastError: null
    }));
  }

  handleStopClick = () => {
    this.setState((prevState, props) => ({
      isPlaying: false,
      previewContent: prevState.hiddenContent,
      startPlayTimestamp: Date.now()
    }));
  }

  handleUndoClick = () => {
    this.refs.editor.undo();
  }

  handleRedoClick = () => {
    this.refs.editor.redo();
  }

  refs: {
    [key: string]: (any),
    editor: Editor
  }

  render() {
    let errorLine = null;
    let canRevert = (this.state.editorContent !== splitHiddenKaraCode(this.props.initialContent).visible);

    if (this.state.lastError &&
        preparePreviewCode(this.state.hiddenContent, this.state.editorContent) == this.state.previewContent) {
      errorLine = this.state.lastError.line;
    }

    return (
      <div className="app">
        <Toolbar
         onPlayClick={this.handlePlayClick}
         onStopClick={this.state.isPlaying && this.handleStopClick}
         onUndoClick={this.state.canUndo && this.handleUndoClick}
         onRedoClick={this.state.canRedo && this.handleRedoClick}
         onRevertClick={canRevert && this.handleRevertClick} />
        <div className="panes">
          <Editor ref="editor"
                  content={this.state.editorContent}
                  errorLine={errorLine}
                  onChange={this.handleEditorChange} />
          <div className="preview-holder-wrapper">
          {this.state.isPlaying
            ? <Preview content={this.state.previewContent}
                       baseSketchURL={this.props.baseSketchURL}
                       p5version={this.props.p5version}
                       maxRunTime={this.props.maxRunTime}
                       width={this.props.previewWidth}
                       timestamp={this.state.startPlayTimestamp}
                       onError={this.handlePreviewError} />
            : <Preview content={this.state.hiddenContent}
                       baseSketchURL={this.props.baseSketchURL}
                       p5version={this.props.p5version}
                       maxRunTime={this.props.maxRunTime}
                       width={this.props.previewWidth}
                       timestamp={this.state.startPlayTimestamp}
                       onError={this.handlePreviewError} />}
          </div>
        </div>
        <div className="status-bar">
          {this.state.lastError
           ? <ErrorMessage {...this.state.lastError} />
           : null}
        </div>
      </div>
    );
  }
}
