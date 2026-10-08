// ═══════════════════════════════════════════════════════════════════
//  مادة تجريبية — المسار: data/sample/sample.js
// ═══════════════════════════════════════════════════════════════════

subjects.push({
  name: 'مادة تجريبية',
  en: 'Sample',
  icon: '🧪',
  lectures: [
    {
      id: 'sample-lecture-01',
      t: 'المحاضرة الأولى — تجريبية',
      d: 'وصف قصير للمحاضرة',
      pdf: 'Software Engineering/lectures/Software Engineering Chapter 1 Lecture 1.pdf',
      sectionTitle: '🧩 سكاشن تجريبية',
      summary: { text: 'ملخص تجريبي قصير للمحاضرة.' },
      links: [
        { t: '🎥 تسجيل فيديو المحاضرة', d: 'مشاهدة التسجيل كاملاً', url: 'https://example.com/video' }
      ],
      questions: [
        {
          q: 'سؤال تجريبي رقم 1؟',
          options: ['الإجابة أ', 'الإجابة ب', 'الإجابة ج', 'الإجابة د'],
          correct: 1,
          translation: 'Sample question number 1?',
          explanation: 'شرح تجريبي: الإجابة ب هي الصحيحة.'
        },
        {
          q: 'سؤال تجريبي رقم 2؟',
          options: ['صح', 'خطأ'],
          correct: 0
        }
      ]
    }
  ],
  testBanks: [
    { t: 'بنك أسئلة المادة', d: 'أسئلة المحاضرة في اختبار واحد', lectures: [0] }
  ]
});