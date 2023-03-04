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
      case "link":
        result += `<a target=_blank href="${element.url}" class="link">${
          element.text ? textStyle(element) : element.url
        }</a>`;
        return;
    }
  });

  // console.log("result", result);
  return result;
};

const textStyle = (element: any) => {
  let result: string = "";
  // console.log(element);
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
  // console.log(
  //   users?.filter((user) => user.id === user_id)[0].profile.display_name
  // );
  const userName = users?.filter((user) => user.id === user_id)[0].profile
    .display_name
    ? users?.filter((user) => user.id === user_id)[0].profile.display_name
    : users?.filter((user) => user.id === user_id)[0].profile.real_name;

  return userName;
};
