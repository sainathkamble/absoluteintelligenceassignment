import { NextRequest, NextResponse } from 'next/server';
import { json } from 'stream/consumers';
const DEEP_TRANSLATE_API_KEY =
	'732821232amsh2e15f4e238a646bp17a797jsn6629027f47d7';

export async function POST(req: NextRequest) {
	console.log('inside translate api.ts');
	if (!DEEP_TRANSLATE_API_KEY) {
		console.error(
			'DEEP_TRANSLATE_API_KEY API key is undefined. Please check your .env.local file.'
		);
		return new NextResponse(
			JSON.stringify({
				message: 'DEEP_TRANSLATE_API_KEY API key is not configured.',
			}),
			{ status: 500 }
		);
	}
	const { searchParams } = new URL(req.url);
	const source_language = searchParams.get('source_language');
	const text = searchParams.get('text');
	const target_language = searchParams.get('target_language');
	const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';
	const options = {
		method: 'POST',
		headers: {
			'x-rapidapi-key':
				'732821232amsh2e15f4e238a646bp17a797jsn6629027f47d7',
			'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			q: text,
			source: source_language,
			target: target_language,
		}),
	};
	console.log('options:', options);

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log('result:', result);
		if (!response.ok) {
			return new NextResponse(
				JSON.stringify({
					message: result.error,
				}),
				{ status: response.status }
			);
		}
		const { data } = result;
		const { translations } = data;
		const { translatedText } = translations;
		const responseData = {
			sourceLanguage: source_language,
			targetLanguage: target_language,
			sourceText: text,
			translatedText: translatedText,
		};

		return NextResponse.json(responseData);
	} catch (error) {
		console.error(error);
		throw error;
	}
}
