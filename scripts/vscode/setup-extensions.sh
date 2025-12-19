#!/bin/bash
# Setup VS Code Extensions for Payroc SDK JavaScript Development (macOS/Linux)
# This script installs the recommended extensions for developing the Payroc JavaScript SDK

echo "Installing VS Code extensions for Payroc SDK JavaScript development..."

# Check if code command is available
if ! command -v code &> /dev/null; then
    echo "Error: VS Code command 'code' not found in PATH."
    echo "Please ensure VS Code is installed and the 'code' command is available."
    echo "You can add it to PATH by opening VS Code and running 'Shell Command: Install code command in PATH' from the command palette."
    exit 1
fi

# Install Vitest extension
echo "Installing Vitest..."
code --install-extension vitest.explorer --force

echo "✓ Extensions installed successfully!"
echo ""
echo "Next steps:"
echo "1. Reload VS Code (Cmd+Shift+P > Reload Window)"
echo "2. Run tests using the Test Explorer in the sidebar"
echo ""
echo "For more information, see CONTRIBUTORS.md"
