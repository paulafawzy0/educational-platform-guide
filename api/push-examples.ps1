# ============================================================
#  أوامر إرسال إشعارات Push  (api/push-send)
#  - الأمر القديم زي ما هو (مثال 0).
#  - المثال 1 و 2 بيختاروا المادة/المعيد أو القسم/السكشن من الجدول نفسه،
#    فالأسماء بتتبعت بنفس قيم الشيت بالظبط من غير كتابة يدوي.
#  - الملف لازم يتحفظ UTF-8 (ده متحفظ كده) عشان العربي يظهر صح.
#  - Out-GridView موجود في Windows PowerShell. في PowerShell 7 محتاج:
#      Install-Module Microsoft.PowerShell.GraphicalTools
# ============================================================

$base = "https://fcal-third-year.vercel.app"
$h = @{ "Authorization" = "Bearer 123456789" }   # حطي السر الحقيقي (ADMIN_SECRET) هنا

function Send-Push($fields) {
    $b = $fields | ConvertTo-Json -Compress
    Invoke-RestMethod -Uri "$base/api/push-send" -Method Post -Headers $h `
        -ContentType "application/json; charset=utf-8" `
        -Body ([System.Text.Encoding]::UTF8.GetBytes($b))
}

# ------------------------------------------------------------
# مثال 0: الأمر القديم (إشعار لكل الطلاب / حسب القسم dept)
# ------------------------------------------------------------
# $b = @{ title = "اختبار"; body = "تجربة remaining"; url = "/"; dept = "all"; type = "lecture" } | ConvertTo-Json -Compress
# Invoke-RestMethod -Uri "$base/api/push-send" -Method Post -Headers $h -ContentType "application/json; charset=utf-8" -Body ([System.Text.Encoding]::UTF8.GetBytes($b))

# جدول الموقع (نفس اللي الطلاب بيشوفوه)
$sched = (Invoke-RestMethod "$base/api/sheet?tab=schedule").items

# ------------------------------------------------------------
# مثال 1: طلاب مادة معيّنة عند معيد معيّن
#   بتختاري صف (مادة + معيد) من القايمة. الأول dryRun بيعدّ المستلمين من غير إرسال.
# ------------------------------------------------------------
$pick = $sched |
    Sort-Object course_name_ar, instructor -Unique |
    Select-Object course_name_ar, instructor |
    Out-GridView -Title "اختاري المادة والمعيد" -OutputMode Single

if ($pick) {
    $f = @{
        title      = "تنبيه"
        body       = "نص الإشعار هنا"
        url        = "/"
        dept       = "all"
        type       = "lecture"
        course     = $pick.course_name_ar
        instructor = $pick.instructor
    }
    $dry = Send-Push ($f + @{ dryRun = $true })
    "هيوصل لـ $($dry.matched) مشترك  ($($pick.course_name_ar) - $($pick.instructor))"
    if ($dry.matched -gt 0 -and (Read-Host "أبعت فعلاً؟ (y/n)") -eq "y") { Send-Push $f }
}

# ------------------------------------------------------------
# مثال 2: طلاب قسم + سكشن معيّن (اللي بيدرسوا حسب الجدول)
# ------------------------------------------------------------
$prog = $sched | Where-Object program | Sort-Object program -Unique |
    Select-Object program | Out-GridView -Title "اختاري القسم" -OutputMode Single

if ($prog) {
    $secs = $sched | Where-Object { $_.program -eq $prog.program -and $_.section } |
        ForEach-Object { $_.section -split '[\s,]+' } |
        Sort-Object { [int]$_ } -Unique |
        ForEach-Object { [pscustomobject]@{ section = $_ } }
    $sec = $secs | Out-GridView -Title "اختاري السكشن" -OutputMode Single

    if ($sec) {
        $f = @{
            title   = "تنبيه"
            body    = "نص الإشعار هنا"
            url     = "/"
            dept    = "all"
            type    = "general"
            program = $prog.program
            section = $sec.section
        }
        $dry = Send-Push ($f + @{ dryRun = $true })
        "هيوصل لـ $($dry.matched) مشترك  ($($prog.program) - سكشن $($sec.section))"
        if ($dry.matched -gt 0 -and (Read-Host "أبعت فعلاً؟ (y/n)") -eq "y") { Send-Push $f }
    }
}

# تقدري كمان تجمعي الحقول: course + instructor + program + section مع بعض.