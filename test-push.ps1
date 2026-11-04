# ============================================================
#  أمر اختبار إرسال إشعار — انسخي كل السطور دي دفعة واحدة
#  والصقيها في PowerShell واضغطي Enter
# ============================================================

$headers = @{ "Authorization" = "Bearer 123456789" }

$body = @{
    title = "تجربة إشعار المنصة"
    body  = "تم تفعيل نظام الإشعارات بنجاح على منصة دفعة حاسبات!"
    url   = "/"
    dept  = "all"
} | ConvertTo-Json -Compress

Invoke-RestMethod -Uri "https://faclstudentdcs.vercel.app/api/push-send" -Method Post -Headers $headers -ContentType "application/json; charset=utf-8" -Body ([System.Text.Encoding]::UTF8.GetBytes($body))
