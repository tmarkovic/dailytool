import './index.css';
import { useReducer, useState } from 'react';
import {
  Clock,
  Box,
  Button,
  TextInput,
  Main,
  FormField,
  Text,
  List,
  Avatar,
} from 'grommet';
import { Add } from 'grommet-icons';

const initialState = {
  names: [],
  countdown: false,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case 'addName':
      const newState = payload.includes(',')
        ? [
            ...state.names,
            ...payload
              .split(',')
              .map((x) => ({ name: x.trim(), selected: false })),
          ]
        : [...state.names, { name: payload, selected: false }];
      return {
        ...state,
        names: newState,
      };
    case 'removeName':
      return {
        ...state,
        names: state.names.filter((x) => x.name !== payload),
      };
    case 'startCount':
      return {
        ...state,
        countdown: 'backward',
      };
    case 'stopCount':
      return {
        ...state,
        countdown: false,
      };
    default:
      throw new Error();
  }
}

function Daily(props) {
  console.log(props);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState('');

  console.log(state.toggledNames);
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleAddName = (e) => {
    e.preventDefault();
    dispatch({ type: 'addName', payload: name });
    setName('');
  };

  const handleRemoveName = (value) => {
    dispatch({ type: 'removeName', payload: value });
  };

  return (
    <Main pad="small" fill align="center">
      <h1>DailyTool</h1>
      <Box direction="row">
        <Box direction="column" width="medium">
          <p>Participants</p>
          <form onSubmit={handleAddName}>
            <Box direction="row">
              <FormField>
                <TextInput value={name} onChange={handleChangeName} />
              </FormField>
              <Button
                type="submit"
                icon={<Add />}
                disabled={name === ''}
                onClick={handleAddName}
              ></Button>
            </Box>
          </form>
          <List data={state.names} border={false}>
            {({ name }) => (
              <Box
                direction="row-responsive"
                gap="small"
                align="center"
                onClick={() => handleRemoveName(name)}
              >
                <Avatar
                  src={`https://avatars.dicebear.com/4.5/api/gridy/${name}.svg`}
                  alt="avatar"
                  background="brand"
                />
                <Text weight="bold">{name}</Text>
              </Box>
            )}
          </List>
        </Box>
        <Box>
          <p>Timer</p>
          <Clock
            type="digital"
            time="PT0H15M0S"
            run={state.countdown}
            hourLimit="24"
            size="xxlarge"
          />
          <Box direction="row" margin={{ top: 'small' }}>
            <Button
              primary
              size="small"
              fill="horizontal"
              label="Start"
              onClick={() => dispatch({ type: 'startCount' })}
              margin={{ right: 'small' }}
            />
            <Button
              secondary
              size="small"
              fill="horizontal"
              label="Stop"
              onClick={() => dispatch({ type: 'stopCount' })}
            />
          </Box>
        </Box>
      </Box>
    </Main>
  );
}

export default Daily;
