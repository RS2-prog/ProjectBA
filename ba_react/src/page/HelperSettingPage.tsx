import React, { useEffect, useState } from 'react'
import HelperFrame from '../components/HelperFrame';
import api from '../api/api';
import { HelperStudent, Student } from '../types/Student';
import { TextChoice } from '../types/StudentChoices';

interface HelpersResponse {
  contents: {
    content_choices: TextChoice[];
  };
  helpers: HelperStudent[];
} 

const undefinedStudent: Student = {
  detail: {
    id: -1, impl_order: '000', name: '未設定', wiki_link: '', damage_type: '', armor_type: '', position: '', role: '', s_class: '', school: '', 
  },
  rank: '', level: 0, ex: 0, ns: 0, ss: 0, ps: 0, equip_1: 0, equip_2: 0, equip_3: 0, lim_health: 0, lim_attach: 0, lim_heal: 0, relationship: 0, isOwned: false,
};

const HelperSettingPage: React.FC = () => {
  // ステート
  // ローディング
  const [loading, setLoading] = useState<Boolean>(true);
  const [helpers, setHelpers] = useState<HelperStudent[]>([]);
  const [contents, setContents] = useState<TextChoice[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  
  // 助っ人設定を取得する
  const getHelperSettings = async () => {
    setLoading(true);
    try {
      const response = await api.get<HelpersResponse>('/helpers/setting/');
      setContents(response.data.contents.content_choices);
      const helpersSetting = response.data.helpers;

      const tempHelpers: HelperStudent[] = []; 

      // デフォルト配列作成
      for (const choice of ["1", "2", "3", "4"]) {
        for (const num of [1, 2, 3]) {
          tempHelpers.push({ student: undefinedStudent, content: choice, sort_no: num });
        }
      }
      
      // 助っ人設定内容作成
      helpersSetting.forEach(helper => {
        const temp = tempHelpers.find((temp) => temp.content === helper.content && temp.sort_no === helper.sort_no);
        if (temp) {
          temp.student = helper.student;
        }
      })

      setHelpers(tempHelpers);

      const students_data: Student[] = (await api.get('/students/register/')).data;
      const students: Student[] = students_data.filter(student => student.isOwned = true);
      setStudents(students);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHelperSettings();
  }, []);

  return (
    <div className='h-[95%] w-full flex m-auto whitespace-nowrap overflow-x-auto'>
      {contents.map((content) => (
        <HelperFrame 
          title={content.label}
          helpers={helpers.filter(helper => helper.content === content.value)}
        />
      ))}
    </div>
  )
}

export default HelperSettingPage