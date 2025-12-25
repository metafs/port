// src/types/index.ts

export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

export type Work = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  // 以下、スキーマに合わせて定義
  title: string;
  image?: MicroCMSImage[]; // 複数画像
  body?: string; // テキストエリア（改行ありテキスト）
  date?: string; // 日付フィールド (ISO 8601形式の文字列)
  credit?: string; // テキストエリア
  link?: string; // リッチエディタ（HTML文字列）
};

export type CVData = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  image?: MicroCMSImage; // 単一画像
  cv?: string; // テキストエリア（経歴）
  bio?: string; // テキストエリア（紹介文）
  link?: string; // リッチエディタ（HTML）
};
