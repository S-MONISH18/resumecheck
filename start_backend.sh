#!/usr/bin/env bash
# Start the TalentGraph AI Django backend server
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
VENV_DIR="$BACKEND_DIR/.venv"

echo "🐍 Checking Python 3..."
PYTHON=$(command -v python3 || command -v python3.14 || echo "")
if [ -z "$PYTHON" ]; then
  echo "❌ Python 3 not found. Run: sudo apt install python3"
  exit 1
fi
echo "   Using: $PYTHON ($($PYTHON --version))"

# ── Create virtualenv ──────────────────────────────────────────────────────
if [ ! -d "$VENV_DIR" ]; then
  echo "🔧 Creating virtual environment (first time setup)..."
  $PYTHON -m venv "$VENV_DIR" 2>/dev/null || {
    # venv module might need python3-venv package
    echo "⚠️  venv failed. Trying to install python3-venv..."
    sudo apt-get install -y python3-venv python3-pip 2>/dev/null || true
    $PYTHON -m venv "$VENV_DIR"
  }
  echo "✅ Virtual environment created at $VENV_DIR"
fi

# ── Activate venv ──────────────────────────────────────────────────────────
source "$VENV_DIR/bin/activate"
echo "✅ Venv activated: $(which pip)"

# ── Install / upgrade pip inside venv ─────────────────────────────────────
echo "📦 Installing Python dependencies..."
pip install --upgrade pip -q
pip install -r "$BACKEND_DIR/requirements.txt" -q
echo "✅ Dependencies installed."

# ── Migrations ────────────────────────────────────────────────────────────
cd "$BACKEND_DIR"
echo "🗃️  Running database migrations..."
python manage.py migrate

# ── Start server ──────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 TalentGraph AI Backend"
echo "   http://localhost:8000"
echo "   Press Ctrl+C to stop"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
python manage.py runserver 8000

