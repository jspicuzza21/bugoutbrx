/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import moment from 'moment';

import {
  getCurrentGame,
  setPowerups,
  setCorrectAnswer,
  addScoreAction,
  startGame,
  updateName,
  updateGame,
  setGameTimes,
  roundOver,
  newRound,
} from '../actions';

export const createGameThunk = (rounds, difficulty, history) => (dispatch) => axios
  .post('/game/createGame', { rounds, difficulty })
  .then(({ data }) => {
    const gameSessionId = data.id;
    axios.put(`/game/player/${gameSessionId}`)
      .then(({ data }) => {
        dispatch(updateGame(data));
        history.push(`/waiting/${data.id}`);
      })
      .catch((e) => {
        console.log(e);
      });
  })
  .catch((e) => {
    console.log(e);
  });

export const joinGameThunk = (code) => (dispatch) => axios.put(`/game/addplayer/${code}`, { code })
  .then(({ data }) => {
    dispatch(updateGame(data));
  })
  .catch((e) => {
    console.log(e);
  });

export const getCurrentGameThunk = (id) => (dispatch) => axios.get(`/game/current/${id}`)
  .then(({ data }) => {
    dispatch(getCurrentGame(data));
  })
  .catch((e) => {
    console.log(e);
  });

export const findRandomGameThunk = (currentGameId) => (dispatch) => axios
  .post('/game/findRandomGame', { currentGameId })
  .then(({ data }) => {
    dispatch(data);
  })
  .catch((e) => {
    console.log(e);
  });

export const getPromptThunk = (difficulty, id) => (dispatch) => axios
  .get(`/game/prompt/${difficulty}`)
  .then(({ data }) => {
    axios.put(`/game/prompt/${id}`, { data })
      .then(({ data }) => {
        dispatch(newRound(data));
      })
      .catch((e) => {
        console.log(e);
      });
  })
  .catch((e) => {
    console.log(e);
  });

export const getPowerUpsThunk = () => (dispatch) => axios
  .get('/game/powerups')
  .then(({ data }) => {
    dispatch(setPowerups(data));
  })
  .catch((e) => {
    console.log(e);
  });

export const updateNameThunk = (name) => (dispatch) => axios
  .put('/session/updateName', { name })
  .then((res) => {
    dispatch(updateName(res.data));
  })
  .catch((e) => {
    console.log(e);
  });

export const setCorrect = (id) => (dispatch) => {
  axios.put(`/session/correct/${id}`)
    .then(({ data }) => {
      dispatch(setCorrectAnswer());
      dispatch(roundOver(data));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const addScore = (score) => (dispatch) => {
  axios.put('/session/score', { score })
    .then(() => {
      dispatch(addScoreAction(score));
    });
};

export const setRoundTimes = (id) => (dispatch) => {
  console.log('setting time');
  const year = moment().year();
  const month = moment().month();
  const day = moment().date();
  let hour = moment().hour();
  const minute = moment().minute();
  const seconds = moment().seconds();

  let newMin = minute + 10;
  if (newMin > 59) {
    hour += 1;
    newMin -= 60;
  }

  const roundStart = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
  const roundEnd = `${year}-${month + 1}-${day} ${hour}:${newMin}:${seconds}`;
  console.log(roundStart, roundEnd);
  axios.put(`/game/game-times/${id}`, { roundStart, roundEnd })
    .then(() => {
      dispatch(setGameTimes(roundStart, roundEnd));
    });
};

export const startGameThunk = (currentGameId) => (dispatch) => axios
  .put('/game/startGame', { currentGameId })
  .then((res) => {
    console.log('response from server on StartGameThunk is ', res);
    dispatch(startGame(res.data));
  })
  .catch((e) => {
    console.log(e);
  });
