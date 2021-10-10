import { LabelPick } from './TaskDetails/LabelPick';
import { MemberPick } from './TaskDetails/MemberPick';
import { ColorPick } from './TaskDetails/ColorPick';
import { Checklist } from './TaskDetails/Checklist';
import { DatePick } from './TaskDetails/DatePick';
import { FileAttachment } from './TaskDetails/FileAttachment';


export function DynamicPopover({
  name,
  props,
  setCurrPopover,
  sendTask,
  popoverPos
}) {
  switch (name) {
    case 'MEMBERS':
      return (
        <MemberPick
          props={props}
          setCurrPopover={setCurrPopover}
          sendTask={sendTask}
          popoverPos={popoverPos}
        />
      );
    case 'LABELS':
      return (
        <LabelPick
          props={props}
          setCurrPopover={setCurrPopover}
          sendTask={sendTask}
          popoverPos={popoverPos}
        />
      );
    case 'COVER':
      return (
        <ColorPick
          props={props}
          setCurrPopover={setCurrPopover}
          sendTask={sendTask}
          popoverPos={popoverPos}
        />
      );
    case 'DATE':
      return (
        <DatePick
          props={props}
          setCurrPopover={setCurrPopover}
          sendTask={sendTask}
          popoverPos={popoverPos}
        />
      );
    case 'ATTACHMENT':
      return (
        <FileAttachment
          props={props}
          setCurrPopover={setCurrPopover}
          sendTask={sendTask}
          popoverPos={popoverPos}
        />
      );
    case 'CHECKLISTS':
      return (
        <Checklist
          props={props}
          setCurrPopover={setCurrPopover}
          sendTask={sendTask}
          popoverPos={popoverPos}
        />
      );
    default:
      return '';
  }
}
