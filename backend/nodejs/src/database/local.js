import fs from 'fs';
import { loadFile, loadJson, saveFile, saveJson } from 'jnj-lib-base';

export const saveLocalFile = (filePath, content) => {
	const ext = filePath.split('.').pop().toLowerCase();

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

};

export const loadLocalFile = (filePath, content) => {
	let content = loadFile(filePath);
	return loadFile(filePath);
}
