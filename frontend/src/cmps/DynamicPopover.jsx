import { LabelPick } from "./LabelPick";
import { MemberPick } from "./MemberPick";
import { ColorPick } from "./ColorPick";
import { Checklist } from "./Checklist";
import { DatePick } from "./DatePick";
import { FileAttachment } from "./FileAttachment";
import { Label } from "@material-ui/icons";
import { LabelChange } from "./LabelChange";

export function DynamicPopover({name, props, setCurrPopover}){
    console.log('props', props);
switch (name) {
        case 'MEMBERS': return <MemberPick props= {props} setCurrPopover={setCurrPopover}/>;
        case 'LABELS': return <LabelPick props= {props} setCurrPopover={setCurrPopover}/>;
        case 'COVER': return <ColorPick props= {props} setCurrPopover={setCurrPopover}/>;
        case 'DATE': return <DatePick props= {props} setCurrPopover={setCurrPopover}/>;
        case 'ATTACHMENTE': return <FileAttachment props= {props} setCurrPopover={setCurrPopover}/>;
        case 'CHANGELABEL': return <LabelChange props= {props} setCurrPopover={setCurrPopover}/>;
        // case 'COPY': return <PopoverMoveCopy popoverType="copy" {...props} />;
        case 'CHECKLIST': return <Checklist props= {props} setCurrPopover={setCurrPopover}/>;
        // case 'PROFILE': return <PopoverProfile {...props} />
        // case 'INVITE': return <PopoverInvite {...props} />
        // case 'MENU': return <PopoverMenu {...props} />
        // case 'BACKGROUND': return <PopoverBackground {...props} />
        // case 'ARCHIVE': return <PopoverArchive {...props} />
        // case 'ACTIVITY': return <PopoverActivity {...props} />
        // case 'BOARD_FILTER': return <PopoverBoardFilter {...props} />
        // case 'CREATE_BOARD': return <PopoverCreateBoard {...props} />
        // case 'LIST_MENU': return <PopoverListMenu {...props} />
        // case 'NOTIFICATIONS': return <PopoverNotifics {...props} />
        // case 'BOARDS_SEARCH': return <PopoverBoardsSearch {...props} />
        default: return '';
    }
}