export interface Artist {
  id: string;
  name: string;
  external_urls: { spotify: string };
  images: { url: string }[];
  popularity: number;
  images: { url: string }[];
}

export interface Track {
  id: string;
  external_urls: { spotify: string };
  popularity: number;
  name: string;
  images: { url: string }[];
  album: { name: string; images: { url: string }[] };
}
