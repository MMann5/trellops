// import React from 'react';

// import { TextField } from '@material-ui/core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faTrashAlt,
//   faPlus,
// } from '@fortawesome/free-solid-svg-icons';

// export function Comments(/*{ closePopup }*/) {
//   const [stateVal, createStateVal] = React.useState({});
//   const [commentStateVal, createCommentVal] = React.useState([]);

//   const removeComment = (idx) => {
//     const commentCopy = [...commentStateVal];
//     commentCopy.splice(idx, 1);
//     createCommentVal(commentCopy);
//   };

//   const comment = commentStateVal.map((val, idx) => {
//     return (
//       <div
//         style={{
//           marginTop: '5px',
//           marginBottom: '5px',
//           padding: '10px',
//           width: '30%',
//           textAlign: 'center',
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//         }}
//         key={idx}
//       >
//         {val.title}
//         <button
//           style={{
//             cursor: 'pointer',
//             border: 'none',
//             backgroundColor: 'transparent',
//             display: 'block',
//           }}
//           onClick={() => removeComment(idx)}
//         >
//           <FontAwesomeIcon icon={faTrashAlt} />
//         </button>
//       </div>
//     );
//   });

//   return (
//     <div className='checkcomment'>
//       {/* <button
//         onClick={() => {
//           closePopup('isCheckOpen');
//         }}
//       >
//         x
//       </button> */}
//       <TextField
//         // fullWidth
//         size='small'
//         margin='normal'
//         variant='outlined'
//         onChange={(ev) =>
//           createStateVal({ title: ev.target.value, checked: false })
//         }
//         value={stateVal.title ? stateVal.title : ''}
//       />
//       <div>
//         <button
//           style={{
//             cursor: 'pointer',
//             border: 'none',
//             backgroundColor: 'transparent',
//             display: 'block',
//           }}
//           className='add-comment'
//           onClick={() => {
//             createCommentVal([...commentStateVal, stateVal]);
//             createStateVal({});
//           }}
//         >
//           <FontAwesomeIcon icon={faPlus} />
//           <span>Add Comment</span>
//         </button>
//       </div>
//       <div className='checkcomment-display'>
//         <div className='comments'>{comment}</div>
//       </div>
//     </div>
//   );
// }
