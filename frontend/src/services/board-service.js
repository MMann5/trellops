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

export function getEmptyBoard(txt, bgColor = '#0079bf') {
  return {
    _id: utilService.makeId(),
    title: txt,
    createdAt: Date.now(),
    createdBy: {},
    style: { bgColor },
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#7BC86C',
      },
      {
        id: 'l102',
        title: 'In Progress',
        color: '#61bd',
      },
      {
        id: 'l103',
        title: 'Important',
        color: '#F5DD29',
      },
      {
        id: 'l104',
        title: 'Optional',
        color: '#d4f',
      },
      {
        id: 'l105',
        title: 'Complex',
        color: '#FFAF3F',
      },
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

// import { utilsService } from './utils.service'
// import { httpService } from './http.service'
// import { userService } from './user.service'

// export const boardService = {
//     query,
//     remove,
//     getById,
//     save,
//     updateCardInBoard,

//     createActivity,

//     setPopoverPos,
//     removeCard,
//     getFilteredList,
// }

// async function query(filterBy = { ctg: '' }) {
//     try {
//         return await httpService.get('board', filterBy)
//     } catch (err) {
//         throw err
//     }
// }

// async function remove(boardId) {
//     try {
//         await httpService.delete(`board/${boardId}`)
//     } catch (err) {
//         throw err
//     }
// }

// async function getById(boardId) {
//     try {
//         return await httpService.get(`board/${boardId}`)

//     } catch (err) {
//         throw err
//     }
// }

// async function save(board) {
//     if (board._id) {
//         try {
//             return await httpService.put(`board/${board._id}`, board)
//         } catch (err) {
//             throw err
//         }
//     } else {
//         try {
//             return await httpService.post('board', board)
//         } catch (err) {
//             throw err
//         }
//     }
// }

// // sync functions

// export function updateCardInBoard(board, updatedCard) {
//     board.lists.forEach(list => {
//         list.cards.forEach((card, idx) => {
//             if (card.id === updatedCard.id) list.cards[idx] = updatedCard
//         })
//     })
//     return { ...board }
// }

// export function createActivity(actionType, txt = '', card = null) {

//     const loggedInUser = userService.getLoggedinUser()

//     const { _id, fullname, imgUrl } = loggedInUser

//     const byMember = {
//         _id,
//         fullname,
//         imgUrl
//     }

//     let savedCard
//     if (card) {
//         savedCard = {
//             id: card.id,
//             title: card.title,
//             members: card.members
//         }
//     }

//     const savedActivity = {
//         id: utilsService.makeId(),
//         actionType,
//         txt,
//         createdAt: Date.now(),
//         byMember,
//         card: savedCard || null,
//     }
//     return savedActivity
// }
