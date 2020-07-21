import React, {useState} from 'react';

type ConfigProps = {
  hideConfig: () => void;
  addChannel: (name: string, id: string) => void;
  removeChannel: (id: string) => void;
};

function Config(props: ConfigProps) {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');

  return (
    <div style={{color: 'white'}}>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <button onClick={() => props.addChannel(name, id)}>Add</button>
      <button onClick={() => props.removeChannel(id)}>Remove</button>
      <button onClick={props.hideConfig}>Hide Settings</button>
    </div>
  );
}

export default Config;
