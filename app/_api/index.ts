abstract class Request
{
	protected async _GET<T>(url: string)
	{
		return await (await fetch(url, { method: "GET" })).json() as T;
	}

	protected async _PUT(url: string, body: object)
	{
		return await (await fetch(url, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })).json();
	}

	protected async _POST(url: string, body: object)
	{
		return await (await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })).json();
	}

	protected async _DELETE(url: string)
	{
		return await (await fetch(url, { method: "DELETE" })).json();
	}
}

namespace Server
{
	interface Content
	{
		id: number; createdAt: string; updatedAt: string;
	}

	export interface Bundle<T>
	{
		list: T[]; totalCount: number;
	}
	
	export interface Article extends Content
	{
		title: string; content: string; image?: string; likeCount: number; writer: { id: number; nickname: string; };
	}

	export interface Product extends Content
	{
		name: string; price: number; description: string; tags: string[]; images: string[]; favoriteCount: number; 
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

	public static ["articles"] = new class extends Request
	{
		public GET({ ...query }: { page: number; pageSize: number; orderBy: "recent" | "like"; keyword?: string; })
		{
			return super._GET<Server.Bundle<Server.Article>>(`https://panda-market-api.vercel.app/articles?${API.query(query)}`);
		}
	};

	public static ["articles/{articleId}"] = new class extends Request
	{
		public GET({ articleId, ...query }: { articleId: number; })
		{
			return super._GET<Server.Article>(`https://panda-market-api.vercel.app/articles/${articleId}`);
		}
	};

	public static ["products"] = new class extends Request
	{
		public GET({ ...query }: { page: number; pageSize: number; orderBy: "recent" | "favorite"; keyword?: string; })
		{
			return super._GET<Server.Bundle<Server.Product>>(`https://panda-market-api.vercel.app/products?${API.query(query)}`);
		}
	};

	public static ["products/{productId}"] = new class extends Request
	{
		public GET({ productId, ...query }: { productId: number; })
		{
			return super._GET<Server.Product>(`https://panda-market-api.vercel.app/products/${productId}`);
		}
	};
}
