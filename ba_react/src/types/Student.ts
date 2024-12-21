export type Detail = {
  id: number;
  impl_order: string;
  name: string;
  wiki_link: string;
}

export type Student = {
  detail: Detail;
  rank: string;
  level: number;
  ex: number;
  ns: number;
  ss: number;
  ps: number;
  equip_1: number;
  equip_2: number;
  equip_3: number;
  lim_health: number;
  lim_attach: number;
  lim_heal: number;
  relationship: number;
  isOwned: boolean;
};