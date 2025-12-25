"use client";

import { createTheme, MantineColorsTuple } from "@mantine/core";
import { Noto_Serif_JP } from "next/font/google";

// 1. Google Fonts の設定
// 明朝体 (Serif) を選ぶことで、「身体」や「歴史」を感じさせる少しクラシックな印象にします。
// display: 'swap' はフォント読み込み中の表示崩れを防ぎます。
const notoSerif = Noto_Serif_JP({
  weight: ["300", "400", "500"], // 300(Light)をメインに使うと洗練された印象になります
  subsets: ["latin"],
  display: "swap",
});

// 2. カラーパレットのカスタマイズ
// Mantine標準のdarkモードより、少し青みや赤みを足したり、
// 「舞台の床」のようなマットな質感を出すためのカスタムカラーです。
// ここでは標準的なダークグレーをベースにしています。
const stageBlack: MantineColorsTuple = [
  "#C1C2C5",
  "#A6A7AB",
  "#909296",
  "#5c5f66",
  "#373A40",
  "#2C2E33",
  "#25262B", // default body bg in dark theme (index 6)
  "#1A1B1E", // Darker background (index 7)
  "#141517",
  "#101113",
];

// 3. テーマの生成
export const theme = createTheme({
  // サイト全体のフォント
  fontFamily: notoSerif.style.fontFamily,

  // 見出し(h1-h6)のフォント設定
  headings: {
    fontFamily: notoSerif.style.fontFamily,
    fontWeight: "400", // 太字にしすぎないことでモダンに見せる
    sizes: {
      h1: { fontSize: "2.5rem", lineHeight: "1.2" }, // タイトルは大きく
    },
  },

  // ダークモード時の配色設定
  colors: {
    dark: stageBlack,
  },

  // コンポーネントごとのデフォルト設定 (Global Styles)
  components: {
    // テキストは真っ白(#FFF)ではなく、少しグレー(#C1C2C5)にすることで
    // 暗い背景でも目が疲れにくく、上品に見えます。
    Text: {
      defaultProps: {
        c: "dimmed", // Mantineの "dimmed" カラー(薄いグレー)を標準に
      },
    },
    // ボタンなどの角丸を少し小さくしてシャープに
    Button: {
      defaultProps: {
        radius: "xs",
      },
    },
  },
});
