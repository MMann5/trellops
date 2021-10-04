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
}) {
  console.log('props', props);
  switch (name) {
    case 'MEMBERS':
      return (
        <MemberPick
          props={props}
          setCurrPopover={setCurrPopover}
          sendTask={sendTask}
        />
      );
    case 'LABELS':
      return (
        <LabelPick
          props={props}
          setCurrPopover={setCurrPopover}
          sendTask={sendTask}
        />
      );
    case 'COVER':
      return (
        <ColorPick
          props={props}
          setCurrPopover={setCurrPopover}
          sendTask={sendTask}
        />
      );
    case 'DATE':
      return (
        <DatePick
          props={props}
          setCurrPopover={setCurrPopover}
          sendTask={sendTask}
        />
      );
    case 'ATTACHMENT':
      return (
        <FileAttachment
          props={props}
          setCurrPopover={setCurrPopover}
          sendTask={sendTask}
        />
      );
    case 'CHECKLISTS':
      return (
        <Checklist
          props={props}
          setCurrPopover={setCurrPopover}
          sendTask={sendTask}
        />
      );
    default:
      return '';
  }
}
