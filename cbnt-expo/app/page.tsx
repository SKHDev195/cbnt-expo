import ArtworkPage from "./components/ArtworkPage";
import { artworks } from "./data/artworks";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ArtworkRoute({ params }: Props) {
  const { id } = await params;

  const initialIndex = artworks.findIndex(
    (artwork) => String(artwork.id) === id
  );

  if (initialIndex === -1) notFound();

  return <ArtworkPage artworks={artworks} initialIndex={initialIndex} />;
}

// Pre-render all artwork pages at build time
export function generateStaticParams() {
  return artworks.map((artwork) => ({
    id: String(artwork.id),
  }));
}