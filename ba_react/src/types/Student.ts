export type Detail = {
  id: number;
  impl_order: string;
  name: string;
  wiki_link: string;
  damage_type: string;
  armor_type: string;
  position: string;
  role: string;
  s_class: string;
  school: string;
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

export type StudentFilter = {
  damage_type: string | null;
  armor_type: string | null;
  position: string | null;
  role: string | null;
  s_class: string | null;
  school: string | null;
};

export type HelperStudent = {
  student: Student;
  content: string;
  sort_no: number;
};