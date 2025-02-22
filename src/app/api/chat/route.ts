import { StreamingTextResponse, GoogleGenerativeAIStream, Message } from 'ai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		const reqBody = await req.json();
		const images: string[] = JSON.parse(reqBody.data?.images || '[]'); // Handle optional image data
		const imageParts = filesArrayToGenerativeParts(images);
		const messages: Message[] = reqBody.messages;

		let modelName: string;
		let promptWithParts: any;

		if (imageParts.length > 0) {
			// If images are provided, use a model that handles both text and images (e.g., Gemini Vision)
			modelName = 'gemini-pro-vision';
			const prompt = [...messages]
				.filter((message) => message.role === 'user')
				.pop()?.content;
			promptWithParts = [prompt, ...imageParts];
		} else {
			// If no images, proceed with multi-turn chat
			modelName = 'gemini-pro';
			promptWithParts = buildGoogleGenAIPrompt(messages);
		}
		if (!process.env.GOOGLE_API_KEY) {
			return new Response(
				'GOOGLE_API_KEY is not set in the environment variables',
				{
					status: 500,
				}
			);
		}
		const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
		const model = genAI.getGenerativeModel({ model: modelName });

		console.log('MODELNAME: ' + modelName);
		console.log('PROMPT WITH PARTS: ', promptWithParts);

		// Streaming response from Google Generative AI
		const streamingResponse = await model.generateContentStream(promptWithParts);
		return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
	} catch (error) {
		console.error('chat API request error:', error);
		return new Response(JSON.stringify(error), {
			status: 500,
		});
	}
}

function buildGoogleGenAIPrompt(messages: Message[]) {
	return {
		contents: messages
			.filter((message) => message.role === 'user' || message.role === 'assistant')
			.map((message) => ({
				role: message.role === 'user' ? 'user' : 'model',
				parts: [{ text: message.content }],
			})),
	};
}

function filesArrayToGenerativeParts(images: string[]) {
	return images.map((imageData) => ({
		inlineData: {
			data: imageData.split(',')[1],
			mimeType: imageData.substring(
				imageData.indexOf(':') + 1,
				imageData.lastIndexOf(';')
			),
		},
	}));
}
