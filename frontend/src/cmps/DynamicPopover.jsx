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
  popoverPos,
}) {
  const bodyObj = { props, setCurrPopover, sendTask, popoverPos };
  switch (name) {
    case 'MEMBERS':
      return <MemberPick bodyObj={bodyObj} />;
    case 'LABELS':
      return <LabelPick bodyObj={bodyObj} />;
    case 'COVER':
      return <ColorPick bodyObj={bodyObj} />;
    case 'DATE':
      return <DatePick bodyObj={bodyObj} />;
    case 'ATTACHMENT':
      return <FileAttachment bodyObj={bodyObj} />;
    case 'CHECKLISTS':
      return <Checklist bodyObj={bodyObj} />;
    default:
      return '';
  }
}
