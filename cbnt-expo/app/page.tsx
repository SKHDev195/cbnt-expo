import ArtworkPage from "./components/ArtworkPage";
import { artworks } from "./data/artworks";

type PageProps = {
  searchParams?: Promise<{ artwork?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const artworkId = params.artwork;

  const initialIndex =
    artworkId != null
      ? Math.max(
          artworks.findIndex((artwork) => String(artwork.id) === artworkId),
          0
        )
      : 0;

  return <ArtworkPage artworks={artworks} initialIndex={initialIndex} />;
}