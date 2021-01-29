import './index.css';
import { useReducer, useState, useEffect } from 'react';
import {
  Clock,
  Box,
  Button,
  TextInput,
  Main,
  FormField,
  Text,
  Heading,
  Avatar,
} from 'grommet';
import { PauseFill, PlayFill } from 'grommet-icons';
import { Add } from 'grommet-icons';

const initialState = {
  names: [],
  countdown: false,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case 'addName':
      return {
        ...state,
        names: [...state.names, { name: payload.trim(), selected: false }],
      };
    case 'addNames':
      return {
        ...state,
        names: [...state.names, ...payload],
      };
    case 'removeName':
      return {
        ...state,
        names: state.names.filter((x) => x.name !== payload),
      };
    case 'resetNames':
      return {
        ...state,
        names: [],
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

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    async function fetchNames(binId) {
      const res = await fetch(`https://api.jsonbin.io/b/${binId}`).then((x) =>
        x.json()
      );
      dispatch({
        type: 'addNames',
        payload: res.names
          .map((name) => ({ name, selected: false }))
          .sort(() => 0.5 - Math.random()),
      });
    }

    const id = window.location.pathname;
    if (id.length > 1) {
      fetchNames('601268d49f55707f6dfd1b22');
    }
  }, []);

  const handleAddName = (e) => {
    e.preventDefault();
    if (name.includes(',')) {
      const names = name
        .split(',')
        .map((x) => ({ name: x.trim(), selected: false }))
        .sort(() => 0.5 - Math.random());
      dispatch({ type: 'addNames', payload: names });
    } else {
      dispatch({ type: 'addName', payload: name });
    }
    setName('');
  };

  const handleRemoveName = (value) => {
    dispatch({ type: 'removeName', payload: value });
  };

  return (
    <Main pad="small" fill align="center">
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
              plain={false}
              fill="horizontal"
              onClick={() => dispatch({ type: 'startCount' })}
              icon={<PlayFill />}
              margin={{ right: 'small' }}
            />
            <Button
              secondary
              size="small"
              fill="horizontal"
              plain={false}
              icon={<PauseFill />}
              onClick={() => dispatch({ type: 'stopCount' })}
            />
          </Box>
        </Box>
      </Box>
      {state.names.length ? (
        <Box margin={{ bottom: 'medium' }}>
          <Heading level="1" weight="bold" size="xlarge">
            {state.names[0].name}
          </Heading>

          <Box direction="row" margin={{ top: 'small' }}>
            <Button
              secondary
              size="small"
              fill="horizontal"
              label="Clear"
              onClick={() => dispatch({ type: 'resetNames' })}
              margin={{ right: 'small' }}
            />
            <Button
              primary
              size="small"
              fill="horizontal"
              label="Next"
              onClick={() => handleRemoveName(state.names[0].name)}
            />
          </Box>
        </Box>
      ) : null}
      <Box
        direction="row"
        width="large"
        align="start"
        justify="evenly"
        height="medium"
        wrap={true}
      >
        {state.names.slice(1).map(({ name }) => (
          <Box
            basis="auto"
            round="medium"
            direction="row"
            background="light-1"
            pad="small"
            margin={{ right: 'small' }}
            align="center"
            onClick={() => handleRemoveName(name)}
          >
            <Avatar
              src={`https://avatars.dicebear.com/4.5/api/gridy/${name.replace(
                ' ',
                '_'
              )}.svg`}
              alt="avatar"
              background="brand"
            />
            <Text weight="bold" size="medium">
              {name}
            </Text>
          </Box>
        ))}
      </Box>
    </Main>
  );
}

export default Daily;
