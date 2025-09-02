#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Quick Conventional Badge
# @raycast.mode fullOutput
# @raycast.packageName Conventional Shields
# @raycast.icon ⚡
# @raycast.author Virgil ROGER
# @raycast.authorURL https://github.com/V-Roger
# @raycast.description Quick conventional badge generator with common combinations
# @raycast.argument1 { "type": "text", "placeholder": "Quick badge type", "optional": false }

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed or not in PATH${NC}"
    exit 1
fi

# Check if the project is built
if [ ! -f "$PROJECT_ROOT/raycast-scripts/lib/index.js" ]; then
    echo -e "${YELLOW}⚠️  Project not built. Building now...${NC}"
    cd "$PROJECT_ROOT"
    npm run build:raycast
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to build project${NC}"
        exit 1
    fi
fi

# Parse argument
BADGE_TYPE="$1"

# Define quick badge combinations using case statement for compatibility
case "$BADGE_TYPE" in
    # Main conventional comment labels
    "praise")
        LABEL="praise"
        DECORATIONS=""
        ;;
    "nitpick")
        LABEL="nitpick"
        DECORATIONS=""
        ;;
    "suggestion")
        LABEL="suggestion"
        DECORATIONS=""
        ;;
    "issue")
        LABEL="issue"
        DECORATIONS=""
        ;;
    "todo")
        LABEL="todo"
        DECORATIONS=""
        ;;
    "question")
        LABEL="question"
        DECORATIONS=""
        ;;
    "thought")
        LABEL="thought"
        DECORATIONS=""
        ;;
    "chore")
        LABEL="chore"
        DECORATIONS=""
        ;;
    "note")
        LABEL="note"
        DECORATIONS=""
        ;;
    "typo")
        LABEL="typo"
        DECORATIONS=""
        ;;
    "polish")
        LABEL="polish"
        DECORATIONS=""
        ;;
    "quibble")
        LABEL="quibble"
        DECORATIONS=""
        ;;
    
    # Common semantic shortcuts
    "bug")
        LABEL="issue"
        DECORATIONS=""
        ;;
    "feature")
        LABEL="suggestion"
        DECORATIONS=""
        ;;
    "security")
        LABEL="issue"
        DECORATIONS=""
        ;;
    "performance")
        LABEL="suggestion"
        DECORATIONS=""
        ;;
    "ux")
        LABEL="suggestion"
        DECORATIONS=""
        ;;
    "test")
        LABEL="todo"
        DECORATIONS=""
        ;;
    "docs")
        LABEL="chore"
        DECORATIONS=""
        ;;
    "style")
        LABEL="nitpick"
        DECORATIONS=""
        ;;
    "refactor")
        LABEL="suggestion"
        DECORATIONS=""
        ;;
    "breaking")
        LABEL="issue"
        DECORATIONS=""
        ;;
    "deprecated")
        LABEL="chore"
        DECORATIONS=""
        ;;
    "experimental")
        LABEL="suggestion"
        DECORATIONS=""
        ;;
    "wip")
        LABEL="todo"
        DECORATIONS=""
        ;;
    "review")
        LABEL="question"
        DECORATIONS=""
        ;;
    "approved")
        LABEL="praise"
        DECORATIONS=""
        ;;
    "rejected")
        LABEL="issue"
        DECORATIONS=""
        ;;
    
    # Label:Decoration combinations
    "issue:blocking")
        LABEL="issue"
        DECORATIONS="blocking"
        ;;
    "issue:security")
        LABEL="issue"
        DECORATIONS="security"
        ;;
    "issue:bug")
        LABEL="issue"
        DECORATIONS="bug"
        ;;
    "issue:breaking")
        LABEL="issue"
        DECORATIONS="breaking"
        ;;
    "suggestion:performance")
        LABEL="suggestion"
        DECORATIONS="performance"
        ;;
    "suggestion:ux")
        LABEL="suggestion"
        DECORATIONS="ux"
        ;;
    "suggestion:refactor")
        LABEL="suggestion"
        DECORATIONS="refactor"
        ;;
    "suggestion:feature")
        LABEL="suggestion"
        DECORATIONS="feature"
        ;;
    "suggestion:experimental")
        LABEL="suggestion"
        DECORATIONS="experimental"
        ;;
    "todo:test")
        LABEL="todo"
        DECORATIONS="test"
        ;;
    "todo:wip")
        LABEL="todo"
        DECORATIONS="wip"
        ;;
    "chore:documentation")
        LABEL="chore"
        DECORATIONS="documentation"
        ;;
    "chore:deprecated")
        LABEL="chore"
        DECORATIONS="deprecated"
        ;;
    "nitpick:style")
        LABEL="nitpick"
        DECORATIONS="style"
        ;;
    "praise:approved")
        LABEL="praise"
        DECORATIONS="approved"
        ;;
    "question:review")
        LABEL="question"
        DECORATIONS="review"
        ;;
    "praise:non-blocking")
        LABEL="praise"
        DECORATIONS="non-blocking"
        ;;
    "issue:non-blocking")
        LABEL="issue"
        DECORATIONS="non-blocking"
        ;;
    "suggestion:non-blocking")
        LABEL="suggestion"
        DECORATIONS="non-blocking"
        ;;
    "todo:non-blocking")
        LABEL="todo"
        DECORATIONS="non-blocking"
        ;;
    "chore:non-blocking")
        LABEL="chore"
        DECORATIONS="non-blocking"
        ;;
    "question:non-blocking")
        LABEL="question"
        DECORATIONS="non-blocking"
        ;;
    "thought:non-blocking")
        LABEL="thought"
        DECORATIONS="non-blocking"
        ;;
    "note:non-blocking")
        LABEL="note"
        DECORATIONS="non-blocking"
        ;;
    *)
        echo -e "${RED}❌ Invalid badge type: $BADGE_TYPE${NC}"
        echo ""
        echo -e "${YELLOW}Available quick badge types:${NC}"
        echo ""
        echo -e "${CYAN}Main Labels:${NC}"
        echo -e "  ${CYAN}praise${NC} - Praise"
        echo -e "  ${CYAN}nitpick${NC} - Nitpick"
        echo -e "  ${CYAN}suggestion${NC} - Suggestion"
        echo -e "  ${CYAN}issue${NC} - Issue"
        echo -e "  ${CYAN}todo${NC} - TODO"
        echo -e "  ${CYAN}question${NC} - Question"
        echo -e "  ${CYAN}thought${NC} - Thought"
        echo -e "  ${CYAN}chore${NC} - Chore"
        echo -e "  ${CYAN}note${NC} - Note"
        echo -e "  ${CYAN}typo${NC} - Typo"
        echo -e "  ${CYAN}polish${NC} - Polish"
        echo -e "  ${CYAN}quibble${NC} - Quibble"
        echo ""
        echo -e "${CYAN}Common Shortcuts:${NC}"
        echo -e "  ${CYAN}bug${NC} - Issue (bug)"
        echo -e "  ${CYAN}feature${NC} - Suggestion (feature)"
        echo -e "  ${CYAN}security${NC} - Issue (security)"
        echo -e "  ${CYAN}performance${NC} - Suggestion (performance)"
        echo -e "  ${CYAN}ux${NC} - Suggestion (UX)"
        echo -e "  ${CYAN}test${NC} - TODO (test)"
        echo -e "  ${CYAN}docs${NC} - Chore (documentation)"
        echo -e "  ${CYAN}style${NC} - Nitpick (style)"
        echo -e "  ${CYAN}refactor${NC} - Suggestion (refactor)"
        echo -e "  ${CYAN}breaking${NC} - Issue (breaking)"
        echo -e "  ${CYAN}deprecated${NC} - Chore (deprecated)"
        echo -e "  ${CYAN}experimental${NC} - Suggestion (experimental)"
        echo -e "  ${CYAN}wip${NC} - TODO (WIP)"
        echo -e "  ${CYAN}review${NC} - Question (review)"
        echo -e "  ${CYAN}approved${NC} - Praise (approved)"
        echo -e "  ${CYAN}rejected${NC} - Issue (rejected)"
        echo ""
        echo -e "${CYAN}Label:Decoration Combinations:${NC}"
        echo -e "  ${CYAN}issue:blocking${NC} - Issue with blocking"
        echo -e "  ${CYAN}issue:security${NC} - Issue with security"
        echo -e "  ${CYAN}issue:bug${NC} - Issue with bug"
        echo -e "  ${CYAN}issue:breaking${NC} - Issue with breaking"
        echo -e "  ${CYAN}suggestion:performance${NC} - Suggestion with performance"
        echo -e "  ${CYAN}suggestion:ux${NC} - Suggestion with UX"
        echo -e "  ${CYAN}suggestion:refactor${NC} - Suggestion with refactor"
        echo -e "  ${CYAN}suggestion:feature${NC} - Suggestion with feature"
        echo -e "  ${CYAN}suggestion:experimental${NC} - Suggestion with experimental"
        echo -e "  ${CYAN}todo:test${NC} - TODO with test"
        echo -e "  ${CYAN}todo:wip${NC} - TODO with WIP"
        echo -e "  ${CYAN}chore:documentation${NC} - Chore with documentation"
        echo -e "  ${CYAN}chore:deprecated${NC} - Chore with deprecated"
        echo -e "  ${CYAN}nitpick:style${NC} - Nitpick with style"
        echo -e "  ${CYAN}praise:approved${NC} - Praise with approved"
        echo -e "  ${CYAN}question:review${NC} - Question with review"
        echo ""
        echo -e "${CYAN}Non-blocking Variants:${NC}"
        echo -e "  ${CYAN}praise:non-blocking${NC} - Praise (non-blocking)"
        echo -e "  ${CYAN}issue:non-blocking${NC} - Issue (non-blocking)"
        echo -e "  ${CYAN}suggestion:non-blocking${NC} - Suggestion (non-blocking)"
        echo -e "  ${CYAN}todo:non-blocking${NC} - TODO (non-blocking)"
        echo -e "  ${CYAN}chore:non-blocking${NC} - Chore (non-blocking)"
        echo -e "  ${CYAN}question:non-blocking${NC} - Question (non-blocking)"
        echo -e "  ${CYAN}thought:non-blocking${NC} - Thought (non-blocking)"
        echo -e "  ${CYAN}note:non-blocking${NC} - Note (non-blocking)"
        echo ""
        echo -e "${PURPLE}💡 Use the full 'Generate Conventional Badge' command for custom combinations${NC}"
        exit 1
        ;;
