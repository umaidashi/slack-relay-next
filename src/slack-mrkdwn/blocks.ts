export const blocksToHTML = (blocks: any[], users: any[]) => {
  let result: string = "";
  blocks?.forEach((block) => {
    result += handleElements(block.elements, users);
  });
  return result;
};

const handleElements = (elements: any[], users: any[]) => {
  let result: string = "";
  elements?.forEach((element) => {
    result += elementFLG(element, users);
  });
  return result;
};

const elementFLG = (element: any, users: any[]) => {
  let result: string = "";
  const type = element.type;
  if (type === "rich_text_section")
    result += richTextSection(element.elements, users);
  if (type === "rich_text_list") result += richTextList(element, users);
  if (type === "rich_text_preformatted")
    result += richTextPreformatted(element);
  if (type === "rich_text_quote") result += richTextQuote(element);
  return result;
};

const richTextList = (element: any, users: any[]) => {
  let result: string = "";
  if (element.style === "ordered") {
    result += `<ol class='ordered border${element.border}'>`;
  } else {
    result += `<ul class='bullet border${element.border}'>`;
  }
  element.elements?.forEach((e: { indent: any; elements: any[] }) => {
    result += `<li class='indent${element.indent}'>${richTextSection(
      e.elements,
      users
    )} </li>`;
  });
  if (element.style === "ordered") {
    result += "</ol>";
  } else {
    result += "</ul>";
  }

  return result;
};

const richTextPreformatted = (element: any) => {
  let result: string = "";
  result += `<div class='preformatted border${element.border}'>`;
  element.elements?.forEach((e: any) => {
    result += brCheck(e.text);
  });
  result += "</div>";
  return result;
};

const richTextQuote = (element: any) => {
  let result: string = "";
  result += "<div class='quote'>";
  element.elements?.forEach((e: any) => {
    result += textStyle(e);
  });
  result += "</div>";
  return result;
};

const richTextSection = (elements: any[], users: any[]) => {
  let result: string = "";
  elements?.forEach((element) => {
    switch (element.type) {
      case "text":
        result += textStyle(element);
        return;
      case "user":
        result += `<a href="/?userId=${
          element.user_id
        }" class="mention">@${userCheck(element.user_id, users)}</a>`;
        return;
      case "broadcast":
        result += `<span class="mentionRange">@${element.range}</span>`;
        return;
      case "emoji":
        result += `<span class="emoji">&#x${element.unicode};</span>`.replace(
          /-/g,
          ";&#x"
        );
        return;
      case "link":
        result += `<a target=_blank href="${element.url}" class="link">${
          element.text ? textStyle(element) : element.url
        }</a>`;
        return;
    }
  });

  return result;
};

const textStyle = (element: any) => {
  let result: string = "";
  if (element.style) {
    const style = element.style;
    if (style.bold)
      result += `<span class="bold">${brCheck(element.text)}</span>`;
    if (style.italic)
      result += `<span class="italic">${brCheck(element.text)}</span>`;
    if (style.strike)
      result += `<span class="strike">${brCheck(element.text)}</span>`;
    if (style.code)
      result += `<span class="code">${brCheck(element.text)}</span>`;
  } else {
    result += `<span>${brCheck(element.text)}</span>`;
  }
  return result;
};

const brCheck = (text: string) => {
  return text?.replace(/\n/g, "<br/>");
};

const userCheck = (user_id: string, users: any[]) => {
  const userName = users?.filter((user) => user.id === user_id)[0].profile
    .display_name
    ? users?.filter((user) => user.id === user_id)[0].profile.display_name
    : users?.filter((user) => user.id === user_id)[0].profile.real_name;

  return userName;
};
