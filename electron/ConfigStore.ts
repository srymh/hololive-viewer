import * as ElectronStore from 'electron-store';
import {Channel} from '../src/types';

const store = new ElectronStore({
  name: 'channels',
});

let channels: Channel[] = store.get('channels', []);

const setChannels = function (_channelIds: Channel[]) {
  channels = [...channels, ..._channelIds];
  store.set('channels', channels);
};

const getChannels = function () {
  channels = store.get('channels');
  return channels;
};

export {setChannels, getChannels};
