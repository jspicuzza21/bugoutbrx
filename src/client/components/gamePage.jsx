/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure,
} from '@chakra-ui/core';
import Editor from './editor';
import ChatBox from './ChatBox';
import Timer from './timer2';
import {
  LeaveGameButton,
} from './index';
import { getPowerUpsThunk, getCurrentGameThunk } from '../store/thunks/gameThunks';

const GamePage = (props) => {
  const {
    game, getPowerUps, getCurrentGame, match,
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getPowerUps();
    getCurrentGame(props.match.params.id);
  }, []);

  useEffect(() => {
    if (game.roundOver) {
      onOpen();
    }
  }, [game.roundOver]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ height: '80vh' }}>
        <Box bg="tomato" h="40%" w="110px" m={3} p={4} color="white" borderWidth="3px" borderColor="#c90c0c" borderStyle="solid" rounded="lg">
          Competition
          {game.players.map((player) => (
            <Text key={player.id}>{player.name ? player.name : 'Guest'}</Text>
          ))}
        </Box>
        <Box bg="#fabc41" h="60%" w="110px" m={3} p={4} color="white" borderWidth="3px" borderColor="#d49619" borderStyle="solid" rounded="lg">
          Power Ups
        </Box>
      </div>
      <Editor match={match} gamePageProps={game} />
      <div>
        <Timer />
        <Box bg="black" height="75%" w="90%" color="white" m="15px" p={3} borderWidth="3px" borderStyle="solid" borderColor="#331566" rounded="lg">
          <ChatBox />
        </Box>
        <LeaveGameButton passedProps={props} />
      </div>
      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Round Over!</ModalHeader>
            <ModalBody>
              <div>
                <p>The current scores are:</p>

              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
const mapStateToProps = (props) => (props);

const mapDispatchToProps = (dispatch) => ({
  getPowerUps: () => dispatch(getPowerUpsThunk()),
  getCurrentGame: (id) => dispatch(getCurrentGameThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
