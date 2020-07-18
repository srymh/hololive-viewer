import React, {createRef} from 'react';
import {WebviewTag} from 'electron';
import {isPlaying, playVideo} from '../../../utils/webviewOperator';

type YoutubeLivePanelProps = {
  channelName?: string;
  channelURL: string;
  onReload: () => void;
  onClickShowChat: () => void;
  isClickable: boolean;
};

type YoutubeLivePanelState = {
  reloadTimeID?: NodeJS.Timeout;
};

class YoutubeLivePanel extends React.Component<
  YoutubeLivePanelProps,
  YoutubeLivePanelState
> {
  private wvRef = createRef<HTMLWebViewElement>();
  constructor(props: YoutubeLivePanelProps) {
    super(props);
    this.state = {reloadTimeID: undefined};
  }

  handleReload = async () => {
    if (this.wvRef.current !== null) {
      (this.wvRef.current as WebviewTag).reload();
      this.props.onReload();
    }
  };
  handleToggleAutoReload = async () => {
    const {reloadTimeID} = this.state;
    const interval =
      process.env.NODE_ENV === 'development' ? 1000 * 10 : 60 * 15 * 1000;
    const stopAutoReload = () => {
      const {reloadTimeID} = this.state;
      if (reloadTimeID !== undefined) {
        clearInterval(reloadTimeID);
        this.setState({
          reloadTimeID: undefined,
        });
      }
    };

    if (reloadTimeID === undefined) {
      const _reloadTimeID = setInterval(async () => {
        const wv = this.wvRef.current as WebviewTag;
        // 再生中なら auto reload を止める
        if (wv && isPlaying(wv)) {
          stopAutoReload();
        } else {
          await this.handleReload();
          if (wv) await playVideo(wv);
        }
      }, interval);
      this.setState({
        reloadTimeID: _reloadTimeID,
      });
    } else {
      stopAutoReload();
    }
  };

  render() {
    const {reloadTimeID} = this.state;
    const {channelName, channelURL, onClickShowChat, isClickable} = this.props;
    const webviewFilterStyle = {
      display: isClickable ? 'none' : '',
    };
    return (
      <div className="item">
        <div className="item-header">
          <div>{channelName}</div>
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={this.handleReload}>
            Reload
          </button>
          <label onMouseDown={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              onChange={this.handleToggleAutoReload}
              checked={reloadTimeID !== undefined ? true : false}
            />
            Auto Reload
          </label>
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={onClickShowChat}>
            Show Chat
          </button>
        </div>
        <webview className="wv" src={channelURL} ref={this.wvRef}></webview>
        <div className="filter-wv" style={webviewFilterStyle}></div>
        <div className="item-footer"></div>
      </div>
    );
  }
}

export default YoutubeLivePanel;
