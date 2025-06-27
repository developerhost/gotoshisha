# Cloudflare D1ローカル開発用マイグレーションスクリプト (PowerShell)
# 使用方法: .\scripts\migrate-d1-local.ps1

Write-Host "D1 local migration starting..." -ForegroundColor Green

# backendディレクトリに移動
Set-Location (Split-Path $PSScriptRoot)

Write-Host "Running local migration files..." -ForegroundColor Blue

try {
    # ローカルD1にマイグレーションを実行
    Write-Host "Running initial migration (0001_initial.sql)..." -ForegroundColor Yellow
    npx wrangler d1 execute gotoshisha-db --local --file=migrations/0001_initial.sql

    Write-Host "Running bio field migration (0002_add_user_bio.sql)..." -ForegroundColor Yellow
    npx wrangler d1 execute gotoshisha-db --local --file=migrations/0002_add_user_bio.sql

    Write-Host "Local migration completed successfully!" -ForegroundColor Green

    # テーブル一覧を表示
    Write-Host "Created tables:" -ForegroundColor Blue
    npx wrangler d1 execute gotoshisha-db --local --command="SELECT name FROM sqlite_master WHERE type='table';"

    Write-Host "Local D1 setup completed!" -ForegroundColor Green
} catch {
    Write-Host "Migration error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
