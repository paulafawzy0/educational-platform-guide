// ============================================================
// 1) تطبيع بيانات المادة + التحميل الديناميكي
// ============================================================
function lecSlug(text){
  if(!text) return '';
  return String(text).toLowerCase().trim()
    .replace(/[\u064B-\u0652]/g, '')
    .replace(/[\s\u200f\u200e]+/g, '-')
    .replace(/[^\w\u0600-\u06FF-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
function ensureSubjectSlug(meta, i){
  if(meta && !meta.slug){
    var base = (meta.en || meta.name || ('subject-' + i));
    meta.slug = String(base).toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'').replace(/-+/g,'-').replace(/^-|-$/g,'') || ('subject-' + i);
  }
  return meta && meta.slug;
}
function ensureLectureIds(s){
  if(!s || !s.lectures) return;
  s.lectures.forEach(function(l, i){
    if(!l.id) l.id = lecSlug(l.t) || ('lecture-' + (i+1));
  });
}

function normalizeSubject(s){
  if(!s.lectures) s.lectures = [];
  s.lectures.forEach(function(l){
    if(!l.links){
      l.links = [
        {t:"🎥 تسجيل فيديو المحاضرة", d:"مشاهدة تسجيل المحاضرة كاملاً", url:""},
        {t:"📑 سلايدات المحاضرة (Slides)", d:"تحميل عرض الشرائح الخاص بالمحاضرة", url:""},
        {t:"🌐 مصادر ومراجع خارجية", d:"روابط إضافية للقراءة والاستزادة", url:""}
      ];
    }
  });
  if(!s.midterms) s.midterms = [];
  if(!s.finals) s.finals = [];
  if(s.midtermsCategories && s.midtermsCategories.length) flattenExamCategories(s, 'midtermsCategories', 'midterms');
  if(s.finalsCategories && s.finalsCategories.length) flattenExamCategories(s, 'finalsCategories', 'finals');
  if(!s.testBanks || !s.testBanks.length) {
      s.testBanks = [{t:"بنك أسئلة المادة", d:"جميع أسئلة المحاضرات في اختبار واحد", lectures:[0,1,2,3]}];
  }
  if(!s.linkCategories) s.linkCategories = [];
  ensureLectureIds(s);
}

function flattenExamCategories(s, catProp, flatProp){
  var cats = s[catProp] || [];
  var flat = [];
  var groups = [];
  cats.forEach(function(cat){
    (cat.items || []).forEach(function(item){
      flat.push(item);
      groups.push({category: cat.category || 'عام', icon: cat.icon || '📁'});
    });
  });
  s[flatProp] = flat;
  s['_' + flatProp + 'Groups'] = groups;
}

var _loadingPromises = {};

function loadSubject(i){
  var meta = SUBJECTS_INDEX[i];
  if(!meta) return Promise.reject(new Error('مادة غير موجودة'));
  if(subjects[i]) return Promise.resolve(subjects[i]);
  if(_loadingPromises[meta.slug]) return _loadingPromises[meta.slug];

  var before = subjects.length;
  var p = new Promise(function(resolve, reject){
    var script = document.createElement('script');
    script.src = meta.file;
    script.async = true;
    script.onload = function(){
      var added = subjects.length - before;
      var data = null;
      if(added === 1){ data = subjects.pop(); }
      else if(added > 1){ data = subjects.splice(before, added)[0]; }
      if(!data){ reject(new Error('الملف ما أضافش بيانات للمادة')); return; }
      subjects[i] = data;
      normalizeSubject(data);
      ensureSubjectSlug(SUBJECTS_INDEX[i], i);
      resolve(data);
    };
    script.onerror = function(){ reject(new Error('فشل تحميل الملف: ' + meta.file)); };
    document.head.appendChild(script);
  });

  _loadingPromises[meta.slug] = p;
  p.finally(function(){ delete _loadingPromises[meta.slug]; });
  return p;
}

function getActiveSubjects(){
  var out = [];
  for(var i = 0; i < SUBJECTS_INDEX.length; i++){
    if(SUBJECTS_INDEX[i].active !== false) out.push(i);
  }
  return out;
}

function showSubjectLoading(){
  var box = document.getElementById('lectures-list');
  if(box){
    box.innerHTML =
      '<div class="subject-loader">' +
        '<div class="spinner-ring"></div>' +
        '<div class="loader-text">⏳ جاري تحميل بيانات المادة...</div>' +
      '</div>';
  }
}

// ============================================================
// 2) الثيمات
// ============================================================
var themeMode = localStorage.getItem('themeMode') || 'auto';
if(themeMode === 'light') themeMode = 'noon';
if(themeMode === 'dark')  themeMode = 'night';
try{ localStorage.setItem('themeMode', themeMode); }catch(e){}

var demoInterval = null, isDemoRunning = false;
var themeNames = {morning:'🌅 Morning', noon:'☀️ Noon', afternoon:'🌇 Afternoon', night:'🌙 Night'};

function setThemeMode(mode){
  themeMode = mode;
  localStorage.setItem('themeMode', mode);
  updateThemeUI();
  applyTimeTheme();
}
function updateThemeUI(){
  document.querySelectorAll('.theme-pill').forEach(function(b){
    b.classList.toggle('active', b.getAttribute('data-mode') === themeMode);
  });
  var ctrl = document.getElementById('theme-controls');
  if(themeMode === 'auto') ctrl.classList.add('auto-visible');
  else ctrl.classList.remove('auto-visible');
}
function getAutoTheme(h){
  if(h >= 6  && h < 12) return 'morning';
  if(h >= 12 && h < 15) return 'noon';
  if(h >= 15 && h < 18) return 'afternoon';
  return 'night';
}
function applyTheme(t){ document.documentElement.setAttribute('data-theme', t); }
function applyTimeTheme(){
  if(themeMode === 'auto') applyTheme(getAutoTheme(new Date().getHours()));
  else applyTheme(themeMode);
  updateStatusBar();
}
function formatTime(d){
  var h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
  var ap = h >= 12 ? 'PM' : 'AM';
  var h12 = h % 12 || 12;
  return h12 + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0') + ' ' + ap;
}
function updateStatusBar(){
  var themeSpan = document.getElementById('sb-theme');
  var cur = document.documentElement.getAttribute('data-theme') || 'noon';
  if(themeSpan){ themeSpan.textContent = themeNames[cur] || cur; }
}
function runDemo(){
  if(isDemoRunning) return;
  isDemoRunning = true;
  var btn = document.getElementById('demo-btn');
  btn.textContent = '⏸ Running...'; btn.style.animation = 'none';
  var stages = ['morning','noon','afternoon','night'];
  var idx = 0;
  applyTheme(stages[0]); updateStatusBar();
  demoInterval = setInterval(function(){
    idx++;
    if(idx >= stages.length){
      clearInterval(demoInterval); isDemoRunning = false;
      btn.textContent = '▶ Run 24h Demo'; btn.style.animation = '';
      applyTimeTheme(); return;
    }
    applyTheme(stages[idx]); updateStatusBar();
  }, 2500);
}
(function initTheme(){
  var validModes = ['noon', 'night', 'auto'];
  if(validModes.indexOf(themeMode) === -1){
    themeMode = 'auto';
    try{ localStorage.setItem('themeMode', 'auto'); }catch(e){}
  }
  updateThemeUI();
  applyTimeTheme();
})();
setInterval(function(){
  if(isDemoRunning || themeMode !== 'auto' || document.hidden) return;
  if(document.documentElement.getAttribute('data-theme') !== getAutoTheme(new Date().getHours())) applyTimeTheme();
}, 30000);
document.addEventListener('visibilitychange', function(){
  if(!document.hidden && !isDemoRunning && themeMode === 'auto') applyTimeTheme();
});

// ============================================================
// 3) زر الصعود
// ============================================================
var sttBtn = document.getElementById('scroll-to-top');
window.addEventListener('scroll', function(){ sttBtn.classList.toggle('visible', window.scrollY > 350); });
function scrollToTop(){ window.scrollTo({top:0, behavior:'smooth'}); }

// ============================================================
// 4) الإشعارات
// ============================================================
var notifications = [],
  notifSeq = 0;
var answerEditsLog = [{ id: "edit-001", context: "المحاضرة الأولى", questionNum: 1, questionText: "", oldAnswer: "الإجابة القديمة", newAnswer: "الإجابة الصحيحة الجديدة" }];
var lecturesAddedLog = [];
// نموذج إضافة إشعار عام (Info Notification)
addNotification({
  type: "info",
  title: "📢 تنبيه هام بشأن جدول الاختبارات",
  context: "مادة البرمجة الكائنية",
  questionText: "تم إتاحة نموذج اختبار تجريبي جديد على المنصة، يرجى مراجعته قبل موعد الاختبار النهائي.",
  score: undefined // يمكنك وضع رقم هنا إذا كان الإشعار يرتبط بنتيجة اختبار (مثال: 85)
});
function loadNotifications(){
  try{ var n = localStorage.getItem('notifications_data'); if(n) notifications = JSON.parse(n); }catch(e){ notifications = []; }
}
function saveNotifications(){ try{ localStorage.setItem('notifications_data', JSON.stringify(notifications)); }catch(e){} }
function addNotification(notif){
  notif.id = Date.now() + (++notifSeq); notif.read = false;
  notif.time = formatTime(new Date()); notif.date = new Date().toLocaleDateString('ar-EG');
  if(!notif.type) notif.type = 'info';
  notifications.unshift(notif);
  if(notifications.length > 50) notifications = notifications.slice(0,50);
  saveNotifications(); updateNotifBadge(); renderNotifDropdown();
}
function addAuditLog(entry){
  addNotification({type:'audit', title:'📝 تم تعديل إجابة سؤال', context:entry.context, questionNum:entry.questionNum, questionText:entry.questionText, oldAnswer:entry.oldAnswer, newAnswer:entry.newAnswer});
}
function addLectureAddedLog(entry){
  addNotification({type:'lecture_added', title:'📚 تمت إضافة محاضرة جديدة', subject:entry.subject, lectureTitle:entry.lectureTitle, lectureDesc:entry.lectureDesc});
}
function truncateText(text, maxLen){
  if(!text) return '';
  text = String(text);
  return text.length > maxLen ? text.substring(0, maxLen) + '...' : text;
}
function updateNotifBadge(){
  var b = document.getElementById('notif-badge');
  var unread = notifications.filter(function(n){ return !n.read; }).length;
  if(unread > 0){ b.style.display='flex'; b.textContent = unread>99 ? '99+' : unread; } else b.style.display='none';
}
function toggleNotifDropdown(){
  var dd = document.getElementById('notif-dropdown');
  dd.classList.toggle('show');
  if(dd.classList.contains('show')) renderNotifDropdown();
}
function renderNotifDropdown(){
  var list = document.getElementById('notif-list');
  if(notifications.length === 0){ list.innerHTML = '<div class="notif-empty">لا توجد إشعارات حالياً</div>'; return; }
  var html = '';
  notifications.forEach(function(n){
    var cls = n.read ? '' : 'unread';
    html += '<div class="notif-item ' + cls + '" onclick="markNotifRead(event,' + (Number(n.id) || 0) + ')">';
    if(n.type === 'audit'){
      html += '<strong>' + esc(n.title) + '</strong>';
      html += '<span class="notif-detail">📁 ' + esc(n.context) + ' | سؤال #' + esc(n.questionNum) + '</span>';
      html += '<span class="notif-detail">📝 السؤال: ' + esc(truncateText(n.questionText, 60)) + '</span>';
      html += '<span class="notif-detail">❌ القديمة: <del>' + esc(n.oldAnswer) + '</del> → ✅ الجديدة: <strong>' + esc(n.newAnswer) + '</strong></span>';
    }else if(n.type === 'lecture_added'){
      html += '<strong>' + esc(n.title) + '</strong>';
      html += '<span class="notif-detail">📁 المادة: ' + esc(n.subject) + '</span>';
      html += '<span class="notif-detail">📚 المحاضرة: ' + esc(n.lectureTitle) + '</span>';
      if(n.lectureDesc) html += '<span class="notif-detail">📝 ' + esc(truncateText(n.lectureDesc, 60)) + '</span>';
    }else{
      html += '<strong>' + esc(n.title || 'إشعار') + '</strong>';
      if(n.context) html += '<span class="notif-detail">📁 ' + esc(n.context) + '</span>';
      if(n.questionText) html += '<span class="notif-detail">📝 ' + esc(truncateText(n.questionText, 60)) + '</span>';
      if(n.score !== undefined) html += '<span class="notif-detail">🏆 النتيجة: ' + esc(n.score) + '%</span>';
    }
    html += '<div class="notif-meta">🕐 ' + esc(n.time) + ' | 📅 ' + esc(n.date) + '</div>';
    html += '</div>';
  });
  list.innerHTML = html;
}
function markNotifRead(e, id){
  e.stopPropagation();
  notifications.forEach(function(n){ if(n.id===id) n.read = true; });
  saveNotifications(); updateNotifBadge(); renderNotifDropdown();
}
function clearAllNotifications(e){
  e.stopPropagation();
  notifications = []; saveNotifications(); updateNotifBadge(); renderNotifDropdown();
}
function syncAnswerEditsLog(){
  var seenIds = [];
  try{ seenIds = JSON.parse(localStorage.getItem('seen_system_edits') || '[]'); }catch(e){ seenIds = []; }
  if(!Array.isArray(seenIds)) seenIds = [];
  var changed = false;
  answerEditsLog.forEach(function(entry){
    if(seenIds.indexOf(entry.id) === -1){
      addAuditLog({context:entry.context, questionNum:entry.questionNum, questionText:entry.questionText, oldAnswer:entry.oldAnswer, newAnswer:entry.newAnswer});
      seenIds.push(entry.id); changed = true;
    }
  });
  if(changed){ try{ localStorage.setItem('seen_system_edits', JSON.stringify(seenIds)); }catch(e){} }
}
function syncLecturesAddedLog(){
  var seenIds = [];
  try{ seenIds = JSON.parse(localStorage.getItem('seen_added_lectures') || '[]'); }catch(e){ seenIds = []; }
  if(!Array.isArray(seenIds)) seenIds = [];
  var changed = false;
  lecturesAddedLog.forEach(function(entry){
    if(seenIds.indexOf(entry.id) === -1){
      addLectureAddedLog(entry);
      seenIds.push(entry.id); changed = true;
    }
  });
  if(changed){ try{ localStorage.setItem('seen_added_lectures', JSON.stringify(seenIds)); }catch(e){} }
}
document.addEventListener('click', function(e){
  var wrap = document.getElementById('notif-bell-wrap');
  var dd = document.getElementById('notif-dropdown');
  if(wrap && dd && !wrap.contains(e.target)) dd.classList.remove('show');
});

// ============================================================
// 5) أدوات مساعدة
// ============================================================
function esc(s){
  return String(s==null?'':s).replace(/[&<>"']/g, function(c){
    return c==='&'?'&amp;':c==='<'?'&lt;':c==='>'?'&gt;':c==='"'?'&quot;':'&#39;';
  });
}
function escAttr(s){ return esc(s); }
function showToast(msg){
  var el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(el._t); el._t = setTimeout(function(){ el.classList.remove('show'); }, 2400);
}

// ============================================================
// ملفات أوفلاين: لو مفيش نت والملف لسه مش محمّل
// ============================================================
var OPENED_KEY = 'opened_files_v1', FILE_CACHE = 'opened-files-v1', _offlinePending = {};
function isOffline(){ return typeof navigator.onLine === 'boolean' && !navigator.onLine; }
function openedSet(){ try{ return JSON.parse(localStorage.getItem(OPENED_KEY)) || {}; }catch(e){ return {}; } }
function wasOpened(url){ return !!openedSet()[url]; }
function markOpened(url){
  var o = openedSet(), keys = Object.keys(o);
  if(o[url]) return;
  if(keys.length >= 300) delete o[keys[0]];
  o[url] = 1;
  try{ localStorage.setItem(OPENED_KEY, JSON.stringify(o)); }catch(e){}
}
function fileCachePut(url, resp){
  try{ if(window.caches) caches.open(FILE_CACHE).then(function(c){ return c.put(url, resp); }).catch(function(){}); }catch(e){}
}
function fileCacheGet(url){
  try{ if(window.caches) return caches.match(url, {cacheName: FILE_CACHE}).catch(function(){}); }catch(e){}
  return Promise.resolve(undefined);
}
function offlineNoteHTML(url, boxId){
  var local = !!pdfViewerUrl(url);
  return '<div class="offline-note" role="status"><b>📴 الملف ده مش محمّل</b>'+
    '<p>'+(local
      ? 'مفيش إنترنت دلوقتي، والملف ده لسه ماتفتحش قبل كده على جهازك. افتحه مرة وإنت متصل بالإنترنت علشان يتحفظ ويفتح بعد كده من غير نت.'
      : 'مفيش إنترنت دلوقتي، والملف ده على رابط خارجي ومحتاج إنترنت علشان يفتح.')+'</p>'+
    (boxId ? '<button type="button" class="btn-sm" onclick="retryAttach(\''+boxId+'\')">🔄 إعادة المحاولة</button>' : '')+
  '</div>';
}
function replaceWithNote(el, url){
  var host = (el.closest && el.closest('.pdf-viewer')) || el.parentNode;
  if(!host || !host.parentNode) return;
  var d = document.createElement('div');
  d.innerHTML = offlineNoteHTML(url, '');
  host.parentNode.replaceChild(d.firstChild, host);
}
function retryAttach(id){
  var p = _offlinePending[id];
  if(!p) return;
  if(isOffline()){ showToast('📴 لسه مفيش إنترنت'); return; }
  delete _offlinePending[id];
  renderAttachCard(id, p.t, p.u);
}
window.addEventListener('online', function(){
  Object.keys(_offlinePending).forEach(function(id){
    var p = _offlinePending[id], b = document.getElementById(id);
    delete _offlinePending[id];
    if(b && b.querySelector('.offline-note')) renderAttachCard(id, p.t, p.u);
  });
});
function isLatinText(s){
  var letters = String(s==null?'':s).replace(/[^A-Za-z\u0600-\u06FF]/g,'');
  if(!letters) return false;
  var latin = (letters.match(/[A-Za-z]/g) || []).length;
  return (latin / letters.length) > 0.5;
}

// ============================================================
// 5.5) استيراد تعديلات PDF
// ============================================================
function importAnnotationsFromFile(btn){
  var card = btn.closest('.attach-card');
  if(!card) return;
  var iframe = card.querySelector('iframe.annotator-iframe');
  if(!iframe || !iframe.contentWindow){
    showToast('⚠️ قلم PDF مش جاهز — استنى شوية');
    return;
  }
  var input = document.createElement('input');
  input.type = 'file'; input.accept = 'application/pdf,.pdf';
  input.onchange = function(ev){
    var file = ev.target.files && ev.target.files[0];
    if(!file) return;
    var reader = new FileReader();
    reader.onload = function(){
      var buf = reader.result;
      try{
        iframe.contentWindow.postMessage({type: 'merge-annotations-from-pdf', bytes: buf, name: file.name}, '*', [buf]);
        showToast('⏳ جاري فحص الملف...');
      }catch(err){ showToast('❌ فشل إرسال الملف للـ PDF'); }
    };
    reader.readAsArrayBuffer(file);
  };
  input.click();
}
window.addEventListener('message', function(e){
  if(!e.data || typeof e.data !== 'object') return;
  if(e.data.type === 'merge-annotations-result'){
    if(e.data.success){ showToast('✅ تم نقل ' + (e.data.count || 0) + ' تعديل'); }
    else { showToast('❌ ' + (e.data.error || 'فشل النقل')); }
  }
});

// ============================================================
// 6) نظام المواد
// ============================================================
var currentSubject = 0, currentLecture = -1;

function renderSubjectBar(){
document.getElementById('subject-bar').innerHTML = dashBtnHtml() + progBtnHtml() + SUBJECTS_INDEX.map(function(s,i){
  if(s.active === false) return '';
    return '<button class="subj-btn '+((i===currentSubject && !document.body.classList.contains('dashboard-mode') && !document.body.classList.contains('instructors-mode') && !document.body.classList.contains('progress-mode'))?'active':'')+'" onclick="selectSubject('+i+')">'+
      '<span>'+(s.icon || '📚')+'</span>'+
      '<span style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.25;">'+
        '<span>'+esc(s.name)+'</span>'+
        (s.en ? '<span style="font-size:10px;opacity:.8;font-weight:normal;">'+esc(s.en)+'</span>' : '')+
      '</span></button>';
  }).join('');
}

function selectSubject(i, skipUrlUpdate){
  if(!SUBJECTS_INDEX[i] || SUBJECTS_INDEX[i].active === false) return;
  document.body.classList.remove('dashboard-mode');
  document.body.classList.remove('instructors-mode');
  document.body.classList.remove('progress-mode');
  hideNotFoundPage();
  currentSubject = i;
  closeQuizEverywhere();
  secResetForSubject(); /* ★ التعديل 9 */

  var meta = SUBJECTS_INDEX[i];
  document.getElementById('main-title').textContent = 'منصة مادة ' + meta.name + (meta.en ? ' — ' + meta.en : '');
  renderSubjectBar();

  var tb = document.querySelectorAll('#main-view .tabs .tab-button');
  tb.forEach(function(b,idx){ b.classList.toggle('active', idx===0); });
  document.getElementById('section1').classList.add('active');
  document.getElementById('section2').classList.remove('active');

  showView('main-view');
  window.scrollTo({top:0, behavior:'smooth'});

  if(!subjects[i]){
    showSubjectLoading();
    loadSubject(i).then(function(){
      resetSubTabs();
      updateSubTabsVisibility(subjects[i]);
      renderAllLists();
      saveLS({subject:i, view:'main', lecture:-1, prop:null, qidx:null, tab:'section1', subTab:'sub-lectures'});
    }).catch(function(err){
      document.getElementById('lectures-list').innerHTML =
        '<p style="color:var(--danger);padding:24px;text-align:center;font-weight:bold;">⚠️ ' + esc(err.message) + '</p>' +
        '<p style="text-align:center;color:var(--text-hint);">تأكدي إن الملف موجود في مجلد datenew/</p>';
      showToast('فشل تحميل المادة');
    });
  }else{
    resetSubTabs();
    updateSubTabsVisibility(subjects[i]);
    renderAllLists();
    saveLS({subject:i, view:'main', lecture:-1, prop:null, qidx:null, tab:'section1', subTab:'sub-lectures'});
  }

  if(!skipUrlUpdate){
    try{ history.pushState({subject: meta.slug, view:'main'}, '', urlForSubject(i)); }catch(e){}
  }
}

function showView(id){
  ['main-view','lecture-view','quiz-view','dashboard-view','instructors-view','progress-view'].forEach(function(v){
    var el = document.getElementById(v);
    if(el) el.classList.toggle('active', v === id);
  });
  document.body.classList.toggle('progress-mode', id === 'progress-view');
  if(id !== 'lecture-view' && typeof secResetUI === 'function') secResetUI();
}

function openTab(evt, id){
  var btns = document.querySelectorAll('#main-view .tabs .tab-button');
  btns.forEach(function(b){ b.classList.remove('active'); });
  if(evt && evt.currentTarget){ evt.currentTarget.classList.add('active'); }
  else if(btns[id === 'section1' ? 0 : 1]){ btns[id === 'section1' ? 0 : 1].classList.add('active'); }
  document.getElementById('section1').classList.toggle('active', id === 'section1');
  document.getElementById('section2').classList.toggle('active', id === 'section2');
  saveLS({tab:id});
  if(id === 'section2') renderActiveSubList();
}

function openSubTab(evt, id){
  document.querySelectorAll('#sub-tabs-container .sub-tab-button').forEach(function(b){ b.classList.remove('active'); });
  if(evt && evt.currentTarget) evt.currentTarget.classList.add('active');
  document.querySelectorAll('#section2 .sub-content').forEach(function(d){ d.classList.toggle('active', d.id === id); });
  saveLS({subTab:id});
  renderActiveSubList();
}

function updateSubTabsVisibility(s) {
    if (!s) return;
    var btnMid = document.getElementById('tab-btn-mid');
    var btnFinal = document.getElementById('tab-btn-final');
    if (btnMid) btnMid.style.display = (s.midterms && s.midterms.length > 0) ? 'inline-block' : 'none';
    if (btnFinal) btnFinal.style.display = (s.finals && s.finals.length > 0) ? 'inline-block' : 'none';
    var activeSubContent = document.querySelector('#section2 .sub-content.active');
    if (activeSubContent) {
        if ((activeSubContent.id === 'sub-mid' && (!s.midterms || s.midterms.length === 0)) ||
            (activeSubContent.id === 'sub-final' && (!s.finals || s.finals.length === 0))) {
            var defaultTabBtn = document.querySelector('#sub-tabs-container .sub-tab-button');
            if (defaultTabBtn) openSubTab({ currentTarget: defaultTabBtn }, 'sub-lectures');
        }
    }
}

function resetSubTabs(){
  document.querySelectorAll('#sub-tabs-container .sub-tab-button').forEach(function(b,i){ b.classList.toggle('active', i===0); });
  document.querySelectorAll('#section2 .sub-content').forEach(function(d){ d.classList.toggle('active', d.id==='sub-lectures'); });
  renderActiveSubList();
}

// ============================================================
// 7) الحفظ
// ============================================================
var _progCache = {}, _savedCache = {};

function progressMap(s){
  var k = 'quiz_progress_' + (s ? s.name : '');
  if(_progCache[k] === undefined){
    try{ var raw = localStorage.getItem(k); _progCache[k] = (raw ? JSON.parse(raw) : {}) || {}; }catch(e){ _progCache[k] = {}; }
  }
  return _progCache[k];
}
function savedCache(s){
  var n = s ? s.name : '';
  if(_savedCache[n]) return _savedCache[n];
  var prefix = 'qa_' + n + '_', map = {};
  try{
    for(var i = 0; i < localStorage.length; i++){
      var k = localStorage.key(i);
      if(k && k.indexOf(prefix) === 0){
        try{
          var o = JSON.parse(localStorage.getItem(k));
          if(o && typeof o === 'object' && o.answers) map[k.slice(prefix.length)] = o.answers;
          else if(o && typeof o === 'object') map[k.slice(prefix.length)] = o;
        }catch(e){}
      }
    }
  }catch(e){}
  _savedCache[n] = map;
  return map;
}
function getSavedQuizFor(s, key){
  var m = savedCache(s);
  return (m && m[key]) ? m[key] : {};
}
function saveQuizProgress(s, key, answers){
  try{ localStorage.setItem('qa_' + (s ? s.name : '') + '_' + key, JSON.stringify(answers)); }catch(e){}
  var n = s ? s.name : '';
  if(_savedCache[n]) _savedCache[n][key] = answers;
}
function clearSavedQuiz(s, key){
  try{ localStorage.removeItem('qa_' + (s ? s.name : '') + '_' + key); }catch(e){}
  var n = s ? s.name : '';
  if(_savedCache[n]) delete _savedCache[n][key];
}
function getScore(s, key){
  var m = progressMap(s);
  return (m && m[key]) ? m[key] : null;
}
function saveScore(s, key, res){
  try{
    var raw = localStorage.getItem('quiz_progress_' + (s ? s.name : ''));
    var o = {};
    try{ o = raw ? JSON.parse(raw) : {}; }catch(e){ o = {}; }
    if(!o || typeof o !== 'object' || Array.isArray(o)) o = {};
    o[key] = res;
    localStorage.setItem('quiz_progress_' + (s ? s.name : ''), JSON.stringify(o));
  }catch(e){}
  progressMap(s)[key] = res;
}

var LSKEY = 'last_open_state';
function saveLS(patch){
  var o = {};
  try{ var r = localStorage.getItem(LSKEY); if(r) o = JSON.parse(r) || {}; }catch(e){}
  for(var k in patch){ o[k] = patch[k]; }
  try{ localStorage.setItem(LSKEY, JSON.stringify(o)); }catch(e){}
}

var SECTIONS_KEY = 'cg_sections_v1';
var sectionStates = { pdf:false, questions:true };
function loadSectionStates(){
  try{
    var raw = localStorage.getItem(SECTIONS_KEY);
    if(raw){
      var o = JSON.parse(raw);
      if(o && typeof o === 'object'){
        if(typeof o.pdf === 'boolean') sectionStates.pdf = o.pdf;
        if(typeof o.questions === 'boolean') sectionStates.questions = o.questions;
      }
    }
  }catch(e){}
}
function saveSectionStates(){
  try{ localStorage.setItem(SECTIONS_KEY, JSON.stringify(sectionStates)); }catch(e){}
}

// ============================================================
// 8) بناء الاختبارات
// ============================================================
function getQuizData(s, exam){
  if(exam.questions && exam.questions.length) return exam.questions;
  var out = [];
  (exam.lectures || []).forEach(function(li){
    var lec = (s && s.lectures) ? s.lectures[li] : null;
    if(lec && lec.questions) lec.questions.forEach(function(q){ out.push(q); });
  });
  return out;
}
function lecQuizKey(l){ return (l && l.t) ? l.t : 'محاضرة'; }
function lecExamKey(l){ return 'كويز ' + ((l && l.t) ? l.t : 'محاضرة'); }

// ============================================================
// 9) القوائم
// ============================================================
var renderedTabs = {};

function renderAllLists(){
  renderLecturesList();
  renderQuizLists();
}

function renderQuizLists(){
  ['sub-lectures','sub-mid','sub-final','sub-test-bank','sub-links'].forEach(function(t){ delete renderedTabs[t]; });
  renderActiveSubList();
}

function renderActiveSubList(){
  var sec2 = document.getElementById('section2');
  if(!sec2 || !sec2.classList.contains('active')) return;
  var active = document.querySelector('#section2 .sub-content.active');
  if(!active || renderedTabs[active.id]) return;
  var s = subjects[currentSubject];
  if(!s) return;
  if(active.id === 'sub-lectures'){
    var html = (s.lectures || []).map(function(l, i){
      if(!l.questions || !l.questions.length) return '';
      return examCardHTML(s, {t:l.t, d:l.d, pdf:(l.pdf2 || l.pdf)}, 'lec', i, l.questions.length, lecExamKey(l));
    }).join('');
    document.getElementById('questions-lectures-list').innerHTML = html || '<p style="color:var(--text-hint)">لا توجد أسئلة محاضرات بعد.</p>';
  }else if(active.id === 'sub-mid'){
    document.getElementById('midterms-list').innerHTML = examCategorizedHTML(s, 'midterms');
  }else if(active.id === 'sub-final'){
    document.getElementById('finals-list').innerHTML = examCategorizedHTML(s, 'finals');
  }else if(active.id === 'sub-test-bank'){
    document.getElementById('test-banks-list').innerHTML = examListHTML(s, 'testBanks');
  }else if(active.id === 'sub-links'){
    renderLinkCategoriesList(s);
  }
  renderedTabs[active.id] = true;
}

function lecChapterOf(s, l, i){
  var chs = s && s.chapters;
  if(Array.isArray(chs)){
    for(var c = 0; c < chs.length; c++){
      var ch = chs[c];
      if(ch && Array.isArray(ch.lectures) && (ch.lectures.indexOf(i) > -1 || (l && l.id && ch.lectures.indexOf(l.id) > -1))){
        return String(ch.t || ch.title || '').trim();
      }
    }
  }
  return (l && typeof l.chapter === 'string') ? l.chapter.trim() : '';
}
function lecChapterMeta(s, name){
  var chs = s && s.chapters;
  if(Array.isArray(chs)){
    for(var c = 0; c < chs.length; c++){
      var ch = chs[c];
      if(ch && String(ch.t || ch.title || '').trim() === name) return ch;
    }
  }
  return null;
}
var _chapOpen = {};
function toggleLecChapter(head){
  var cat = head ? head.parentNode : null;
  if(!cat) return;
  var open = cat.classList.toggle('open');
  var k = cat.getAttribute('data-ck');
  if(k) _chapOpen[k] = open;
}
function lecCardHTML(s, l, i){
  var total = (l.questions || []).length;
  var done = Object.keys(getSavedQuizFor(s, lecQuizKey(l))).length;
  var score = getScore(s, lecQuizKey(l));

  var badge;
  if(score){
    var color = score.score >= 75 ? 'done' : (score.score >= 50 ? 'warn' : 'bad');
    badge = '<span class="badge '+color+'">🏆 '+esc(score.score)+'%</span>';
  }
  else if(total && done >= total){ badge = '<span class="badge done">✅ مكتملة</span>'; }
  else if(done > 0){ badge = '<span class="badge warn">⏳ '+done+'/'+total+'</span>'; }
  else{ badge = '<span class="badge new">'+total+' سؤال</span>'; }

  var pct = total ? Math.round(done * 100 / total) : 0;
  var progressBar = (done > 0 && total > 0)
    ? '<div class="card-progress"><div class="card-progress-fill" style="width:'+pct+'%"></div></div>'
    : '';

  return '<div class="card" onclick="openLecture('+currentSubject+','+i+')">'+
           '<div class="card-text"><h3>'+(i+1)+'. '+esc(l.t)+'</h3><p>'+(l.d ? esc(l.d) : '')+'</p>'+progressBar+'</div>'+
           (lectureHasNotes(l) ? '<span class="card-notes-badge" title="المحاضرة دي فيها ملاحظات وتكاليف">📝</span>' : '') +
           badge +
         '</div>';
}

function renderLecturesList(){
  var s = subjects[currentSubject];
  var box = document.getElementById('lectures-list');
  if(!s || !s.lectures || !s.lectures.length){
    box.innerHTML = '<p style="color:var(--text-hint)">لا توجد محاضرات لهذه المادة.</p>';
    return;
  }
  var names = s.lectures.map(function(l, i){ return lecChapterOf(s, l, i); });
  if(!names.some(Boolean)){
    box.innerHTML = s.lectures.map(function(l, i){ return lecCardHTML(s, l, i); }).join('');
    return;
  }

  /* فصول: كل فصل بيجمع مجموعة محاضرات */
  var groups = {}, blocks = [], firstGroup = null;
  s.lectures.forEach(function(l, i){
    var nm = names[i];
    if(!nm){ blocks.push({html: lecCardHTML(s, l, i)}); return; }
    if(!groups[nm]){
      groups[nm] = {name: nm, cards: [], done: 0, total: 0};
      blocks.push({group: groups[nm]});
      if(!firstGroup) firstGroup = nm;
    }
    var g = groups[nm];
    g.cards.push(lecCardHTML(s, l, i));
    g.total += (l.questions || []).length;
    g.done += Object.keys(getSavedQuizFor(s, lecQuizKey(l))).length;
  });

  box.innerHTML = blocks.map(function(b){
    if(!b.group) return b.html;
    var g = b.group, meta = lecChapterMeta(s, g.name) || {};
    var ck = currentSubject + '|' + g.name;
    var open = (_chapOpen[ck] === undefined) ? (g.name === firstGroup) : _chapOpen[ck];
    var info = g.cards.length + ' محاضرة' + (g.total ? ' • ' + Math.min(g.done, g.total) + '/' + g.total + ' سؤال' : '');
    return '<div class="lc-cat lec-chapter'+(open ? ' open' : '')+'" data-ck="'+escAttr(ck)+'">'+
      '<div class="lc-cat-head" onclick="toggleLecChapter(this)">'+
        '<span class="lc-cat-icon">'+esc(meta.icon || '📘')+'</span>'+
        '<span class="lc-cat-main"><span class="lc-cat-tt">'+esc(g.name)+'</span>'+
        '<span class="lc-cat-dd">'+esc(meta.d || meta.description || '')+(meta.d || meta.description ? ' — ' : '')+info+'</span></span>'+
        '<span class="link-arrow">▶</span>'+
      '</div>'+
      '<div class="lc-cat-body"><div class="lc-cat-links">'+g.cards.join('')+'</div></div>'+
    '</div>';
  }).join('');
}

function examListHTML(s, prop){
  var arr = s[prop] || [];
  if(!arr.length) return '<p style="color:var(--text-hint)">لا توجد عناصر هنا.</p>';
  return arr.map(function(e, i){
    return examCardHTML(s, e, prop, i, getQuizData(s, e).length, e.t);
  }).join('');
}

function examCategorizedHTML(s, prop){
  var arr = s[prop] || [];
  if(!arr.length) return '<p style="color:var(--text-hint)">لا توجد عناصر هنا.</p>';
  var groups = s['_' + prop + 'Groups'];
  if(!groups || !groups.length) return examListHTML(s, prop);
  var order = [];
  var byCat = {};
  arr.forEach(function(e, i){
    var g = groups[i] || {category: 'عام', icon: '📁'};
    var key = g.category;
    if(!byCat[key]){ byCat[key] = {category: key, icon: g.icon, rows: []}; order.push(key); }
    byCat[key].rows.push(examCardHTML(s, e, prop, i, getQuizData(s, e).length, e.t));
  });
  return order.map(function(key){
    var grp = byCat[key];
    return '<div class="lc-cat">'+
      '<div class="lc-cat-head" onclick="toggleLcCat(this)">'+
        '<span class="lc-cat-icon">'+(grp.icon || '📁')+'</span>'+
        '<span class="lc-cat-main"><span class="lc-cat-tt">'+esc(grp.category)+'</span></span>'+
        '<span class="link-arrow">▶</span>'+
      '</div>'+
      '<div class="lc-cat-body"><div class="lc-cat-links">'+grp.rows.join('')+'</div></div>'+
    '</div>';
  }).join('');
}

function examCardHTML(s, e, prop, idx, total, key){
  var score = getScore(s, key);
  var done = Object.keys(getSavedQuizFor(s, key)).length;

  var tag;
  if(score){
    var color = score.score >= 75 ? 'green' : (score.score >= 50 ? 'warn' : 'bad');
    tag = '<span class="er-tag '+color+'">🏆 '+esc(score.score)+'%</span>';
  }
  else if(total && done >= total){ tag = '<span class="er-tag green">✅ مكتمل</span>'; }
  else if(total && done > 0){ tag = '<span class="er-tag warn">⏳ '+done+'/'+total+'</span>'; }
  else{ tag = '<span class="er-tag plain">جديد</span>'; }

  var pct = total ? Math.round(done * 100 / total) : 0;
  var progressBar = (done > 0 && total > 0)
    ? '<div class="exam-progress"><div class="exam-progress-fill" style="width:'+pct+'%"></div></div>'
    : '';

  var pdfBtn = e.pdf ? '<button class="er-pdf-btn" title="تحميل الامتحان PDF" onclick="event.stopPropagation();downloadPDFAt('+regUrl(pdfDownloadUrl(e.pdf))+')">📄 تحميل الامتحان PDF</button>' : '';

  return '<div class="exam-row" onclick="openQuizByType(\''+prop+'\','+idx+')">'+
           '<span class="er-play">▶</span>'+
           '<span class="er-main">'+
             '<span class="er-title">'+esc(e.t || 'اختبار')+'</span>'+
             '<span class="er-sub">'+(e.d ? esc(e.d) : '')+'</span>'+
             progressBar +
           '</span>'+
           tag + pdfBtn +
           '<span class="er-num">'+total+'</span>'+
         '</div>';
}

// ============================================================
// 10) وضع الامتحان
// ============================================================
function setQuizMode(on){
  document.body.classList.toggle('quiz-mode', !!on);
  if(on) placeQNSidebar();
}
function detachQNSidebar(){
  var sb = document.getElementById('qn-sidebar');
  var layout = document.getElementById('page-layout');
  if(sb && layout && sb.parentNode !== layout) layout.insertBefore(sb, layout.firstChild);
}
function placeQNSidebar(){
  var sb = document.getElementById('qn-sidebar');
  if(!sb || !st || !st.root) return;
  if(window.innerWidth <= 900){
    if(sb.parentNode !== st.root) st.root.insertBefore(sb, st.root.firstChild);
  }else{
    var layout = document.getElementById('page-layout');
    if(layout && sb.parentNode !== layout) layout.insertBefore(sb, layout.firstChild);
  }
}
window.addEventListener('resize', function(){
  if(st && st.root && document.body.classList.contains('quiz-mode')) placeQNSidebar();
});

function setSectionOpen(name, open, animate){
  sectionStates[name] = !!open;
  var sec = document.getElementById(name === 'pdf' ? 'pdf-sec' : 'qs-sec');
  if(!sec) return;
  sec.classList.toggle('open', !!open);
  var btn = sec.querySelector('.sec-toggle');
  if(btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  var body = sec.querySelector('.sec-body');
  if(!body) return;
  if(!animate){
    body.style.height = open ? 'auto' : '0px';
    if(name === 'pdf' && open) lazyLoadPDF();
    return;
  }
  if(open){
    body.style.height = '0px';
    void body.offsetHeight;
    body.style.height = (body.scrollHeight + 2) + 'px';
    setTimeout(function(){ if(sectionStates[name]) body.style.height = 'auto'; }, 340);
    if(name === 'pdf') lazyLoadPDF();
  }else{
    body.style.height = body.scrollHeight + 'px';
    void body.offsetHeight;
    body.style.height = '0px';
  }
}
function toggleSection(name){
  setSectionOpen(name, !sectionStates[name], true);
  saveSectionStates();
}
function ensureSectionOpen(name){
  var sec = document.getElementById(name === 'pdf' ? 'pdf-sec' : 'qs-sec');
  if(!sec || sec.classList.contains('open')) return false;
  setSectionOpen(name, true, true);
  saveSectionStates();
  return true;
}
function applySectionStates(){
  setSectionOpen('pdf', sectionStates.pdf, false);
  setSectionOpen('questions', sectionStates.questions, false);
}
function lazyLoadPDF(){
  var f = document.querySelector('#pdf-body iframe[data-src]');
  if(f && f.getAttribute('data-src')){
    var _au = f.getAttribute('data-annot-url');
    if(isOffline() && !(_au && wasOpened(_au))){ replaceWithNote(f, _au || f.getAttribute('data-src')); return; }
    f.src = f.getAttribute('data-src');
    f.removeAttribute('data-src');
    if(f.classList.contains('annotator-iframe')) setTimeout(setupAllAnnotatorIframes, 50);
  }
}
function openPdfAndScroll(){
  var sec = document.getElementById('pdf-sec');
  if(!sec){ showToast('مفيش ملف PDF هنا'); return; }
  var opened = ensureSectionOpen('pdf');
  setTimeout(function(){ sec.scrollIntoView({behavior:'smooth', block:'start'}); }, opened ? 360 : 0);
}

// ============================================================
// 11) منطق الكويز
// ============================================================
var st = null;
var AR_LETTERS = ['أ','ب','ج','د','هـ','و','ز','ح'];

function isEssay(q){ return !!(q && q.type === 'essay'); }
function mcqTotal(){
  if(!st) return 0;
  var n = 0;
  for(var i = 0; i < st.data.length; i++){ if(!isEssay(st.data[i])) n++; }
  return n;
}
function essayTotal(){
  if(!st) return 0;
  var n = 0;
  for(var i = 0; i < st.data.length; i++){ if(isEssay(st.data[i])) n++; }
  return n;
}
function toggleEssayAnswer(btn){
  var ans = btn.nextElementSibling;
  if(!ans) return;
  var open = ans.classList.toggle('open');
  btn.textContent = open ? '🔽 إخفاء الإجابة' : '👁 اعرض الإجابة النموذجية';
}
function answeredCount(){
  if(!st) return 0;
  var n = 0;
  for(var i = 0; i < st.data.length; i++){
    if(isEssay(st.data[i])) continue;
    if(st.answered[i] !== undefined) n++;
  }
  return n;
}

function renderQuizInto(rootEl, s, key, title, questions){
  detachQNSidebar();
  st = {
    subject: s, key: key, title: title || 'اختبار',
    data: (questions || []).slice(),
    answered: {}, marks: {}, current: 0, finished: false,
    root: rootEl
  };
  var saved = getSavedQuizFor(s, key);
  Object.keys(saved).forEach(function(k){
    var n = parseInt(saved[k], 10);
    if(!isNaN(n) && n >= 0) st.answered[k] = n;
  });
  try{
    var mkRaw = localStorage.getItem('qmark_' + (s ? s.name : '') + '_' + key);
    if(mkRaw) st.marks = JSON.parse(mkRaw) || {};
  }catch(e){ st.marks = {}; }
  var allDone = true;
  for(var i = 0; i < st.data.length; i++){
    if(!isEssay(st.data[i]) && st.answered[i] === undefined){ st.current = i; allDone = false; break; }
  }
  if(allDone && st.data.length){
    st.current = st.data.length - 1;
    if(getScore(s, key)) st.finished = true;
  }
  var isExam = (rootEl.id === 'quiz-view-root');
  rootEl.innerHTML =
    (isExam ?
      '<div class="qs-section ax-sec" id="qs-sec">'+
        '<button class="sec-toggle qs-toggle" aria-expanded="true" aria-controls="qs-body" onclick="toggleSection(\'questions\')" title="فتح / إغلاق القسم">'+
          '<span class="qs-title">🧠 قسم الأسئلة</span>'+
          '<span class="sec-arrow">⌄</span>'+
        '</button>'+
        '<div class="sec-body" id="qs-body">' : '')+
    '<div class="solved-counter" id="sc-bar"></div>'+
    '<div class="exam-qarea" id="qa-area"></div>'+
    '<div id="results-area"></div>'+
    '<div id="score-btn-area"></div>'+
    (isExam ? '</div></div>' : '');
  if(!st.data.length){
    document.getElementById('qa-area').innerHTML = '<p class="ld-hint">⚠️ لا توجد أسئلة في الاختبار ده.</p>';
    setQuizMode(false);
    return;
  }
  if(st.finished) showResults(true);
  else{ renderCurrentQuestion(); updateScoreBtn(); }
  updateSolvedCounter();
  renderQNSidebar();
  setQuizMode(true);
}

function renderQNSidebar(){
  var sb = document.getElementById('qn-sidebar');
  if(!sb || !st) return;
  var btns = st.data.map(function(q, i){
    var cls = 'qn-btn';
    if(i === st.current) cls += ' current';
    if(isEssay(q)){ cls += ' essay'; }
    else if(st.answered[i] !== undefined){ cls += (st.answered[i] === q.correct) ? ' ok' : ' bad'; }
    var tip = 'السؤال '+(i+1)+(isEssay(q)?' — مقالي 📝':'')+(st.marks[i]?' ⭐':'');
    return '<button class="'+cls+'" onclick="examGoTo('+i+')" title="'+tip+'">'+(i+1)+'</button>';
  }).join('');
  sb.innerHTML =
    '<div class="qn-nav-header"><span>🗺️ خريطة الأسئلة</span><span class="qn-count">'+st.data.length+' سؤال</span></div>'+
    '<div class="qn-grid">'+btns+'</div>'+
    '<div class="qn-legend">'+
      '<span><span class="qn-dot ok"></span>صحيح</span>'+
      '<span><span class="qn-dot bad"></span>خطأ</span>'+
      '<span><span class="qn-dot essay"></span>مقالي</span>'+
      '<span><span class="qn-dot none"></span>لم يُجب</span>'+
    '</div>';
}

function renderCurrentQuestion(){
  var area = document.getElementById('qa-area');
  if(!area || !st || !st.data.length){ if(area) area.innerHTML = ''; return; }
  var i = Math.max(0, Math.min(st.current, st.data.length - 1));
  st.current = i;
  var q = st.data[i];
  var answered = st.answered[i] !== undefined;
  var userPick = answered ? st.answered[i] : -1;
  var isCorrect = answered && userPick === q.correct;
  var isMarked = !!st.marks[i];
  var qLatin = isLatinText(q.q);

  if(isEssay(q)){
    area.innerHTML =
      '<div class="exam-qcard">'+
        '<span class="exam-counter">'+(i+1)+' / '+st.data.length+'</span>'+
        '<div class="exam-qtop">'+
          '<span class="eq-num">السؤال '+(i+1)+' من '+st.data.length+'</span>'+
          '<button class="qmark-btn '+(isMarked?'on':'')+'" onclick="toggleMark('+i+')" title="علّمي السؤال">'+(isMarked?'⭐ معلّم':'☆ علّم')+'</button>'+
        '</div>'+
        '<span class="essay-type-badge">📝 سؤال مقالي</span>'+
        '<div class="exam-qtext'+(qLatin?' ltr':'')+'">'+esc(q.q)+'</div>'+
        qTrHTML(q, 'q'+i)+
        '<button class="eq-toggle-btn" onclick="toggleEssayAnswer(this)">👁 اعرض الإجابة النموذجية</button>'+
        '<div class="eq-answer">'+
          '<div class="eq-answer-text">'+esc(q.answer || '').replace(/\n/g,'<br>')+'</div>'+
          (q.tags && q.tags.length
            ? '<div class="eq-tags">'+q.tags.map(function(tg){ return '<span class="eq-tag">'+esc(tg)+'</span>'; }).join('')+'</div>'
            : '')+
          (q.ref ? '<div class="eq-ref">📚 المرجع: '+esc(q.ref)+'</div>' : '')+
        '</div>'+
        '<div class="exam-navbtns">'+
          '<button class="exam-nav-btn prev"'+(i===0?' disabled':'')+' onclick="examGo(-1)">→ السابق</button>'+
          (st.finished ? '<button class="exam-nav-btn" onclick="showResults(true)">📊 النتيجة</button>' : '')+
          '<button class="exam-nav-btn"'+(i===st.data.length-1?' disabled':'')+' onclick="examGo(1)">التالي ←</button>'+
        '</div>'+
      '</div>';
    return;
  }

  var opts = (q.options || []).map(function(op, oi){
    var cls = 'exam-opt';
    var opLatin = isLatinText(op);
    var letter = opLatin ? String.fromCharCode(65 + oi) : (AR_LETTERS[oi] || String(oi + 1));
    var click = '';
    if(answered){
      cls += ' locked';
      if(oi === q.correct) cls += ' correct';
      else if(oi === userPick) cls += ' selected wrong';
    }else{
      click = ' onclick="selectAnswer('+i+','+oi+')"';
    }
    if(opLatin) cls += ' ltr';
    return '<div class="'+cls+'"'+click+'>'+
             '<span class="opt-letter">'+letter+'</span>'+
             '<span class="opt-text">'+esc(op)+'</span>'+
           '</div>';
  }).join('');

  var fb = '';
  if(answered){
    fb = '<div class="quiz-feedback '+(isCorrect ? 'correct-text' : 'wrong-text')+'">'+
           (isCorrect ? '✅ إجابة صحيحة!' : '❌ إجابة خاطئة — الإجابة الصحيحة: '+esc((q.options||[])[q.correct] || ''))+
         '</div>';
  }

  area.innerHTML =
    '<div class="exam-qcard">'+
      '<span class="exam-counter">'+(i+1)+' / '+st.data.length+'</span>'+
      '<div class="exam-qtop">'+
        '<span class="eq-num">السؤال '+(i+1)+' من '+st.data.length+'</span>'+
        '<button class="qmark-btn '+(isMarked?'on':'')+'" onclick="toggleMark('+i+')" title="علّمي السؤال — يظهر في ملف Word">'+(isMarked?'⭐ معلّم':'☆ علّم')+'</button>'+
      '</div>'+
      '<div class="exam-qtext'+(qLatin?' ltr':'')+'">'+esc(q.q)+'</div>'+
      qTrHTML(q, 'q'+i)+
      '<div class="exam-opts">'+opts+'</div>'+
      fb +
      (answered ? qExHTML(q, 'q'+i) : '') +
      '<div class="exam-navbtns">'+
        '<button class="exam-nav-btn prev"'+(i===0?' disabled':'')+' onclick="examGo(-1)">→ السابق</button>'+
        (st.finished ? '<button class="exam-nav-btn" onclick="showResults(true)">📊 النتيجة</button>' : '')+
        '<button class="exam-nav-btn"'+(i===st.data.length-1?' disabled':'')+' onclick="examGo(1)">التالي ←</button>'+
      '</div>'+
      '<div class="exam-saved" id="exam-saved-msg">💾 تم حفظ إجابتك تلقائياً</div>'+
    '</div>';
}

function toggleMark(qi){
  if(!st) return;
  if(st.marks[qi]){ delete st.marks[qi]; showToast('تم إلغاء تعليم السؤال'); }
  else{ st.marks[qi] = 1; showToast('⭐ السؤال اتعلّم — هيظهر في ملف Word'); }
  try{ localStorage.setItem('qmark_' + (st.subject ? st.subject.name : '') + '_' + st.key, JSON.stringify(st.marks)); }catch(e){}
  renderCurrentQuestion();
}

function selectAnswer(qi, oi){
  if(!st) return;
  if(st.answered[qi] !== undefined) return;
  if(isEssay(st.data[qi])) return;
  st.answered[qi] = oi;
  saveQuizProgress(st.subject, st.key, st.answered);
  renderCurrentQuestion();
  renderQNSidebar();
  updateSolvedCounter();
  updateScoreBtn();
  var m = document.getElementById('exam-saved-msg');
  if(m){ m.classList.add('show'); setTimeout(function(){ m.classList.remove('show'); }, 1500); }
}

function examGo(dir){ if(st) examGoTo(st.current + dir); }

function examGoTo(i){
  if(!st || i < 0 || i >= st.data.length) return;
  st.current = i;
  var qa = document.getElementById('qa-area'), ra = document.getElementById('results-area');
  if(qa) qa.style.display = '';
  if(ra) ra.innerHTML = '';
  var wasClosed = ensureSectionOpen('questions');
  renderCurrentQuestion();
  renderQNSidebar();
  var card = document.querySelector('#qa-area .exam-qcard');
  if(card){
    if(wasClosed){ setTimeout(function(){ card.scrollIntoView({behavior:'smooth', block:'center'}); }, 360); }
    else{ card.scrollIntoView({behavior:'smooth', block:'center'}); }
  }
}

function updateSolvedCounter(){
  var el = document.getElementById('sc-bar');
  if(!el || !st) return;
  var total = mcqTotal();
  var done = answeredCount();
  var essays = essayTotal();
  var pct = total ? Math.round(done * 100 / total) : 0;
  var extra = essays ? ' <span style="color:var(--text-hint);font-size:12px;">(+'+essays+' مقالي)</span>' : '';
  el.innerHTML = '<span>✅ تم حلّه: <span class="sc-ok">'+done+'</span> من '+total+extra+'</span>'+
                 '<span class="sc-pct">'+pct+'%</span>';
}

function updateScoreBtn(){
  var wrap = document.getElementById('score-btn-area');
  if(!wrap || !st) return;
  var total = mcqTotal();
  if(!st.finished && total > 0 && answeredCount() >= total){
    wrap.innerHTML = '<div class="show-score-btn-wrap">'+
      '<button class="show-score-btn" onclick="showResults()">🏆 اعرض نتيجتك</button>'+
      '<div class="show-score-subtitle">جاوبتي على كل أسئلة الاختيار — شوف مستواك!</div>'+
    '</div>';
  }else if(!st.finished){
    wrap.innerHTML = '';
  }
}

function showResults(silent){
  if(!st || !st.data.length) return;
  var mcqList = [];
  st.data.forEach(function(q, i){ if(!isEssay(q)) mcqList.push({q:q, i:i}); });
  var total = mcqList.length;
  var essays = st.data.length - total;

  if(total === 0){
    st.finished = true;
    document.getElementById('results-area').innerHTML =
      '<div class="score-card">'+
        '<div class="score-circle"><div class="score-number">📝</div><div class="score-label">مقالي</div></div>'+
        '<div class="score-details">عدد الأسئلة المقالية: '+essays+'</div>'+
        '<div class="score-message">الاختبار ده كله أسئلة مقالية — التصحيح يدوي</div>'+
        '<button class="retry-btn" onclick="resetQuiz()">🔄 إعادة</button>'+
      '</div>';
    var qaE = document.getElementById('qa-area'); if(qaE) qaE.style.display = 'none';
    var wrapE = document.getElementById('score-btn-area'); if(wrapE) wrapE.innerHTML = '';
    return;
  }

  var correct = 0;
  mcqList.forEach(function(o){
    if(st.answered[o.i] !== undefined && st.answered[o.i] === o.q.correct) correct++;
  });
  var pct = Math.round(correct * 100 / total);
  st.finished = true;

  var res = {score:pct, correct:correct, wrong:(total-correct), total:total, date:new Date().toLocaleDateString('ar-EG')};
  saveScore(st.subject, st.key, res);
  if(!silent){
    addNotification({title:'🏆 نتيجة: '+st.title, context:st.subject.name, score:pct});
    showToast('تم حفظ النتيجة: '+pct+'%');
  }

  var msg = pct >= 90 ? 'ممتاز! 🌟' : pct >= 75 ? 'جيد جداً 👏' : pct >= 50 ? 'جيد 🙂' : 'حاول مرة تانية 💪';

  var wrongs = [];
  mcqList.forEach(function(o){
    if(st.answered[o.i] !== undefined && st.answered[o.i] !== o.q.correct){
      wrongs.push({q:o.q, i:o.i, user:st.answered[o.i]});
    }
  });

  var actBtns =
    '<div class="res-word-wrap">'+
      '<button class="res-word-btn wrong" onclick="downloadWrongWord()">📄 Word — الأسئلة الخطأ</button>'+
      '<button class="res-word-btn marked" onclick="downloadMarkedWord()">⭐ Word — الأسئلة المعلّمة</button>'+
    '</div>';

  var wrongHTML;
  if(wrongs.length){
    wrongHTML = '<div class="wrong-collapse-wrap">'+
      '<div class="wrong-collapse-header" onclick="toggleWrongReview(event)">'+
        '<span>❌ مراجعة الأخطاء ('+wrongs.length+')</span>'+
        '<span class="wrong-collapse-arrow" id="wra">▼</span>'+
      '</div>'+
      '<div class="wrong-collapse-body" id="wrb">'+
        wrongs.map(function(w){
          return '<div class="wrong-q-card">'+
            '<span class="wrong-q-num">'+(w.i+1)+'</span>'+
            '<div class="wrong-q-text">'+esc(w.q.q)+'</div>'+
            '<div class="wrong-q-answer wrong-q-user"><span class="wrong-q-label">إجابتك:</span>'+esc((w.q.options||[])[w.user] || '—')+'</div>'+
            '<div class="wrong-q-answer wrong-q-correct"><span class="wrong-q-label">الإجابة الصحيحة:</span>'+esc((w.q.options||[])[w.q.correct] || '—')+'</div>'+
            qTrHTML(w.q, 'w'+w.i)+qExHTML(w.q, 'w'+w.i)+
          '</div>';
        }).join('')+
      '</div>'+
    '</div>';
  }else{
    wrongHTML = '<div class="no-wrong-msg">🎉 مفيش أخطاء — كل إجاباتك صح!</div>';
  }

  document.getElementById('results-area').innerHTML =
    '<div class="score-card">'+
      '<div class="score-circle"><div class="score-number">'+pct+'%</div><div class="score-label">النتيجة</div></div>'+
      '<div class="score-details">✅ صحيحة: '+correct+' &nbsp;•&nbsp; ❌ خاطئة: '+(total-correct)+' &nbsp;•&nbsp; الإجمالي: '+total+
        (essays ? ' &nbsp;•&nbsp; 📝 مقالي: '+essays : '')+'</div>'+
      '<div class="score-message">'+msg+'</div>'+
      '<button class="retry-btn" onclick="resetQuiz()">🔄 إعادة الاختبار</button>'+
    '</div>' + actBtns + wrongHTML;

  var qa = document.getElementById('qa-area');
  if(qa) qa.style.display = 'none';
  var wrap = document.getElementById('score-btn-area');
  if(wrap) wrap.innerHTML = '';
  updateSolvedCounter();
  renderQNSidebar();
  var sc = document.querySelector('#results-area .score-card');
  if(sc) sc.scrollIntoView({behavior:'smooth', block:'start'});
}

function downloadWrongWord(){
  if(!st) return;
  var qs = [], picks = [];
  st.data.forEach(function(q, i){
    if(isEssay(q)) return;
    if(st.answered[i] !== undefined && st.answered[i] !== q.correct){
      qs.push(q); picks.push(st.answered[i]);
    }
  });
  if(!qs.length){ showToast('مفيش أسئلة خطأ 🎉'); return; }
  downloadWord(qs, st.subject.name + ' — ' + st.title + ' (الأسئلة الخطأ)', picks);
}

function downloadMarkedWord(){
  if(!st) return;
  var qs = [], picks = [];
  st.data.forEach(function(q, i){
    if(st.marks[i]){ qs.push(q); picks.push(st.answered[i]); }
  });
  if(!qs.length){ showToast('مفيش أسئلة معلّمة — علمي ⭐ على الأسئلة اللي عايزاها'); return; }
  downloadWord(qs, st.subject.name + ' — ' + st.title + ' (الأسئلة المعلّمة)', picks);
}

function toggleWrongReview(e){
  if(e) e.stopPropagation();
  var b = document.getElementById('wrb'), a = document.getElementById('wra');
  if(b) b.classList.toggle('open');
  if(a) a.classList.toggle('open');
}

function resetQuiz(){
  if(!st) return;
  clearSavedQuiz(st.subject, st.key);
  st.answered = {}; st.current = 0; st.finished = false;
  var ra = document.getElementById('results-area'); if(ra) ra.innerHTML = '';
  var qa = document.getElementById('qa-area'); if(qa) qa.style.display = '';
  renderCurrentQuestion();
  renderQNSidebar();
  updateSolvedCounter();
  updateScoreBtn();
  showToast('تم مسح الحل المحفوظ — بالتوفيق 💪');
}

// ============================================================
// 12) PDF
// ============================================================
function driveId(url){
  if(!url) return null;
  var m = String(url).match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=|uc\?export=download&id=)([a-zA-Z0-9_-]{10,})/);
  return m ? m[1] : null;
}
function pdfEmbedUrl(url){
  var id = driveId(url);
  if(id) return 'https://drive.google.com/file/d/' + id + '/preview';
  var u = String(url || '');
  if(/dropbox\.com/.test(u)) return u.replace('?dl=0','?raw=1').replace('&dl=0','&raw=1');
  return u;
}
function pdfDownloadUrl(url){
  var id = driveId(url);
  if(id) return 'https://drive.google.com/uc?export=download&id=' + id;
  var u = String(url || '');
  if(/dropbox\.com/.test(u)) return u.replace('?dl=0','?dl=1');
  return u;
}
function pdfViewerUrl(url){
  var u = String(url || '');
  if(driveId(u)) return null;
  if(/dropbox\.com/.test(u)) return null;
  if(/^https?:\/\//i.test(u) && u.indexOf(location.origin) !== 0) return null;
  return 'pdf-annotator.html?viapost=1&src=' + encodeURIComponent(u);
}
function lecturePDFAt(s, lec){ return (lec && lec.pdf) ? lec.pdf : null; }
function examPDFAt(e){ return (e && e.pdf) ? e.pdf : null; }
function lecExamPDFAt(l){
  if(l && l.pdf2) return l.pdf2;
  return (l && l.pdf) ? l.pdf : null;
}

function downloadPDFAt(idx){
  var u = urlRegistry[idx];
  if(!u){ showToast('الملف غير متاح'); return; }
  if(isOffline()){ showToast('📴 مفيش إنترنت — الملف مش محمّل'); return; }
  var a = document.createElement('a');
  a.href = encodeURI(u);
  a.setAttribute('download','');
  a.setAttribute('target','_blank');
  a.setAttribute('rel','noopener noreferrer');
  document.body.appendChild(a);
  a.click();
  setTimeout(function(){ a.remove(); }, 800);
  showToast('جاري تحميل ملف PDF 📄');
}

var _annotatorHandlers = [];

function setupAnnotatorIframe(iframe, pdfUrl){
  if(!iframe || !pdfUrl) return;
  if(iframe.dataset.annotSetup === "1") return;
  iframe.dataset.annotSetup = "1";

  var done = false;
  var timeoutId = null;

  function sendFileToIframe(){
    if(done) return;
    done = true;
    if(timeoutId) clearTimeout(timeoutId);
    fetch(pdfUrl, {cache: "force-cache"})
      .then(function(r){
        if(!r.ok) throw new Error("HTTP " + r.status);
        fileCachePut(pdfUrl, r.clone());
        markOpened(pdfUrl);
        return r.arrayBuffer();
      })
      .catch(function(err){
        if(err && /^HTTP/.test(err.message || "")) throw err;
        return fileCacheGet(pdfUrl).then(function(cr){
          if(!cr){ err.notDownloaded = true; throw err; }
          return cr.arrayBuffer();
        });
      })
      .then(function(bytes){
        if(!iframe.contentWindow) throw new Error("iframe مش جاهز");
        var name = decodeURIComponent(pdfUrl.split("/").pop().split("?")[0]) || "document.pdf";
        iframe.contentWindow.postMessage({type: "load-pdf", bytes: bytes, name: name}, "*");
      })
      .catch(function(err){
        if(err && err.notDownloaded){ replaceWithNote(iframe, pdfUrl); return; }
        try{ iframe.src = "pdf-annotator.html?file=" + encodeURIComponent(pdfUrl); }catch(e){}
        showToast("مش قادر أحمّل الملف في قلم PDF: " + (err.message || ""));
      });
  }

  function onMessage(e){
    if(!e.data || typeof e.data !== "object") return;
    if(e.source !== iframe.contentWindow) return;
    if(e.data.type === "annotator-ready"){ sendFileToIframe(); window.removeEventListener("message", onMessage); }
  }
  window.addEventListener("message", onMessage);
  _annotatorHandlers.push(onMessage);

  timeoutId = setTimeout(function(){ if(!done) sendFileToIframe(); }, 2500);
}

function setupAllAnnotatorIframes(){
  document.querySelectorAll('iframe.annotator-iframe[data-annot-url]').forEach(function(iframe){
    var url = iframe.getAttribute("data-annot-url");
    if(url) setupAnnotatorIframe(iframe, url);
  });
}

// ============================================================
// 13) كروت الروابط
// ============================================================
var urlRegistry = [];
function regUrl(u){ urlRegistry.push(u); return urlRegistry.length - 1; }
function openReg(i){
  var u = urlRegistry[i];
  if(u && isOffline() && !wasOpened(u)){ showToast('📴 مفيش إنترنت — الملف/الرابط ده مش محمّل'); return; }
  if(u) window.open(encodeURI(u), '_blank', 'noopener,noreferrer');
}
function availableLinks(links){
  return (links || []).filter(function(L){
    return L && ((L.url && String(L.url).trim()) || (L.actions && L.actions.length));
  });
}
function linksListHTML(links){
  return availableLinks(links).map(function(L){
    if(L.actions && L.actions.length){
      var acts = L.actions.map(function(a){
        if(!a || !a.url) return '';
        var col = ['green','orange','red','blue'].indexOf(a.color) !== -1 ? ' '+a.color : '';
        var lbl = a.type === 'download' ? '⬇ ' + esc(a.label) : '👁 ' + esc(a.label);
        return '<button class="link-action-btn'+col+'" onclick="event.stopPropagation();openReg('+regUrl(a.url)+')">'+lbl+'</button>';
      }).join('');
      return '<div class="link-card">'+
        '<div class="link-card-head" onclick="toggleLinkCard(this)">'+
          '<span class="link-card-icon">'+(L.icon || '🔗')+'</span>'+
          '<span><span class="link-card-tt">'+esc(L.t || '')+'</span>'+
          (L.d ? '<span class="link-card-dd">'+esc(L.d)+'</span>' : '')+'</span>'+
          '<span class="link-arrow">▶</span>'+
        '</div>'+
        '<div class="link-card-body"><div class="link-actions">'+acts+'</div></div>'+
      '</div>';
    }
    return '<div class="link-card">'+
      '<div class="link-card-head" onclick="openReg('+regUrl(L.url)+')">'+
        '<span class="link-card-icon">🔗</span>'+
        '<span><span class="link-card-tt">'+esc(L.t || '')+'</span>'+
        (L.d ? '<span class="link-card-dd">'+esc(L.d)+'</span>' : '')+'</span>'+
        '<span class="link-arrow">↗</span>'+
      '</div>'+
    '</div>';
  }).join('');
}
function renderLinksList(boxId, links){
  var box = document.getElementById(boxId);
  if(!box) return;
  box.innerHTML = linksListHTML(links) || '<p class="ld-hint">لا توجد روابط متاحة لهذه المحاضرة حالياً.</p>';
}
function toggleLinkCard(head){
  var card = head ? head.parentNode : null;
  if(card) card.classList.toggle('open');
}

// ============================================================
// 14) فئات الروابط
// ============================================================
function renderLinkCategoriesList(s){
  var box = document.getElementById('link-categories-list');
  if(!box) return;
  var cats = s.linkCategories || [];
  if(!cats.length){ box.innerHTML = '<p style="color:var(--text-hint)">لا توجد روابط أو مصادر مضافة لهذه المادة بعد.</p>'; return; }
  box.innerHTML = cats.map(function(cat){
    var linksHtml = linksListHTML(cat.links) || '<p class="ld-hint">لا توجد روابط في هذا القسم بعد.</p>';
    return '<div class="lc-cat">'+
      '<div class="lc-cat-head" onclick="toggleLcCat(this)">'+
        '<span class="lc-cat-icon">'+(cat.icon || '📁')+'</span>'+
        '<span class="lc-cat-main"><span class="lc-cat-tt">'+esc(cat.category || '')+'</span>'+
        (cat.description ? '<span class="lc-cat-dd">'+esc(cat.description)+'</span>' : '')+'</span>'+
        '<span class="link-arrow">▶</span>'+
      '</div>'+
      '<div class="lc-cat-body"><div class="lc-cat-links">'+linksHtml+'</div></div>'+
    '</div>';
  }).join('');
}
function toggleLcCat(head){
  var cat = head ? head.parentNode : null;
  if(cat) cat.classList.toggle('open');
}

// ============================================================
// 15) عرض ملف المحاضرة
// ============================================================
function renderAttachCard(boxId, title, url){
  var box = document.getElementById(boxId);
  if(!box) return;
  if(!url){ box.innerHTML = ''; return; }
  if(isOffline() && !(pdfViewerUrl(url) && wasOpened(url))){
    _offlinePending[boxId] = {t: title, u: url};
    box.innerHTML = offlineNoteHTML(url, boxId);
    return;
  }
  var emb = pdfEmbedUrl(url);
  var dlIdx = regUrl(pdfDownloadUrl(url));
  var annot = pdfViewerUrl(url);
  var canPreview = driveId(url) || /\.pdf($|\?)/i.test(String(url)) || /dropbox\.com/.test(String(url));
  box.innerHTML =
    '<div class="attach-card">'+
      '<div class="attach-head">'+
        '<span class="attach-title">📄 '+esc(title || 'الملف')+'</span>'+
        '<div style="display:flex;gap:6px;flex-wrap:wrap;">'+
          '<button class="btn-sm" style="background:var(--download-btn-bg);" onclick="downloadPDFAt('+dlIdx+')">⬇ تحميل الملف</button>'+
          (annot ? '<button class="btn-sm" style="background:var(--warning);" onclick="importAnnotationsFromFile(this)">📂 استورد تعديلات</button>' : '')+
        '</div>'+
      '</div>'+
      '<div class="attach-line"></div>'+
      (annot
        ? '<div class="pdf-viewer annotator-frame"><iframe class="annotator-iframe" data-annot-url="'+escAttr(url)+'" src="'+escAttr(annot)+'" title="قلم PDF"></iframe></div>'+
          '<p class="ld-hint" style="margin-top:8px;">🖊️ <b>قلم PDF:</b> ارسمي وظلّلي على الملف — تعليقاتك بتتحفظ تلقائياً.</p>'
        : (canPreview
            ? '<div class="pdf-viewer"><iframe loading="lazy" title="معاينة الملف" src="'+escAttr(emb)+'"></iframe></div>'+
              '<p class="ld-hint" style="margin-top:8px;">الملف مش بيظهر فوق؟ <a href="#" onclick="downloadPDFAt('+dlIdx+');return false;" style="color:var(--accent);font-weight:bold;">نزّليه مباشرة 📥</a></p>'
            : '<p class="ld-hint">الملف مش PDF مباشر — استخدمي زر التحميل فوق.</p>'))+
    '</div>';
  setTimeout(setupAllAnnotatorIframes, 50);
}

// ============================================================
// 16) عرض روابط المحاضرة
// ============================================================
function renderLectureLinks(boxId, links, categories){
  var box = document.getElementById(boxId);
  if(!box) return;
  var hasDirect = availableLinks(links).length > 0;
  var hasCats = (categories || []).some(function(c){ return availableLinks(c.links).length > 0; });
  if(!hasDirect && !hasCats){
    box.innerHTML = '<p class="ld-hint">لا توجد روابط متاحة لهذه المحاضرة حالياً.</p>';
    return;
  }
  var html = '';
  if(hasDirect) html += linksListHTML(links);
  if(hasCats){
    html += (categories || []).map(function(cat){
      var linksHtml = linksListHTML(cat.links) || '<p class="ld-hint">لا توجد روابط في هذا القسم بعد.</p>';
      return '<div class="lc-cat">'+
        '<div class="lc-cat-head" onclick="toggleLcCat(this)">'+
          '<span class="lc-cat-icon">'+(cat.icon || '📁')+'</span>'+
          '<span class="lc-cat-main">'+
            '<span class="lc-cat-tt">'+esc(cat.category || '')+'</span>'+
            (cat.description ? '<span class="lc-cat-dd">'+esc(cat.description)+'</span>' : '')+
          '</span>'+
          '<span class="link-arrow">▶</span>'+
        '</div>'+
        '<div class="lc-cat-body"><div class="lc-cat-links">'+linksHtml+'</div></div>'+
      '</div>';
    }).join('');
  }
  box.innerHTML = html;
}

function lectureHasNotes(lec){
  return !!(lec && typeof lec.notes === 'string' && lec.notes.trim() !== '');
}
function buildNotesCardHTML(lec){
  try{
    if(!lectureHasNotes(lec)) return '';
    return '<div class="notes-card" id="ld-notes-card">'+
             '<div class="notes-card-head">'+
               '<span class="notes-card-icon" aria-hidden="true">📝</span>'+
               '<span class="notes-card-title">📌 ملاحظات وتكاليف المحاضرة</span>'+
             '</div>'+
             '<p class="notes-card-text">'+esc(lec.notes.trim())+'</p>'+
           '</div>';
  }catch(e){ return ''; }
}
function renderNotesCard(lec){
  try{
    var old = document.getElementById('ld-notes-card');
    if(old && old.parentNode) old.parentNode.removeChild(old);
    var html = buildNotesCardHTML(lec);
    if(!html) return;
    var body = document.querySelector('#ld-file .ld-body');
    if(!body) return;
    var tpl = document.createElement('template');
    tpl.innerHTML = html;
    var el = tpl.content.firstElementChild;
    if(el) body.insertBefore(el, body.firstChild);
  }catch(e){}
}

// ============================================================
// 17) فتح الصفحات
// ============================================================
function openLecture(subjIdx, lecIdx, skipUrlUpdate){
  currentSubject = subjIdx;
  hideNotFoundPage();
  var s = subjects[subjIdx];
  if(!s) return;
  var l = s.lectures[lecIdx];
  if(!l) return;
  currentLecture = lecIdx;
  secResetUI();
  secPrepare();
  urlRegistry = [];
  closeQuizState();
  detachQNSidebar();
  document.getElementById('lecture-quiz-root').innerHTML = '';

  document.getElementById('lecture-title').textContent = l.t || ('محاضرة ' + (lecIdx+1));
  document.getElementById('lecture-subtitle').textContent = (l.d || '') + (s.en ? ' — ' + s.en : '');

  var directCount = availableLinks(l.links).length;
  var cats = l.linkCategories || [];
  var catCount = 0;
  cats.forEach(function(cat){ catCount += availableLinks(cat.links).length; });
  var totalLinks = directCount + catCount;

  var chip = document.getElementById('ld-links-chip');
  chip.textContent = totalLinks ? totalLinks + ' روابط' : 'لا روابط';
  chip.className = 'ld-chip' + (totalLinks ? '' : ' warn');

  renderLectureLinks('ld-links-list', l.links, cats);

  var pdf = lecturePDFAt(s, l);
  var fchip = document.getElementById('ld-file-chip');
  fchip.textContent = pdf ? 'ملف متاح' : 'غير متاح';
  fchip.className = 'ld-chip' + (pdf ? ' ok' : '');
  document.getElementById('ld-file-meta').innerHTML = pdf ? '' : '<p class="ld-hint">مفيش ملف مرفق بالمحاضرة دي.</p>';
  renderAttachCard('ld-attach-card', l.t, pdf);
  document.getElementById('lecture-content-area').innerHTML = '';
  renderNotesCard(l);
  renderSummary(l);

  var total = (l.questions || []).length;
  var done = Object.keys(getSavedQuizFor(s, lecQuizKey(l))).length;
  var qchip = document.getElementById('ld-quiz-chip');
  if(!total){ qchip.textContent = 'لا أسئلة'; qchip.className = 'ld-chip'; }
  else if(done >= total){ qchip.textContent = 'مكتمل ✅'; qchip.className = 'ld-chip ok'; }
  else if(done > 0){ qchip.textContent = done + '/' + total; qchip.className = 'ld-chip warn'; }
  else{ qchip.textContent = total + ' سؤال'; qchip.className = 'ld-chip'; }

  ['ld-links','ld-file','ld-summary','ld-quiz'].forEach(function(id){
    document.getElementById(id).classList.remove('open');
  });

  showView('lecture-view');
  renumberLD();
  saveLS({subject:subjIdx, view:'lecture', lecture:lecIdx, prop:null, qidx:null});
  window.scrollTo({top:0, behavior:'smooth'});

  if(!skipUrlUpdate){
    try{
      var lecId = l.id || lecSlug(l.t) || ('lecture-' + (lecIdx+1));
      history.pushState({subject: SUBJECTS_INDEX[subjIdx].slug, lecture: lecId, view:'lecture'}, '', urlForLecture(subjIdx, lecIdx));
    }catch(e){}
  }
}

function openLectureQuizSection(){
  var s = subjects[currentSubject];
  if(!s) return;
  var l = s.lectures[currentLecture];
  var sec = document.getElementById('ld-quiz');
  if(sec) sec.classList.add('open');
  var root = document.getElementById('lecture-quiz-root');
  if(!l || !l.questions || !l.questions.length){
    root.innerHTML = '<p class="ld-hint">مفيش أسئلة متاحة للمحاضرة دي.</p>';
    setQuizMode(false);
    return;
  }
  if(!st || st.key !== lecQuizKey(l) || st.root !== root){
    renderQuizInto(root, s, lecQuizKey(l), l.t, l.questions);
  }else{
    setQuizMode(true);
  }
  if(sec) sec.scrollIntoView({behavior:'smooth', block:'start'});
}

function toggleLD(id){
  var sec = document.getElementById(id);
  if(!sec) return;
  var willOpen = !sec.classList.contains('open');
  sec.classList.toggle('open');
  if(id === 'ld-quiz'){
    if(willOpen) openLectureQuizSection();
    else setQuizMode(false);
  }
}

function openQuiz(subjIdx, prop, idx){
  currentSubject = subjIdx;
  hideNotFoundPage();
  var s = subjects[subjIdx];
  if(!s) return;
  var isLec = (prop === 'lec');
  var e, qs, pdf;
  if(isLec){
    e = s.lectures[idx];
    qs = (e && e.questions) || [];
    pdf = lecExamPDFAt(e);
  }else{
    e = (s[prop] || [])[idx];
    qs = e ? getQuizData(s, e) : [];
    pdf = examPDFAt(e);
  }
  if(!e){ showToast('العنصر غير موجود'); return; }
  urlRegistry = [];

  var qKey = isLec ? lecExamKey(e) : (e.t || 'اختبار');
  var fileLabel = isLec ? (e.pdf2 ? 'ملف أسئلة المحاضرة' : 'ملف المحاضرة') : 'ملف الامتحان';

  document.getElementById('quiz-title').innerHTML =
    '<span class="tb-title">'+esc((e.t || 'اختبار') + ' — ' + s.name)+'</span>'+
    (pdf ? '<button class="tb-pdf-btn" onclick="openPdfAndScroll()" title="فتح الملف">📄 PDF</button>' : '');

  var pArea = document.getElementById('quiz-pdf-area');
  if(pdf){
    var pdfDlIdx = regUrl(pdfDownloadUrl(pdf));
    var emb = pdfEmbedUrl(pdf);
    var annot = pdfViewerUrl(pdf);
    pArea.innerHTML =
      '<div class="attach-card ax-sec" id="pdf-sec">'+
        '<div class="attach-head">'+
          '<button class="sec-toggle attach-toggle" aria-expanded="false" aria-controls="pdf-body" onclick="toggleSection(\'pdf\')" title="فتح / إغلاق القسم">'+
            '<span class="attach-title">📄 '+fileLabel+'</span>'+
            '<span class="sec-arrow">⌄</span>'+
          '</button>'+
          '<button class="btn-sm" style="background:var(--download-btn-bg);" onclick="downloadPDFAt('+pdfDlIdx+');ensureSectionOpen(\'pdf\');">⬇ تحميل PDF</button>'+
        '</div>'+
        '<div class="attach-line"></div>'+
        '<div class="sec-body" id="pdf-body">'+
          (annot
            ? '<div class="pdf-viewer annotator-frame"><iframe class="annotator-iframe" title="'+escAttr(fileLabel)+'" data-annot-url="'+escAttr(pdf)+'" data-src="'+escAttr(annot)+'"></iframe></div>'
            : '<div class="pdf-viewer"><iframe loading="lazy" title="'+escAttr(fileLabel)+'" data-src="'+escAttr(emb)+'"></iframe></div>')+
          '<p class="ld-hint" style="margin-top:8px;">الملف مش بيظهر فوق؟ <a href="#" onclick="downloadPDFAt('+pdfDlIdx+');return false;" style="color:var(--accent);font-weight:bold;">نزّليه مباشرة 📥</a></p>'+
        '</div>'+
      '</div>';
  }else{
    pArea.innerHTML = '';
  }

  var root = document.getElementById('quiz-view-root');
  if(!qs.length){
    root.innerHTML = '<p class="ld-hint" style="font-size:16px;">⚠️ مفيش أسئلة متاحة هنا.</p>';
    setQuizMode(false);
  }else{
    renderQuizInto(root, s, qKey, e.t, qs);
    applySectionStates();
  }
  showView('quiz-view');
  saveLS({subject:subjIdx, view:'quiz', prop:prop, qidx:idx});
  window.scrollTo({top:0, behavior:'smooth'});
}

function openQuizByType(prop, idx){ openQuiz(currentSubject, prop, idx); }

function closeQuizState(){ st = null; setQuizMode(false); }

function closeQuizEverywhere(){
  closeQuizState();
  detachQNSidebar();
  ['lecture-quiz-root','quiz-view-root','quiz-pdf-area'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.innerHTML = '';
  });
}

function goBackToMain(){
  closeQuizEverywhere();
  renderAllLists();
  showView('main-view');
  saveLS({view:'main', lecture:-1, prop:null, qidx:null});
  window.scrollTo({top:0, behavior:'smooth'});
  try{
    var meta = SUBJECTS_INDEX[currentSubject];
    if(meta) history.pushState({subject: meta.slug, view:'main'}, '', urlForSubject(currentSubject));
  }catch(e){}
}

function goBackFromQuiz(){
  closeQuizEverywhere();
  renderAllLists();
  showView('main-view');
  openTab(null, 'section2');
  saveLS({view:'main', lecture:-1, prop:null, qidx:null, tab:'section2'});
  window.scrollTo({top:0, behavior:'smooth'});
}

// ============================================================
// 18) Word
// ============================================================
function wordExtras(q){
  var tr = qTxt(q && q.translation), ex = qTxt(q && q.explanation), h = '';
  if(tr) h += '<div style="margin-top:4pt;"><b>الترجمة:</b> '+esc(tr).replace(/\n/g,'<br>')+'</div>';
  if(ex) h += '<div style="margin-top:4pt;padding:6pt;background:#eef6ff;border-right:4px solid #3498db;"><b>لماذا هذه الإجابة؟</b><br>'+esc(ex).replace(/\n/g,'<br>')+'</div>';
  return h;
}
function downloadWord(questions, title, picks){
  if(!questions || !questions.length){ showToast('لا توجد أسئلة للتحميل'); return; }
  var rows = questions.map(function(q, i){
    if(isEssay(q)){
      return '<div style="margin-bottom:14pt;">'+
               '<div style="font-weight:bold;">'+(i+1)+') '+esc(q.q)+' <span style="color:#e67e22;">[مقالي]</span></div>'+
               '<div style="margin-top:4pt;padding:8pt;background:#fff8e1;border-right:4px solid #f39c12;">'+
                 '<b>الإجابة النموذجية:</b><br>'+esc(q.answer || '').replace(/\n/g,'<br>')+
               '</div>'+
               (q.tags && q.tags.length ? '<div style="color:#7f8c8d;font-size:10pt;margin-top:3pt;">🏷️ '+q.tags.map(esc).join(' • ')+'</div>' : '')+
               (q.ref ? '<div style="color:#7f8c8d;font-size:10pt;">📚 '+esc(q.ref)+'</div>' : '')+
               wordExtras(q)+
             '</div>';
    }
    var opts = (q.options || []).map(function(op, oi){
      var mark = (oi === q.correct) ? ' ✅' : '';
      return '<div style="margin-right:14pt;">'+(oi+1)+') '+esc(op)+mark+'</div>';
    }).join('');
    var ans = (q.correct !== undefined && q.correct !== null && (q.options || [])[q.correct] !== undefined)
      ? ((q.correct+1)+' — '+esc(q.options[q.correct])) : '—';
    var mine = '';
    var pick = (picks && picks.length > i) ? picks[i] : undefined;
    if(pick !== undefined && pick !== null && (q.options || [])[pick] !== undefined){
      var wasRight = (pick === q.correct);
      mine = '<div style="color:'+(wasRight?'#1e8449':'#c0392b')+';font-weight:bold;margin-top:3pt;">'+
             (wasRight ? '✔ إجابتك: ' : '✘ إجابتك: ') + esc(q.options[pick]) +
             (wasRight ? ' (صحيحة)' : ' (خطأ)') + '</div>';
    }
    return '<div style="margin-bottom:14pt;">'+
             '<div style="font-weight:bold;">'+(i+1)+') '+esc(q.q)+'</div>'+
             opts + mine +
             '<div style="color:#1e8449;font-weight:bold;margin-top:3pt;">الإجابة الصحيحة: '+ans+'</div>'+
             wordExtras(q)+
           '</div>';
  }).join('');
  var html = '<html dir="rtl" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">'+
             '<head><meta charset="utf-8"><title>'+esc(title)+'</title></head>'+
             '<body style="font-family:Arial,Verdana;font-size:12pt;direction:rtl;">'+
             '<h2 style="text-align:center;margin-bottom:4pt;">'+esc(title)+'</h2><hr>'+
             '<p style="text-align:center;">عدد الأسئلة: '+questions.length+'</p>'+ rows +
             '</body></html>';
  var fname = String(title || 'أسئلة').replace(/[\\\/:*?"<>|]/g, '-') + '.doc';
  triggerDownload(new Blob(['\ufeff'+html], {type:'application/msword'}), fname);
  showToast('تم تحميل ملف Word 📥');
}

function triggerDownload(blob, filename){
  var a = document.createElement('a');
  var url = URL.createObjectURL(blob);
  a.href = url; a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function(){ try{ URL.revokeObjectURL(url); }catch(e){} a.remove(); }, 2000);
}

// ============================================================
// 19) نسخة أسئلة المادة HTML — مختصرة (النسخة الكاملة موجودة في الملف الأصلي)
// ============================================================
var QUIZ_CSS = ":root{--bg-body:#fff;--bg-header:#111;--bg-content:#fff;--bg-card:#f8f8f8;--bg-card-hover:#eee;--bg-quiz-card:#fff;--text-primary:#000;--text-secondary:#222;--text-heading:#000;--text-hint:#555;--text-white:#fff;--accent:#0055cc;--accent-hover:#0044aa;--success:#27ae60;--success-light:#2ecc71;--danger:#e74c3c;--warning:#f39c12;--border:#ccc;--shadow:rgba(0,0,0,.08);--score-bg-1:#111;--score-bg-2:#333;--show-score-bg-1:#111;--show-score-bg-2:#333;--show-score-shadow:rgba(0,0,0,.3);--subtab-bg:#f8f8f8;--subtab-active-bg:#27ae60;--wrong-card-bg:#fdecea;--wrong-card-border:#e74c3c;--wrong-card-text:#c0392b;--correct-card-bg:#eafaf1;--correct-card-border:#27ae60;--correct-card-text:#1e8449;--no-wrong-bg:#eafaf1;--no-wrong-border:#27ae60;--no-wrong-text:#1e8449;--wrong-title-bg:#e74c3c}[data-theme=morning]{--bg-body:#fef9ef;--bg-header:#e67e22;--bg-content:#fffdf7;--bg-card:#fef5e7;--bg-card-hover:#fdebd0;--bg-quiz-card:#fffdf7;--text-primary:#5d4037;--text-secondary:#795548;--text-heading:#bf6516;--text-hint:#a1887f;--accent:#e67e22;--accent-hover:#d35400;--border:#f0d9b5;--shadow:rgba(230,126,34,.1);--score-bg-1:#e67e22;--score-bg-2:#f39c12;--show-score-bg-1:#e67e22;--show-score-bg-2:#f39c12;--show-score-shadow:rgba(230,126,34,.4);--subtab-bg:#fef5e7;--subtab-active-bg:#27ae60;--wrong-title-bg:#e74c3c}[data-theme=night]{--bg-body:#0a0a14;--bg-header:#12121f;--bg-content:#12121f;--bg-card:#1a1a2e;--bg-card-hover:#22223a;--bg-quiz-card:#12121f;--text-primary:#d4d4e8;--text-secondary:#9999bb;--text-heading:#eef;--text-hint:#668;--accent:#6c8cff;--border:#2a2a44;--shadow:rgba(0,0,0,.5);--subtab-bg:#1a1a2e;--subtab-active-bg:#27ae60}*{box-sizing:border-box}body{font-family:'Segoe UI',Tahoma,sans-serif;background:var(--bg-body);margin:0;color:var(--text-primary)}header{background:var(--bg-header);color:#fff;text-align:center;padding:10px}header h1{margin:0}.theme-pill{background:rgba(255,255,255,.15);color:#fff;border:2px solid transparent;padding:6px 14px;border-radius:50px;cursor:pointer;font-size:13px;font-weight:bold;margin:4px}.theme-pill.active{border-color:#fff}.container{max-width:980px;margin:20px auto;padding:0 16px 60px}.content-section{display:none;background:var(--bg-content);padding:30px;border-radius:10px}.content-section.active{display:block}.sub-tab-button{background:var(--subtab-bg);color:var(--text-primary);border:none;padding:10px 18px;cursor:pointer;border-radius:20px;margin:4px;font-family:inherit}.sub-tab-button.active{background:var(--subtab-active-bg);color:#fff;font-weight:bold}.sub-content{display:none}.sub-content.active{display:block}.exam-row{display:flex;align-items:center;gap:12px;background:var(--bg-card);border:2px solid var(--border);border-radius:14px;padding:12px 16px;margin-bottom:10px;cursor:pointer}.er-play{width:44px;height:44px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center}.er-main{flex:1}.er-title{font-weight:bold;color:var(--text-heading)}.er-tag{padding:4px 12px;border-radius:12px;font-size:11px;font-weight:bold;background:var(--success);color:#fff}.er-num{min-width:38px;height:38px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:bold}.exam-qcard{background:var(--bg-quiz-card);border:2px solid var(--border);border-radius:14px;padding:24px;position:relative}.exam-opt{border:2px solid var(--border);background:var(--bg-card);border-radius:12px;padding:14px 16px;cursor:pointer;text-align:right;font-size:16px;margin-bottom:8px;font-family:inherit}.exam-opt.correct{background:var(--success);color:#fff}.exam-opt.wrong{background:var(--danger);color:#fff}.score-card{background:linear-gradient(135deg,var(--score-bg-1),var(--score-bg-2));color:#fff;border-radius:10px;padding:35px 25px;text-align:center;margin:15px 0}.back-btn{background:var(--danger);color:#fff;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;margin-bottom:20px;font-family:inherit}.qn-btn{aspect-ratio:1/1;border:2px solid var(--border);background:var(--bg-card);color:var(--text-primary);border-radius:8px;cursor:pointer;font-weight:bold;padding:4px;font-family:inherit}.qn-btn.ok{background:var(--success);color:#fff}.qn-btn.bad{background:var(--danger);color:#fff}.qn-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:5px;margin-top:10px}.qmark-btn{background:var(--bg-card);border:2px solid var(--border);padding:4px 12px;border-radius:12px;cursor:pointer;font-family:inherit}.qmark-btn.on{background:var(--warning);color:#fff}.res-word-btn{background:var(--accent);color:#fff;border:none;padding:12px 22px;border-radius:12px;cursor:pointer;margin:4px;font-family:inherit;font-weight:bold}.res-word-btn.wrong{background:var(--danger)}.res-word-btn.marked{background:var(--warning)}";
var QUIZ_HEAD = '<!DOCTYPE html>\n<html lang="ar" dir="rtl" data-theme="noon">\n<head>\n<meta charset="UTF-8"><title>أسئلة</title><style>' + QUIZ_CSS + '</style></head><body>\n<header><h1 id="main-title"></h1><div><button class="theme-pill active" onclick="setThemeMode(\'noon\')">☀️</button><button class="theme-pill" onclick="setThemeMode(\'night\')">🌙</button><button class="theme-pill" onclick="setThemeMode(\'auto\')">🔄</button></div></header>\n<div class="container"><div id="main-view" class="content-section active"><h2>بنك الأسئلة</h2><div id="sub-tabs"></div><div id="sub-lec" class="sub-content active"><div id="list-lec"></div></div><div id="sub-mid" class="sub-content"><div id="list-mid"></div></div><div id="sub-fin" class="sub-content"><div id="list-fin"></div></div><div id="sub-bank" class="sub-content"><div id="list-bank"></div></div></div><div id="quiz-view" class="content-section"><button class="back-btn" onclick="backToList()">← العودة</button><div class="exam-titlebar" id="quiz-title"></div><div id="quiz-view-root"></div></div></div>\n<script>';

function STANDALONE_ENGINE(){
  var TABS = [['lec','📚 المحاضرات'],['mid','📝 ميدتيرم'],['fin','🎓 فاينل'],['bank','🏦 بنك']];
  var curTab = 'lec';
  var st = null;
  var themeMode = 'auto';
  try{ themeMode = localStorage.getItem('themeMode') || 'auto'; }catch(e){}
  window.setThemeMode = function(mode){ themeMode = mode; document.documentElement.setAttribute('data-theme', mode === 'auto' ? 'noon' : mode); };
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return c==='&'?'&amp;':c==='<'?'&lt;':c==='>'?'&gt;':c==='"'?'&quot;':'&#39;'; }); }
  function isEssay(q){ return !!(q && q.type === 'essay'); }
  function getSavedQuizFor(key){ try{ var r = localStorage.getItem('qa_' + DATA.name + '_' + key); return r ? JSON.parse(r) : {}; }catch(e){ return {}; } }
  function saveQuizProgress(key, a){ try{ localStorage.setItem('qa_' + DATA.name + '_' + key, JSON.stringify(a)); }catch(e){} }
  function getScore(key){ try{ var r = localStorage.getItem('quiz_progress_' + DATA.name); var o = r ? JSON.parse(r) : {}; return o[key] || null; }catch(e){ return null; } }
  function saveScore(key, res){ try{ var r = localStorage.getItem('quiz_progress_' + DATA.name); var o = r ? JSON.parse(r) : {}; o[key] = res; localStorage.setItem('quiz_progress_' + DATA.name, JSON.stringify(o)); }catch(e){} }
  function showView(id){ ['main-view','quiz-view'].forEach(function(v){ var el = document.getElementById(v); if(el) el.classList.toggle('active', v === id); }); }
  function renderTabs(){
    document.getElementById('sub-tabs').innerHTML = TABS.map(function(t){
      var n = (DATA[t[0]] || []).length;
      return '<button class="sub-tab-button'+(t[0]===curTab?' active':'')+'" onclick="setTab(\''+t[0]+'\')">'+t[1]+' ('+n+')</button>';
    }).join('');
  }
  window.setTab = function(k){
    curTab = k; renderTabs();
    document.querySelectorAll('.sub-content').forEach(function(d){ d.classList.toggle('active', d.id === 'sub-'+k); });
    renderList();
  };
  function renderList(){
    var arr = DATA[curTab] || [];
    var box = document.getElementById('list-' + curTab);
    if(!arr.length){ box.innerHTML = '<p>مفيش حاجة هنا.</p>'; return; }
    box.innerHTML = arr.map(function(e, i){
      var score = getScore(e.t);
      return '<div class="exam-row" onclick="openQuizAt('+i+')"><span class="er-play">▶</span><span class="er-main"><span class="er-title">'+esc(e.t)+'</span></span><span class="er-tag">'+(score?'🏆 '+score.score+'%':'جديد')+'</span><span class="er-num">'+e.questions.length+'</span></div>';
    }).join('');
  }
  window.openQuizAt = function(i){
    var e = (DATA[curTab] || [])[i];
    if(!e) return;
    document.getElementById('quiz-title').innerHTML = esc(e.t);
    renderQuizInto(document.getElementById('quiz-view-root'), e.t, e.questions);
    showView('quiz-view');
  };
  window.backToList = function(){ st = null; document.getElementById('quiz-view-root').innerHTML = ''; renderList(); showView('main-view'); };
  function renderQuizInto(root, key, questions){
    st = { key:key, data:questions.slice(), answered:{}, current:0, finished:false };
    var saved = getSavedQuizFor(key);
    Object.keys(saved).forEach(function(k){ st.answered[k] = saved[k]; });
    root.innerHTML = '<div id="qa-area"></div><div id="results-area"></div><div id="score-btn-area"></div>';
    renderCurrentQuestion();
  }
  function renderCurrentQuestion(){
    var area = document.getElementById('qa-area');
    if(!area) return;
    var i = st.current, q = st.data[i];
    if(!q) return;
    var opts = (q.options||[]).map(function(op, oi){
      var cls = 'exam-opt' + (st.answered[i] === oi ? (oi === q.correct ? ' correct' : ' wrong') : '');
      return '<div class="'+cls+'" onclick="selectAnswer('+i+','+oi+')">'+esc(op)+'</div>';
    }).join('');
    area.innerHTML = '<div class="exam-qcard"><div>السؤال '+(i+1)+' من '+st.data.length+'</div><div style="font-size:18px;font-weight:bold;margin:14px 0">'+esc(q.q)+'</div>'+opts+'</div>';
  }
  window.selectAnswer = function(qi, oi){
    if(st.answered[qi] !== undefined) return;
    st.answered[qi] = oi;
    saveQuizProgress(st.key, st.answered);
    renderCurrentQuestion();
  };
  renderTabs();
  renderList();
  showView('main-view');
}

