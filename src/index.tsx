import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MarkdownEditor } from './components/markdown-editor';
import './css/styles.css';

ReactDOM.render(
  <MarkdownEditor />,
  document.getElementById('root') as HTMLElement,
);
