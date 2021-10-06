import { LabelPick } from './LabelPick';
import { MemberPick } from './MemberPick';
import { ColorPick } from './ColorPick';
import { Checklist } from './Checklist';
import { DatePick } from './DatePick';
import { FileAttachment } from './FileAttachment';

export function DynamicPopover({
  name,
  props,
  setCurrPopover,
  sendTask,
  popoverPos
}) {
  console.log('props', props);
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
