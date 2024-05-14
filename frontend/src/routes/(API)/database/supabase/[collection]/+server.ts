import { supabase } from '$lib/database';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const { collection } = params;
	const { data, error } = await supabase.from(collection!).select('*');

	return json({ data });
};

// export const GET: RequestHandler = async ({ params }) => {
// 	const { collection } = params;
// 	const { data, error } = await supabase.from(collection!).select('*').eq('username', 'moon');

// 	return json({ data });
// };

// export const POST: RequestHandler = async ({ params, request }) => {
// 	const { collection } = params;
// 	const { email, username } = await request.json();

// 	const { data, error } = await supabase.from(collection!).insert([{ email, username }]);

// 	if (error) return json({ status: 500, body: error });
// 	return json({ status: 200, data });
// };


export const POST: RequestHandler = async ({ params, request }) => {
	const { collection } = params;
	const { data, error } = await supabase.from(collection!).insert([await request.json()]);

	if (error) return json({ status: 500, body: error });
	return json({ status: 200, data });
};

// export const PUT: RequestHandler = async ({ request }) => {
// 	const { id, email } = await request.json();

// 	const { data, error } = await sb.from('users').update({ email }).match({ id });

// 	if (error) return { status: 500, body: error };

// 	return { status: 200, body: data };
// };

// export const DELETE: RequestHandler = async ({ request }) => {
//     const formData = await request.json();
//     const { id } = formData;

//     const { data, error } = await supabase
//         .from('users')
//         .delete()
//         .match({ id });

//     if (error) return { status: 500, body: error };

//     return { status: 200, body: data };
// };