function downloadQuestionsPageHTML(){
  if(!subjects.length){ showToast('لا توجد بيانات للتحميل'); return; }
  var s = subjects[currentSubject];
  if(!s){ showToast('المادة مش محمّلة'); return; }
  function pack(list){ return (list || []).map(function(e){ return { t:e.t||'اختبار', d:e.d||'', questions:getQuizData(s,e) }; }).filter(function(x){ return x.questions.length; }); }
  var lec = (s.lectures || []).map(function(l){ return { t:l.t||'محاضرة', d:l.d||'', questions:l.questions||[] }; }).filter(function(x){ return x.questions.length; });
  var data = { name:s.name, en:s.en||'', icon:s.icon||'📚', lec:lec, mid:pack(s.midterms), fin:pack(s.finals), bank:pack(s.testBanks) };
  var json = JSON.stringify(data).replace(/<\/script/gi, "<\\/script");
  var html = QUIZ_HEAD + "\nvar DATA = " + json + ";\n" + STANDALONE_ENGINE.toString() + "\nSTANDALONE_ENGINE();\n<\/script></body></html>";
  var fname = 'اسئلة-' + String(s.name).replace(/[\\\/:*?"<>|]/g, '-') + '.html';
  triggerDownload(new Blob([html], {type:'text/html;charset=utf-8'}), fname);
  showToast('📥 اتنزّلت نسخة أسئلة: ' + s.name);
}

// ============================================================
// 20) البحث الشامل
// ============================================================
var _searchTimer = null;
var _searchResults = [];

function doSearch(){
  clearTimeout(_searchTimer);
  _searchTimer = setTimeout(runSearch, 250);
}
function clearSearch(){
  var input = document.getElementById('search-input');
  var box = document.getElementById('search-results');
  var clr = document.getElementById('search-clear');
  if(input) input.value = '';
  if(box){ box.classList.remove('show'); box.innerHTML = ''; }
  if(clr) clr.classList.remove('show');
}
function snippet(text, q){
  var t = String(text || '');
  var idx = t.toLowerCase().indexOf(q.toLowerCase());
  if(idx === -1){ return esc(t.length > 90 ? t.slice(0, 90) + '…' : t); }
  var start = Math.max(0, idx - 40);
  var end = Math.min(t.length, idx + q.length + 50);
  var pre = (start > 0 ? '…' : '') + t.slice(start, idx);
  var mid = t.slice(idx, idx + q.length);
  var post = t.slice(idx + q.length, end) + (end < t.length ? '…' : '');
  return esc(pre) + '<mark>' + esc(mid) + '</mark>' + esc(post);
}
function runSearch(){
  var input = document.getElementById('search-input');
  var box = document.getElementById('search-results');
  var clr = document.getElementById('search-clear');
  if(!input || !box) return;
  var q = input.value.trim();
  if(clr) clr.classList.toggle('show', q.length > 0);
  if(q.length < 2){ box.classList.remove('show'); box.innerHTML = ''; return; }
  var ql = q.toLowerCase();
  var MAX = 40;
  var results = [];
  SUBJECTS_INDEX.forEach(function(meta, si){
    var s = subjects[si];
    if(!s) return;
    (s.lectures || []).forEach(function(l, li){
      if(results.length >= MAX) return;
      var hay = ((l.t || '') + ' ' + (l.d || '')).toLowerCase();
      if(hay.indexOf(ql) !== -1){ results.push({si:si, type:'lecture', li:li, text:(l.d && l.d.toLowerCase().indexOf(ql) !== -1 ? l.d : (l.t || ''))}); }
    });
  });
  SUBJECTS_INDEX.forEach(function(meta, si){
    var s = subjects[si];
    if(!s) return;
    (s.lectures || []).forEach(function(l, li){
      if(results.length >= MAX) return;
      (l.questions || []).forEach(function(qq, qi){
        if(results.length >= MAX) return;
        if(qq.q && String(qq.q).toLowerCase().indexOf(ql) !== -1){ results.push({si:si, type:'question', prop:'lec', ei:li, qi:qi, text:qq.q}); }
      });
    });
  });
  SUBJECTS_INDEX.forEach(function(meta, si){
    var s = subjects[si];
    if(!s) return;
    ['midterms','finals','testBanks'].forEach(function(prop){
      (s[prop] || []).forEach(function(e, ei){
        if(results.length >= MAX) return;
        getQuizData(s, e).forEach(function(qq, qi){
          if(results.length >= MAX) return;
          if(qq.q && String(qq.q).toLowerCase().indexOf(ql) !== -1){ results.push({si:si, type:'question', prop:prop, ei:ei, qi:qi, text:qq.q}); }
        });
      });
    });
  });
  _searchResults = results;
  var html = '';
  if(!results.length){
    html = '<div class="sr-header">نتائج البحث عن: "'+esc(q)+'"</div><div class="sr-empty">😕 مفيش نتائج — جرّبي كلمة تانية</div>';
  }else{
    html = '<div class="sr-header">نتائج البحث عن: "'+esc(q)+'" — '+results.length+(results.length >= MAX ? ' (أول '+MAX+' نتيجة)' : ' نتيجة')+'</div><div class="sr-list">';
    results.forEach(function(r, i){
      var s = subjects[r.si];
      if(!s) return;
      var srcName;
      if(r.type === 'lecture'){ srcName = '📚 ' + (((s.lectures || [])[r.li] || {}).t || ''); }
      else if(r.prop === 'lec'){ srcName = '🧠 ' + (((s.lectures || [])[r.ei] || {}).t || ''); }
      else{ var exam = (s[r.prop] || [])[r.ei] || {}; srcName = (r.prop === 'midterms' ? '📝 ' : (r.prop === 'finals' ? '🎓 ' : '🏦 ')) + (exam.t || ''); }
      html += '<div class="sr-item" onclick="openSearchResult('+i+')"><div class="sr-src"><b>'+esc(s.name)+'</b> — '+esc(srcName)+'</div><div class="sr-text" dir="auto">'+snippet(r.text, q)+'</div></div>';
    });
    html += '</div>';
  }
  box.innerHTML = html;
  box.classList.add('show');
}
function openSearchResult(i){
  var r = _searchResults[i];
  if(!r) return;
  clearSearch();
  if(r.si !== currentSubject){
    currentSubject = r.si;
    var meta = SUBJECTS_INDEX[r.si];
    document.getElementById('main-title').textContent = 'منصة مادة ' + meta.name + (meta.en ? ' — ' + meta.en : '');
    renderSubjectBar();
  }
  if(!subjects[r.si]){
    showSubjectLoading();
    loadSubject(r.si).then(function(){
      if(r.type === 'lecture'){ openLecture(r.si, r.li); }
      else{ openQuizAtQuestion(r.si, r.prop, r.ei, r.qi); }
    }).catch(function(err){ showToast('فشل تحميل المادة'); });
    return;
  }
  if(r.type === 'lecture'){ openLecture(r.si, r.li); }
  else{ openQuizAtQuestion(r.si, r.prop, r.ei, r.qi); }
}
function openQuizAtQuestion(subjIdx, prop, idx, qi){
  openQuiz(subjIdx, prop, idx);
  if(st && st.data.length && qi >= 0 && qi < st.data.length){ setTimeout(function(){ examGoTo(qi); }, 60); }
}
document.addEventListener('click', function(e){
  var sRes = document.getElementById('search-results');
  var sBox = document.getElementById('search-input');
  if(sRes && sRes.classList.contains('show') && !sRes.contains(e.target) && sBox && !sBox.contains(e.target)){ sRes.classList.remove('show'); }
});

// ============================================================
// 21) دمج تخطيطات PDF
// ============================================================
function mergePdfAnnot(currentRaw, backupRaw, strategy){
  var cur, bak;
  try{ cur = JSON.parse(currentRaw); }catch(e){ cur = null; }
  try{ bak = JSON.parse(backupRaw); }catch(e){ bak = null; }
  if(!cur) return backupRaw;
  if(!bak) return currentRaw;
  var curPages = (cur.pages && typeof cur.pages === 'object') ? cur.pages : {};
  var bakPages = (bak.pages && typeof bak.pages === 'object') ? bak.pages : {};
  function cloneStrokes(s){ if(!Array.isArray(s)) return []; return s.map(function(x){ return JSON.parse(JSON.stringify(x)); }); }
  var mergedPages = {};
  Object.keys(curPages).forEach(function(p){ mergedPages[p] = cloneStrokes(curPages[p]); });
  Object.keys(bakPages).forEach(function(p){
    if(strategy === 'backup'){ mergedPages[p] = cloneStrokes(bakPages[p]); }
    else if(strategy === 'combine'){ if(!mergedPages[p]){ mergedPages[p] = cloneStrokes(bakPages[p]); } else { mergedPages[p] = mergedPages[p].concat(cloneStrokes(bakPages[p])); } }
    else{ if(!mergedPages[p]){ mergedPages[p] = cloneStrokes(bakPages[p]); } }
  });
  return JSON.stringify({pages: mergedPages, name: (cur && cur.name) || (bak && bak.name) || '', size: (cur && cur.size) || (bak && bak.size) || 0, savedAt: Math.max((cur && cur.savedAt) || 0, (bak && bak.savedAt) || 0)});
}
function pdfAnnotHasConflict(currentRaw, backupRaw){
  var cur, bak;
  try{ cur = JSON.parse(currentRaw); }catch(e){ return false; }
  try{ bak = JSON.parse(backupRaw); }catch(e){ return false; }
  if(!cur || !bak || !cur.pages || !bak.pages) return false;
  var curP = Object.keys(cur.pages).filter(function(p){ return Array.isArray(cur.pages[p]) && cur.pages[p].length > 0; });
  var bakP = Object.keys(bak.pages).filter(function(p){ return Array.isArray(bak.pages[p]) && bak.pages[p].length > 0; });
  for(var i = 0; i < curP.length; i++){ if(bakP.indexOf(curP[i]) !== -1) return true; }
  return false;
}
function showPdfMergeDialog(callback){
  var overlay = document.createElement('div');
  overlay.className = 'pdf-merge-overlay';
  overlay.innerHTML =
    '<div class="pdf-merge-dialog"><div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;"><span style="font-size:32px;">📄</span><h2>تعارض في تخطيطات PDF</h2></div>'+
      '<p class="pdf-merge-warn">⚠️ عندك رسم على بعض صفحات PDF، والنسخة المستوردة فيها رسم على <b>نفس الصفحات</b>.<br>اختاري عايزة تتعامل مع الصفحات المشتركة إزاي:</p>'+
      '<div class="pdf-merge-options">'+
        '<button class="pdf-merge-btn combine" data-strategy="combine"><span>🟣 ادمج الاتنين <span class="pm-badge">موصى به</span></span><span class="pm-desc">كل الرسمات تظهر مع بعض — محدش يخسر شغله</span></button>'+
        '<button class="pdf-merge-btn current" data-strategy="current"><span>🔵 احتفظ بتخطيطي الحالي</span><span class="pm-desc">رسمك يكسب — رسم المستورد يضاف بس في الصفحات الجديدة</span></button>'+
        '<button class="pdf-merge-btn backup" data-strategy="backup"><span>🟢 استخدم تخطيط المستورد فقط</span><span class="pm-desc">رسم المستورد يكسب — رسمك الحالي يتشال</span></button>'+
      '</div>'+
      '<button class="pdf-merge-cancel" id="__cancelPdfMerge">إلغاء</button></div>';
  document.body.appendChild(overlay);
  overlay.querySelectorAll('[data-strategy]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var s = btn.getAttribute('data-strategy');
      document.body.removeChild(overlay);
      callback(s);
    });
  });
  overlay.querySelector('#__cancelPdfMerge').addEventListener('click', function(){ document.body.removeChild(overlay); });
}

