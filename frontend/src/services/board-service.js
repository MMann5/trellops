import { utilService } from './util-service.js';
var gBoards = require('../data/boards.json');

export const boardService = {
  fetchBoards,
  getBoards,
  getBoardById,
  query,
  _save,
};
function getBoards() {
  return JSON.parse(localStorage.getItem('boardsDB')) || gBoards;
}
function fetchBoards() {
  return Promise.resolve(gBoards);
}

export function getEmptyGroup(txt) {
  const id = utilService.makeId();
  return {
    id,
    title: txt,
    tasks: [],
    bgColor: '',
  };
}

export function getEmptyBoard(txt) {
  return {
    _id: utilService.makeId(),
    title: txt,
    createdAt: null,
    createdBy: {},
    bgColor: '#0079bf',
    labels: [],
    members: [],
    groups: [],
    activities: [],
    lastViewedAt: null,
    isStarred: false,
  };
}

export function addComment(txt) {
  return {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember: { _id: 'u101', fullname: 'Tal Tarablus' },
  };
}
export function constructTask(txt) {
  return {
    id: utilService.makeId(),
    title: txt,
    description: '',
    attachments: [],
    bgColor: 'rgba(255,255,255,0.5)',
    checklists: [],
    labels: [],
    comments: [],
    members: [],
  };
}

function query(entityType = 'boardsDB', boardId) {
  var entities =
    JSON.parse(localStorage.getItem(entityType)) || gBoards;
  return new Promise((resolve, reject) => {
    resolve(entities);
  });
}

function get(entityType = 'boardsDB', entityId) {
  return query(entityType).then((entities) =>
    entities.find((entity) => entity._id === entityId)
  );
}

function post(entityType = 'boardsDB', newEntity) {
  newEntity._id = utilService.makeId();
  newEntity.createdAt = Date.now();
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function put(entityType = 'boardsDB', updatedEntity) {
  return query(entityType).then((entities) => {
    // const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    // entities.splice(idx, 1, updatedEntity)
    _save(entityType, updatedEntity);
    return updatedEntity;
  });
}

function remove(entityType = 'boardsDB', entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex(
      (entity) => entity._id === entityId
    );
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function getBoardById(boardId) {
  var boards =
    JSON.parse(localStorage.getItem('boardsDB')) || gBoards;
  var board = boards.find((board) => {
    return boardId === board._id;
  });
  return board;
}
