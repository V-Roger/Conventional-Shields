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
    container.innerHTML = `
      <div class="shield-selector">
        <div class="shield-type-selector">
          <div class="shield-select--wrapper">
            <select class="shield-type" name="shield-type" aria-label="Shield type">
              ${this.badgeTypes.map(type => `<option value="${type}">${type}</option>`).join('')}
            </select>
            <select class="shield-decorations" name="shield-decorations" aria-label="Shield decorations">
              <option value="">None</option>
              ${this.decorations.map(dec => `<option value="${dec}">${dec}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="shield-actions">
          <div class="shield-preview-content"></div>
          <div>
            <button type="button" class="discard-shield-btn">Discard</button>
            <button type="button" class="insert-shield-btn">OK</button>
          </div>
        </div>
      </div>
    `;

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
        previewContent.innerHTML = '';
        previewContent.appendChild(img);
      } else {
        previewContent.innerHTML = '';
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
      previewContent.innerHTML = '';
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
