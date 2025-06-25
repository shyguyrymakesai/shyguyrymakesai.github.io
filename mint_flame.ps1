$ErrorActionPreference = 'Stop'

# Path to nonce storage
$nonceFile = Join-Path ($null -ne $PSScriptRoot ? $PSScriptRoot : '.') "backend/nonces.json"

# Ensure backend folder exists
if (-not (Test-Path -Path (Split-Path $nonceFile))) {
    New-Item -ItemType Directory -Path (Split-Path $nonceFile) -Force | Out-Null
}

# Load or initialize nonce mapping
if (Test-Path $nonceFile) {
    $nonces = Get-Content $nonceFile | ConvertFrom-Json
} else {
    $nonces = @{}
}

# Helper to save nonce mapping
function Save-Nonces($data) {
    $json = $data | ConvertTo-Json -Depth 10
    Set-Content -Path $nonceFile -Value $json
}

param(
    [Parameter(Mandatory = $true)] [string] $Address
)

if ($nonces.ContainsKey($Address)) {
    $nonce = [int]$nonces[$Address]
    $nonce += 1
    $nonces[$Address] = $nonce
} else {
    $nonce = 1
    $nonces[$Address] = $nonce
}

Save-Nonces $nonces

$nodeScript = @"
const { ethers } = require('ethers');
const addr = process.argv[2];
const nonce = process.argv[3];
const msg = `${addr}:${nonce}`;
(async () => {
  const wallet = ethers.Wallet.createRandom();
  const signature = await wallet.signMessage(msg);
  console.log(JSON.stringify({ address: addr, nonce, signature }));
})();
"@

node -e $nodeScript -- $Address $nonce
