type RangeChoice = {
  min: number;
  max: number;
};

export type TextChoice = {
  value: string;
  label: string;
};

export type StudentChoices = {
  rank_choices: TextChoice[];
  level_range: RangeChoice;
  ex_skill_range: RangeChoice;
  skill_range: RangeChoice;
  equip_range: RangeChoice;
  limit_range: RangeChoice;
  relationship_range: RangeChoice;
  damage_type_choices: TextChoice[];
  armor_type_choices: TextChoice[];
  position_choices: TextChoice[];
  role_choices: TextChoice[];
  class_choices: TextChoice[];
  school_choices: TextChoice[];
};