// ============================================================
// 22) النسخة الاحتياطية
// ============================================================
var PROGRESS_KEYS = ['last_open_state','themeMode','notifications_data','cg_sections_v1','seen_system_edits','seen_added_lectures','sd.insOpenDays'];
var PROGRESS_PREFIXES = ['qa_','quiz_progress_','qmark_','pdfqalam:'];
var BACKUP_MAX_BYTES = 5 * 1024 * 1024;

function exportProgress(){
  var data = {_app:'study-platform-backup', _version:1, _date:new Date().toLocaleString('ar-EG')};
  var count = 0;
  try{
    for(var i = 0; i < localStorage.length; i++){
      var k = localStorage.key(i);
      if(!k) continue;
      var keep = (PROGRESS_KEYS.indexOf(k) !== -1);
      if(!keep){
        for(var p = 0; p < PROGRESS_PREFIXES.length; p++){ if(k.indexOf(PROGRESS_PREFIXES[p]) === 0){ keep = true; break; } }
      }
      if(keep){ data[k] = localStorage.getItem(k); count++; }
    }
  }catch(e){}
  if(!count){ showToast('مفيش تقدم محفوظ لسه'); return; }
  var d = new Date();
  var fname = 'backup-' + d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0') + '.json';
  triggerDownload(new Blob([JSON.stringify(data, null, 2)], {type:'application/json'}), fname);
  showToast('💾 تم تحميل النسخة الاحتياطية (' + count + ' عنصر)');
}

