import { utilService } from './util-service.js';
var gBoards = require('../data/boards.json');

export const boardService = {
  fetchBoards,
  getBoards,
};
function getBoards() {
  return gBoards;
}
function fetchBoards() {
  return Promise.resolve(gBoards);
}

export function getEmptyBoard() {
  return {
    id: utilService.makeId(),
    title: utilService.makeLorem(),
    createdAt: Date.now(),
    createdBy: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: 'http://some-img',
    },
    style: {},
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#61bd4f',
      },
      {
        id: 'l102',
        title: 'In Progress',
        color: '#61bd4f',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Tal Tarablus',
        imgUrl: 'https://www.google.com',
      },
      {
        _id: 'u102',
        fullname: 'Michael Mann',
        imgUrl: 'https://www.google.com',
      },
    ],
    groups: [
      {
        id: utilService.makeId(),
        title: 'Group 1',
        tasks: [
          {
            id: utilService.makeId(),
            title: 'Replace logo',
          },
          {
            id: 'c102',
            title: 'Add Samples',
          },
        ],
        style: {},
      },
      {
        id: utilService.makeId(),
        title: 'Group 2',
        tasks: [
          {
            id: utilService.makeId(),
            title: 'Replace logo',
          },
          {
            id: 'c102',
            title: 'Add Samples',
          },
        ],
        style: {},
      },
    ],
    activities: [
      {
        id: utilService.makeId(),
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        task: {
          id: utilService.makeId(),
          title: 'Replace Logo',
        },
      },
    ],
  };
}

export function getEmptyGroup(txt) {
  const id = utilService.makeId();
  return {
    id,
    title: txt,
    tasks: [],
    style: {},
  };
}

export function constructTask(txt) {
  return {
    id: utilService.makeId(),
    title: txt,
  };
}
