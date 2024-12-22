type RangeChoice = {
  min: number;
  max: number;
};

type RankChoice = {
  value: string;
  label: string;
};

export type StudentChoices = {
  rank_choices: RankChoice[];
  level_range: RangeChoice;
  ex_skill_range: RangeChoice;
  skill_range: RangeChoice;
  equip_range: RangeChoice;
  limit_range: RangeChoice;
  relationship_range: RangeChoice;
};