abstract class Request
{
	protected _GET<T>(url: string, headers: HeadersInit = {})
	{
		return new Promise<T>(async (resolve, reject) =>
		{
			const response = await fetch(url, { method: "GET", headers }); const json = await response.json();

			if (response.ok) return resolve(json); else throw reject(json);
		});
	}

	protected _PUT<T>(url: string, body: object, headers: HeadersInit = {})
	{
		return new Promise<T>(async (resolve, reject) =>
		{
			const response = await fetch(url, { method: "PUT", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) }); const json = await response.json();

			if (response.ok) return resolve(json); else throw reject(json);
		});
	}

	protected _POST<T>(url: string, body: object, headers: HeadersInit = {})
	{
		return new Promise<T>(async (resolve, reject) =>
		{
			const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) }); const json = await response.json();

			if (response.ok) return resolve(json); else throw reject(json);
		});
	}

	protected _DELETE<T>(url: string, headers: HeadersInit = {})
	{
		return new Promise<T>(async (resolve, reject) =>
		{
			const response = await fetch(url, { method: "DELETE", headers }); const json = await response.json();

			if (response.ok) return resolve(json); else throw reject(json);
		});
	}
}

namespace Server
{
	interface Content
	{
		id: number; createdAt: string; updatedAt: string;
	}

	export interface Auth
	{
		user: Content & { image: string; nickname: string; }; accessToken: string; refreshToken: string;
	}

	export interface Bundle<T>
	{
		list: T[]; totalCount: number;
	}
	
	export interface Product extends Content
	{
		name: string; price: number; description: string; tags: string[]; images: string[]; favoriteCount: number; 
	}

	export interface Article extends Content
	{
		title: string; content: string; image?: string; likeCount: number; writer: { id: number; nickname: string; };
	}

	export interface Comment extends Content
	{
		content: string; writer: { id: number; nickname: string; };
	}
}

/** @see https://panda-market-api.vercel.app/docs/#/ */
export default class API
{
	private static query(object: Record<string, unknown>)
	{
		const params = new URLSearchParams();

		for (const [key, value] of Object.entries(object))
		{
			switch (value)
			{
				case null: case undefined:
				{
					// or continue
					break;
				}
				default:
				{
					params.set(key, value as string);
					break;
				}
			}
		}
		return params.toString();
	}

	public static ["auth/signIn"] = new class extends Request
	{
		public POST({ ...body }: { email: string; password: string; }, headers?: HeadersInit)
		{
			return super._POST<Server.Auth>(`https://panda-market-api.vercel.app/auth/signIn`, body, headers);
		}
	};

	public static ["auth/signUp"] = new class extends Request
	{
		public POST({ ...body }: { email: string; nickname: string; password: string; passwordConfirmation: string; }, headers?: HeadersInit)
		{
			return super._POST<Server.Auth>(`https://panda-market-api.vercel.app/auth/signUp`, body, headers);
		}
	};

	public static ["articles"] = new class extends Request
	{
		public GET({ ...query }: { page: number; pageSize: number; orderBy: "recent" | "like"; keyword?: string; }, headers?: HeadersInit)
		{
			return super._GET<Server.Bundle<Server.Article>>(`https://panda-market-api.vercel.app/articles?${API.query(query)}`);
		}
		public POST({ ...body }: { title: string; content: string; image?: string; }, headers?: HeadersInit)
		{
			return super._POST<Server.Article>(`https://panda-market-api.vercel.app/articles`, body, headers);
		}
	};

	public static ["articles/{articleId}"] = new class extends Request
	{
		public GET({ articleId, ...query }: { articleId: number; }, headers?: HeadersInit)
		{
			return super._GET<Server.Article>(`https://panda-market-api.vercel.app/articles/${articleId}`, headers);
		}
	};

	public static ["articles/{articleId}/comments"] = new class extends Request
	{
		public GET({ articleId, ...query }: { articleId: number; limit: number; cursor?: number; }, headers?: HeadersInit)
		{
			return super._GET<Server.Bundle<Server.Comment>>(`https://panda-market-api.vercel.app/articles/${articleId}/comments?${API.query(query)}`, headers);
		}
		public POST({ articleId, ...body }: { articleId: number; content: string; }, headers?: HeadersInit)
		{
			return super._POST<Server.Comment>(`https://panda-market-api.vercel.app/articles/${articleId}/comments`, body, headers);
		}
	};

	public static ["products"] = new class extends Request
	{
		public GET({ ...query }: { page: number; pageSize: number; orderBy: "recent" | "favorite"; keyword?: string; }, headers?: HeadersInit)
		{
			return super._GET<Server.Bundle<Server.Product>>(`https://panda-market-api.vercel.app/products?${API.query(query)}`, headers);
		}
	};

	public static ["products/{productId}"] = new class extends Request
	{
		public GET({ productId, ...query }: { productId: number; }, headers?: HeadersInit)
		{
			return super._GET<Server.Product>(`https://panda-market-api.vercel.app/products/${productId}`, headers);
		}
	};
}
