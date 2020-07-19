export type Channel = {
  name: string;
  id: string;
};

export function isChannel(arg: any): arg is Channel {
  return arg.name !== undefined && arg.id !== undefined;
}

export type ChDisplayConf = {
  name: string;
  url: string;
  chatUrl?: string;
};

export function isChDisplayConf(arg: any): arg is ChDisplayConf {
  return arg.name !== undefined && arg.url !== undefined;
}
