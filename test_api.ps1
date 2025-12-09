Write-Host "🔍 Kannamma API Testing Script" -ForegroundColor Cyan

# 1. Login
Write-Host "`n1️⃣ Testing Login..." -ForegroundColor Yellow
$login = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body (@{asha_id="ASHA001"; password="password123"} | ConvertTo-Json)

$token = $login.access_token
Write-Host "✓ Login successful" -ForegroundColor Green
Write-Host "  Token: $($token.Substring(0,20))..." -ForegroundColor Gray

# 2. Get Mothers
Write-Host "`n2️⃣ Testing Get Mothers..." -ForegroundColor Yellow
$mothers = Invoke-RestMethod -Uri "http://localhost:5000/api/mothers" `
  -Method GET `
  -Headers @{"Authorization"="Bearer $token"}

Write-Host "✓ Retrieved $($mothers.Count) mothers" -ForegroundColor Green
if ($mothers.Count -gt 0) {
  $mothers[0..([Math]::Min(1,$mothers.Count-1))] | ForEach-Object {
      Write-Host "  • $($_.name) ($($_.phone)) - Flagged: $($_.flagged)" -ForegroundColor Gray
  }
}

# 3. Get Flagged
Write-Host "`n3️⃣ Testing Get Flagged..." -ForegroundColor Yellow
$flagged = Invoke-RestMethod -Uri "http://localhost:5000/api/mothers/flagged" `
  -Method GET `
  -Headers @{"Authorization"="Bearer $token"}

Write-Host "✓ Retrieved $($flagged.Count) flagged mothers" -ForegroundColor Green
if ($flagged.Count -gt 0) { Write-Host "  • First flagged mother: $($flagged[0].name) ($($flagged[0].phone))" -ForegroundColor Gray }

# 4. Get PHC Stock
Write-Host "`n4️⃣ Testing PHC Stock..." -ForegroundColor Yellow
$stock = Invoke-RestMethod -Uri "http://localhost:5000/api/phc/stock" `
  -Method GET `
  -Headers @{"Authorization"="Bearer $token"}

Write-Host "✓ PHC Stock Retrieved" -ForegroundColor Green
Write-Host "  • Iron: $($stock.iron_tablets)" -ForegroundColor Gray
Write-Host "  • TT: $($stock.tt_vaccine)" -ForegroundColor Gray

# 5. Get Call Logs
Write-Host "`n5️⃣ Testing Call Logs..." -ForegroundColor Yellow
$logs = Invoke-RestMethod -Uri "http://localhost:5000/api/ivr/call-logs" `
  -Method GET `
  -Headers @{"Authorization"="Bearer $token"}

Write-Host "✓ Retrieved $($logs.Count) call logs" -ForegroundColor Green

# 6. Trigger Call (if flagged mother exists)
if ($flagged.Count -gt 0) {
    Write-Host "`n6️⃣ Testing Trigger Call..." -ForegroundColor Yellow
    Write-Host "  Note: Requires Exotel OR verified Twilio numbers" -ForegroundColor Gray
    
    try {
        $call = Invoke-RestMethod -Uri "http://localhost:5000/api/mothers/$($flagged[0].id)/trigger-call" `
          -Method POST `
          -Headers @{"Authorization"="Bearer $token"; "Content-Type"="application/json"} `
          -Body (@{call_type="test"} | ConvertTo-Json) `
          -TimeoutSec 10
        
        if ($call.success) {
            Write-Host "✓ Call triggered successfully!" -ForegroundColor Green
            Write-Host "  • Message: $($call.message)" -ForegroundColor Gray
            Write-Host "  • Call SID: $($call.call_sid)" -ForegroundColor Gray
        } else {
            Write-Host "✗ Call trigger failed: $($call.error)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "✗ Call trigger error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n✅ API Testing Complete!" -ForegroundColor Green
Write-Host "`nSummary:" -ForegroundColor Cyan
Write-Host "  ✓ Login: Working" -ForegroundColor Green
Write-Host "  ✓ Get Mothers: $($mothers.Count) found" -ForegroundColor Green
Write-Host "  ✓ Get Flagged: $($flagged.Count) found" -ForegroundColor Green
Write-Host "  ✓ PHC Stock: Retrieved" -ForegroundColor Green
Write-Host "  ✓ Call Logs: $($logs.Count) found" -ForegroundColor Green
