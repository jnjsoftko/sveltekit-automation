import { error, json } from '@sveltejs/kit';
import { pocketbase } from '$lib/database';

export const GET = async ({ params }) => {
	try {
		const { collection } = params;
		const usersList = await pocketbase.collection(collection).getFullList({
			sort: '-created'
		});

		return json(usersList);
	} catch (err) {
		return error(500, `An error occurred: ${err.message}`);
	}
};
