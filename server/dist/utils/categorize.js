"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorizeEvent = categorizeEvent;
function categorizeEvent(title, notes) {
    const keywords = {
        Work: ["meeting", "project", "client", "deadline", "review"],
        Personal: ["birthday", "family", "anniversary", "friend", "vacation"],
    };
    const content = `${title} ${notes !== null && notes !== void 0 ? notes : ""}`.toLowerCase();
    for (const keyword of keywords.Work) {
        if (content.includes(keyword))
            return "Work";
    }
    for (const keyword of keywords.Personal) {
        if (content.includes(keyword))
            return "Personal";
    }
    return "Other";
}
