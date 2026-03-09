export interface Titles {
  avgrating: number;
  clist: string; // vem como string no payload (ex.: "\"GB\":\"United Kingdom\",\"US\":\"United States\"")
  id: number;
  imdbid: string;
  imdbrating: number;
  img: string;
  nfid: number;
  poster: string;
  runtime: number;
  synopsis: string;
  title: string;
  titledate: string; // formato YYYY-MM-DD
  top250: number;
  top250tv: number;
  vtype: 'series' | 'movie' | string;
  year: number;
}

export type TitlesResponse = Titles[];
