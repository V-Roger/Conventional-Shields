#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Generate Conventional Badge
# @raycast.mode fullOutput
# @raycast.packageName Conventional Shields
# @raycast.icon 🛡️
# @raycast.author Virgil ROGER
# @raycast.authorURL https://github.com/V-Roger
# @raycast.description Generate conventional comment badges on the fly
# @raycast.argument1 { "type": "text", "placeholder": "Label (praise, suggestion, issue, etc.)", "optional": false }
# @raycast.argument2 { "type": "text", "placeholder": "Decorations (security, blocking, etc.)", "optional": true }
# @raycast.argument3 { "type": "text", "placeholder": "Custom message (overrides decorations)", "optional": true }

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
if [ ! -f "$PROJECT_ROOT/dist/index.js" ]; then
    echo -e "${YELLOW}⚠️  Project not built. Building now...${NC}"
    cd "$PROJECT_ROOT"
    npm run build
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to build project${NC}"
        exit 1
    fi
fi

# Parse arguments
LABEL="$1"
DECORATIONS="$2"
CUSTOM_MESSAGE="$3"

# Validate label
VALID_LABELS=("praise" "nitpick" "suggestion" "issue" "todo" "question" "thought" "chore" "note" "typo" "polish" "quibble")
VALID_DECORATIONS=("non-blocking" "blocking" "if-minor" "security" "test" "ux" "performance" "accessibility" "documentation" "style" "refactor" "bug" "feature" "breaking" "deprecated" "experimental" "wip" "draft" "review" "approved" "rejected")

# Check if label is valid
if [[ ! " ${VALID_LABELS[@]} " =~ " ${LABEL} " ]]; then
    echo -e "${RED}❌ Invalid label: $LABEL${NC}"
    echo -e "${YELLOW}Valid labels:${NC}"
    printf "  %s\n" "${VALID_LABELS[@]}"
    exit 1
fi

# Parse decorations if provided
DECORATIONS_ARRAY=()
if [ -n "$DECORATIONS" ]; then
    IFS=',' read -ra DECORATIONS_ARRAY <<< "$DECORATIONS"
    
    # Validate each decoration
    for decoration in "${DECORATIONS_ARRAY[@]}"; do
        decoration=$(echo "$decoration" | xargs) # trim whitespace
        if [[ ! " ${VALID_DECORATIONS[@]} " =~ " ${decoration} " ]]; then
            echo -e "${RED}❌ Invalid decoration: $decoration${NC}"
            echo -e "${YELLOW}Valid decorations:${NC}"
            printf "  %s\n" "${VALID_DECORATIONS[@]}"
            exit 1
        fi
    done
fi

# Create temporary Node.js script
TEMP_SCRIPT=$(mktemp)
cat > "$TEMP_SCRIPT" << 'EOF'
const {
  generateConventionalShield,
  generateBadge
} = require(process.argv[2]);

const label = process.argv[3];
const decorations = process.argv[4] ? process.argv[4].split(',').map(d => d.trim()) : [];
const customMessage = process.argv[5] || '';

let badgeUrl;

if (customMessage) {
  // Use custom message (overrides decorations)
  badgeUrl = generateConventionalShield({
    label,
    message: customMessage
  });
} else {
  // Use decorations
  badgeUrl = generateConventionalShield({
    label,
    decorations
  });
}

console.log(JSON.stringify({
  badgeUrl,
  label,
  decorations,
  customMessage
}));
EOF

# Generate badge
cd "$PROJECT_ROOT"
RESULT=$(node "$TEMP_SCRIPT" "$PROJECT_ROOT/dist/index.js" "$LABEL" "$DECORATIONS" "$CUSTOM_MESSAGE")

# Clean up temp script
rm "$TEMP_SCRIPT"

# Parse result
BADGE_URL=$(echo "$RESULT" | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf8')).badgeUrl)")
GENERATED_LABEL=$(echo "$RESULT" | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf8')).label)")
GENERATED_DECORATIONS=$(echo "$RESULT" | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf8')).decorations.join(', '))")
GENERATED_MESSAGE=$(echo "$RESULT" | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf8')).customMessage)")

# Generate markdown for clipboard
MARKDOWN="![$GENERATED_LABEL]($BADGE_URL)"

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
echo -e "${GREEN}✅ Badge generated successfully!${NC}"
echo ""
echo -e "${CYAN}📋 Badge Details:${NC}"
echo -e "  ${YELLOW}Label:${NC} $GENERATED_LABEL"
if [ -n "$GENERATED_DECORATIONS" ]; then
    echo -e "  ${YELLOW}Decorations:${NC} $GENERATED_DECORATIONS"
fi
if [ -n "$GENERATED_MESSAGE" ]; then
    echo -e "  ${YELLOW}Custom Message:${NC} $GENERATED_MESSAGE"
fi
echo ""
echo -e "${CYAN}🔗 Badge URL:${NC}"
echo "$BADGE_URL"
echo ""
echo -e "${CYAN}📝 Markdown (copied to clipboard):${NC}"
echo "$MARKDOWN"
echo ""
echo -e "${CYAN}🔗 HTML:${NC}"
echo "<img src=\"$BADGE_URL\" alt=\"$GENERATED_LABEL\">"
echo ""
echo -e "${GREEN}$CLIPBOARD_STATUS${NC}"
echo -e "${PURPLE}💡 Tip: The markdown is ready to paste in your documentation!${NC}"
