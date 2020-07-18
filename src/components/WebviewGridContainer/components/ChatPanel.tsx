import React, {createRef} from 'react';

type ChatPanelProps = {
  url?: string;
  isClickable: boolean;
};

type ChatPanelState = {};

class ChatPanel extends React.Component<ChatPanelProps, ChatPanelState> {
  private wvRef = createRef<HTMLWebViewElement>();
  constructor(props: ChatPanelProps) {
    super(props);
    this.state = {};
  }

  render() {
    const {url, isClickable} = this.props;
    const webviewFilterStyle = {
      display: isClickable ? 'none' : '',
    };
    return (
      <div className="item">
        <div className="item-header"></div>
        <webview className="wv" src={url} ref={this.wvRef}></webview>
        <div className="filter-wv" style={webviewFilterStyle}></div>
        <div className="item-footer"></div>
      </div>
    );
  }
}

export default ChatPanel;
