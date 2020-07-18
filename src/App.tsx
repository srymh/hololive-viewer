import React from 'react';
import './App.scss';
import {WebviewGridContainer} from './components';
import {Channel} from './types';

const CHANNELS: Channel[] = [
  {
    name: '桐生ココ',
    id: 'UCS9uQI-jC3DE0L4IpXyvr6w',
  },
  {
    name: '湊あくあ',
    id: 'UC1opHUrw8rvnsadT-iGp7Cg',
  },
  {
    name: 'さくらみこ',
    id: 'UC-hM6YJuNYVAmUWxeIr9FeA',
  },
  {
    name: '角巻わため',
    id: 'UCqm3BQLlJfvkTsX_hvm0UmA',
  },
  {
    name: '兎田ぺこら',
    id: 'UC1DCedRgGHBdm81E1llLhOQ',
  },
  {
    name: '宝鐘マリン',
    id: 'UCCzUftO8KOVkV4wQG1vkUvg',
  },
  {
    name: 'アキロゼ',
    id: 'UCFTLzh12_nrtzqBPsTCqenA',
  },
  {
    name: '白上フブキ',
    id: 'UCdn5BQ06XqgXoAxIhbqw5Rg',
  },
  {
    name: '夏色まつり',
    id: 'UCQ0UDLQCjY0rmuxCDE38FGg',
  },
  {
    name: '天音かなた',
    id: 'UCZlDXzGoo7d44bwdNObFacg',
  },
  {
    name: '紫咲シオン',
    id: 'UCXTpFs_3PqI41qX2d9tL2Rw',
  },
  {
    name: '潤羽るしあ',
    id: 'UCl_gCybOJRIgOXw6Qb4qJzQ',
  },
  {
    name: '赤井はあと',
    id: 'UC1CfXB_kRs3C-zaeTG3oGyg',
  },
  {
    name: '不知火フレア',
    id: 'UCvInZx9h3jC2JzsIzoOebWg',
  },
];

type AppState = {};

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <WebviewGridContainer channels={CHANNELS} />
      </div>
    );
  }
}
