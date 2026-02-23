#!/bin/bash

# 🎉 MultiLang News Platform - Setup Verification Script
# Run this script after installation to verify everything is working

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📰 MultiLang News Platform - Setup Verification"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check functions
check_node() {
    echo -n "Checking Node.js version... "
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        echo -e "${GREEN}✓${NC} $NODE_VERSION"
        return 0
    else
        echo -e "${RED}✗${NC} Not installed"
        return 1
    fi
}

check_yarn() {
    echo -n "Checking Yarn version... "
    if command -v yarn &> /dev/null; then
        YARN_VERSION=$(yarn --version)
        echo -e "${GREEN}✓${NC} $YARN_VERSION"
        return 0
    else
        echo -e "${RED}✗${NC} Not installed"
        return 1
    fi
}

check_dependencies() {
    echo -n "Checking node_modules... "
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✓${NC} Installed"
        return 0
    else
        echo -e "${RED}✗${NC} Not found"
        return 1
    fi
}

check_env() {
    echo -n "Checking .env file... "
    if [ -f ".env" ]; then
        echo -e "${GREEN}✓${NC} Found"
        return 0
    else
        echo -e "${YELLOW}⚠${NC} Not found (optional for development)"
        return 0
    fi
}

check_build() {
    echo -n "Testing production build... "
    if yarn build &> /dev/null; then
        echo -e "${GREEN}✓${NC} Success"
        return 0
    else
        echo -e "${RED}✗${NC} Failed"
        return 1
    fi
}

# Run checks
echo "🔍 Running system checks..."
echo ""

check_node
NODE_OK=$?

check_yarn
YARN_OK=$?

check_dependencies
DEPS_OK=$?

check_env
ENV_OK=$?

echo ""
echo "🏗️  Testing build..."
echo ""

check_build
BUILD_OK=$?

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Summary
if [ $NODE_OK -eq 0 ] && [ $YARN_OK -eq 0 ] && [ $DEPS_OK -eq 0 ] && [ $BUILD_OK -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "🚀 Your project is ready!"
    echo ""
    echo "Quick commands:"
    echo "  yarn dev      - Start development server"
    echo "  yarn build    - Build for production"
    echo "  yarn preview  - Preview production build"
    echo "  yarn lint     - Check code quality"
    echo ""
    echo "📚 Documentation:"
    echo "  QUICKSTART.md   - Quick setup guide"
    echo "  README.md       - Complete documentation"
    echo "  DEVELOPMENT.md  - Developer guide"
    echo ""
    echo "🌐 Next steps:"
    echo "  1. Run: yarn dev"
    echo "  2. Open: http://localhost:5173"
    echo "  3. Test all features"
    echo "  4. (Optional) Add API keys to .env"
    echo ""
else
    echo -e "${RED}✗ Some checks failed${NC}"
    echo ""
    echo "Please fix the issues above and try again."
    echo ""
    echo "Need help? Check:"
    echo "  - QUICKSTART.md"
    echo "  - README.md"
    echo "  - Troubleshooting section"
    echo ""
    exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
