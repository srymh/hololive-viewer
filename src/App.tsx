import React from 'react';
import './App.scss';
import {WebviewGridContainer} from './components';
import {Channel} from './types';

const myIpcRenderer = window.myIpcRenderer;

type AppState = {
  channels: Channel[] | null;
};

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      channels: null,
    };
    myIpcRenderer
      .invoke('APP_GetChannels')
      .then((channels) => {
        console.log(channels);
        this.setState({channels});
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  }

  render() {
    return (
      <div className="container">
        {this.state.channels === null ? (
          <div>!!</div>
        ) : (
          <WebviewGridContainer
            channels={this.state.channels ? this.state.channels : []}
          />
        )}
      </div>
    );
  }
}
