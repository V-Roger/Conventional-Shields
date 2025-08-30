// Conventional Comments Shields Extension
// Content script for GitHub PR review comments

import { generateConventionalShield, type ConventionalLabel, type ConventionalDecoration } from '../index';

// Chrome extension types
declare global {
  interface Window {
    chrome?: {
      runtime?: {
        onMessage: {
          addListener: (callback: (message: any, sender: any, sendResponse: any) => void) => void;
        };
      };
    };
  }
}

// Type definitions for DOM elements
interface BadgeForm extends Element {
  dataset: {
    badgeEnhanced?: string;
  };
}

interface BadgeTextarea extends HTMLTextAreaElement {
  selectionStart: number;
  selectionEnd: number;
  setSelectionRange(start: number, end: number): void;
}

interface BadgeSelect extends HTMLSelectElement {
  value: string;
}

interface BadgeCheckbox extends HTMLInputElement {
  checked: boolean;
  value: string;
}

interface BadgeButton extends HTMLButtonElement {
  type: "submit" | "reset" | "button";
}

interface BadgeLabel extends HTMLLabelElement {
  // textContent is already defined in HTMLLabelElement
}

interface BadgeDiv extends HTMLDivElement {
  innerHTML: string;
}

class ConventionalShields {
  private badgeTypes: ConventionalLabel[] = [
    'praise', 'nitpick', 'suggestion', 'issue', 'todo',
    'question', 'thought', 'chore', 'note', 'typo',
    'polish', 'quibble'
  ];

  private decorations: ConventionalDecoration[] = [
    'non-blocking', 'blocking', 'if-minor', 'security', 'test',
    'ux', 'performance', 'accessibility', 'documentation', 'style',
    'refactor', 'bug', 'feature', 'breaking', 'deprecated',
    'experimental', 'wip', 'draft', 'review', 'approved', 'rejected'
  ];

  constructor() {
    this.init();
  }

  init() {
    // Wait for GitHub to load
    this.waitForGitHub();

    // Listen for navigation changes (SPA)
    this.observeNavigation();
  }

