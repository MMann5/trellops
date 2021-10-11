import { utilService } from './util-service.js';
import { httpService } from './http-service.js';
var gBoards = require('../data/boards.json');

export const boardService = {
  fetchBoards,
  getBoards,
  getBoardById,
  query,
  _save,
  createActivity,
  findGroupById,
  getBoardsPrm,
  pushGroupPrm,
  getBoardPrm,
  deleteBoardPrm,
  addBoardPrm,
  updateBoardPrm,
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

export function getEmptyBoard(txt, bgColor = '#0079bf') {
  return {
    _id: utilService.makeId(),
    title: txt,
    createdAt: Date.now(),
    createdBy: {},
    style: { bgColor },
    labels: [
      {
        "id": "l101",
        "title": "Urgent",
        "color": "#011627"
      },
      {
        "id": "l102",
        "title": "Low priority",
        "color": "#FF0022"
      },
      {
        "id": "l103",
        "title": "Important",
        "color": "#B91372"
      },
      {
        "id": "l104",
        "title": "Optional",
        "color": "#0075C4"
      },
      {
        "id": "l105",
        "title": "Complex",
        "color": "#591F0A"
      },
      {
        "id": "l106",
        "title": "Bug",
        "color": "#D65108"
      },
      {
        "id": "l106",
        "title": "High Priority",
        "color": "#960200"
      }
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Tal Tarablus',
        imgUrl: 'tal.jpg',
      },
      {
        _id: 'u102',
        fullname: 'Michael Mann',
        imgUrl: 'michael.png',
      },
      {
        _id: 'u103',
        fullname: 'Ron Shmuel Kotigaro',
        imgUrl: 'ron.png',
      },
      {
        _id: 'u104',
        fullname: 'David Ben Ishai',
        imgUrl: 'david.jpg',
      },
    ],
    groups: [],
    activities: [],
  };
}

export function addComment(txt) {
  return {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember: {
      _id: 'u103',
      fullname: 'Ron Shmuel Kotigaro',
      imgUrl: 'ron.png',
    },
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

function createActivity(actionType, taskOrGroup = null, txt = '') {
  const _id = utilService.makeId();
  const newActivity = {
    _id,
    actionType,
    txt,
    createdAt: Date.now(),
    byMember: {
      _id: 'u101',
      fullname: 'Ron Kontigaro',
      imgUrl: 'ron.png',
    },
  };
  if (taskOrGroup) {
    const activityEl = {title: taskOrGroup.title}
    newActivity.taskOrGroup = activityEl
  }
  return newActivity;
}

function findGroupById(board, groupId) {
  const group = board.groups.find((group) => group.id === groupId);
  return group;
}

function getBoardsPrm() {
  try {
    return httpService.get('board');
  } catch (err) {
    throw err;
  }
}
function getBoardPrm(boardId) {
  try {
    return httpService.get(`board/${boardId}`);
  } catch (err) {
    throw err;
  }
}
function deleteBoardPrm(boardId) {
  try {
    return httpService.delete(`board/${boardId}`);
  } catch (err) {
    throw err;
  }
}
function addBoardPrm(body) {
  try {
    return httpService.post(`board`, body);
  } catch (err) {
    throw err;
  }
}
function updateBoardPrm(updateObj) {
  try {
    return httpService.put(`board`, updateObj);
  } catch (err) {
    throw err;
  }
}
function pushGroupPrm(boardId, groupObj) {
  try {
    return httpService.put(`board`, {
      id: boardId,
      group: groupObj,
    });
  } catch (err) {
    throw err;
  }
}