function importProgress(ev){
  var file = ev.target.files && ev.target.files[0];
  if(ev.target) ev.target.value = '';
  if(!file) return;
  if(file.size > BACKUP_MAX_BYTES){ showToast('❌ الملف كبير جدًا'); return; }
  var reader = new FileReader();
  reader.onload = function(){
    try{
      var data;
      try{ data = JSON.parse(reader.result); }catch(e){ showToast('❌ الملف مش JSON صالح'); return; }
      if(!data._app || data._app !== 'study-platform-backup'){ showToast('❌ الملف مش نسخة احتياطية من المنصة دي'); return; }
      if(!window.confirm('هيتم دمج النسخة مع تقدمك الحالي — متأكدة؟')) return;
      var count = 0;
      Object.keys(data).forEach(function(k){
        if(k.charAt(0) === '_') return;
        if(typeof data[k] === 'string'){
          try{ localStorage.setItem(k, data[k]); count++; }catch(e){}
        }
      });
      showToast('✅ تم دمج ' + count + ' عنصر — جاري إعادة التحميل...');
      setTimeout(function(){ location.reload(); }, 1000);
    }catch(e){ showToast('❌ الملف مش نسخة احتياطية صالحة'); }
  };
  reader.readAsText(file);
}

// ============================================================
// 23) لوحتي
// ============================================================
function dashBtnHtml(){
  var on = document.body.classList.contains('dashboard-mode');
  return '<button class="subj-btn '+(on?'active':'')+'" onclick="openDashboard()"><span>📊</span>'+
    '<span style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.25;"><span>الجدول</span>'+
    '<span style="font-size:10px;opacity:.8;font-weight:normal;">Schedule</span></span></button>';
}
function openDashboard(skipUrlUpdate){
  document.body.classList.add('dashboard-mode');
  document.body.classList.remove('instructors-mode');
  document.body.classList.remove('progress-mode');
  closeQuizEverywhere(); detachQNSidebar(); setQuizMode(false);
  document.getElementById('main-title').textContent = 'الجدول الدراسي';
  renderSubjectBar();
  showView('dashboard-view');
  window.scrollTo({top:0, behavior:'smooth'});
  saveLS({subject:currentSubject, view:'dashboard', lecture:-1, prop:null, qidx:null});
  if(!skipUrlUpdate){
    try{ history.pushState({view:'dashboard'}, '', location.pathname + '?page=schedule'); }catch(e){}
  }
  if(window.dashOpen) window.dashOpen();
}

