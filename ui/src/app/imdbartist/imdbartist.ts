export class Link {
  rel: string;
  href: string;
}

/*
  This is sort of a data transfer object
 */
export class ImdbArtist {
  nconst: string;
  full_name: string;
  birth_year: string;
  death_year: string;
  primaryProfession: string;
  knownForTitles: string;
}

export class ImdbArtistRsp {
  data: ImdbArtist;
  links: Array<Link>;
}
