const app = require('express')();
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('short'));
app.use(cors());

app.get('/embed/live_stream', (req, res) => {
  const channel = req.query.channel || '';
  const html = `<!DOCTYPE html>
  <html>
    <body id="body" style="background-color:white;">
      <h2>Video<span id="state"> is stopped</span></h2>
      <div>?channel=${channel}</div>
      <div class="ytp-cued-thumbnail-overlay">
        <button id="play" onclick="play()">Play</button>
        <button id="stop" onclick="stop()">Stop</button>
      </div>
      <script>// 'VIDEO_ID': "live_chat_v_of_${channel}"</script>
      <script>
        function play(){
          document.getElementById('state').innerText = ' is playing';
          document.getElementById('body').classList.add('isPlaying');
        }
        function stop(){
          document.getElementById('state').innerText = ' is stopped';
          document.getElementById('body').classList.remove('isPlaying');
        }
      </script>
      <script>
        // https://ics.media/entry/200427/

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const gainNode = ctx.createGain();
        // 音量の初期値を0.2にする
        gainNode.gain.value = 0.2;
        let oscillator;
        // 再生中でtrue
        let isPlaying = false;

        document.querySelector("#play").addEventListener("click", () => {
          // 再生中なら二重に再生されないようにする
          if(isPlaying) return;
          oscillator = ctx.createOscillator();
          oscillator.type = "sine"; // sine, square, sawtooth, triangleがある
          oscillator.frequency.setValueAtTime(440, ctx.currentTime); // 440HzはA4(4番目のラ)
          oscillator.connect(ctx.destination);
          oscillator.start();
          isPlaying = true
        });

        // oscillatorを破棄し再生を停止する
        document.querySelector("#stop").addEventListener("click", () => {
          oscillator?.stop();
          isPlaying = false;
        });
      </script>
      <style>body.isPlaying{background-color:red!important;}</style>
    </body>
  </html>
  `;
  res.send(html);
});

app.get('/live_chat', (req, res) => {
  const v = req.query.v || '';
  const html = `<!DOCTYPE html>
  <html>
    <body style="background-color:white">
      <h2>Chat</h2>
      <div>?v=${v}</div>
    </body>
  </html>
  `;
  res.send(html);
});

const port = 8080;

app.listen(port, () => {
  console.log('listen', port);
});