// ============================================================
// ملخص التقدم (Dashboard)
// ============================================================
var _pgTok = 0;
function progBtnHtml(){
  var on = document.body.classList.contains('progress-mode');
  return '<button class="subj-btn '+(on?'active':'')+'" onclick="openProgress()"><span>📈</span>'+
    '<span style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.25;"><span>ملخص التقدم</span>'+
    '<span style="font-size:10px;opacity:.8;font-weight:normal;">Dashboard</span></span></button>';
}

function openProgress(skipUrlUpdate){
  hideNotFoundPage();
  document.body.classList.remove('dashboard-mode');
  document.body.classList.remove('instructors-mode');
  document.body.classList.add('progress-mode');
  closeQuizEverywhere(); detachQNSidebar(); setQuizMode(false);
  document.getElementById('main-title').textContent = '📈 ملخص التقدم';
  renderSubjectBar();
  showView('progress-view');
  window.scrollTo({top:0, behavior:'smooth'});
  saveLS({view:'progress', lecture:-1, prop:null, qidx:null});
  if(!skipUrlUpdate){
    try{ history.pushState({view:'progress'}, '', location.pathname + '?page=dashboard'); }catch(e){}
  }
  renderProgress();
}

function pgSolved(s, key, qs){
  var m = getSavedQuizFor(s, key), n = 0;
  Object.keys(m).forEach(function(k){
    var i = parseInt(k, 10);
    if(!isNaN(i) && i >= 0 && i < qs.length && !isEssay(qs[i])) n++;
  });
  return n;
}
function pgCalc(s){
  var out = {lecs:[], solved:0, total:0, scores:[]};
  (s.lectures || []).forEach(function(l, li){
    var qs = l.questions || [], total = 0;
    qs.forEach(function(q){ if(!isEssay(q)) total++; });
    var solved = Math.min(total, Math.max(pgSolved(s, lecQuizKey(l), qs), pgSolved(s, lecExamKey(l), qs)));
    var sc = getScore(s, lecQuizKey(l)) || getScore(s, lecExamKey(l));
    var val = null;
    if(sc && sc.score !== undefined && !isNaN(parseFloat(sc.score))) val = Math.round(parseFloat(sc.score));
    out.lecs.push({i:li, t:l.t || ('محاضرة ' + (li+1)), total:total, solved:solved, score:val, chapter:lecChapterOf(s, l, li)});
    out.solved += solved; out.total += total;
    if(val !== null) out.scores.push(val);
  });
  return out;
}
function pgAvg(a){
  if(!a.length) return null;
  var t = 0; a.forEach(function(x){ t += x; });
  return Math.round(t / a.length);
}
function pgBadge(v){
  if(v === null) return '<span class="pg-sc">— لا درجة</span>';
  return '<span class="badge '+(v >= 75 ? 'done' : (v >= 50 ? 'warn' : 'bad'))+'">🏆 '+v+'%</span>';
}
function pgBar(solved, total){
  var p = total ? Math.round(solved * 100 / total) : 0;
  return '<div class="pg-bar"><i style="width:'+p+'%"></i></div>';
}
function renderProgress(){
  var box = document.getElementById('progress-body');
  if(!box) return;
  var idxs = getActiveSubjects();
  if(!idxs.length){ box.innerHTML = '<p class="ld-hint">لا توجد مواد.</p>'; return; }
  var tok = ++_pgTok;
  box.innerHTML = '<div class="subject-loader"><div class="spinner-ring"></div><div class="loader-text">⏳ جاري تجميع التقدم...</div></div>';
  var chain = Promise.resolve();
  idxs.forEach(function(i){ chain = chain.then(function(){ return loadSubject(i).catch(function(){}); }); });
  chain.then(function(){
    if(tok !== _pgTok || !document.body.classList.contains('progress-mode')) return;
    pgDraw(box, idxs);
  });
}
function pgDraw(box, idxs){
  var sumLec = 0, sumSolved = 0, sumTotal = 0, allScores = [], cards = [];
  idxs.forEach(function(i){
    var meta = SUBJECTS_INDEX[i], s = subjects[i];
    var head = function(info){
      return '<div class="lc-cat-head" onclick="toggleLcCat(this)">'+
        '<span class="lc-cat-icon">'+(meta.icon || '📚')+'</span>'+
        '<span class="lc-cat-main"><span class="lc-cat-tt">'+esc(meta.name)+(meta.en ? ' <small style="opacity:.7;font-weight:normal;">'+esc(meta.en)+'</small>' : '')+'</span>'+
        '<span class="lc-cat-dd">'+info+'</span></span><span class="link-arrow">▶</span></div>';
    };
    if(!s){
      cards.push('<div class="lc-cat">'+head('⚠️ تعذّر تحميل المادة')+'<div class="lc-cat-body"></div></div>');
      return;
    }
    var c = pgCalc(s), avg = pgAvg(c.scores);
    sumLec += c.lecs.length; sumSolved += c.solved; sumTotal += c.total;
    c.scores.forEach(function(v){ allScores.push(v); });
    var info = c.lecs.length+' محاضرة • حليت '+c.solved+' من '+c.total+' سؤال'+(avg !== null ? ' • متوسط الدرجة '+avg+'%' : '');
    var lastChap = null;
    var rows = c.lecs.map(function(r){
      var h = '';
      if(r.chapter && r.chapter !== lastChap){ h = '<div class="pg-chap">📘 '+esc(r.chapter)+'</div>'; }
      lastChap = r.chapter || lastChap;
      return h+'<div class="pg-row" onclick="pgOpenLecture('+i+','+r.i+')">'+
        '<span class="pg-t">'+(r.i+1)+'. '+esc(r.t)+'</span>'+
        '<span class="pg-n">'+r.solved+' / '+r.total+' سؤال</span>'+
        pgBadge(r.score)+pgBar(r.solved, r.total)+'</div>';
    }).join('') || '<p class="ld-hint">لا توجد محاضرات لهذه المادة.</p>';
    cards.push('<div class="lc-cat">'+head(info)+
      '<div class="lc-cat-body"><div class="lc-cat-links">'+pgBar(c.solved, c.total)+'<div style="height:10px"></div>'+rows+'</div></div></div>');
  });
  var pct = sumTotal ? Math.round(sumSolved * 100 / sumTotal) : 0, avgAll = pgAvg(allScores);
  box.innerHTML =
    '<div class="pg-sum">'+
      '<div class="pg-stat"><b>'+idxs.length+'</b><span>مادة</span></div>'+
      '<div class="pg-stat"><b>'+sumLec+'</b><span>محاضرة</span></div>'+
      '<div class="pg-stat"><b>'+sumSolved+' / '+sumTotal+'</b><span>سؤال محلول ('+pct+'%)</span></div>'+
      '<div class="pg-stat"><b>'+(avgAll !== null ? avgAll+'%' : '—')+'</b><span>متوسط الدرجات</span></div>'+
    '</div>'+cards.join('');
}
function pgOpenLecture(i, li){
  document.body.classList.remove('progress-mode');
  selectSubject(i, true);
  openLecture(i, li);
}

