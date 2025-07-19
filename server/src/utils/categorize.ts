export function categorizeEvent(
  title: string,
  notes?: string
): "Work" | "Personal" | "Other" {
  const keywords = {
    Work: ["meeting", "project", "client", "deadline", "review"],
    Personal: ["birthday", "family", "anniversary", "friend", "vacation"],
  };

  const content = `${title} ${notes ?? ""}`.toLowerCase();

  for (const keyword of keywords.Work) {
    if (content.includes(keyword)) return "Work";
  }

  for (const keyword of keywords.Personal) {
    if (content.includes(keyword)) return "Personal";
  }

  return "Other";
}