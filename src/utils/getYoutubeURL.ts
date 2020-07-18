import axios from 'axios';

export async function getChatURL(liveURL: string) {
  const result = await axios.get(liveURL);
  if (result.data) {
    const matchObj = (result.data as string).match(/\'VIDEO_ID\': \"(.*?)\"/);
    if (matchObj !== null) {
      console.log(matchObj[0]);
      console.log(matchObj[1]);
      return 'https://www.youtube.com/live_chat?v=' + matchObj[1];
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

export function getLiveURL(channelID: string) {
  return 'https://www.youtube.com/embed/live_stream?channel=' + channelID;
}