  waitForGitHub() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupBadgeSystem());
    } else {
      this.setupBadgeSystem();
    }
  }

  observeNavigation() {
    // GitHub is a SPA, so we need to watch for navigation changes
    const observer = new MutationObserver(() => {
      if (window.location.pathname.includes('/pull/')) {
        this.setupBadgeSystem();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  setupBadgeSystem() {
    // Find all review comment forms
    this.findAndEnhanceCommentForms();

    // Watch for new comment forms being added
    this.watchForNewCommentForms();
  }

  findAndEnhanceCommentForms(): void {
    const commentForms = document.querySelectorAll<BadgeForm>('[data-marker-id="new-comment"], .js-inline-comment-form, .js-comment-form, .js-new-comment-form');
    commentForms.forEach((form: BadgeForm) => this.enhanceCommentForm(form));
  }

  watchForNewCommentForms(): void {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation: MutationRecord) => {
        mutation.addedNodes.forEach((node: Node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // Check if the added node is a comment form
            if (element.attributes.getNamedItem('data-marker-id')?.value === 'new-comment' || element.classList && (element.classList.contains('js-comment-form') || element.classList.contains('js-new-comment-form') || element.classList.contains('js-inline-comment-form'))) {
              console.log('enhancing comment form', element);
              this.enhanceCommentForm(element as BadgeForm);
            }

            // Check if any comment forms were added within the node
            const forms = element.querySelectorAll && element.querySelectorAll<BadgeForm>('.js-comment-form, .js-new-comment-form');
            if (forms) {
              forms.forEach((form: BadgeForm) => this.enhanceCommentForm(form));
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  enhanceCommentForm(form: BadgeForm): void {
    if (form.dataset.badgeEnhanced) return; // Prevent double enhancement

    const textarea = form.querySelector('textarea') as BadgeTextarea | null;
    if (!textarea) return;

    // Mark as enhanced
    form.dataset.badgeEnhanced = 'true';

    // Create badge selector
    const badgeSelector = this.createBadgeSelector();

    // Insert badge selector before the textarea
    const parentNode = textarea.parentNode;
    if (parentNode) {
      (parentNode as HTMLElement).style.flexWrap = 'wrap';
      parentNode.insertBefore(badgeSelector, textarea);
    }

    // Add event listeners
    this.addBadgeEventListeners(badgeSelector, textarea);
  }

  createBadgeSelector() {
    const container = document.createElement('div');
    container.className = 'conventional-shields-container';

    // Create the shield selector structure using DOM methods instead of innerHTML
    const shieldSelector = document.createElement('div');
    shieldSelector.className = 'shield-selector';

    const shieldTypeSelector = document.createElement('div');
    shieldTypeSelector.className = 'shield-type-selector';

    const shieldSelectWrapper = document.createElement('div');
    shieldSelectWrapper.className = 'shield-select--wrapper';

    // Create type select
    const typeSelect = document.createElement('select');
    typeSelect.className = 'shield-type';
    typeSelect.name = 'shield-type';
    typeSelect.setAttribute('aria-label', 'Shield type');

    // Add options to type select
    this.badgeTypes.forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      typeSelect.appendChild(option);
    });

    // Create decoration select
    const decorationSelect = document.createElement('select');
    decorationSelect.className = 'shield-decorations';
    decorationSelect.name = 'shield-decorations';
    decorationSelect.setAttribute('aria-label', 'Shield decorations');

    // Add "None" option
    const noneOption = document.createElement('option');
    noneOption.value = '';
    noneOption.textContent = 'None';
    decorationSelect.appendChild(noneOption);

    // Add decoration options
    this.decorations.forEach(dec => {
      const option = document.createElement('option');
      option.value = dec;
      option.textContent = dec;
      decorationSelect.appendChild(option);
    });

    // Assemble the type selector
    shieldSelectWrapper.appendChild(typeSelect);
    shieldSelectWrapper.appendChild(decorationSelect);
    shieldTypeSelector.appendChild(shieldSelectWrapper);

    // Create shield actions
    const shieldActions = document.createElement('div');
    shieldActions.className = 'shield-actions';

    const previewContent = document.createElement('div');
    previewContent.className = 'shield-preview-content';

    const actionButtons = document.createElement('div');

    const discardBtn = document.createElement('button');
    discardBtn.type = 'button';
    discardBtn.className = 'discard-shield-btn';
    discardBtn.textContent = 'Discard';

    const insertBtn = document.createElement('button');
    insertBtn.type = 'button';
    insertBtn.className = 'insert-shield-btn';
    insertBtn.textContent = 'OK';

    actionButtons.appendChild(discardBtn);
    actionButtons.appendChild(insertBtn);

    shieldActions.appendChild(previewContent);
    shieldActions.appendChild(actionButtons);

    // Assemble everything
    shieldSelector.appendChild(shieldTypeSelector);
    shieldSelector.appendChild(shieldActions);
    container.appendChild(shieldSelector);

    return container;
  }

  addBadgeEventListeners(container: HTMLElement, textarea: BadgeTextarea): void {
    const typeSelect = container.querySelector('.shield-type') as BadgeSelect;
    const decorationSelect = container.querySelector('.shield-decorations') as BadgeSelect;
    const previewContent = container.querySelector('.shield-preview-content') as BadgeDiv;
    const insertBtn = container.querySelector('.insert-shield-btn') as BadgeButton;
    const discardBtn = container.querySelector('.discard-shield-btn') as BadgeButton;

    // Update preview when selections change
    const updatePreview = (): void => {
      const selectedType = typeSelect.value as ConventionalLabel;
      const selectedDecorations = decorationSelect.value as ConventionalDecoration;

      if (selectedType) {
        const shieldUrl = this.generateBadge(selectedType, [selectedDecorations]);
        const img = document.createElement('img');
        img.src = shieldUrl;
        img.alt = `${selectedType} shield`;

        // Clear preview content safely
        while (previewContent.firstChild) {
          previewContent.removeChild(previewContent.firstChild);
        }
        previewContent.appendChild(img);
      } else {
        // Clear preview content safely
        while (previewContent.firstChild) {
          previewContent.removeChild(previewContent.firstChild);
        }
      }
    };

    typeSelect.addEventListener('change', updatePreview);
    decorationSelect.addEventListener('change', updatePreview);

    // Insert shield into textarea
    insertBtn.addEventListener('click', () => {
      this.insertBadgeIntoTextarea(textarea, typeSelect.value as ConventionalLabel, [decorationSelect.value as ConventionalDecoration]);
    });

    // Discard selections
    discardBtn.addEventListener('click', () => {
      typeSelect.value = '';
      decorationSelect.value = '';

      // Clear preview content safely
      while (previewContent.firstChild) {
        previewContent.removeChild(previewContent.firstChild);
      }

      container.remove();
    });
  }

  insertBadgeIntoTextarea(textarea: BadgeTextarea, badgeType: ConventionalLabel, decorations: ConventionalDecoration[] = []): void {
    if (!badgeType) return;

    const shieldUrl = this.generateBadge(badgeType, decorations);
    const shieldMarkdown = `![${badgeType}](${shieldUrl})`;

    // Insert at cursor position or at the beginning
    const cursorPos = textarea.selectionStart;
    const textBefore = textarea.value.substring(0, cursorPos);
    const textAfter = textarea.value.substring(cursorPos);

    textarea.value = textBefore + shieldMarkdown + textAfter;

    // Update cursor position
    const newCursorPos = cursorPos + shieldMarkdown.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);

    // Trigger input event to update GitHub's preview
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  }

  generateBadge(type: ConventionalLabel, decorations: ConventionalDecoration[] = []): string {
    const badge = generateConventionalShield({
      label: type,
      decorations
    });

    return badge;
  }
}

// Initialize the extension
const extension = new ConventionalShields();
