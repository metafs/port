import { notFound } from "next/navigation";
import { getWorks, getWorkById } from "@/lib/microcms";
import WorkDetailClient from "./WorkDetailClient"; // 作成したClient Componentを読み込み

// SSG用のID生成
export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((work) => ({
    id: work.id,
  }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const work = await getWorkById(id);

  if (!work) {
    notFound();
  }

  // データをClient Componentに渡して表示を任せる
  return <WorkDetailClient work={work} />;
}
