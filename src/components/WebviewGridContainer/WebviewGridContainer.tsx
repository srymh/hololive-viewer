import React from 'react';
import './WebviewGridContainer.scss';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {Responsive, WidthProvider, Layouts} from 'react-grid-layout';
import {getChatURL, getLiveURL} from '../../utils/getYoutubeURL';
import {Channel, ChDisplayConf} from '../../types';
import {ChatPanel, YoutubeLivePanel} from './components';
const GridLayout = WidthProvider(Responsive);

function setChDisplayConf(channel: Channel): ChDisplayConf {
  return {
    name: channel.name,
    url: getLiveURL(channel.id),
  };
}

type WebviewGridContainerProps = {
  channels: Channel[];
};

type WebviewGridContainerState = {
  channels: ChDisplayConf[];
  rowHeight: number;
  showingChatID: number;
  isMovingPanel: boolean;
};

class WebviewGridContainer extends React.Component<
  WebviewGridContainerProps,
  WebviewGridContainerState
> {
  constructor(props: WebviewGridContainerProps) {
    super(props);
    this.state = {
      channels: props.channels.map((ch) => setChDisplayConf(ch)),
      rowHeight: 0,
      showingChatID: 0,
      isMovingPanel: false,
    };
  }

  componentDidUpdate = (prevProps: WebviewGridContainerProps) => {
    if (this.props.channels.length !== prevProps.channels.length) {
      this.setState({
        channels: this.props.channels.map((ch) => setChDisplayConf(ch)),
      });
    }
  };

  createLayoutsAndKeys = () => {
    const {channels} = this.state;
    const layouts: Layouts = {lg: []};
    const keys = [];
    for (let i = 0; i < channels.length; i++) {
      const key = channels[i].name;
      keys.push(key);
    }
    keys.push('chat');
    for (let i = 0; i < channels.length; i++) {
      const channel = channels[i];
      const key = channel.name;
      layouts['lg'].push({i: key, x: (i % 4) * 3, y: 0, w: 3, h: 3});
    }
    layouts['lg'].push({i: 'chat', x: (10 % 4) * 3, y: 0, w: 3, h: 3});
    return {layouts, keys};
  };

  async updateChatUrl(id: number) {
    const {channels} = this.state;
    const channel = channels[id];
    channel.chatUrl = await getChatURL(channels[id].url);
    channels[id] = channel;
    this.setState({
      channels: channels,
    });
  }

  async componentDidMount() {
    const {channels} = this.state;
    for (let i = 0; i < channels.length; i++) {
      try {
        await this.updateChatUrl(i);
      } catch (e) {
        console.error(e);
      }
    }
  }

  handleReload = async (selectedChannelID: number) => {
    await this.updateChatUrl(selectedChannelID);
  };

  handleShowChat = async (showChatID: number) => {
    this.setState({
      showingChatID: showChatID,
    });
  };

  handleWidthChange = (
    width: number,
    margin: [number, number],
    cols: number,
    containerPadding: [number, number]
  ) => {
    // keeps grid items aspect ratio 16:9
    this.setState({
      rowHeight: ((width / cols) * 9) / 16,
    });
  };

  renderLiveStream = () => {};
  renderChat = () => {};

  renderWebViews = (keys: string[]) => {
    const {channels, isMovingPanel, showingChatID} = this.state;
    const chatUrl = channels[showingChatID].chatUrl;
    const elements = channels.map((channel, i) => {
      return (
        <div key={keys[i]}>
          <YoutubeLivePanel
            channelName={channel.name}
            channelURL={channel.url}
            onReload={() => this.handleReload(i)}
            onClickShowChat={() => this.handleShowChat(i)}
            isClickable={isMovingPanel ? false : true}
          />
        </div>
      );
    });
    elements.push(
      <div key={'chat'}>
        <ChatPanel url={chatUrl} isClickable={isMovingPanel ? false : true} />
      </div>
    );

    return elements;
  };

  render() {
    const {layouts, keys} = this.createLayoutsAndKeys();
    console.log('WebviewGridContainerState', this.state);

    return (
      <div className="wv-container">
        <GridLayout
          className="layout"
          layouts={{lg: layouts.lg}}
          rowHeight={this.state.rowHeight}
          margin={[0, 0]}
          breakpoints={{lg: 1}}
          cols={{lg: 12}}
          onDragStart={() => this.setState({isMovingPanel: true})}
          onDragStop={() => this.setState({isMovingPanel: false})}
          onResizeStart={() => this.setState({isMovingPanel: true})}
          onResizeStop={() => this.setState({isMovingPanel: false})}
          onWidthChange={this.handleWidthChange}>
          {this.renderWebViews(keys)}
        </GridLayout>
      </div>
    );
  }
}

export default WebviewGridContainer;
