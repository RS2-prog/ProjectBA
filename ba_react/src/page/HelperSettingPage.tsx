import React, { useEffect, useState } from 'react'
import HelperFrame from '../components/HelperFrame';
import api from '../api/api';
import { HelperStudent, Student } from '../types/Student';
import { TextChoice } from '../types/StudentChoices';
import StudentSelector from '../modals/StudentSelector';

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
  const [loading, setLoading] = useState<boolean>(true);
  // 助っ人リスト
  const [helpers, setHelpers] = useState<HelperStudent[]>([]);
  // コンテンツリスト
  const [contents, setContents] = useState<TextChoice[]>([]);
  // 所持生徒リスト
  const [students, setStudents] = useState<Student[]>([]);
  // 生徒セレクター表示状態
  const [selectorOpen, setSelectorOpen] = useState<boolean>(false);
  // 設定する助っ人
  const [helperToSet, setHelperToSet] = useState<HelperStudent | null>(null);
  // 選択された生徒
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  
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

      // 設定用の所属生徒リストを取得
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

  // 助っ人設定
  const setHelper = async() => {
    console.log(selectedStudent);
    console.log(helperToSet);
    if (selectedStudent === null && (helperToSet === null ||  helperToSet?.student.detail.id === -1)) {
      switchStudentSelector();
      return;
    }
    const newHelper = {...helperToSet, student: selectedStudent};
    setLoading(true);
    try {
      const response = await api.post('/helpers/setting/', 
        { helper: newHelper }
      );
      switchStudentSelector();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 生徒選択モーダル制御
  const switchStudentSelector = () => {
    if (selectorOpen) {setSelectorOpen(false);}
    else {setSelectorOpen(true);}
  };

  // 生徒選択ハンドラー
  const handleSelectedStudent = (student: Student | null) => {
    setSelectedStudent(student);
  };

  // 助っ人設定ボタンイベント
  const handleSettingBtn = (helper: HelperStudent) => {
    switchStudentSelector();
    setHelperToSet(helper);
  };


  if (loading) return <div>Loading...</div>

  return (
    <div className='h-[95%] w-full flex m-auto whitespace-nowrap overflow-x-auto'>
      <StudentSelector 
        isOpen={selectorOpen} 
        students={students} 
        onClose={switchStudentSelector}  
        onSelect={handleSelectedStudent}
        onConfirm={setHelper}      
      />
      {contents.map((content) => (
        <HelperFrame 
          title={content.label}
          helpers={helpers.filter(helper => helper.content === content.value)}
          onClick={handleSettingBtn}
        />
      ))}
    </div>
  )
}

export default HelperSettingPage