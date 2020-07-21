import {
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  KeyboardEvent,
} from 'electron';

type ClickFn = (
  menuItem: MenuItem,
  browserWindow: BrowserWindow | undefined,
  event: KeyboardEvent
) => void;

const createMenu = (setupChannlesFn: ClickFn) => {
  // https://www.electronjs.org/docs/api/menu

  const isMac = process.platform === 'darwin';

  const template: Array<MenuItemConstructorOptions | MenuItem> = [
    {
      label: 'File',
      submenu: [isMac ? {role: 'close'} : {role: 'quit'}],
    },
    {
      label: 'Edait',
      submenu: [
        {
          label: 'Setup Channels',
          click: setupChannlesFn,
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'toggleDevTools'},
        {role: 'togglefullscreen'},
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);

  return menu;
};

export default createMenu;
