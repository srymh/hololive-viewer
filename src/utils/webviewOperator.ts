import {WebviewTag} from 'electron';

export async function playVideo(webView: WebviewTag) {
  // for Japanease
  // const script =
  //   "Array.from(document.getElementsByTagName('button')).find(btn => btn.title === '再生（k）').click()";

  const script = `document.querySelector('div.ytp-cued-thumbnail-overlay > button').click()`;
  return await webView.executeJavaScript(script);
}

export function isPlaying(webView: WebviewTag) {
  // 要改善: ミュートになっていると検知できない
  return webView.isCurrentlyAudible();
}