esac

# Create temporary Node.js script
TEMP_SCRIPT=$(mktemp)
cat > "$TEMP_SCRIPT" << 'EOF'
const {
  generateConventionalShield
} = require(process.argv[2]);

const label = process.argv[3];
const decorations = process.argv[4] ? process.argv[4].split(',').map(d => d.trim()) : [];

const badgeUrl = generateConventionalShield({
  label,
  decorations
});

console.log(JSON.stringify({
  badgeUrl,
  label,
  decorations: decorations.join(', ')
}));
EOF

# Generate badge
cd "$PROJECT_ROOT"
RESULT=$(node "$TEMP_SCRIPT" "$PROJECT_ROOT/raycast-scripts/lib/index.js" "$LABEL" "$DECORATIONS")

# Clean up temp script
rm "$TEMP_SCRIPT"

# Parse result
BADGE_URL=$(echo "$RESULT" | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf8')).badgeUrl)")
GENERATED_LABEL=$(echo "$RESULT" | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf8')).label)")
GENERATED_DECORATIONS=$(echo "$RESULT" | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf8')).decorations)")

# Generate markdown for clipboard
MARKDOWN="![$BADGE_TYPE]($BADGE_URL)"

# Copy markdown to clipboard
if command -v pbcopy &> /dev/null; then
    # macOS
    echo "$MARKDOWN" | pbcopy
    CLIPBOARD_STATUS="✅ Markdown copied to clipboard"
elif command -v xclip &> /dev/null; then
    # Linux with xclip
    echo "$MARKDOWN" | xclip -selection clipboard
    CLIPBOARD_STATUS="✅ Markdown copied to clipboard"
elif command -v xsel &> /dev/null; then
    # Linux with xsel
    echo "$MARKDOWN" | xsel --clipboard --input
    CLIPBOARD_STATUS="✅ Markdown copied to clipboard"
else
    CLIPBOARD_STATUS="⚠️  Clipboard not available - copy manually"
fi

# Display results
echo -e "${GREEN}✅ Quick badge generated: $BADGE_TYPE${NC}"
echo ""
echo -e "${CYAN}📋 Badge Details:${NC}"
echo -e "  ${YELLOW}Type:${NC} $BADGE_TYPE"
echo -e "  ${YELLOW}Label:${NC} $GENERATED_LABEL"
if [ -n "$GENERATED_DECORATIONS" ]; then
    echo -e "  ${YELLOW}Decorations:${NC} $GENERATED_DECORATIONS"
fi
echo ""
echo -e "${CYAN}🔗 Badge URL:${NC}"
echo "$BADGE_URL"
echo ""
echo -e "${CYAN}📝 Markdown (copied to clipboard):${NC}"
echo "$MARKDOWN"
echo ""
echo -e "${CYAN}🔗 HTML:${NC}"
echo "<img src=\"$BADGE_URL\" alt=\"$BADGE_TYPE\">"
echo ""
echo -e "${GREEN}$CLIPBOARD_STATUS${NC}"
echo -e "${PURPLE}💡 Tip: The markdown is ready to paste in your documentation!${NC}"
