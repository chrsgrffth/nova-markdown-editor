import * as React from 'react';
import { Value } from 'slate';
import AutoReplace from 'slate-auto-replace';
import { Editor } from 'slate-react';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
});

interface Props {}

interface State {
  value: any;
}

const plugins: any = [
  AutoReplace({
    trigger: 'space',
    before: /^(#{1,6})$/,
    transform: (transform: any, {}, matches: any) => {
      const [hashes] = matches.before;
      const level = hashes.length;
      return transform.setBlocks({
        type: 'h',
        data: { level },
      });
    },
  }),

  AutoReplace({
    trigger: 'space',
    before: /^(>)$/,
    transform: (transform: any) => transform.setBlocks('p').wrapBlock('blockquote'),
  }),

  AutoReplace({
    trigger: 'space',
    before: /^(\*)$/,
    transform: (transform: any) => transform.setBlocks('li').wrapBlock('ul'),
  }),

  AutoReplace({
    trigger: 'enter',
    before: /^(\`{3})/,
    transform: (transform: any) => transform.setBlocks('span').wrapBlock('codeBlock'),
  }),

  // https://github.com/ianstormtaylor/slate-plugins/blob/master/examples/slate-auto-replace/index.js
  // https://yarnpkg.com/en/package/slate-auto-replace
  // https://ianstormtaylor.github.io/slate-plugins/#/slate-auto-replace
];

class MarkdownEditorComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      value: initialValue,
    };
  }

  public render() {

    return (
      <Editor
        value={this.state.value}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        plugins={plugins}
        renderNode={this.renderNode}
      />
    );
  }

  private onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, change: any) => {

    switch (e.key) {
      case 'Enter':
        return this.onEnter(e, change);
      case 'Backspace':
        return this.onBackspace(e, change);
      default: {
        return;
      }
    }
  }

  private onEnter = (e: React.KeyboardEvent<HTMLDivElement>, change: any) => {
    change.splitBlock().setBlocks('paragraph');
    return true;
  }

  private onBackspace = (e: React.KeyboardEvent<HTMLDivElement>, change: any) => {
    if (change.value.startOffset !== 0) {
      return;
    }

    change.setBlocks('paragraph');
    return true;
  }

  private renderNode = (props: any) => {
    const { node, attributes, children } = props;

    switch (node.type) {
      case 'blockquote':
        return <blockquote {...attributes}><p>{children}</p></blockquote>;
      case 'li':
        return <li {...attributes}>{children}</li>;
      case 'codeBlock':
        return <pre {...attributes}><code>{children}</code></pre>;
      case 'h':
        const level = node.data.get('level');
        const Tag = `h${level}`;
        return <Tag {...attributes}>{children}</Tag>;
      default:
        return;
    }
  }

  private onChange = ({ value }: any) => {
    this.setState({ value });
  }
}

export const MarkdownEditor = MarkdownEditorComponent;
