import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { loadFile, loadJson, saveFile, saveJson } from 'jnj-lib-base';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { content, filePath } = await request.json(); // 파일 이름을 포함하여 받음
		const ext = filePath.split('.').pop().toLowerCase();
        console.log(`file ext: ${ext}, content: ${content}`)

		switch (ext) {
			case 'png':
			case 'jpg':
			case 'jpeg':
				saveFile(filePath, content.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');
				break;
			case 'mp3':
			case 'wav':
				saveFile(filePath, content.replace(/^data:audio\/\w+;base64,/, ''), 'base64'); // 파일 저장
				break;
			case 'json':
				saveJson(filePath, content); // 파일 저장
				break;
			default:
				saveFile(filePath, content);
		}
		return json({ message: '이미지가 성공적으로 업로드되었습니다.' });
	} catch (err) {
		return error(500, `이미지 업로드 중 오류가 발생했습니다: ${err.message}`);
	}
};

export function GET({ url }: { url: URL }) {
	const filePath = url.searchParams.get('filePath');
	let content = loadFile(filePath!)!;
	return json({ content });
}
