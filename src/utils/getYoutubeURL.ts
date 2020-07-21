import axios from 'axios';

const domein =
  process.env['NODE_ENV'] === 'production'
    ? 'https://www.youtube.com'
    : process.env['REACT_APP_DEVAPISERVER'] || '';

export async function getChatURL(liveURL: string) {
  const result = await axios.get(liveURL);
  if (result.data) {
    const matchObj = (result.data as string).match(/'VIDEO_ID': "(.*?)"/);
    if (matchObj !== null) {
      console.log(matchObj[0]);
      console.log(matchObj[1]);
      return domein + '/live_chat?v=' + matchObj[1];
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

export function getLiveURL(channelID: string) {
  return domein + '/embed/live_stream?channel=' + channelID;
}
