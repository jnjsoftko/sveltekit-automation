const page = {"object":"page","id":"d9cf3688-5080-4fd4-86a3-5a515000525b","created_time":"2021-11-05T07:13:00.000Z","last_edited_time":"2021-11-05T07:29:00.000Z","created_by":{"object":"user","id":"1a3d6d74-2978-4800-9f82-1150557d6a7e"},"last_edited_by":{"object":"user","id":"1a3d6d74-2978-4800-9f82-1150557d6a7e"},"cover":null,"icon":null,"parent":{"type":"database_id","database_id":"c477220b-b6d3-4e20-ae0e-a288427c2c97"},"archived":false,"in_trash":false,"properties":{"03Token":{"id":"Cml%3D","type":"relation","relation":[{"id":"f5a9719a-e1c1-4cd5-ba9c-3c7043781eb7"}],"has_more":false},"07Remark":{"id":"E_%3BJ","type":"rich_text","rich_text":[]},"05Parent":{"id":"H%3Bdh","type":"rich_text","rich_text":[{"type":"text","text":{"content":"/","link":null},"annotations":{"bold":false,"italic":false,"strikethrough":false,"underline":false,"code":false,"color":"default"},"plain_text":"/","href":null}]},"09Notion_Token":{"id":"IPHA","type":"relation","relation":[{"id":"95b602a6-a239-4e48-99ae-9741dce662dd"}],"has_more":false},"02Type":{"id":"I%7D%3Di","type":"multi_select","multi_select":[{"id":"119e6159-15c8-4bd6-9221-001f23536608","name":"page","color":"purple"}]},"04ParentId":{"id":"%5B_p%3A","type":"rich_text","rich_text":[]},"06API":{"id":"%5CDAA","type":"rich_text","rich_text":[{"type":"text","text":{"content":"notion","link":null},"annotations":{"bold":false,"italic":false,"strikethrough":false,"underline":false,"code":false,"color":"default"},"plain_text":"notion","href":null}]},"01Id":{"id":"_nef","type":"rich_text","rich_text":[{"type":"text","text":{"content":"87df7034cfeb4e04b4db8a8f0f36365d","link":null},"annotations":{"bold":false,"italic":false,"strikethrough":false,"underline":false,"code":false,"color":"default"},"plain_text":"87df7034cfeb4e04b4db8a8f0f36365d","href":null}]},"08level":{"id":"o%7B%7BA","type":"number","number":null},"00Title":{"id":"title","type":"title","title":[{"type":"text","text":{"content":"TestPage","link":null},"annotations":{"bold":false,"italic":false,"strikethrough":false,"underline":false,"code":false,"color":"default"},"plain_text":"TestPage","href":null}]}},"url":"https://www.notion.so/TestPage-d9cf368850804fd486a35a515000525b","public_url":null,"request_id":"61d3c657-00a0-4be0-acdb-017ed74026a3"}
// console.log(page.properties.find(p => p.type === 'title').title[0].plain_text)
// console.log(page.properties)

// Object.entries(page.properties).map([key, val] => )

// for (const [key, value] of Object.entries(page.properties)) {
//     if (value.type === 'title') {
//         console.log(value.title[0].plain_text)
//     }
// }

// console.log(Object.values(page.properties))
const title = Object.values(page.properties).find(obj => obj.type === 'title').title[0].plain_text;
// const title = titleObject.title[0].plain_text;
console.log(title);