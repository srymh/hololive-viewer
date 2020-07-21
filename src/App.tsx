import React from 'react';
import './App.scss';
import {WebviewGridContainer, Config} from './components';
import {Channel, isChannels} from './types';

const myIpcRenderer = window.myIpcRenderer;

type AppState = {
  channels: Channel[];
  showConfig: boolean;
};

// javascript - react.js constructor called twice - Stack Overflow
// https://stackoverflow.com/questions/55119377/react-js-constructor-called-twice/55120877

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      channels: [],
      showConfig: false,
    };
  }

  componentDidMount = async () => {
    myIpcRenderer.on('APP_ShowConfig', (arg) => {
      this.setState({showConfig: arg});
    });

    await this.getChannels();
  };

  getChannels = async () => {
    try {
      const channels = await myIpcRenderer.invoke('APP_GetChannels');
      if (isChannels(channels)) {
        this.setState({channels: channels}, () => {
          console.log('APP_GetChannels:', this.state.channels);
        });
      } else {
        throw new Error('Not Channel[]');
      }
    } catch (error) {
      console.log('APP_GetChannels', error.message);
    }
  };
  addChannel = async (name: string, id: string) => {
    let result = await myIpcRenderer.invoke('APP_SetChannel', {name, id});
    console.log('addChannel', result);
  };
  removeChannel = async (id: string) => {
    let result = await myIpcRenderer.invoke('APP_RemoveChannel', id);
    console.log('removeChannel', result);
  };

  hideConfig = () => {
    this.setState({showConfig: false}, async () => {
      await this.getChannels();
    });
  };

  render() {
    const {channels, showConfig} = this.state;

    const channelsIsEmpty = channels.length === 0;
    console.log(channels.length, channels);

    return (
      <div className="container">
        {showConfig ? (
          <Config
            hideConfig={this.hideConfig}
            addChannel={this.addChannel}
            removeChannel={this.removeChannel}
          />
        ) : (
          <div></div>
        )}
        {!channelsIsEmpty ? (
          <WebviewGridContainer channels={channels} />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
