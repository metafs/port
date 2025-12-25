import { createClient } from "microcms-js-sdk";
import type { Work, CVData } from "@/types"; // src/types/index.ts で定義した型

// 環境変数のチェック
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// クライアントの初期化
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// Works一覧を取得する関数
export const getWorks = async () => {
  const data = await client.getList<Work>({
    endpoint: "works",
    queries: {
      orders: "-date", // 修正: publishedAt から date に変更
      limit: 100,
    },
  });
  return data.contents;
};

// 詳細ページ用：IDを指定して特定の作品を1つ取得する関数
export const getWorkById = async (id: string) => {
  const data = await client.getListDetail<Work>({
    endpoint: "works",
    contentId: id,
  });
  return data;
};

export const getCVData = async () => {
  const data = await client.getList<CVData>({
    endpoint: "_cv",
  });
  // リスト形式なので contents 配列が返ってきます。
  // その中から「最新の1件」または「最初の1件」だけを返します。
  return data.contents[0];
};
