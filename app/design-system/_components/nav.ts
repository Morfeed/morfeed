import {
  AppWindowIcon,
  BellIcon,
  CalendarIcon,
  ChartAreaIcon,
  CommandIcon,
  EllipsisIcon,
  GaugeIcon,
  GroupIcon,
  InboxIcon,
  LayersIcon,
  ListChecksIcon,
  LoaderCircleIcon,
  MessageSquareIcon,
  MessagesSquareIcon,
  MousePointerClickIcon,
  PaletteIcon,
  PanelRightIcon,
  PanelTopIcon,
  SeparatorHorizontalIcon,
  SquareMenuIcon,
  SquareRoundCornerIcon,
  TableIcon,
  TextCursorInputIcon,
  ToggleLeftIcon,
  TriangleAlertIcon,
  TypeIcon,
  type LucideIcon,
} from "lucide-react"

type SectionMeta = {
  title: string
  icon: LucideIcon
}

export const sections = {
  colors: { title: "Colors", icon: PaletteIcon },
  typography: { title: "Typography", icon: TypeIcon },
  radius: { title: "Radius", icon: SquareRoundCornerIcon },
  shadow: { title: "Shadow", icon: LayersIcon },
  alert: { title: "Alert", icon: TriangleAlertIcon },
  buttons: { title: "Button", icon: MousePointerClickIcon },
  "button-group": { title: "Button group", icon: GroupIcon },
  charts: { title: "Charts", icon: ChartAreaIcon },
  command: { title: "Command", icon: CommandIcon },
  "date-picker": { title: "Date picker", icon: CalendarIcon },
  dialog: { title: "Dialog & alert dialog", icon: AppWindowIcon },
  "dropdown-menu": { title: "Dropdown menu", icon: SquareMenuIcon },
  empty: { title: "Empty", icon: InboxIcon },
  form: { title: "Form", icon: TextCursorInputIcon },
  pagination: { title: "Pagination", icon: EllipsisIcon },
  progress: { title: "Progress", icon: GaugeIcon },
  separator: { title: "Separator & marker", icon: SeparatorHorizontalIcon },
  sheet: { title: "Sheet & drawer", icon: PanelRightIcon },
  skeleton: { title: "Skeleton & spinner", icon: LoaderCircleIcon },
  table: { title: "Table", icon: TableIcon },
  tabs: { title: "Tabs", icon: PanelTopIcon },
  toast: { title: "Toast", icon: BellIcon },
  toggle: { title: "Toggle", icon: ToggleLeftIcon },
  tooltip: { title: "Tooltip & popover", icon: MessageSquareIcon },
  chat: { title: "Chat", icon: MessagesSquareIcon },
  questionnaire: { title: "Questionnaire", icon: ListChecksIcon },
} satisfies Record<string, SectionMeta>

export type SectionId = keyof typeof sections

export const navGroups: { label: string; items: SectionId[] }[] = [
  {
    label: "Foundations",
    items: ["colors", "typography", "radius", "shadow"],
  },
  { label: "Actions", items: ["buttons", "button-group", "toggle"] },
  { label: "Inputs", items: ["form", "date-picker"] },
  {
    label: "Feedback",
    items: ["alert", "toast", "progress", "skeleton", "empty"],
  },
  {
    label: "Overlays",
    items: ["dialog", "sheet", "tooltip", "dropdown-menu", "command"],
  },
  { label: "Navigation", items: ["tabs", "pagination"] },
  { label: "Data", items: ["table", "charts", "separator"] },
  { label: "Conversation", items: ["chat", "questionnaire"] },
]

export const sectionIds = navGroups.flatMap((group) => group.items)
