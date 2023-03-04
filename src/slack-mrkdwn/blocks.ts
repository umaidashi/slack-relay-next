declare var document: Document;

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
        result += `<span className={styles.mention}>@${userCheck(
          element.user_id,
          users
        )}</span>`;
        return;
      case "broadcast":
        result += `<span className={styles.mention}>@${element.range}</span>`;
        return;
      case "link":
        result += `<a href="${element.url}" className={styles.link}>${textStyle(
          element
        )}</a>`;
        return;
    }
  });

  // console.log("result", result);
  return result;
};

const textStyle = (element: any) => {
  let result: string = "";
  console.log(element);
  if (element.style) {
    const style = element.style;
    if (style.bold)
      result += `<span className={styles.bold}>${brCheck(element.text)}</span>`;
    if (style.italic)
      result += `<span className={styles.italic}>${brCheck(
        element.text
      )}</span>`;
    if (style.strike)
      result += `<span className={styles.strike}>${brCheck(
        element.text
      )}</span>`;
    if (style.code)
      result += `<span className={styles.code}>${brCheck(element.text)}</span>`;
  } else {
    result += `<span>${brCheck(element.text)}</span>`;
  }
  return result;
};

const brCheck = (text: string) => {
  return text?.replace(/\n/g, "<br/>");
};

const userCheck = (user_id: string, users: any[]) => {
  return users?.filter((user) => user.id === user_id)[0].profile.display_name;
};
