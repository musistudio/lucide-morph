export type AdditionalPresetDefinition = {
  id: string
  name: string
  fromLabel: string
  toLabel: string
  fromIcon: string
  toIcon: string
  loadingLabel: string
}

function preset(
  id: string,
  name: string,
  fromLabel: string,
  toLabel: string,
  fromIcon: string,
  toIcon: string,
  loadingLabel: string,
): AdditionalPresetDefinition {
  return {
    id,
    name,
    fromLabel,
    toLabel,
    fromIcon,
    toIcon,
    loadingLabel,
  }
}

// Product-state pairs, not single-icon motion samples. Each preset describes a
// meaningful before/after state and gives the intermediate scene a verb.
export const additionalPresetDefinitions: AdditionalPresetDefinition[] = [
  // Communication
  preset("email-rejected-approved", "Rejected to Approved Email", "Rejected", "Approved", "MailX", "MailCheck", "Approving email"),
  preset("email-warning-delivered", "Email Issue to Delivered", "Delivery issue", "Delivered", "MailWarning", "MailCheck", "Resolving delivery"),
  preset("email-question-verified", "Unverified to Verified Email", "Needs verification", "Verified", "MailQuestion", "MailCheck", "Verifying email"),
  preset("email-search-read", "Find Email to Read Email", "Finding email", "Read", "MailSearch", "MailOpen", "Opening email"),
  preset("chat-question-answered", "Question to Answered Chat", "Question", "Answered", "MessageCircleQuestion", "MessageCircle", "Answering question"),
  preset("chat-warning-resolved", "Chat Alert to Resolved", "Chat alert", "Resolved", "MessageCircleWarning", "MessageCircle", "Resolving chat"),
  preset("chat-disabled-enabled", "Disabled to Enabled Chat", "Chat disabled", "Chat enabled", "MessageCircleOff", "MessageCircle", "Enabling chat"),
  preset("conversation-unread-read", "Unread to Read Conversation", "Unread", "Read", "MessageSquareDot", "MessageSquare", "Marking as read"),
  preset("comment-flagged-resolved", "Flagged to Resolved Comment", "Flagged", "Resolved", "MessageSquareWarning", "MessageSquare", "Resolving comment"),
  preset("conversation-active-complete", "Active to Complete Conversation", "Active conversation", "Complete", "MessagesSquare", "MessageSquare", "Completing conversation"),

  // Files
  preset("file-warning-approved", "File Warning to Approved", "File warning", "Approved", "FileWarning", "FileCheck", "Reviewing file"),
  preset("file-question-approved", "File Question to Approved", "Needs review", "Approved", "FileQuestion", "FileCheck", "Reviewing file"),
  preset("file-rejected-approved", "Rejected to Approved File", "Rejected", "Approved", "FileX", "FileCheck", "Approving file"),
  preset("file-pending-approved", "Pending to Approved File", "Pending", "Approved", "FileClock", "FileCheck", "Processing file"),
  preset("file-editing-saved", "Editing to Saved File", "Editing", "Saved", "FilePenLine", "FileCheck", "Saving file"),
  preset("file-search-found", "Search to Found File", "Searching", "Found", "FileSearch", "FileCheck", "Finding file"),
  preset("file-download-complete", "Downloading to Ready File", "Downloading", "Ready", "FileDown", "FileCheck", "Downloading file"),
  preset("file-upload-complete", "Uploading to Ready File", "Uploading", "Ready", "FileUp", "FileCheck", "Uploading file"),
  preset("file-import-export", "Import to Export File", "Import", "Export", "FileInput", "FileOutput", "Converting transfer"),
  preset("file-protected-approved", "Protected to Approved File", "Protected", "Approved", "FileLock2", "FileCheck", "Authorizing file"),

  // Folders
  preset("folder-settings-ready", "Folder Setup to Ready", "Configuring", "Ready", "FolderCog", "FolderCheck", "Configuring folder"),
  preset("folder-sync-ready", "Syncing to Ready Folder", "Syncing", "Ready", "FolderSync", "FolderCheck", "Syncing folder"),
  preset("folder-rejected-ready", "Rejected to Ready Folder", "Rejected", "Ready", "FolderX", "FolderCheck", "Repairing folder"),
  preset("folder-pending-ready", "Pending to Ready Folder", "Pending", "Ready", "FolderClock", "FolderCheck", "Preparing folder"),
  preset("folder-search-found", "Search to Found Folder", "Searching", "Found", "FolderSearch", "FolderCheck", "Finding folder"),
  preset("folder-download-complete", "Downloading to Ready Folder", "Downloading", "Ready", "FolderDown", "FolderCheck", "Downloading folder"),
  preset("folder-upload-complete", "Uploading to Ready Folder", "Uploading", "Ready", "FolderUp", "FolderCheck", "Uploading folder"),
  preset("folder-import-export", "Import to Export Folder", "Import", "Export", "FolderInput", "FolderOutput", "Converting transfer"),
  preset("folder-locked-ready", "Locked to Ready Folder", "Locked", "Ready", "FolderLock", "FolderCheck", "Unlocking folder"),
  preset("folder-editing-ready", "Editing to Ready Folder", "Editing", "Ready", "FolderPen", "FolderCheck", "Saving folder"),

  // Calendar and tasks
  preset("schedule-pending-confirmed", "Pending to Confirmed Schedule", "Pending", "Confirmed", "CalendarClock", "CalendarCheck", "Confirming schedule"),
  preset("schedule-conflict-resolved", "Conflict to Confirmed Schedule", "Conflict", "Confirmed", "CalendarX", "CalendarCheck", "Resolving conflict"),
  preset("schedule-search-confirmed", "Find to Confirmed Schedule", "Finding time", "Confirmed", "CalendarSearch", "CalendarCheck", "Finding a time"),
  preset("schedule-settings-confirmed", "Setup to Confirmed Schedule", "Configuring", "Confirmed", "CalendarCog", "CalendarCheck", "Configuring schedule"),
  preset("schedule-sync-confirmed", "Syncing to Confirmed Schedule", "Syncing", "Confirmed", "CalendarSync", "CalendarCheck", "Syncing schedule"),
  preset("calendar-days-range", "Days to Date Range", "Days", "Date range", "CalendarDays", "CalendarRange", "Changing calendar view"),
  preset("task-draft-done", "Draft to Done Task", "Draft", "Done", "SquareDashed", "SquareCheck", "Completing task"),
  preset("task-blocked-done", "Blocked to Done Task", "Blocked", "Done", "SquareX", "SquareCheck", "Unblocking task"),
  preset("task-progress-done", "In Progress to Done Task", "In progress", "Done", "SquareDot", "SquareCheck", "Completing task"),
  preset("task-editing-done", "Editing to Done Task", "Editing", "Done", "SquarePen", "SquareCheck", "Saving task"),
  preset("task-review-done", "Review to Done Task", "Review", "Done", "SquareMenu", "SquareCheck", "Reviewing task"),
  preset("task-required-done", "Required to Done Task", "Required", "Done", "SquareAsterisk", "SquareCheck", "Completing requirement"),
  preset("todo-checklist-complete", "To-do to Complete Checklist", "To-do", "Complete", "ListTodo", "ListChecks", "Completing checklist"),
  preset("clipboard-list-approved", "Clipboard List to Approved", "Review list", "Approved", "ClipboardList", "ClipboardCheck", "Approving checklist"),
  preset("goal-progress-achieved", "Progress to Achieved Goal", "In progress", "Achieved", "CircleDotDashed", "CircleCheck", "Completing goal"),

  // People, access, and security
  preset("member-rejected-approved", "Rejected to Approved Member", "Rejected", "Approved", "UserX", "UserCheck", "Approving member"),
  preset("member-search-selected", "Search to Selected Member", "Searching", "Selected", "UserSearch", "UserCheck", "Selecting member"),
  preset("member-settings-approved", "Setup to Approved Member", "Configuring", "Approved", "UserCog", "UserCheck", "Configuring member"),
  preset("member-editing-approved", "Editing to Approved Member", "Editing", "Approved", "UserPen", "UserCheck", "Saving member"),
  preset("profile-invite-approved", "Invite to Approved Profile", "Invited", "Approved", "UserRoundPlus", "UserRoundCheck", "Approving profile"),
  preset("profile-rejected-approved", "Rejected to Approved Profile", "Rejected", "Approved", "UserRoundX", "UserRoundCheck", "Approving profile"),
  preset("profile-search-selected", "Search to Selected Profile", "Searching", "Selected", "UserRoundSearch", "UserRoundCheck", "Selecting profile"),
  preset("profile-settings-approved", "Setup to Approved Profile", "Configuring", "Approved", "UserRoundCog", "UserRoundCheck", "Configuring profile"),
  preset("security-alert-safe", "Security Alert to Safe", "Alert", "Safe", "ShieldAlert", "ShieldCheck", "Securing system"),
  preset("security-rejected-safe", "Rejected to Safe", "Rejected", "Safe", "ShieldX", "ShieldCheck", "Restoring security"),
  preset("security-question-safe", "Unknown to Safe", "Unknown", "Safe", "ShieldQuestion", "ShieldCheck", "Verifying security"),
  preset("security-blocked-safe", "Blocked to Safe", "Blocked", "Safe", "ShieldBan", "ShieldCheck", "Clearing block"),
  preset("security-pending-safe", "Pending to Safe", "Pending", "Safe", "ShieldEllipsis", "ShieldCheck", "Checking security"),
  preset("security-off-safe", "Protection Off to Safe", "Protection off", "Safe", "ShieldOff", "ShieldCheck", "Enabling protection"),
  preset("security-partial-verified", "Partial to Verified Security", "Partially protected", "Verified", "ShieldHalf", "ShieldCheck", "Verifying protection"),
  preset("keyhole-locked-unlocked", "Keyhole Locked to Unlocked", "Locked", "Unlocked", "LockKeyhole", "LockKeyholeOpen", "Unlocking access"),
  preset("face-scan-verified", "Face Scan to Verified", "Scanning face", "Verified", "ScanFace", "BadgeCheck", "Verifying identity"),
  preset("fingerprint-verified", "Fingerprint to Verified", "Scanning fingerprint", "Verified", "Fingerprint", "BadgeCheck", "Verifying identity"),
  preset("access-key-granted", "Access Key to Granted", "Access key", "Granted", "KeyRound", "BadgeCheck", "Granting access"),
  preset("approval-question-verified", "Approval Question to Verified", "Needs approval", "Verified", "BadgeHelp", "BadgeCheck", "Verifying approval"),

  // Connectivity and devices
  preset("wifi-none-connected", "No Wi-Fi to Connected", "No connection", "Connected", "WifiZero", "Wifi", "Connecting Wi-Fi"),
  preset("wifi-weak-connected", "Weak Wi-Fi to Connected", "Weak connection", "Connected", "WifiLow", "Wifi", "Improving connection"),
  preset("signal-none-strong", "No Signal to Strong Signal", "No signal", "Strong signal", "SignalZero", "SignalHigh", "Acquiring signal"),
  preset("cloud-alert-online", "Cloud Alert to Online", "Cloud alert", "Online", "CloudAlert", "Cloud", "Restoring cloud"),
  preset("cloud-settings-online", "Cloud Setup to Online", "Configuring", "Online", "CloudCog", "Cloud", "Configuring cloud"),
  preset("cloud-download-online", "Cloud Download to Online", "Downloading", "Online", "CloudDownload", "Cloud", "Finishing download"),
  preset("cloud-upload-online", "Cloud Upload to Online", "Uploading", "Online", "CloudUpload", "Cloud", "Finishing upload"),
  preset("route-off-active", "Route Off to Active", "Route off", "Route active", "RouteOff", "Route", "Activating route"),
  preset("location-off-found", "Location Off to Found", "Location off", "Location found", "LocateOff", "LocateFixed", "Finding location"),
  preset("screen-share-on-off", "Screen Share On to Off", "Sharing screen", "Share stopped", "ScreenShare", "ScreenShareOff", "Stopping share"),
  preset("unplugged-powered", "Unplugged to Powered", "Unplugged", "Powered", "Unplug", "PlugZap", "Connecting power"),
  preset("bluetooth-search-connected", "Bluetooth Search to Connected", "Searching", "Connected", "BluetoothSearching", "BluetoothConnected", "Connecting Bluetooth"),
  preset("monitor-off-ready", "Monitor Off to Ready", "Monitor off", "Monitor ready", "MonitorOff", "MonitorCheck", "Starting monitor"),
  preset("drive-download-complete", "Drive Download to Complete", "Downloading", "Complete", "HardDriveDownload", "HardDrive", "Downloading to drive"),
  preset("drive-upload-complete", "Drive Upload to Complete", "Uploading", "Complete", "HardDriveUpload", "HardDrive", "Uploading from drive"),

  // Checkout, fulfillment, and resolution. These are deliberately interleaved
  // so the gallery does not present a long run of identical completion hubs.
  preset("cart-checkout-payment", "Cart to Payment", "Cart ready", "Payment", "ShoppingCart", "CreditCard", "Starting checkout"),
  preset("shipment-search-located", "Shipment Search to Located", "Tracking shipment", "Located", "PackageSearch", "MapPinned", "Locating shipment"),
  preset("issue-question-triaged", "Question to Flagged Issue", "Question", "Needs attention", "CircleHelp", "CircleAlert", "Triaging issue"),
  preset("basket-order-packed", "Basket to Packed Order", "Basket ready", "Packed", "ShoppingBasket", "Package", "Packing order"),
  preset("incident-alert-contained", "Incident Alert to Contained", "Active incident", "Contained", "OctagonAlert", "CircleStop", "Containing incident"),
  preset("payment-receipt-issued", "Payment to Receipt", "Paid", "Receipt issued", "CreditCard", "Receipt", "Issuing receipt"),
  preset("shipment-failed-returned", "Failed Delivery to Warehouse", "Delivery failed", "Returned", "PackageX", "Warehouse", "Routing return"),
  preset("issue-rejected-reopened", "Rejected to Reopened Issue", "Rejected", "Reopened", "CircleX", "CirclePlay", "Reopening issue"),
  preset("discount-added-cart", "Discount to Discounted Cart", "Discount available", "Added to cart", "BadgePercent", "ShoppingCart", "Applying discount"),
  preset("shipment-created-dispatched", "Created to Dispatched Shipment", "Shipment created", "Dispatched", "PackagePlus", "Truck", "Dispatching shipment"),
  preset("issue-pending-scheduled", "Pending to Scheduled Issue", "Pending", "Scheduled", "CircleEllipsis", "Clock", "Scheduling issue"),
  preset("payment-alert-refund", "Payment Issue to Refund", "Payment issue", "Refunding", "BadgeAlert", "CircleDollarSign", "Starting refund"),
  preset("shipment-open-resealed", "Open to Resealed Package", "Package open", "Resealed", "PackageOpen", "Package", "Resealing package"),
  preset("issue-draft-active", "Draft to Active Issue", "Draft", "Active", "CircleDashed", "CircleDot", "Activating issue"),
  preset("refund-issued-wallet", "Refund to Wallet", "Refund issued", "In wallet", "CircleDollarSign", "Wallet", "Crediting wallet"),
  preset("cash-deposited-bank", "Cash to Bank Deposit", "Cash received", "Deposited", "Banknote", "Landmark", "Depositing funds"),
  preset("incident-rejected-escalated", "Dismissed to Escalated Incident", "Dismissed", "Escalated", "OctagonX", "ShieldAlert", "Escalating incident"),
  preset("wallet-purchase-complete", "Wallet to Purchased Bag", "Wallet ready", "Purchased", "WalletCards", "ShoppingBag", "Completing purchase"),
  preset("payment-rejected-cash", "Rejected Card to Cash Payment", "Card rejected", "Cash payment", "BadgeX", "Banknote", "Switching payment"),
  preset("bug-open-fixed", "Open Bug to Fixed", "Bug open", "Fixed", "Bug", "BugOff", "Fixing bug"),
]
