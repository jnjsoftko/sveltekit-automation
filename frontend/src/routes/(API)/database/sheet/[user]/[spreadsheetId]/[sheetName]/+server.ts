import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { dictsFromRows } from 'jnj-lib-base';
import { GoogleSheets } from 'jnj-lib-google';

export const POST: RequestHandler = async ({ request, params }: { request: any; params: any }) => {
	try {
		const { values, start } = await request.json(); // 파일 이름을 받음
		const valueInputOption = 'USER_ENTERED';
		const { user, spreadsheetId, sheetName } = params;
		const googleSheets = new GoogleSheets({ spreadsheetId, user });
		await googleSheets.init();
		await googleSheets.setValues({ values, start, sheetName, valueInputOption });

		return json({ message: '데이터가 성공적으로 업로드되었습니다.' });
	} catch (err) {
		return error(500, `데이터 업로드 중 오류가 발생했습니다: ${err.message}`);
	}
};

// https://192.168.0.42:5172/API/sheet/bigwhitekmc/1abKYQScJlfwLda1u1icdXsN_Tk9Eq-W9g_O2jHEsKqo/경혈학각론?range=A2:J

export async function GET({ params, url }: { params: any; url: URL }) {
	const { user, spreadsheetId, sheetName } = params;
	const range = url.searchParams.get('range');
	const googleSheets = new GoogleSheets({ spreadsheetId, user });
	await googleSheets.init();

	// * Get Values
	const values = await googleSheets.getValues({ range, sheetName });
	const dicts = dictsFromRows(values);
	return json({ dicts });
}