(function(){
'use strict';
var DAYS=['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'],
AR={Saturday:'السبت',Sunday:'الأحد',Monday:'الاثنين',Tuesday:'الثلاثاء',Wednesday:'الأربعاء',Thursday:'الخميس',Friday:'الجمعة'},
TYPE={lecture:'محاضرة',section:'سكشن',lab:'معمل',exam:'امتحان',other:'أخرى',assignment:'تسليم',quiz:'كويز',midterm:'ميدتيرم',final:'فاينل',project:'مشروع'},
ST={cancelled:'ملغاة',moved:'متغيّرة',online:'أونلاين',makeup:'تعويضية'},
KEY='sd.cache.v1',D=null,last=0;
function $(i){return document.getElementById(i)}
function h(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function ls(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem(k));localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
function cairo(){var p={};new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Cairo',weekday:'long',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});
 return{day:p.weekday,min:+p.hour*60+ +p.minute,date:p.year+'-'+p.month+'-'+p.day,at:new Date(+p.year,+p.month-1,+p.day,+p.hour,+p.minute)}}
function tm(s){var a=s.split(':');return+a[0]*60+ +a[1]}
function dur(min){if(min<60)return min+' دقيقة';if(min<1440)return Math.floor(min/60)+' ساعة'+(min%60?' و'+min%60+' دقيقة':'');return Math.floor(min/1440)+' يوم'}
function cids(){var c=window.mysConfirmed;return c&&c.ids&&c.ids.length?c.ids:null}
function need(){return!cids()&&(!$('d-prog').value||!$('d-sec').value)}
function confUI(){var on=!!cids(),v=$('dashboard-view'),n=$('d-confnote');if(v)v.classList.toggle('my-confirmed',on);if(n)n.hidden=!on;if(on&&$('d-confn'))$('d-confn').textContent=cids().length+' موعد'}
function sess(day,n){var ids=cids();
 if(ids)return((D&&D.schedule)||[]).filter(function(s){return s.id&&ids.indexOf(s.id)>-1&&s.day===day&&(!s.effective_from||s.effective_from<=n.date)&&(!s.effective_to||s.effective_to>=n.date)}).sort(function(a,b){return tm(a.start)-tm(b.start)});
 if(need())return[];var P=$('d-prog').value,C=$('d-sec').value;
 return((D&&D.schedule)||[]).filter(function(s){return s.day===day&&(!s.effective_from||s.effective_from<=n.date)&&(!s.effective_to||s.effective_to>=n.date)&&(!s.program||s.program===P)&&(!s.section||s.section.split(/[\s,]+/).indexOf(C)>-1)}).sort(function(a,b){return tm(a.start)-tm(b.start)})}
function card(s,state){var c=h('div','dcard '+(state||'')+' '+(s.status||'')),r=h('div','row');
 r.appendChild(h('span','tm',s.start+' – '+s.end));r.appendChild(h('strong','nm',s.course_name_ar));
 if(TYPE[s.type])r.appendChild(h('span','bd',TYPE[s.type]));
 if(ST[s.status])r.appendChild(h('span','bd '+s.status,ST[s.status]));
 if(state==='now')r.appendChild(h('span','bd','دلوقتي'));
 c.appendChild(r);
 var m=[s.instructor,s.location,s.notes].filter(Boolean).join(' • ');
 if(m)c.appendChild(h('div','meta',m));return c}
function empty(el,t){el.appendChild(h('p','meta',t))}
function draw(){
 confUI();var n=cairo();$('d-today').textContent=AR[n.day]+' — '+n.date;
 ['d-alerts','d-next','d-day','d-dl','d-week'].forEach(function(i){$(i).textContent=''});
 if(!D){empty($('d-next'),'مفيش بيانات لسه.');return}
 (D.announcements||[]).filter(function(a){return a.priority==='important'&&(!a.publish_at||a.publish_at<=n.date)&&(!a.expires_at||a.expires_at>=n.date)}).forEach(function(a){
  var c=h('div','dcard alert');c.appendChild(h('strong',null,'مهم: '+a.title));if(a.body)c.appendChild(h('div','meta',a.body));
  if(a.link&&/^https:\/\//i.test(a.link)){var l=h('a',null,'فتح الرابط');l.href=a.link;l.target='_blank';l.rel='noopener noreferrer';c.appendChild(l)}
  $('d-alerts').appendChild(c)});
 var idx=DAYS.indexOf(n.day),nx=null,vd=$('d-dsel').value||n.day,list=sess(vd,n);
 $('d-dayh').textContent=vd===n.day?'جدول النهاردة':'جدول يوم '+AR[vd];
 sess(n.day,n).forEach(function(s){if(!nx&&s.status!=='cancelled'&&tm(s.start)>n.min)nx={s:s,i:0}});
 list.forEach(function(s){var st=s.status==='cancelled'?'cancelled':vd!==n.day?'':tm(s.end)<=n.min?'done':tm(s.start)<=n.min?'now':'';$('d-day').appendChild(card(s,st))});
 if(!list.length)empty($('d-day'),need()?'اختر القسم والسكشن من فوق.':vd===n.day?'مفيش محاضرات النهاردة.':'مفيش محاضرات في اليوم ده.');
 for(var i=1;i<8&&!nx;i++){var dn=DAYS[(idx+i)%7],q=sess(dn,n).filter(function(s){return s.status!=='cancelled'});if(q.length)nx={s:q[0],i:i,d:dn}}
 if(nx){var c=card(nx.s,'next');c.classList.add('hero');
  c.insertBefore(h('div','big',nx.i?'يوم '+AR[nx.d]:'بعد '+dur(tm(nx.s.start)-n.min)),c.firstChild);$('d-next').appendChild(c)}
 else empty($('d-next'),need()?'اختر القسم والسكشن من فوق عشان يظهر جدولك.':'مفيش محاضرات جاية في الجدول.');
 var dl=(D.deadlines||[]).map(function(d){var p=d.due_at.split(/[- :]/);d._t=new Date(+p[0],+p[1]-1,+p[2],+(p[3]||23),+(p[4]||59));return d})
  .filter(function(d){return d._t>=n.at}).sort(function(a,b){return a._t-b._t}).slice(0,5);
 dl.forEach(function(d){var m=Math.round((d._t-n.at)/60000),c=h('div','dcard'),r=h('div','row');
  r.appendChild(h('strong',null,d.title));if(TYPE[d.type])r.appendChild(h('span','bd',TYPE[d.type]));
  r.appendChild(h('span','bd '+(m<=1440?'urgent':m<=4320?'soon':''),'بعد '+dur(m)));c.appendChild(r);
  var mt=[d.course_code,d.due_at,d.location,d.notes].filter(Boolean).join(' • ');if(mt)c.appendChild(h('div','meta',mt));$('d-dl').appendChild(c)});
 if(!dl.length)empty($('d-dl'),'مفيش مواعيد قادمة.');
 DAYS.forEach(function(dn){var q=sess(dn,n);if(need()||!q.length&&dn==='Friday')return;
  var d=document.createElement('details');d.open=dn===vd;var s=h('summary',null,AR[dn]+' ('+q.length+')');d.appendChild(s);
  q.forEach(function(x){d.appendChild(card(x,x.status==='cancelled'?'cancelled':''))});
  if(!q.length)d.appendChild(h('p','meta','مفيش محاضرات.'));$('d-week').appendChild(d)});
 $('d-stamp').textContent=last?'آخر تحديث: '+new Date(last).toLocaleTimeString('ar-EG',{hour:'2-digit',minute:'2-digit'}):''}
function groups(){var P=$('d-prog'),ps={},cur=P.value||ls('sd.prog')||'';
 ((D&&D.schedule)||[]).forEach(function(s){if(s.program)ps[s.program]=1});
 while(P.options.length>1)P.remove(1);
 Object.keys(ps).sort().forEach(function(p){P.appendChild(new Option(p,p))});P.value=ps[cur]?cur:'';secs($('d-sec').value||ls('sd.sec')||'')}
function secs(want){var P=$('d-prog').value,S=$('d-sec'),set={};
 ((D&&D.schedule)||[]).forEach(function(s){if(s.program===P&&s.section)s.section.split(/[\s,]+/).forEach(function(x){if(/^\d+$/.test(x))set[x]=1})});
 while(S.options.length>1)S.remove(1);
 Object.keys(set).sort(function(a,b){return a-b}).forEach(function(x){S.appendChild(new Option('سكشن '+x,x))});S.value=set[want]?want:''}
function get(t){return fetch('/api/sheet?tab='+t,{headers:{Accept:'application/json'}}).then(function(r){return r.json()}).then(function(j){if(!j.ok)throw new Error(j.code);return j.items}).catch(function(e){return t==='schedule'?Promise.reject(e):null})}
function banner(t){var b=$('d-banner');b.textContent=t;b.style.display=t?'block':'none'}
function load(){$('d-rf').disabled=true;
 Promise.all(['schedule','announcements','deadlines'].map(get)).then(function(a){
  D={schedule:a[0],announcements:a[1]||(D&&D.announcements)||[],deadlines:a[2]||(D&&D.deadlines)||[]};
  last=Date.now();ls(KEY,{t:last,d:D});banner('');groups();draw();
  var upEl = $('d-updated');
  if(upEl){ upEl.textContent = 'آخر تحديث: ' + new Date(last).toLocaleTimeString('ar-EG',{hour:'2-digit',minute:'2-digit'}); }
  if(window.mysRefresh)window.mysRefresh()})
 .catch(function(){banner(D?'تعذّر التحديث — ده آخر جدول محفوظ'+(navigator.onLine?'':' (غير متصل)'):'تعذّر تحميل الجدول — تحقق من إعداد الشيت وروابط النشر.')})
 .then(function(){$('d-rf').disabled=false})}
var inited=false;
function init(){
var c=ls(KEY);if(c&&c.d){D=c.d;last=c.t}
$('d-prog').addEventListener('change',function(){ls('sd.prog',this.value);ls('sd.sec','');secs('');draw()});
$('d-sec').addEventListener('change',function(){ls('sd.sec',this.value);draw()});
$('d-dsel').addEventListener('change',draw);
$('d-rf').addEventListener('click',load);
document.addEventListener('visibilitychange',function(){if(!document.hidden&&document.body.classList.contains('dashboard-mode')){draw();if(Date.now()-last>300000)load()}});
setInterval(function(){if(!document.hidden&&document.body.classList.contains('dashboard-mode'))draw()},60000);
setInterval(function(){if(!document.hidden&&document.body.classList.contains('dashboard-mode'))load()},600000);
groups();draw();load();
}
window.dashGetData=function(){return D};
window.dashRedraw=function(){draw()};
window.dashOpen=function(){if(!inited){inited=true;init()}else{draw();if(Date.now()-last>60000)load()}};
})();

// ============================================================
// ★★★ السكشن — التعديلات 2, 3, 4, 5, 6, 9 ★★★
// ============================================================
/* ★ التعديل 9: cache لكل مادة */
var secState = {view:'lecture', inst:null, secId:null};
var _secData = null, _secErr = '';
var _secDataBySubject = {};
var _secPromisesBySubject = {};

/* ★ التعديل 3: SEC_MAT بعد إضافة extraFiles */
var SEC_MAT = [
  ['file','📄','ملف السكشن','فتح'],
  ['exercises','📝','التمارين','فتح'],
  ['solution','✅','الحل النموذجي','فتح'],
  ['recording','🎥','تسجيل السكشن','مشاهدة']
];
var SEC_STATUS = {soon:'قريبًا', unavailable:'غير متاح', available:'متاح'};

function secItemTitle(x, idx, plain){
  if(x && typeof x.title === 'string' && x.title.trim()) return x.title.trim();
  if(x && typeof x.groupName === 'string' && x.groupName.trim()) return x.groupName.trim();
  return plain ? '' : ('سكشن ' + (idx + 1));
}
function secEl(t,c,x){ var e = document.createElement(t); if(c) e.className = c; if(x != null) e.textContent = x; return e; }
function secUrl(u){ return (typeof u === 'string' && /^https:\/\/[^\s]+$/i.test(u.trim())) ? u.trim() : null; }

/* ★ التعديل 9: بناء مسار ملف السكاشن */
/* ★ التعديل 9 المحسّن: ملفات السكاشن في مجلد المادة */
/* ★ هيكل مجلدات: كل مادة في مجلدها datenew/{slug}/ */

function secFileForSubject(meta){
  // 1) لو محدّد صراحةً في subjects-index.js
  if(meta && typeof meta.sectionsFile === 'string' && meta.sectionsFile.trim()){
    return meta.sectionsFile.trim();
  }
  // 2) fallback: datenew/{slug}/sections-{slug}.json
  if(meta && meta.slug){
    return 'datenew/' + meta.slug + '/sections-' + meta.slug + '.json';
  }
  // 3) آخر fallback
  return 'datenew/sections.json';
}

/* ★ التعديل 9: secLoad جديدة مع cache لكل مادة */
function secLoad(){
  var meta = SUBJECTS_INDEX[currentSubject];
  if(!meta || !meta.slug) return Promise.reject(new Error('NO_SLUG'));
  var slug = meta.slug;

  if(_secDataBySubject[slug]){
    _secData = _secDataBySubject[slug];
    return Promise.resolve(_secData);
  }
  if(_secPromisesBySubject[slug]) return _secPromisesBySubject[slug];

  var path = secFileForSubject(meta);
  _secPromisesBySubject[slug] = fetch(path, {headers:{Accept:'application/json'}})
    .then(function(r){
      if(r.status === 404) throw new Error('NOFILE');
      if(!r.ok) throw new Error('HTTP');
      return r.json();
    })
    .then(function(j){
      if(!j || !Array.isArray(j.sections)) throw new Error('BAD');
      var arr = j.sections.filter(function(x){
        return x && typeof x === 'object' &&
          typeof x.subject === 'string' &&
          (typeof x.lecture === 'string' || typeof x.lectureId === 'string') &&
          typeof x.instructorId === 'string' && x.instructorId &&
          typeof x.instructorName === 'string' && x.instructorName.trim();
      });
      _secDataBySubject[slug] = arr;
      _secData = arr;
      return arr;
    })
    .catch(function(e){
      delete _secPromisesBySubject[slug];
      throw e;
    });

  return _secPromisesBySubject[slug];
}

/* ★ التعديل 9: إعادة تعيين عند تغيير المادة */
function secResetForSubject(){
  var meta = SUBJECTS_INDEX[currentSubject];
  if(!meta) return;
  _secData = _secDataBySubject[meta.slug] || null;
  _secErr = '';
  _secFailAt = 0;
}

var _sumPdf = null, _sumRendered = false, _sumTitle = '';
function lectureUrlOk(u){
  if(typeof u !== 'string') return false;
  u = u.trim();
  if(!u) return false;
  if(/^https:\/\/[^\s]+$/i.test(u)) return true;
  return !/^[a-z][a-z0-9+.-]*:/i.test(u) && u.indexOf('//') !== 0;
}
function renderSummary(l){
  var sec = document.getElementById('ld-summary'), sm = l && l.summary;
  _sumPdf = null; _sumRendered = false; _sumTitle = (l && l.t) || '';
  var raw = sm && (sm.pdf || sm.pdfUrl);
  var pdf = lectureUrlOk(raw) ? raw.trim() : null;
  var text = (sm && typeof sm.text === 'string' && sm.text.trim()) ? sm.text.trim() : null;
  document.getElementById('ld-summary-attach').innerHTML = '';
  var tx = document.getElementById('ld-summary-text'); tx.textContent = ''; tx.hidden = true;
  var tg = document.getElementById('ld-summary-toggle'); tg.setAttribute('aria-expanded', 'false');
  if(!pdf && !text){ sec.style.display = 'none'; return false; }
  sec.style.display = '';
  _sumPdf = pdf;
  var chip = document.getElementById('ld-summary-chip');
  chip.textContent = (pdf && text) ? 'PDF + نص' : (pdf ? 'PDF' : 'نص'); chip.className = 'ld-chip ok';
  if(text) tx.textContent = text;
  document.getElementById('ld-summary-actions').style.display = (pdf && text) ? '' : 'none';
  if(!pdf && text) tx.hidden = false;
  return true;
}
function toggleSummary(){
  toggleLD('ld-summary');
  var open = document.getElementById('ld-summary').classList.contains('open');
  if(open && _sumPdf && !_sumRendered){ _sumRendered = true; renderAttachCard('ld-summary-attach', 'ملخص ' + _sumTitle, _sumPdf); }
}
function toggleSummaryText(){
  var tx = document.getElementById('ld-summary-text'), b = document.getElementById('ld-summary-toggle');
  tx.hidden = !tx.hidden;
  b.setAttribute('aria-expanded', String(!tx.hidden));
  b.textContent = tx.hidden ? '📖 قراءة الملخص نصيًا' : '🙈 إخفاء النص';
}
function renumberLD(){
  var n = 0;
  [].forEach.call(document.querySelectorAll('#lecture-view .ld-section'), function(el){
    if(getComputedStyle(el).display === 'none') return;
    var num = el.querySelector('.ld-num'); if(num) num.textContent = ++n;
  });
}
var _secFailAt = 0;
function secPrepare(){
  var card = document.getElementById('ld-sec'); if(card) card.classList.remove('has');
  if(_secFailAt && Date.now() - _secFailAt < 60000) return;
  var si = currentSubject, li = currentLecture;
  secLoad().then(function(){
    if(card && si === currentSubject && li === currentLecture && secForLecture().length){ card.classList.add('has'); renumberLD(); }
  }).catch(function(){ _secFailAt = Date.now(); });
}

/* ★ التعديل 5: secForLecture بدون seen */
function secForLecture(){
  var m = SUBJECTS_INDEX[currentSubject], s = subjects[currentSubject];
  var l = s && s.lectures && s.lectures[currentLecture];
  if(!m || !l || !_secData) return [];
  return _secData.filter(function(x){
    if(x.subject !== m.slug) return false;
    if(!(x.lecture === lecQuizKey(l) || (x.lectureId && l.id && x.lectureId === l.id))) return false;
    return true;
  });
}

function secRow(icon, label, action, url, off){
  var el = secEl(url && !off ? 'a' : 'div', 'sec-row' + (url && !off ? '' : ' off'));
  if(url && !off){ el.href = url; el.target = '_blank'; el.rel = 'noopener noreferrer'; el.setAttribute('aria-label', label + ' — ' + action); }
  el.appendChild(secEl('span','sec-ic',icon)); el.appendChild(secEl('span','sec-lb',label));
  el.appendChild(secEl('span','sec-act', off ? off : action)); return el;
}
function secDocRow(d, lb, url, typ, off){
  var ok = url && !off, wrap = secEl('div','sec-doc');
  var row = secEl(ok ? 'button' : 'div', 'sec-row' + (ok ? '' : ' off'));
  if(ok){ row.type = 'button'; row.setAttribute('aria-expanded','false'); }
  row.appendChild(secEl('span','sec-ic',d[1]));
  var t = secEl('span','sec-lb',lb);
  if(typ) t.appendChild(secEl('small','sec-sub',typ));
  row.appendChild(t);
  var act = secEl('span','sec-act', off ? off : (ok ? d[3] : 'الرابط غير صالح'));
  row.appendChild(act); wrap.appendChild(row);
  if(ok){
    var box = secEl('div','sec-viewer'); box.id = 'sec-box-' + d[0]; box.hidden = true; wrap.appendChild(box);
    row.onclick = function(){
      if(box.hidden){ box.hidden = false; renderAttachCard(box.id, lb, url); act.textContent = 'إغلاق'; row.setAttribute('aria-expanded','true'); }
      else{ box.hidden = true; box.innerHTML = ''; act.textContent = d[3]; row.setAttribute('aria-expanded','false'); }
    };
  }
  return wrap;
}

/* ★ التعديل 6: عنوان السكشن من الداتا */
function secSectionTitle(){
  var meta = SUBJECTS_INDEX[currentSubject];
  var s = subjects[currentSubject];
  var l = s && s.lectures && s.lectures[currentLecture];
  if(l && typeof l.sectionTitle === 'string' && l.sectionTitle.trim()) return l.sectionTitle.trim();
  if(meta && typeof meta.sectionTitle === 'string' && meta.sectionTitle.trim()) return meta.sectionTitle.trim();
  if(_secData){
    var found = _secData.filter(function(x){
      return x.subject === (meta && meta.slug) && typeof x.sectionTitle === 'string' && x.sectionTitle.trim() &&
        (x.lecture === lecQuizKey(l) || (x.lectureId && l && x.lectureId === l.id));
    })[0];
    if(found) return found.sectionTitle.trim();
  }
  return '🧩 السكشن';
}

/* ★ التعديلات 2 + 3 + 4 + 5 + 6: secRender الجديدة */
function secRender(){
  var lv = document.getElementById('lecture-view'),
      body = document.getElementById('sec-body'),
      title = document.getElementById('sec-title');
  lv.classList.toggle('sec-open', secState.view !== 'lecture');
  body.textContent = '';
  if(secState.view === 'lecture') return;
  window.scrollTo({top:0, behavior:'smooth'});

  if(secState.view === 'sections'){
    title.textContent = secSectionTitle();
    if(_secErr){
      body.appendChild(secEl('p','ld-hint', _secErr));
      var rt = secEl('button','sec-item','🔄 إعادة المحاولة'); rt.type = 'button';
      rt.onclick = function(){ _secErr=''; secRender(); secLoad().then(secRender).catch(secFail); };
      body.appendChild(rt); return;
    }
    if(!_secData){ body.appendChild(secEl('p','ld-hint','⏳ جاري تحميل السكاشن...')); return; }
    var list = secForLecture();
    if(!list.length){ body.appendChild(secEl('p','ld-hint','لا توجد سكاشن لهذه المحاضرة حتى الآن.')); return; }

    /* ★ التعديل 2: معيد واحد → افتح مباشرةً */
    var uniqueInsts = {};
    list.forEach(function(x){ uniqueInsts[x.instructorId] = 1; });
    var instKeys = Object.keys(uniqueInsts);
    if(instKeys.length === 1){
      secState = {view:'instructor', inst:instKeys[0], secId:null};
      secRender();
      return;
    }

    /* ★ التعديل 5: تجميع السكاشن حسب المعيد */
    var byInst = {}, order = [];
    list.forEach(function(x){
      if(!byInst[x.instructorId]){ byInst[x.instructorId] = []; order.push(x.instructorId); }
      byInst[x.instructorId].push(x);
    });

    var wrap = secEl('div','sec-list');
    order.forEach(function(instId){
      var items = byInst[instId], first = items[0];
      var b = secEl('button','sec-item'); b.type = 'button';
      b.appendChild(secEl('span','sec-ic','🧑‍🏫'));
      var t = secEl('span','sec-lb', first.instructorName.trim());
      var groups = items.map(function(x, xi){ return secItemTitle(x, xi, true); }).filter(Boolean);
      if(groups.length) t.appendChild(secEl('small','sec-sub', groups.join(' • ')));
      b.appendChild(t);
      b.appendChild(secEl('span','sec-act', items.length > 1 ? items.length + ' سكاشن' : '◀'));
      b.onclick = function(){ secOpenInst(instId); };
      wrap.appendChild(b);
    });
    body.appendChild(wrap);
    return;
  }

  /* صفحة معيد */
  var instSections = secForLecture().filter(function(x){ return x.instructorId === secState.inst; });
  if(!instSections.length){ secGo('sections'); return; }
  title.textContent = 'سكشن ' + instSections[0].instructorName.trim();

  /* ★ التعديل 5: منتقي السكاشن لو أكتر من واحد */
  if(instSections.length > 1 && !secState.secId){
    var picker = secEl('div','sec-list');
    picker.appendChild(secEl('div','sec-picker-title',
      '📚 المعيد ' + instSections[0].instructorName + ' عنده ' + instSections.length + ' سكاشن — اختر واحد:'));
    instSections.forEach(function(sx, sxi){
      var sb = secEl('button','sec-item'); sb.type = 'button';
      sb.appendChild(secEl('span','sec-ic','📘'));
      sb.appendChild(secEl('span','sec-lb', secItemTitle(sx, sxi)));
      sb.appendChild(secEl('span','sec-act','◀'));
      sb.onclick = function(){ secState = {view:'instructor', inst:secState.inst, secId:sx.id}; secRender(); };
      picker.appendChild(sb);
    });
    body.appendChild(picker);
    return;
  }

  var cur = (instSections.length === 1)
    ? instSections[0]
    : (instSections.filter(function(x){ return x.id === secState.secId; })[0] || instSections[0]);

  /* زر رجوع لقائمة السكاشن */
  if(instSections.length > 1){
    var bl = secEl('button','sec-item'); bl.type = 'button';
    bl.appendChild(secEl('span','sec-ic','↩'));
    bl.appendChild(secEl('span','sec-lb','كل سكاشن المعيد'));
    bl.appendChild(secEl('span','sec-act','◀'));
    bl.onclick = function(){ secState = {view:'instructor', inst:secState.inst, secId:null}; secRender(); };
    body.appendChild(bl);
  }

  if(typeof cur.title === 'string' && cur.title.trim()){
    title.textContent = cur.title.trim() + ' — ' + instSections[0].instructorName.trim();
  }
  var off = (cur.status === 'soon' || cur.status === 'unavailable') ? SEC_STATUS[cur.status] : null;
  if(SEC_STATUS[cur.status]){
    body.appendChild(secEl('span','ld-chip' + (cur.status === 'available' ? ' ok' : ' warn'), SEC_STATUS[cur.status]));
  }
  if(typeof cur.groupName === 'string' && cur.groupName.trim()){
    body.appendChild(secEl('div','sec-group-name','📘 ' + cur.groupName.trim()));
  }
  var notes = qTxt(cur.notes);
  if(notes){
    var nb = secEl('div','sec-notes');
    nb.appendChild(secEl('b', null, '📝 ملاحظات المعيد:'));
    nb.appendChild(secEl('p', null, notes));
    body.appendChild(nb);
  }

  /* مواد السكشن الأساسية */
  var mats = (cur.materials && typeof cur.materials === 'object') ? cur.materials : {};
  var n = 0, box = secEl('div','sec-list');
  SEC_MAT.forEach(function(d){
    var v = mats[d[0]]; if(!v) return;
    var u = typeof v === 'object' ? v.url : v;
    var lb = (typeof v === 'object' && typeof v.label === 'string' && v.label.trim()) ? v.label.trim() : d[2];
    n++;
    if(d[0] !== 'recording'){
      var typ = (typeof v === 'object' && typeof v.type === 'string' && v.type.trim().length <= 12) ? v.type.trim() : '';
      box.appendChild(secDocRow(d, lb, lectureUrlOk(u) ? u.trim() : null, typ, off));
    }else{
      var ok = secUrl(u);
      box.appendChild(secRow(d[1], lb, d[3], ok, off || (ok ? null : 'الرابط غير صالح')));
    }
  });
  (Array.isArray(mats.extraLinks) ? mats.extraLinks : []).forEach(function(x){
    if(!x || typeof x !== 'object' || typeof x.label !== 'string' || !x.label.trim()) return;
    var ok = secUrl(x.url); n++;
    box.appendChild(secRow('🔗', x.label.trim(), 'فتح', ok, off || (ok ? null : 'الرابط غير صالح')));
  });

  /* ★ التعديل 3: extraFiles */
  var extras = Array.isArray(cur.extraFiles) ? cur.extraFiles : [];
  if(extras.length){
    box.appendChild(secEl('div','sec-header-row','📎 ملفات إضافية'));
    extras.forEach(function(f, fi){
      if(!f || typeof f !== 'object') return;
      var u = f.url;
      var lb = (typeof f.label === 'string' && f.label.trim()) ? f.label.trim() : ('ملف إضافي ' + (fi+1));
      var typ = (typeof f.type === 'string') ? f.type.trim() : '';
      var fakeDef = ['extra-'+fi, '📎', lb, 'فتح'];
      box.appendChild(secDocRow(fakeDef, lb, lectureUrlOk(u) ? u.trim() : null, typ, off));
      n++;
    });
  }

  if(n) body.appendChild(box);

  /* ★ التعديل 4: task */
  var task = cur.task;
  if(task && typeof task === 'object' && (task.url || task.title)){
    var tb = secEl('div','sec-task');
    tb.appendChild(secEl('div','sec-task-title','📌 ملف المهمة'));
    if(task.title)   tb.appendChild(secEl('div','sec-task-name', task.title));
    if(task.dueDate) tb.appendChild(secEl('div','sec-task-due','📅 تاريخ التسليم: ' + task.dueDate));
    if(task.notes)   tb.appendChild(secEl('div','sec-task-notes','📝 ' + task.notes));
    if(task.url){
      var fakeT = ['task', '📎', 'فتح ملف المهمة', 'فتح'];
      tb.appendChild(secDocRow(fakeT, 'فتح ملف المهمة', lectureUrlOk(task.url) ? task.url.trim() : null, '', off));
    }
    body.appendChild(tb);
  }

  if(!n && !notes && !task) body.appendChild(secEl('p','ld-hint','لا توجد مواد لهذا المعيد حتى الآن.'));
}

function secFail(e){
  _secErr = (e && e.message === 'NOFILE') ? 'لم تتم إضافة بيانات السكاشن بعد.' : 'تعذّر تحميل السكاشن. تحقق من الاتصال وحاول مرة أخرى.';
  if(secState.view !== 'lecture') secRender();
}
function secGo(view, inst, secId){ secState = {view:view, inst:inst || null, secId:secId || null}; secRender(); }
function openSections(){
  history.pushState({sv:'sections'}, '');
  _secErr = ''; secGo('sections');
  if(!_secData) secLoad().then(secRender).catch(secFail);
}
function secOpenInst(id){ history.pushState({sv:'instructor', id:id}, ''); secGo('instructor', id); }

/* ★ التعديل 2: زر الرجوع يرجع للمحاضرة لو معيد واحد بس */
function secBack(){
  if(history.state && history.state.sv){ history.back(); return; }
  if(secState.view === 'instructor'){
    if(secState.secId){ secState = {view:'instructor', inst:secState.inst, secId:null}; secRender(); return; }
    var list = secForLecture();
    var uniq = {}; list.forEach(function(x){ uniq[x.instructorId] = 1; });
    if(Object.keys(uniq).length <= 1){ secGo('lecture'); return; }
    secGo('sections');
  } else if(secState.view === 'sections'){
    secGo('lecture');
  } else {
    secGo('lecture');
  }
}
function secResetUI(){ secState = {view:'lecture', inst:null, secId:null}; var lv = document.getElementById('lecture-view'); if(lv) lv.classList.remove('sec-open'); }

window.addEventListener('popstate', function(e){
  var lv = document.getElementById('lecture-view');
  if(!lv || !lv.classList.contains('active')) return;
  var stt = e.state;
  if(stt && stt.sv){ _secErr = ''; secGo(stt.sv, stt.id); if(stt.sv === 'sections' && !_secData) secLoad().then(secRender).catch(secFail); }
  else secGo('lecture');
});

// ============================================================
// ترجمة/شرح الأسئلة
// ============================================================
function qTxt(v){ return (typeof v === 'string' && v.trim()) ? v.trim() : null; }
function qExtraBtn(k, uid, label){
  return '<button type="button" class="q-extra-btn" data-k="'+k+'" aria-expanded="false" aria-controls="q'+k+'-'+uid+'" onclick="toggleQExtra(this)">'+label+'</button>';
}
function qTrHTML(q, uid){
  var t = qTxt(q && q.translation); if(!t) return '';
  return '<div class="q-extra-btns">'+qExtraBtn('tr', uid, '🌐 ترجمة السؤال')+'</div>'+
         '<div class="q-extra-panel" dir="auto" id="qtr-'+uid+'" hidden>'+esc(t)+'</div>';
}
function qExHTML(q, uid){
  var t = qTxt(q && q.explanation); if(!t) return '';
  return '<div class="q-extra-btns">'+qExtraBtn('ex', uid, '💡 لماذا هذه الإجابة؟')+'</div>'+
         '<div class="q-extra-panel" dir="auto" id="qex-'+uid+'" hidden>'+esc(t)+'</div>';
}
function toggleQExtra(btn){
  var p = document.getElementById(btn.getAttribute('aria-controls')); if(!p) return;
  p.hidden = !p.hidden;
  btn.setAttribute('aria-expanded', String(!p.hidden));
  btn.textContent = btn.getAttribute('data-k') === 'tr'
    ? (p.hidden ? '🌐 ترجمة السؤال' : '🙈 إخفاء الترجمة')
    : (p.hidden ? '💡 لماذا هذه الإجابة؟' : '🙈 إخفاء الشرح');
}

// ============================================================
// تخزين الجدول الشخصي
// ============================================================
var SD_STORE = (function(){
  var KEY = 'sd.my.v1', DB = 'sd-store', OS = 'kv', MAXLS = 4096;
  function valid(r){
    return !!r && typeof r === 'object' && Array.isArray(r.ids) && typeof r.updatedAt === 'number' &&
      r.ids.every(function(x){ return typeof x === 'string' && x.length <= 80; });
  }
  function readLS(){ try{ var r = JSON.parse(localStorage.getItem(KEY)); return valid(r) ? r : null; }catch(e){ return null; } }
  function open(){
    return new Promise(function(res, rej){
      if(!window.indexedDB) return rej(new Error('noidb'));
      var q = indexedDB.open(DB, 1);
      q.onupgradeneeded = function(){ q.result.createObjectStore(OS); };
      q.onsuccess = function(){ res(q.result); };
      q.onerror = function(){ rej(q.error); };
      q.onblocked = function(){ rej(new Error('blocked')); };
    });
  }
  function tx(mode, fn){
    return open().then(function(db){
      return new Promise(function(res, rej){
        var t = db.transaction(OS, mode), r = fn(t.objectStore(OS));
        t.oncomplete = function(){ db.close(); res(r && r.result); };
        t.onerror = t.onabort = function(){ db.close(); rej(t.error); };
      });
    });
  }
  function readIDB(){ return tx('readonly', function(s){ return s.get(KEY); }).then(function(r){ return valid(r) ? r : null; }).catch(function(){ return null; }); }
  return {
    get: function(){
      var l = readLS();
      return readIDB().then(function(i){ if(l && i) return i.updatedAt > l.updatedAt ? i : l; return l || i || null; });
    },
    set: function(ids){
      var rec = {ids: ids.slice(), updatedAt: Date.now()}, json = JSON.stringify(rec);
      if(json.length <= MAXLS){
        try{ localStorage.setItem(KEY, json); return tx('readwrite', function(s){ return s['delete'](KEY); }).catch(function(){}).then(function(){ return 'ls'; }); }catch(e){}
      }
      return tx('readwrite', function(s){ return s.put(rec, KEY); }).then(function(){ try{ localStorage.removeItem(KEY); }catch(e){} return 'idb'; });
    },
    clear: function(){
      try{ localStorage.removeItem(KEY); }catch(e){}
      return tx('readwrite', function(s){ return s['delete'](KEY); }).catch(function(){});
    }
  };
})();

var mys = {ids: []};

/* ★ تحميل الجدول الشخصي المحفوظ + اعتماده */
var MYS_CONF_KEY = 'sd.my.confirmed.v1';
function mysConfLoad(){
  try{
    var r = JSON.parse(localStorage.getItem(MYS_CONF_KEY));
    if(r && Array.isArray(r.ids) && r.ids.every(function(x){ return typeof x === 'string' && x.length <= 80; })) return r;
  }catch(e){}
  return null;
}
window.mysConfirmed = mysConfLoad();
function mysConfUI(){
  var st = document.getElementById('ins-confirm-state');
  if(!st) return;
  var btn = document.getElementById('ins-confirm-btn'), un = document.getElementById('ins-unconfirm-btn');
  var c = window.mysConfirmed, cur = (window.mys && mys.ids) || [];
  var same = !!c && c.ids.length === cur.length && c.ids.every(function(id){ return cur.indexOf(id) > -1; });
  if(c && same){ st.textContent = '✅ جدولك معتمد (' + c.ids.length + ' موعد) — صفحة الجدول بتعرضه تلقائي'; st.className = 'ok'; }
  else if(c){ st.textContent = '⚠️ فيه تعديلات لسه متأكدتش — اضغط تأكيد علشان تتعتمد'; st.className = 'warn'; }
  else{ st.textContent = 'جدولك لسه مش معتمد — بعد ما تضيف مواعيدك اضغط تأكيد'; st.className = ''; }
  if(btn) btn.disabled = !cur.length || (!!c && same);
  if(un) un.style.display = c ? '' : 'none';
}
function mysConfirm(){
  var ids = (window.mys && mys.ids) || [];
  if(!ids.length){ showToast('⚠️ ضيف مواعيد لجدولك الأول'); return; }
  var rec = {ids: ids.slice(), at: Date.now()};
  try{ localStorage.setItem(MYS_CONF_KEY, JSON.stringify(rec)); }
  catch(e){ showToast('تعذّر حفظ الاعتماد على الجهاز'); return; }
  window.mysConfirmed = rec;
  mysConfUI();
  showToast('✅ تم اعتماد جدولك الشخصي');
  if(window.dashRedraw) window.dashRedraw();
}
function mysUnconfirm(){
  try{ localStorage.removeItem(MYS_CONF_KEY); }catch(e){}
  window.mysConfirmed = null;
  mysConfUI();
  showToast('↩ اتلغى الاعتماد — اختار القسم والسكشن من الجدول');
  if(window.dashRedraw) window.dashRedraw();
}
SD_STORE.get().then(function(r){
  if(r && Array.isArray(r.ids)){
    if(!mys.ids) mys.ids = [];
    r.ids.forEach(function(id){ if(mys.ids.indexOf(id) === -1) mys.ids.push(id); });
  }
  mysConfUI();
  if(window.mysRefresh) window.mysRefresh();
}).catch(function(){});
var MYS_DAYS = ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
var MYS_AR = {Saturday:'السبت',Sunday:'الأحد',Monday:'الاثنين',Tuesday:'الثلاثاء',Wednesday:'الأربعاء',Thursday:'الخميس',Friday:'الجمعة'};
var MYS_T = {lecture:'محاضرة',section:'سكشن',lab:'معمل',exam:'امتحان',other:'أخرى'};
function mysRows(){ var d = window.dashGetData && window.dashGetData(); return (d && d.schedule) || []; }
function mysSave(ids){
  mys.ids = ids;
  return SD_STORE.set(ids).catch(function(){ showToast('تعذّر حفظ جدولك على الجهاز'); });
}
function mysOpen(){ openMySchedule(); }
function mysClose(){ goBackFromInstructors(); }
window.mysRefresh = function(){
  var iv = document.getElementById('instructors-view');
  if(iv && iv.classList.contains('active')) insRender();
};



// ============================================================
// ★ التعديل 4: دليل الدكاترة والمعيدين
// ============================================================
var INS_DAYS = ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
var INS_DAYS_AR = {Saturday:'السبت',Sunday:'الأحد',Monday:'الاثنين',Tuesday:'الثلاثاء',Wednesday:'الأربعاء',Thursday:'الخميس',Friday:'الجمعة'};
var INS_TYPES = {lecture:'محاضرة',section:'سكشن',lab:'معمل',other:'أخرى',exam:'امتحان'};
var insState = { program:'', day:'', type:'', search:'' };

function insData(){
  var d = window.dashGetData && window.dashGetData();
  return (d && d.schedule) || [];
}

/* ★ التعديل 7: حالة الأكورديون المحفوظة */
var insOpenDays = {};
try{ insOpenDays = JSON.parse(localStorage.getItem('sd.insOpenDays') || '{}') || {}; }catch(e){ insOpenDays = {}; }
function insSaveOpenDays(){
  try{ localStorage.setItem('sd.insOpenDays', JSON.stringify(insOpenDays)); }catch(e){}
}

function openMySchedule(skipUrlUpdate){
  document.body.classList.add('instructors-mode');
  document.body.classList.remove('dashboard-mode');
  document.body.classList.remove('progress-mode');
  closeQuizEverywhere();
  detachQNSidebar();
  setQuizMode(false);
  document.getElementById('main-title').textContent = '📌 جدولي الشخصي';
  renderSubjectBar();
  showView('instructors-view');
  if(!skipUrlUpdate){
    try{ history.pushState({view:'schedule'}, '', location.pathname + '?page=myschedule'); }catch(e){}
  }
  window.scrollTo({top:0, behavior:'smooth'});
  insInit();
  if(!insData().length && window.dashOpen){
    window.dashOpen();
    setTimeout(function(){ if(insData().length) insInit(); }, 800);
  }
}

function openInstructorsGuide(){ openMySchedule(); }

function goBackFromInstructors(){
  document.body.classList.remove('instructors-mode');
  if(history.state && history.state.view === 'schedule'){ history.back(); return; }
  showView('dashboard-view');
  document.getElementById('main-title').textContent = 'الجدول الدراسي';
  renderSubjectBar();
  if(window.dashOpen) window.dashOpen();
}

function insInit(){
  var progSel = document.getElementById('ins-prog');
  var daySel  = document.getElementById('ins-day');
  var typeSel = document.getElementById('ins-type');
  var searchI = document.getElementById('ins-search');
  if(!progSel) return;

  if(progSel.options.length <= 1){
    var progs = {};
    insData().forEach(function(r){ if(r.program) progs[r.program] = 1; });
    Object.keys(progs).sort().forEach(function(p){ progSel.appendChild(new Option(p, p)); });
  }
  if(daySel.options.length <= 1){ INS_DAYS.forEach(function(dn){ daySel.appendChild(new Option(INS_DAYS_AR[dn], dn)); }); }
  if(typeSel.options.length <= 1){ Object.keys(INS_TYPES).forEach(function(k){ typeSel.appendChild(new Option(INS_TYPES[k], k)); }); }

  progSel.value = insState.program;
  daySel.value  = insState.day;
  typeSel.value = insState.type;
  searchI.value = insState.search;

  progSel.onchange  = function(){ insState.program = this.value; insRender(); };
  daySel.onchange   = function(){ insState.day = this.value; insRender(); };
  typeSel.onchange  = function(){ insState.type = this.value; insRender(); };
  searchI.oninput   = function(){ insState.search = this.value.trim(); clearTimeout(searchI._t); searchI._t = setTimeout(insRender, 180); };

  insRender();
}

function insResetFilters(){
  insState = { program:'', day:'', type:'', search:'' };
  var p = document.getElementById('ins-prog'); if(p) p.value='';
  var d = document.getElementById('ins-day');  if(d) d.value='';
  var t = document.getElementById('ins-type'); if(t) t.value='';
  var s = document.getElementById('ins-search'); if(s) s.value='';
  insRender();
}
function insFiltered(){
  var q = insState.search.toLowerCase();
  return insData().filter(function(r){
    if(!r.id) return false;
    if(insState.program && r.program !== insState.program) return false;
    if(insState.day && r.day !== insState.day) return false;
    if(insState.type && r.type !== insState.type) return false;
    if(q){
      var hay = ((r.instructor||'')+' '+(r.course_name_ar||'')+' '+(r.location||'')).toLowerCase();
      if(hay.indexOf(q) === -1) return false;
    }
    return true;
  });
}
function insActiveInstructors(){
  var counts = {};
  insData().forEach(function(r){ if(r.instructor && r.id) counts[r.instructor] = (counts[r.instructor]||0) + 1; });
  var active = {};
  Object.keys(counts).forEach(function(n){ if(counts[n] >= 5) active[n] = counts[n]; });
  return active;
}

/* ★ التعديل 7: insRender مع حفظ حالة الأكورديون */
function insRender(){
  mysConfUI();
  var box = document.getElementById('ins-list');
  if(!box) return;
  var rows = insFiltered();

  if(!rows.length){
    box.innerHTML = '<div class="ins-empty">😕 مفيش نتايج — جرّب تغيير الفلاتر أو البحث</div>';
    return;
  }

  var byDay = {};
  rows.forEach(function(r){
    if(!byDay[r.day]) byDay[r.day] = {};
    var slot = (r.start || '') + '-' + (r.end || '');
    if(!byDay[r.day][slot]) byDay[r.day][slot] = [];
    byDay[r.day][slot].push(r);
  });

  var activeIns = insActiveInstructors();
  var html = '';
  var firstDay = null;
  var anyOpen = false;
  Object.keys(insOpenDays).forEach(function(k){ if(insOpenDays[k]) anyOpen = true; });

  INS_DAYS.forEach(function(dn){
    if(!byDay[dn]) return;
    if(!firstDay) firstDay = dn;

    var dayTotal = 0;
    Object.keys(byDay[dn]).forEach(function(s){ dayTotal += byDay[dn][s].length; });

    var busyBadge = dayTotal > 4 ? '<span class="ins-busy-badge">🔥 الأكثر ازدحامًا</span>' : '';

    /* ★ التعديل 7: نستخدم insOpenDays لو موجودة، وإلا firstDay كـ fallback */
    var isOpen = anyOpen ? !!insOpenDays[dn] : (dn === firstDay);

    html += '<div class="ins-day-acc' + (isOpen ? ' open' : '') + '" data-day="' + dn + '">' +
              '<div class="ins-day-head" onclick="toggleInsAcc(this)" role="button" tabindex="0" aria-expanded="' + (isOpen ? 'true' : 'false') + '">' +
                '<span class="ins-arrow">▶</span>' +
                '<span class="ins-day-title-tt">📅 ' + INS_DAYS_AR[dn] + '</span>' +
                busyBadge +
                '<span class="ins-day-badge">' + dayTotal + ' موعد</span>' +
              '</div>' +
              '<div class="ins-day-body">';

    Object.keys(byDay[dn]).sort().forEach(function(slot){
      var items = byDay[dn][slot].sort(function(a,b){
        return (a.course_name_ar||'').localeCompare(b.course_name_ar||'', 'ar');
      });

      html += '<div class="ins-slot-acc open">' +
                '<div class="ins-slot-head" onclick="toggleInsAcc(this)" role="button" tabindex="0" aria-expanded="true">' +
                  '<span class="ins-arrow">▶</span>' +
                  '<span class="ins-slot-time">⏰ ' + esc(slot.replace('-', ' → ')) + '</span>' +
                  '<span class="ins-slot-count">' + items.length + ' جلسة</span>' +
                '</div>' +
                '<div class="ins-slot-body">';

      items.forEach(function(r){
        var mine = (window.mys && mys.ids && mys.ids.indexOf(r.id) > -1);
        var meta = [];
        if(INS_TYPES[r.type]) meta.push('📚 ' + INS_TYPES[r.type]);
        if(r.program)         meta.push('🎓 ' + esc(r.program));
        if(r.section)         meta.push('سكشن ' + esc(r.section));

        var instructorBadge = activeIns[r.instructor]
          ? '<span class="ins-active-badge" title="' + activeIns[r.instructor] + ' مواعيد في الأسبوع">⭐ نشِط</span>'
          : '';

        html += '<div class="ins-row' + (mine ? ' mine' : '') + '">' +
                  '<div class="ins-row-main">' +
                    '<strong>' + esc(r.course_name_ar || '') + '</strong>' +
                    '<div class="ins-row-meta">' + meta.join(' · ') + '</div>' +
                  '</div>' +
                  '<div class="ins-row-instructor">👨‍🏫 ' + esc(r.instructor || '—') + instructorBadge + '</div>' +
                  '<div class="ins-row-location">📍 ' + esc(r.location || '—') + '</div>' +
                  '<button class="ins-row-btn' + (mine ? ' remove' : '') + '" onclick="insToggle(\'' + esc(r.id) + '\')">' +
                    (mine ? '✕ إزالة' : '➕ ضيف') +
                  '</button>' +
                '</div>';
      });

      html += '</div></div>';
    });

    html += '</div></div>';
  });

  box.innerHTML = html;
}

/* ★ التعديل 7: تحديث toggleInsAcc لحفظ الحالة */
function toggleInsAcc(headEl){
  if(!headEl || !headEl.parentNode) return;
  var acc = headEl.parentNode;
  var isOpen = acc.classList.toggle('open');
  headEl.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if(acc.classList.contains('ins-day-acc')){
    var day = acc.getAttribute('data-day');
    if(day){
      if(isOpen) insOpenDays[day] = true;
      else delete insOpenDays[day];
      insSaveOpenDays();
    }
  }
}

function insToggle(id){
  if(!window.mys) window.mys = {ids: []};
  if(!mys.ids) mys.ids = [];
  var i = mys.ids.indexOf(id);
  if(i === -1){
    var all = insData();
    var target = null;
    for(var x = 0; x < all.length; x++){ if(all[x].id === id){ target = all[x]; break; } }
    if(target){
      var conflicts = [];
      var byId = {};
      all.forEach(function(r){ byId[r.id] = r; });
      mys.ids.forEach(function(mid){
        var cur = byId[mid];
        if(!cur) return;
        if(cur.day !== target.day) return;
        if(target.start < cur.end && cur.start < target.end){
          conflicts.push(cur.course_name_ar + ' (' + cur.start + '→' + cur.end + ')');
        }
      });
      if(conflicts.length){
        var msg = '⚠️ عندك تعارض — موعدين في نفس الوقت:\n' + conflicts.join('\n') + '\n\nعايزة تضيفه برضه؟';
        if(!confirm(msg)) return;
      }
    }
    mys.ids.push(id);
    /* ★ التعديل 7: افتح يوم الموعد المضاف وثبّت الحالة */
    if(target && target.day){ insOpenDays[target.day] = true; insSaveOpenDays(); }
    showToast('✅ اتضاف لجدولك الشخصي');
  } else {
    mys.ids.splice(i, 1);
    showToast('اتشال من جدولك');
  }
  mysSave(mys.ids).then(function(){
    insRender();
    if(window.mysRefresh) window.mysRefresh();
  });
}

function quickAddByFilter(type){
  var rows = insFiltered().filter(function(r){ return r.type === type; });
  if(!rows.length){ showToast('مفيش نتايج من النوع ده بالفلاتر الحالية'); return; }
  if(!window.mys) window.mys = {ids: []};
  if(!mys.ids) mys.ids = [];
  var added = 0;
  rows.forEach(function(r){
    if(mys.ids.indexOf(r.id) === -1){ mys.ids.push(r.id); added++; }
  });
  mysSave(mys.ids).then(function(){
    showToast('✅ اتضاف ' + added + ' موعد');
    insRender();
    if(window.mysRefresh) window.mysRefresh();
  });
}

function quickClearMine(){
  if(!window.mys || !mys.ids || !mys.ids.length){ showToast('جدولك فاضي أصلاً'); return; }
  if(!confirm('متأكد إنك عايز تمسح كل جدولك الشخصي؟')) return;
  mys.ids = [];
  mysSave(mys.ids).then(function(){
    showToast('🗑️ اتمسح الجدول');
    insRender();
    if(window.mysRefresh) window.mysRefresh();
  });
}

function insExportExcel(){
  if(!window.mys || !mys.ids || !mys.ids.length){
    showToast('⚠️ جدولك فاضي — ضيف مواعيد الأول بـ ➕ ضيف');
    return;
  }
  var all = insData();
  var byId = {};
  all.forEach(function(r){ if(r.id) byId[r.id] = r; });
  var rows = mys.ids.map(function(id){ return byId[id]; }).filter(Boolean);
  if(!rows.length){ showToast('مفيش مواعيد للتصدير'); return; }

  var headers = ['اليوم','من','إلى','المادة','النوع','الدكتور/المعيد','المكان','القسم','السكشن'];
  var lines = [headers.join(',')];

  rows.slice().sort(function(a,b){
    var da = INS_DAYS.indexOf(a.day), db = INS_DAYS.indexOf(b.day);
    if(da !== db) return da - db;
    return (a.start||'').localeCompare(b.start||'');
  }).forEach(function(r){
    var line = [INS_DAYS_AR[r.day] || r.day || '', r.start || '', r.end || '', r.course_name_ar || '', INS_TYPES[r.type] || r.type || '', r.instructor || '', r.location || '', r.program || '', r.section || ''].map(function(v){
      v = String(v == null ? '' : v);
      if(/[",\n\r]/.test(v)) v = '"' + v.replace(/"/g, '""') + '"';
      return v;
    });
    lines.push(line.join(','));
  });

  var csv = '\ufeff' + lines.join('\r\n');
  var blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
  var d = new Date();
  var fname = 'جدولي-الشخصي-' + d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0') + '.csv';
  triggerDownload(blob, fname);
  showToast('📊 تم تصدير ' + rows.length + ' موعد من جدولك الشخصي');
}
// ============================================================
// ★ التعديل 8: نموذج الاقتراحات — reCAPTCHA v2 + رفع صور
// ============================================================

// ⚠️ متغيرات عامة
var _fbImages = [];

// ثوابت
var FB_MAX_IMAGES   = 5;
var FB_MAX_SIZE     = 1 * 1024 * 1024;   // 1 ميجا
var FB_MAX_DIM      = 1200;
var FB_JPEG_QUALITY = 0.75;

// ============================================================
// ★ Google reCAPTCHA v2
// ============================================================
var _recaptchaToken = null;
var _recaptchaWidgetId = null;
var _recaptchaState = 'idle';          // idle | loading | ready | failed
var RECAPTCHA_SITEKEY = "6LclgOUtAAAAALp3EaQwwRXJ-jot9BO7j0I6P7QA";

window.onRecaptchaOk = function(token){
  _recaptchaToken = token;
  var stt = document.getElementById('fb-status');
  if(stt && stt.classList.contains('err')){
    stt.className = '';
    stt.textContent = '';
  }
};

window.onRecaptchaExpired = function(){
  _recaptchaToken = null;
};

function __fbRenderRecaptcha(){
  var box = document.getElementById('fb-recaptcha-box');
  if(!box || _recaptchaWidgetId !== null) return;
  if(!window.grecaptcha || typeof window.grecaptcha.render !== 'function') return;
  try{
    _recaptchaWidgetId = window.grecaptcha.render(box, {
      sitekey: RECAPTCHA_SITEKEY,
      theme: 'light',
      size: 'normal',
      callback: window.onRecaptchaOk,
      'expired-callback': window.onRecaptchaExpired
    });
    _recaptchaState = 'ready';
  }catch(e){ _recaptchaState = 'failed'; }
}

// بيتنادى من جوجل بعد تحميل api.js (render=explicit)
window.__fbRecaptchaReady = function(){
  if(window.grecaptcha && typeof window.grecaptcha.ready === 'function') window.grecaptcha.ready(__fbRenderRecaptcha);
  else __fbRenderRecaptcha();
};

// تحميل reCAPTCHA عند أول فتح للنموذج فقط
function fbLoadRecaptcha(){
  if(_recaptchaState === 'loading' || _recaptchaState === 'ready') return;
  if(window.grecaptcha && typeof window.grecaptcha.render === 'function'){ __fbRenderRecaptcha(); return; }
  _recaptchaState = 'loading';
  var s = document.createElement('script');
  s.src = 'https://www.google.com/recaptcha/api.js?render=explicit&hl=ar&onload=__fbRecaptchaReady';
  s.async = true; s.defer = true;
  s.onerror = function(){
    _recaptchaState = 'failed';
    if(s.parentNode) s.parentNode.removeChild(s);
    var stt = document.getElementById('fb-status');
    if(stt){ stt.className = 'err'; stt.textContent = '⚠️ تعذّر تحميل التحقق (reCAPTCHA). اتأكد من الإنترنت وافتح النموذج تاني.'; }
  };
  document.head.appendChild(s);
}

// تسخين الاتصال لما المستخدم يقرّب من زر المساعدة (بدون تحميل السكربت نفسه)
function __fbWarmRecaptcha(){
  ['https://www.google.com','https://www.gstatic.com'].forEach(function(u){
    var l = document.createElement('link'); l.rel = 'preconnect'; l.href = u; l.crossOrigin = '';
    document.head.appendChild(l);
  });
}
(function(){
  var b = document.querySelector('.footer-help-btn');
  if(!b) return;
  ['pointerenter','touchstart','focus'].forEach(function(ev){ b.addEventListener(ev, __fbWarmRecaptcha, {once:true, passive:true}); });
})();

function fbResetRecaptcha(){
  _recaptchaToken = null;
  if(_recaptchaWidgetId !== null && window.grecaptcha && typeof window.grecaptcha.reset === 'function'){
    try{ window.grecaptcha.reset(_recaptchaWidgetId); }catch(e){}
  }
}

// دالة متوافقة مع الكود القديم (no-op)
function fbInitCaptcha(){ /* التحميل بيحصل في fbLoadRecaptcha عند فتح النموذج */ }

// ============================================================
// عرض المعاينات
// ============================================================
function fbRenderPreviews(){
  var box = document.getElementById('fb-thumbs');
  var counter = document.getElementById('fb-img-counter');
  if(counter){
    counter.textContent = _fbImages.length + ' / ' + FB_MAX_IMAGES
      + ' صور — أقصى حجم 1MB لكل صورة';
  }
  if(!box) return;
  box.innerHTML = _fbImages.map(function(img, i){
    return '<div class="fb-img-thumb">' +
             '<img src="' + img.data + '" alt="">' +
             '<button type="button" onclick="fbRemoveImage(' + i + ')" aria-label="حذف">✕</button>' +
           '</div>';
  }).join('');
}

function fbRemoveImage(i){
  if(i < 0 || i >= _fbImages.length) return;
  _fbImages.splice(i, 1);
  fbRenderPreviews();
}

// ============================================================
// ضغط الصورة
// ============================================================
function fbCompressImage(file){
  return new Promise(function(resolve){
    var reader = new FileReader();
    reader.onload = function(e){
      var originalDataUrl = e.target.result;
      var img = new Image();
      img.onload = function(){
        try{
          var w = img.naturalWidth;
          var h = img.naturalHeight;
          if(w > FB_MAX_DIM || h > FB_MAX_DIM){
            var ratio = Math.min(FB_MAX_DIM / w, FB_MAX_DIM / h);
            w = Math.max(1, Math.round(w * ratio));
            h = Math.max(1, Math.round(h * ratio));
          }
          var canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);

          var dataUrl = canvas.toDataURL('image/jpeg', FB_JPEG_QUALITY);
          resolve(dataUrl && dataUrl.length > 20 ? dataUrl : originalDataUrl);
        }catch(err){
          resolve(originalDataUrl);
        }
      };
      img.onerror = function(){ resolve(originalDataUrl); };
      img.src = originalDataUrl;
    };
    reader.onerror = function(){ resolve(null); };
    reader.readAsDataURL(file);
  });
}

// ============================================================
// استقبال الصور
// ============================================================
function fbHandleImages(ev){
  var files = ev && ev.target && ev.target.files;
  if(!files || !files.length) return;

  var list = Array.prototype.slice.call(files);
  var accepted = [];

  list.forEach(function(file){
    if(!/^image\//.test(file.type)){
      showToast('⚠️ ' + file.name + ' مش صورة');
      return;
    }
    if(file.size > FB_MAX_SIZE){
      showToast('⚠️ ' + file.name + ' أكبر من 1 ميجا (' +
                (file.size / (1024 * 1024)).toFixed(2) + 'MB)');
      return;
    }
    if(_fbImages.length + accepted.length >= FB_MAX_IMAGES){
      showToast('⚠️ الحد الأقصى ' + FB_MAX_IMAGES + ' صور');
      return;
    }
    accepted.push(file);
  });

  if(ev && ev.target) ev.target.value = '';
  if(!accepted.length) return;

  showToast('⏳ جاري معالجة ' + accepted.length + ' صورة...');

  Promise.all(accepted.map(function(f){
    return fbCompressImage(f).then(function(dataUrl){
      if(!dataUrl) return null;
      return {
        name: f.name,
        size: f.size,
        type: 'image/jpeg',
        data: dataUrl
      };
    });
  })).then(function(results){
    var okCount = 0;
    results.forEach(function(r){
      if(r && _fbImages.length < FB_MAX_IMAGES){
        _fbImages.push(r);
        okCount++;
      }
    });
    fbRenderPreviews();
    if(okCount) showToast('✅ ' + okCount + ' صورة جاهزة');
  }).catch(function(err){
    console.error('fbHandleImages error:', err);
    showToast('❌ فشل معالجة الصور');
  });
}

// ============================================================
// ربط الأحداث
// ============================================================
(function fbInitEvents(){
  function bind(){
    // 1) input الملفات
    var inp = document.getElementById('fb-images');
    if(inp && !inp._fbBound){
      inp._fbBound = true;
      inp.addEventListener('change', fbHandleImages);
    }

    // 2) منطقة السحب والإفلات
    var area = document.getElementById('fb-drop');
    if(area && !area._fbBound){
      area._fbBound = true;

      ['dragenter','dragover'].forEach(function(ev){
        area.addEventListener(ev, function(e){
          e.preventDefault(); e.stopPropagation();
          area.classList.add('dragover');
        });
      });
      ['dragleave','drop'].forEach(function(ev){
        area.addEventListener(ev, function(e){
          e.preventDefault(); e.stopPropagation();
          area.classList.remove('dragover');
        });
      });
      area.addEventListener('drop', function(e){
        var dt = e.dataTransfer;
        if(dt && dt.files && dt.files.length){
          fbHandleImages({ target: { files: dt.files, value: '' } });
        }
      });

      area.addEventListener('click', function(e){
        if(e.target !== inp && inp){ inp.click(); }
      });
    }

    // 3) قائمة نوع وسيلة التواصل
    var cSel = document.getElementById('fb-contact-type');
    if(cSel && !cSel._fbBound){
      cSel._fbBound = true;
      cSel.addEventListener('change', function(){
        var w = document.getElementById('fb-contact-val-wrap');
        var v = document.getElementById('fb-contact-val');
        if(w) w.style.display = cSel.value ? '' : 'none';
        if(v){
          v.value = '';
          v.type = (cSel.value === 'phone') ? 'tel'
                 : (cSel.value === 'email') ? 'email'
                 : 'text';
          v.placeholder = cSel.value === 'email'    ? 'name@example.com'
                        : cSel.value === 'phone'    ? '+201234567890'
                        : cSel.value === 'telegram' ? '@username'
                        : cSel.value === 'whatsapp' ? '+201234567890'
                        : '';
        }
      });
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();

// ============================================================
// الإرسال
// ============================================================

// ============================================================
// 🛡️ ثوابت الأمان + حد الإرسال اليومي
// ============================================================
var FB_DAILY_LIMIT = 5;                         // ★ 5 رسائل كحد أقصى في اليوم
var FB_RL_KEY      = 'fb_rate_limit_v1';        // ★ مفتاح localStorage
var FB_MAX_TEXT    = 1000;                      // حد أقصى لعدد حروف التفاصيل
var FB_MAX_NAME    = 60;
var FB_MAX_REF     = 120;
var FB_MAX_CONTACT = 100;
var FB_MAX_IMG_BYTES_TOTAL = 4 * 1024 * 1024;   // 4MB إجمالي الصور

// ============================================================
// 🗓️ أدوات Rate Limit (5 رسائل / يوم / جهاز)
// ============================================================
function fbToday(){
  var d = new Date();
  return d.getFullYear() + '-' +
         String(d.getMonth() + 1).padStart(2, '0') + '-' +
         String(d.getDate()).padStart(2, '0');
}

function fbGetRateLimit(){
  try{
    var raw = localStorage.getItem(FB_RL_KEY);
    if(!raw) return { date: fbToday(), count: 0 };
    var o = JSON.parse(raw);
    if(!o || typeof o !== 'object')            return { date: fbToday(), count: 0 };
    if(o.date !== fbToday())                   return { date: fbToday(), count: 0 };
    if(typeof o.count !== 'number' || o.count < 0 || o.count > 999)
                                               return { date: fbToday(), count: 0 };
    return { date: o.date, count: Math.floor(o.count) };
  }catch(e){
    return { date: fbToday(), count: 0 };
  }
}

function fbRemainingToday(){
  var r = fbGetRateLimit();
  return Math.max(0, FB_DAILY_LIMIT - r.count);
}

function fbIncrRateLimit(){
  var r = fbGetRateLimit();
  r.count = Math.min(999, r.count + 1);
  r.date  = fbToday();
  try{ localStorage.setItem(FB_RL_KEY, JSON.stringify(r)); }catch(e){}
  return r.count;
}

// ============================================================
// 🧼 تنظيف المدخلات (XSS + Control chars + Length)
// ============================================================
function fbSanitize(str, maxLen){
  if(typeof str !== 'string') str = '';
  // 1) حذف رموز التحكم (Null, ESC, Bell...)
  str = str.replace(/[\u0000-\u001F\u007F]/g, '');
  // 2) حذف اتجاه RTL/LTR المخفي (خدعة شائعة للسبام)
  str = str.replace(/[\u202A-\u202E\u200E\u200F]/g, '');
  // 3) حذف وسوم HTML/XML
  str = str.replace(/<[^>]*>/g, '');
  // 4) حذف سكريبتات وعناصر خطيرة
  str = str.replace(/(javascript\s*:|vbscript\s*:|data\s*:\s*text\/html|on\w+\s*=\s*["']?)/gi, '');
  // 5) حذف `\` و `` ` `` (خدع Shell/JSON)
  str = str.replace(/[\\`]/g, '');
  // 6) توحيد المسافات
  str = str.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  // 7) تحديد الطول الأقصى
  if(typeof maxLen === 'number' && maxLen > 0 && str.length > maxLen){
    str = str.slice(0, maxLen);
  }
  return str;
}

// ============================================================
// ✅ التحقق الشامل من صحة كل المدخلات
// ============================================================
function fbValidateAll(){
  var errors = [];
  function err(m){ errors.push(m); }

  function val(id){ var el = document.getElementById(id); return el ? el.value : ''; }

  // -------- 1) التفاصيل (إلزامي) --------
  var textRaw = val('fb-text');
  var text    = fbSanitize(textRaw, FB_MAX_TEXT);
  if(text.length < 5)              err('✏️ التفاصيل قصيرة جدًا (5 حروف على الأقل).');
  if(text.length > FB_MAX_TEXT)    err('✏️ التفاصيل طويلة جدًا ('+FB_MAX_TEXT+' حرف كحد أقصى).');
  if(/^(.)\1{4,}$/.test(text))     err('✏️ التفاصيل غير واضحة — اكتبي وصفًا حقيقيًا.');
  // منع السبام بالروابط
  var urlCount = (text.match(/https?:\/\//gi) || []).length;
  if(urlCount > 2)                 err('✏️ عدد الروابط كبير — وضّحي المشكلة نصيًا.');
  // منع السبام بحروف عربية متكررة
  if(/^([\u0600-\u06FF])\1{4,}$/.test(text.replace(/\s/g,'')))
                                   err('✏️ التفاصيل غير واضحة.');

  // -------- 2) الاسم (اختياري لكن إذا وُجد لازم يكون معقول) --------
  var name = fbSanitize(val('fb-name'), FB_MAX_NAME);
  if(name){
    if(name.length < 2)                                          err('👤 الاسم قصير جدًا.');
    if(name.length > FB_MAX_NAME)                                err('👤 الاسم طويل جدًا.');
    if(!/^[\u0600-\u06FFa-zA-Z\s.'\-]{2,60}$/.test(name))        err('👤 الاسم يحتوي على رموز غير مسموحة.');
  }

  // -------- 3) المادة/المحاضرة (اختياري) --------
  var ref = fbSanitize(val('fb-ref'), FB_MAX_REF);

  // -------- 4) وسيلة التواصل (منطق ثنائي) --------
  var cType = fbSanitize(val('fb-contact-type'), 20);
  var cVal  = fbSanitize(val('fb-contact-val'),  FB_MAX_CONTACT);

  if(cType && !cVal) err('📞 اكتبي قيمة وسيلة التواصل.');
  if(cVal && !cType) err('📞 اختاري نوع وسيلة التواصل.');

  if(cType === 'email' && cVal){
    if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(cVal))
      err('📧 صيغة الإيميل غير صحيحة.');
    if(cVal.length > FB_MAX_CONTACT) err('📧 الإيميل طويل جدًا.');
  }

  if(cType === 'phone' && cVal){
    var digits = cVal.replace(/\D/g, '');
    if(digits.length < 8 || digits.length > 15)
      err('📱 رقم الهاتف لازم 8–15 رقم.');
    if(!/^[+\d][\d\s\-()]{6,}$/.test(cVal))
      err('📱 صيغة رقم الهاتف غير صحيحة.');
    // منع أرقام مكررة بالكامل
    if(/^(\d)\1+$/.test(digits))
      err('📱 رقم الهاتف غير صحيح.');
  }

  if(cType === 'telegram' && cVal){
    if(!/^@?[A-Za-z0-9_]{5,32}$/.test(cVal))
      err('✈️ يوزر تليجرام غير صحيح.');
  }

  if(cType === 'whatsapp' && cVal){
    var wd = cVal.replace(/\D/g, '');
    if(wd.length < 8 || wd.length > 15)
      err('💬 رقم واتساب لازم 8–15 رقم.');
  }

  // -------- 5) الصور --------
  if(_fbImages.length > FB_MAX_IMAGES){
    err('⚠️ عدد الصور أكبر من ' + FB_MAX_IMAGES + '.');
  }

  var totalImgBytes = 0;
  for(var i = 0; i < _fbImages.length; i++){
    var im = _fbImages[i];
    if(!im || typeof im.data !== 'string' || !im.data){
      err('⚠️ صورة رقم ' + (i+1) + ' غير صالحة.'); break;
    }
    if(!/^data:image\/(jpeg|png|webp|gif);base64,[A-Za-z0-9+/=]+$/i.test(im.data)){
      err('⚠️ صورة رقم ' + (i+1) + ' بصيغة غير مدعومة.'); break;
    }
    var commaAt = im.data.indexOf(',');
    var bytes   = Math.ceil((im.data.length - commaAt - 1) * 0.75);
    if(bytes > FB_MAX_SIZE){
      err('⚠️ صورة رقم ' + (i+1) + ' أكبر من 1 ميجا.'); break;
    }
    totalImgBytes += bytes;
  }

  if(totalImgBytes > FB_MAX_IMG_BYTES_TOTAL){
    err('📦 إجمالي حجم الصور كبير (الحد 4 ميجا).');
  }

  // -------- 6) Honeypot --------
  var hp = val('fb-hp');
  if(hp) err('🤖 تم رفض الطلب.');

  return {
    ok: errors.length === 0,
    errors: errors,
    clean: { text: text, name: name, ref: ref, cType: cType, cVal: cVal }
  };
}

// ============================================================
// 📤 الإرسال
// ============================================================
function fbSend(kind){
  var stt  = document.getElementById('fb-status');
  var btns = document.querySelectorAll('.fb-btns button');

  function setStatus(cls, msg){
    if(!stt) return;
    stt.className   = cls || '';
    stt.textContent = msg || '';
  }
  function lock(on){
    [].forEach.call(btns, function(b){ b.disabled = on; });
  }

  // -------- 1) reCAPTCHA --------
  if(!_recaptchaToken){
    setStatus('err', '🤖 فعّل التحقق "I\'m not a robot" الأول');
    return;
  }

  // -------- 2) Rate Limit (5 رسائل/يوم) --------
  var remaining = fbRemainingToday();
  if(remaining <= 0){
    setStatus('err',
      '🚫 وصلتِ للحد الأقصى (' + FB_DAILY_LIMIT + ' رسائل في اليوم).\n' +
      'جرّبي تاني بكرة إن شاء الله.');
    return;
  }

  // -------- 3) التحقق الشامل --------
  var vr = fbValidateAll();
  if(!vr.ok){
    setStatus('err', vr.errors[0]);
    return;
  }

  // -------- 4) تجهيز الحمولة --------
  lock(true);
  setStatus('', '⏳ جاري الإرسال' +
    (_fbImages.length ? ' (' + _fbImages.length + ' صورة)...' : '...') +
    ' — متبقي ' + (remaining - 1) + ' من ' + FB_DAILY_LIMIT);

  var payload = {
    channel:        String(kind || '').slice(0, 10),
    type:           fbSanitize(
                      (document.getElementById('fb-type') || {}).value || '',
                      40
                    ),
    name:           vr.clean.name,
    contactType:    vr.clean.cType,
    contactValue:   vr.clean.cVal,
    ref:            vr.clean.ref,
    text:           vr.clean.text,
    images:         _fbImages.map(function(im){
                      return {
                        name: fbSanitize(im.name || '', 100),
                        type: im.type,
                        data: im.data
                      };
                    }),
    website:        (document.getElementById('fb-hp') || {}).value || '',
    recaptchaToken: _recaptchaToken,
    clientTime:     new Date().toISOString()
  };

  // -------- 5) AbortController + Timeout --------
  var controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
  var timeoutId  = setTimeout(function(){
    if(controller) try{ controller.abort(); }catch(e){}
  }, 45000);

  var fetchOpts = {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
    // ★ يمنع الكوكيز ترسل تلقائيًا (تقليل CSRF)
    credentials: 'omit',
    // ★ لا نريد أي redirects
    redirect: 'error'
  };
  if(controller) fetchOpts.signal = controller.signal;

  // -------- 6) الإرسال --------
  fetch('/api/feedback', fetchOpts)
    .then(function(r){
      return r.json().catch(function(){
        return { ok:false, code:'BAD_JSON', httpStatus: r.status };
      }).then(function(j){ j._httpStatus = r.status; return j; });
    })
    .then(function(j){
      clearTimeout(timeoutId);

      // ✅ نجاح
      if(j.ok){
        fbIncrRateLimit();                                  // ★ زوّد العدّاد
        var left = fbRemainingToday();

        setStatus('ok',
          '✅ تم إرسال رسالتك. شكرًا!' +
          (left > 0 ? ' (متبقي ' + left + ' من ' + FB_DAILY_LIMIT + ')' : '')
        );

        // تفريغ الحقول
        ['fb-text','fb-ref','fb-contact-val'].forEach(function(id){
          var el = document.getElementById(id);
          if(el) el.value = '';
        });
        var _ct = document.getElementById('fb-contact-type');
        if(_ct){ _ct.value = ''; _ct.dispatchEvent(new Event('change')); }

        // تفريغ الصور
        _fbImages = [];
        fbRenderPreviews();

        // reCAPTCHA جديد للمرة القادمة
        fbResetRecaptcha();

        // إغلاق المودال بعد ثانيتين (اختياري)
        setTimeout(function(){
          if(typeof closeFbModal === 'function') closeFbModal();
        }, 2000);

        return;
      }

      // ❌ فشل reCAPTCHA
      if(j.code === 'CAPTCHA_FAILED'){
        setStatus('err', '🔒 فشل التحقق الأمني — جرّبي تاني.');
        fbResetRecaptcha();
        return;
      }

      // ❌ Rate limit من السيرفر (طبقة ثانية بعد العميل)
      if(j.code === 'RATE'){
        setStatus('err',
          '⏳ الخادم رفض الطلب — حاولتي كتير.\n' +
          'انتظري شوية أو جرّبي بكرة.');
        return;
      }

      // ❌ باقي الحالات
      if(j.code === 'CONFIG')        setStatus('err','⚙️ الإرسال لسه مش مفعّل.');
      else if(j.code === 'INVALID')  setStatus('err','📝 راجعي البيانات المدخلة.');
      else if(j.code === 'BIG')      setStatus('err','📦 الصور كبيرة — قللي عددها.');
      else if(j.code === 'HONEYPOT') setStatus('err','🤖 تم رفض الطلب.');
      else if(j._httpStatus >= 500)  setStatus('err','🔧 مشكلة في السيرفر — حاولي بعد شوية.');
      else                           setStatus('err','❌ تعذّر الإرسال — راجعي اتصالك.');
    })
    .catch(function(err){
      clearTimeout(timeoutId);
      if(err && err.name === 'AbortError'){
        setStatus('err','⏰ اتأخر الطلب — حاولي تاني.');
      } else {
        setStatus('err','📡 تعذّر الاتصال بالخادم.');
      }
    })
    .finally(function(){
      lock(false);
    });
}

// ============================================================
// 🎨 (اختياري) عرض العدّاد داخل النموذج
// ============================================================
function fbRefreshRateHint(){
  var el = document.getElementById('fb-rate-hint');
  if(!el) return;
  var left = fbRemainingToday();
  if(left <= 0){
    el.textContent = '🚫 استنفدتِ الحد اليومي (' + FB_DAILY_LIMIT + '/' + FB_DAILY_LIMIT + ')';
    el.style.color = 'var(--danger)';
  } else {
    el.textContent = '📩 متبقي ' + left + ' من ' + FB_DAILY_LIMIT + ' رسائل اليوم';
    el.style.color = left <= 1 ? 'var(--warning)' : 'var(--text-hint)';
  }
}
// ============================================================
// ★ التعديل 7: صفحة "غير موجود" + URL
// ============================================================
function showNotFoundPage(slug){
  document.getElementById('main-title').textContent = '⚠️ المادة غير موجودة';
  document.getElementById('subject-bar').innerHTML = '';
  var container = document.querySelector('.container');
  if(!container) return;
  ['main-view','lecture-view','quiz-view','dashboard-view','instructors-view','progress-view'].forEach(function(v){
    var el = document.getElementById(v); if(el) el.classList.remove('active');
  });
  var nf = document.getElementById('not-found-view');
  if(!nf){
    nf = document.createElement('div');
    nf.id = 'not-found-view';
    nf.className = 'content-section';
    container.insertBefore(nf, container.firstChild);
  }
  nf.classList.add('active');
  nf.innerHTML =
    '<div style="text-align:center;padding:60px 20px;">'+
      '<div style="font-size:64px;margin-bottom:16px;">🔍</div>'+
      '<h2 style="color:var(--danger);margin:0 0 10px;">المادة غير موجودة أو تم تغيير رابطها</h2>'+
      '<p style="color:var(--text-hint);line-height:1.8;margin:0 0 24px;">تأكد من صحة الرابط'+
      (slug ? ' (<code dir="ltr">' + esc(slug) + '</code>)' : '') + ' أو ارجع للصفحة الرئيسية.</p>'+
      '<a href="' + location.pathname + '" class="d-btn d-green" style="text-decoration:none;display:inline-block;" onclick="location.reload();return false;">← العودة للصفحة الرئيسية</a>'+
    '</div>';
}
function hideNotFoundPage(){
  var nf = document.getElementById('not-found-view');
  if(nf) nf.classList.remove('active');
}
function urlForSubject(i){
  var meta = SUBJECTS_INDEX[i];
  if(!meta) return location.pathname;
  return location.pathname + '?subject=' + encodeURIComponent(meta.slug);
}
function urlForLecture(subjIdx, lecIdx){
  var meta = SUBJECTS_INDEX[subjIdx];
  var s = subjects[subjIdx];
  if(!meta || !s || !s.lectures[lecIdx]) return location.pathname;
  var lec = s.lectures[lecIdx];
  var lecId = lec.id || lecSlug(lec.t) || ('lecture-' + (lecIdx+1));
  return location.pathname + '?subject=' + encodeURIComponent(meta.slug) + '&lecture=' + encodeURIComponent(lecId);
}


window.addEventListener('popstate', function(e){
  // Quiz mode لا يُدار عبر popstate
  if(document.body.classList.contains('quiz-mode')) return;

  // عرض السكشن داخل المحاضرة — يتولّاه معالج sec-popstate
  var lv = document.getElementById('lecture-view');
  if(lv && lv.classList.contains('active') && lv.classList.contains('sec-open')) return;

  var params = new URLSearchParams(location.search);
  var page     = params.get('page');
  var subjSlug = params.get('subject');
  var lecId    = params.get('lecture');

  // 1) مسارات على مستوى الصفحة (Dashboard / Progress / Schedule)
  if(page === 'schedule'){ openDashboard(true); return; }                    // الجدول
  if(page === 'dashboard' || page === 'progress'){ openProgress(true); return; } // ملخص التقدم
  if(page === 'myschedule'){ openMySchedule(true); return; }                 // جدولي الشخصي               // جدولي الشخصي
  // 2) الخروج من أي mode (نظّف الحالة قبل عرض المادة/الرئيسية)
  document.body.classList.remove('dashboard-mode');
  document.body.classList.remove('instructors-mode');
  document.body.classList.remove('progress-mode');

  // 3) لا يوجد subject → الصفحة الرئيسية بمادة افتراضية
  if(!subjSlug){
    hideNotFoundPage();
    document.getElementById('main-title').textContent = 'منصة المواد التعليمية';
    renderSubjectBar();
    var activeList = getActiveSubjects();
    if(activeList.length){
      selectSubject(activeList[0], true);
    } else {
      showView('main-view');
    }
    return;
  }

  // 4) إيجاد المادة بسلاجها
  var subjIdx = -1;
  for(var i = 0; i < SUBJECTS_INDEX.length; i++){
    if(SUBJECTS_INDEX[i].slug === subjSlug){ subjIdx = i; break; }
  }
  if(subjIdx === -1){ showNotFoundPage(subjSlug); return; }

  function doOpen(){
    var s = subjects[subjIdx];
    if(lecId && s && s.lectures){
      var lecIdx = -1;
      for(var j = 0; j < s.lectures.length; j++){
        var lid = s.lectures[j].id || lecSlug(s.lectures[j].t);
        if(lid === lecId){ lecIdx = j; break; }
      }
      if(lecIdx !== -1){ openLecture(subjIdx, lecIdx, true); return; }
      showToast('⚠️ المحاضرة مش موجودة');
    }
    selectSubject(subjIdx, true);
  }

  if(!subjects[subjIdx]){
    showSubjectLoading();
    loadSubject(subjIdx).then(doOpen).catch(function(){ showToast('فشل تحميل المادة'); });
  } else {
    doOpen();
  }
});
// ============================================================
// ★ التعديل 8.4: Footer
// ============================================================

function toggleFbBox(){
  var modal = document.getElementById('fb-modal');
  if(!modal){ showToast('⚠️ قسم الاقتراحات غير متاح'); return; }

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.documentElement.classList.add('fb-modal-open');

  // ★ إعادة تعيين reCAPTCHA عند الفتح (احتياط)
  if(typeof fbResetRecaptcha === 'function') fbResetRecaptcha();

  // ★ تصفير الصور
  if(typeof _fbImages !== 'undefined'){
    _fbImages = [];
    if(typeof fbRenderPreviews === 'function') fbRenderPreviews();
  }

  // ★ تفريغ الحالة
  var stt = document.getElementById('fb-status');
  if(stt){ stt.className = ''; stt.textContent = ''; }

  // ★ تحميل reCAPTCHA (lazy) — أول فتح فقط
  fbLoadRecaptcha();

  // ★ إعادة ربط الأحداث (لو المودال ظهر بعد السكربت)
  setTimeout(function(){
    try{
      var firstInput = modal.querySelector(
        'input:not([type="hidden"]):not(#fb-hp):not(#fb-images), textarea, select'
      );
      if(firstInput && typeof firstInput.focus === 'function'){
        firstInput.focus({ preventScroll: true });
      }
    }catch(e){}
  }, 150);
}

function closeFbModal(){
  var modal = document.getElementById('fb-modal');
  if(!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.documentElement.classList.remove('fb-modal-open');

  // ★ تفريغ الصور
  if(typeof _fbImages !== 'undefined'){
    _fbImages = [];
    if(typeof fbRenderPreviews === 'function') fbRenderPreviews();
  }

  // ★ إعادة تعيين reCAPTCHA (عشان لما يفتح تاني يبقى نظيف)
  if(typeof fbResetRecaptcha === 'function') fbResetRecaptcha();

  // ★ تفريغ الحالة (اختياري بس أنضف)
  var stt = document.getElementById('fb-status');
  if(stt){ stt.className = ''; stt.textContent = ''; }
}

document.addEventListener('keydown', function(e){
  if((e.key === 'Escape' || e.key === 'Esc')){
    var modal = document.getElementById('fb-modal');
    if(modal && modal.classList.contains('show')) closeFbModal();
  }
});
window.addEventListener('pageshow', function(){
  var modal = document.getElementById('fb-modal');
  if(modal && modal.classList.contains('show')) closeFbModal();
});
function shareThisPage(){
  var shareData = { title: document.title, text: 'شوف الصفحة دي من منصة المواد التعليمية', url: location.href };
  if(navigator.share){
    navigator.share(shareData).catch(function(err){ if(err && err.name !== 'AbortError') console.warn(err); });
  } else {
    var url = location.href;
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(url).then(function(){ showToast('✅ ات نسخ رابط الصفحة'); }).catch(function(){ fallbackCopy(url); });
    } else { fallbackCopy(url); }
  }
}
function fallbackCopy(text){
  var ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.top = '-9999px'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); showToast('✅ ات نسخ الرابط'); }
  catch(e){ showToast('❌ مش قادر أنسخ الرابط'); }
  ta.remove();
}
(function watchQuizMode(){
  var footer = document.getElementById('site-footer');
  if(!footer) return;
  var observer = new MutationObserver(function(){
    var quizOn = document.body.classList.contains('quiz-mode');
    footer.classList.toggle('hidden', quizOn);
    document.body.classList.toggle('footer-hidden', quizOn);
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();

// ============================================================
// __initApp
// ============================================================
function __initApp(){
  setTimeout(function(){ document.body.classList.add('app-ready'); }, 2000);

  if(typeof SUBJECTS_INDEX === 'undefined' || !SUBJECTS_INDEX.length){
    document.getElementById('main-title').textContent = '⚠️ خطأ في تحميل الفهرس';
    document.getElementById('subject-bar').innerHTML = '';
    document.querySelector('.container').innerHTML =
      '<div style="text-align:center;padding:50px 20px;">'+
      '<h2 style="color:var(--danger)">⚠️ لا يوجد فهرس مواد</h2>'+
      '<p style="color:var(--text-hint);line-height:1.8">تأكدي إن ملف <b>datenew/subjects-index.js</b> موجود ومربوط في index.html</p></div>';
    return;
  }

  SUBJECTS_INDEX.forEach(function(m, i){ ensureSubjectSlug(m, i); });

  loadNotifications();
  syncAnswerEditsLog();
  syncLecturesAddedLog();
  updateNotifBadge();
  loadSectionStates();

  /* ============================================================
     ★ قراءة الـ URL مرة واحدة
     ============================================================ */
  var params      = new URLSearchParams(location.search);
  var urlPage     = params.get('page');        // ★ جديد: dashboard | progress | schedule
  var urlSubjSlug = params.get('subject');
  var urlLecId    = params.get('lecture');
  var isLegacySchedule = /[?&]view=schedule(&|$)/.test(location.search); // legacy support

  var last = null;
  try{ var r = localStorage.getItem(LSKEY); if(r) last = JSON.parse(r); }catch(e){}

  /* ============================================================
     ★ أولوية 1: مسارات الصفحات على مستوى الجذر (قبل أي شيء)
     ============================================================ */
  /* ============================================================
     ★ أولوية 1: مسارات الصفحات على مستوى الجذر
     ============================================================ */
  // ✅ الجدول الدراسي (Schedule)
  // ✅ الجدول الدراسي (Schedule)
  if(urlPage === 'schedule'){ openDashboard(true); return; }

  // ✅ ملخص التقدم (Dashboard) — يشمل ?page=progress القديم للتوافق
  if(urlPage === 'dashboard' || urlPage === 'progress'){ openProgress(true); return; }

  // ✅ جدولي الشخصي
  if(urlPage === 'myschedule'){ openMySchedule(true); return; }
  if(isLegacySchedule){         openMySchedule(true); return; }
  /* ============================================================
     ★ أولوية 2: احترام آخر صفحة محفوظة
     ============================================================ */
  if(!urlSubjSlug && last && last.view === 'dashboard'){ openDashboard(true); return; }
  if(!urlSubjSlug && last && last.view === 'progress'){  openProgress(true);  return; }
  /* ============================================================
     تحديد المادة الابتدائية
     ============================================================ */
  var activeList = getActiveSubjects();
  var startIdx;

  if(urlSubjSlug){
    startIdx = -1;
    for(var i = 0; i < SUBJECTS_INDEX.length; i++){
      if(SUBJECTS_INDEX[i].slug === urlSubjSlug && activeList.indexOf(i) !== -1){ startIdx = i; break; }
    }
    if(startIdx === -1){ showNotFoundPage(urlSubjSlug); return; }
  } else {
    startIdx = (last && typeof last.subject === 'number' && activeList.indexOf(last.subject) !== -1)
      ? last.subject
      : (activeList[0] || 0);
  }

  currentSubject = startIdx;
  var meta = SUBJECTS_INDEX[startIdx];
  document.getElementById('main-title').textContent = 'منصة مادة ' + meta.name + (meta.en ? ' — ' + meta.en : '');
  renderSubjectBar();
  requestAnimationFrame(function(){ document.body.classList.add('app-ready'); });

  showSubjectLoading();

  /* ============================================================
     ★ تحميل المادة ثم اختيار العرض المناسب
     ============================================================ */
  loadSubject(startIdx).then(function(){
    var s = subjects[startIdx];
    updateSubTabsVisibility(s);

    var restored = false;

    /* 1) فتح محاضرة من الـ URL */
    if(urlLecId){
      var lecIdx = -1;
      for(var j = 0; j < (s.lectures || []).length; j++){
        var lid = s.lectures[j].id || lecSlug(s.lectures[j].t);
        if(lid === urlLecId){ lecIdx = j; break; }
      }
      if(lecIdx !== -1){
        openLecture(startIdx, lecIdx, true);
        restored = true;
      } else {
        showToast('⚠️ المحاضرة مش موجودة — فتحنا المادة');
      }
    }

    /* 2) استرجاع آخر محاضرة (فقط لو مفيش URL صريح) */
    if(!restored && !urlSubjSlug && last && last.view === 'lecture'
       && typeof last.lecture === 'number' && s.lectures && s.lectures[last.lecture]){
      openLecture(startIdx, last.lecture);
      restored = true;
      showToast('🔙 رجعناك لآخر محاضرة مفتوحة');
    }
    /* 3) استرجاع آخر اختبار (فقط لو مفيش URL صريح) */
    else if(!restored && !urlSubjSlug && last && last.view === 'quiz' && last.prop
            && typeof last.qidx === 'number'){
      var target = (last.prop === 'lec')
        ? (s.lectures && s.lectures[last.qidx])
        : (s[last.prop] && s[last.prop][last.qidx]);
      if(target){
        openQuiz(startIdx, last.prop, last.qidx);
        restored = true;
        showToast('🔙 رجعناك لآخر اختبار مفتوح');
      }
    }

    /* 4) الحالة الافتراضية: عرض الصفحة الرئيسية */
    if(!restored){
      resetSubTabs();
      renderAllLists();
      showView('main-view');

      // ★ تحديث الـ URL ليطابق المادة المفتوحة
      if(urlSubjSlug){
        try{
          history.replaceState(
            {subject: urlSubjSlug, view:'main'},
            '',
            location.pathname + '?subject=' + encodeURIComponent(urlSubjSlug)
          );
        }catch(e){}
      }

      if(last && last.tab === 'section2' && !urlSubjSlug){
        openTab(null, 'section2');
        if(last.subTab) openSubTab(null, last.subTab);
      }
    }
  }).catch(function(err){
    document.getElementById('lectures-list').innerHTML =
      '<p style="color:var(--danger);padding:24px;text-align:center;font-weight:bold;">⚠️ فشل تحميل المادة: ' + esc(err.message) + '</p>';
  });
}

// app.js بيتحمّل بـ defer قبل subjects-index.js (نفس الترتيب الأصلي)، فنستنى DOMContentLoaded
if(document.readyState === 'complete' || (document.readyState === 'interactive' && typeof SUBJECTS_INDEX !== 'undefined')){
  __initApp();
} else {
  document.addEventListener('DOMContentLoaded', __initApp);
}



// ============================================================
// ⚡ Perf helpers: حفظ ارتفاع شريط المواد وعنوان الصفحة لمنع الـ CLS
// ============================================================
(function(){
  try{
    var t = document.getElementById('main-title');
    if(t && 'MutationObserver' in window){
      new MutationObserver(function(){
        try{ localStorage.setItem('mainTitle', t.textContent); }catch(e){}
      }).observe(t, {childList:true, characterData:true, subtree:true});
    }
  }catch(e){}
  function saveBarH(){
    var bar = document.getElementById('subject-bar');
    if(!bar || !bar.firstElementChild) return;
    var h = Math.round(bar.getBoundingClientRect().height);
    if(h > 40 && h < 600){ try{ localStorage.setItem('sbH_' + (innerWidth <= 640 ? 'm' : 'd'), String(h)); }catch(e){} }
    try{ localStorage.setItem('sbHtml', bar.innerHTML.replace(/\sonclick="[^"]*"/g,'').replace(/<button /g,'<button tabindex="-1" aria-hidden="true" ')); }catch(e){}
  }
  window.addEventListener('load', function(){
    (window.requestIdleCallback || function(f){ setTimeout(f, 300); })(saveBarH);
  }, {once:true});
})();
{
  /* <script defer src="/_vercel/insights/script.js"></script>; */
}
