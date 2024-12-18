import { getUrl, type RequestOptions } from "./utils";

export class HttpClient {
	private baseUrl: string;
	private headers?: Record<string, string>;

	constructor(baseUrl: string, headers?: Record<string, string>) {
		this.baseUrl = baseUrl;
		this.headers = headers;
	}

	public request = async <T>(options: RequestOptions): Promise<T> => {
		const url = getUrl(this.baseUrl, options.url, options.query);
		const body = JSON.stringify(options.body);
		console.debug({
			msg: "HTTP request",
			url,
			method: options.method,
			headers: this.headers,
			body: options.body,
		});
		const response = await fetch(url, {
			method: options.method,
			headers: this.headers,
			body: body,
		});

		if (!response.ok) {
			console.error({ msg: "HTTP error", status: response.status });
			throw new Error(`HTTP error ${response.status}`);
		}

		const contentType = response.headers.get("content-type");
		let result: T;
		if (contentType?.includes("application/json")) {
			result = (await response.json()) as T;
		} else {
			result = (await response.text()) as T;
		}

		console.debug({ msg: "http result", result });
		return result;
	};
}
