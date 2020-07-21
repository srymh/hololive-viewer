import * as ElectronStore from 'electron-store';
import {Channel} from '../src/types';

type ChannelData = {
  name: string;
};

const ChannelsStoreKey = 'channels';

const store = new ElectronStore({
  name: ChannelsStoreKey,
  accessPropertiesByDotNotation: true,
});

function parse(rawData: {[id: string]: ChannelData}) {
  return Object.keys(rawData).map((channelId) => {
    return {id: channelId, name: rawData[channelId].name};
  });
}

const setChannel = function (channel: Channel) {
  store.set(ChannelsStoreKey + '.' + channel.id, {
    name: channel.name,
  });
};

const getChannels = function () {
  return parse(store.get(ChannelsStoreKey, {}));
};

const removeChannel = function (channelId: string) {
  store.delete(ChannelsStoreKey + '.' + channelId);
};

export {setChannel, getChannels, removeChannel};
