# Cloudflare D1ローカル開発サーバー起動スクリプト (PowerShell)
# 使用方法: .\scripts\dev-d1.ps1

Write-Host "🚀 Cloudflare D1ローカル開発サーバーを起動します..." -ForegroundColor Green

# backendディレクトリに移動
Set-Location (Split-Path $PSScriptRoot)

Write-Host "📝 wrangler dev で開発サーバーを起動中..." -ForegroundColor Blue

# Wrangler開発サーバーを起動（D1ローカルデータベース付き）
try {
    npx wrangler dev --local --persist
} catch {
    Write-Host "❌ wrangler dev の起動に失敗しました: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
