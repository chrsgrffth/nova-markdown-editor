import * as React from 'react';
import { Value } from 'slate';
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
  value: any; // tslint:disable-line no-any
}

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
      />
    );
  }

  // tslint:disable-next-line no-any
  private onChange = ({ value }: any) => {
    this.setState({ value });
  }
}

export const MarkdownEditor = MarkdownEditorComponent;
