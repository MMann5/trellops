import { utilService } from './util-service.js';
var gBoards = require('../data/boards.json');

export const boardService = {
  fetchBoards,
  getBoards,
  getBoardById,
  query,
  _save,
  createActivity,
  findGroupById,
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

export function getEmptyBoard(txt, bgColor='#0079bf') {
  return {
    _id: utilService.makeId(),
    title: txt,
    createdAt: null,
    createdBy: {},
    style:{bgColor},
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
    byMember: {_id: 'u103',
    fullname: 'Ron Shmuel Kotigaro',
    imgUrl: 'ron.png'},
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

function createActivity(currUser, txt, task = null) {
  const id = utilService.makeId();
  const newActivity = {
    id,
    txt,
    createdAt: Date.now(),
    byMember: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: 'http://some-img',
    },
  };
  if (task) {
    newActivity.task = task;
  }
  return newActivity;
}

function findGroupById(board, groupId) {
  const group = board.groups.find((group) => group.id === groupId);
  return group;
}

// export function getEmptyBoard(txt) {
// export function getEmptyBoard(txt) {
//   return {
//     _id: utilService.makeId(),
//     title: txt,
//     createdAt: Date.now(),
//     createdBy: {
//       _id: 'u101',
//       fullname: 'Abi Abambi',
//       imgUrl: 'http://some-img',
//     },
//     bgColor: '#0079bf',
//     labels: [
//       {
//         id: 'l101',
//         title: 'Done',
//         color: '#61bd4f',
//       },
//       {
//         id: 'l102',
//         title: 'In Progress',
//         color: '#61bd4f',
//       },
//     ],
//     members: [
//       {
//         _id: 'u101',
//         fullname: 'Tal Tarablus',
//         imgUrl: 'https://www.google.com',
//       },
//       {
//         _id: 'u102',
//         fullname: 'Michael Mann',
//         imgUrl: 'https://www.google.com',
//       },
//     ],
//     groups: [],
//     activities: [
//       {
//         id: utilService.makeId(),
//         txt: 'Changed Color',
//         createdAt: 154514,
//         byMember: {
//           _id: 'u101',
//           fullname: 'Abi Abambi',
//           imgUrl: 'http://some-img',
//         },
//         task: {
//           id: utilService.makeId(),
//           title: 'Replace Logo',
//         },
//       },
//     ],
//   };
// }
