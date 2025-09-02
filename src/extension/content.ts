import * as ConventionalShields from './lib/index.js';

interface ChromeRuntime {
  onMessage: {
    addListener: (callback: (message: any, sender: any, sendResponse: any) => void) => void;
  };
}

interface ChromeAPI {
  runtime?: ChromeRuntime;
}

interface Window {
  chrome?: ChromeAPI;
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

class ConventionalShieldsExtension {
  private badgeTypes: readonly ConventionalShields.ConventionalLabel[] = ConventionalShields.availableLabels;
  private decorations: readonly ConventionalShields.ConventionalDecoration[] = ConventionalShields.availableDecorations;
  private observers: MutationObserver[] = [];
  private enhancedForms: WeakSet<BadgeForm> = new WeakSet();

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
        // Debounce rapid changes
        clearTimeout((this as any).navigationTimeout);
        (this as any).navigationTimeout = setTimeout(() => {
          this.setupBadgeSystem();
        }, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    this.observers.push(observer);
  }

  setupBadgeSystem() {
    try {
      // Find all review comment forms
      this.findAndEnhanceCommentForms();

      // Watch for new comment forms being added
      this.watchForNewCommentForms();
    } catch (error) {
      console.error('Failed to setup badge system:', error);
    }
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
            if (this.isCommentForm(element)) {
              console.log('Enhancing comment form', element);
              this.enhanceCommentForm(element as BadgeForm);
            }

            // Check if any comment forms were added within the node
            const forms = element.querySelectorAll?.('form[data-marker-id="new-comment"], .js-comment-form, .js-new-comment-form, .js-inline-comment-form');
            if (forms) {
              forms.forEach((form: Element) => {
                if (this.isCommentForm(form)) {
                  this.enhanceCommentForm(form as BadgeForm);
                }
              });
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    this.observers.push(observer);
  }

  private isCommentForm(element: Element): boolean {
    return element.matches?.('[data-marker-id="new-comment"], .js-inline-comment-form, .js-comment-form, .js-new-comment-form') || false;
  }

  enhanceCommentForm(form: BadgeForm): void {
    if (this.enhancedForms.has(form)) return; // Prevent double enhancement

    const textarea = form.querySelector('textarea') as BadgeTextarea | null;
    if (!textarea) return;

    try {
      // Mark as enhanced
      this.enhancedForms.add(form);

      // Create badge selector
      const badgeSelector = this.createBadgeSelector();

      // Insert badge selector before the textarea
      const parentNode = textarea.parentNode;
      if (parentNode) {
        (parentNode as HTMLElement).style.flexWrap = 'wrap';
        parentNode.insertBefore(badgeSelector, textarea);
      }

      // Add event listeners
      this.addBadgeEventListeners(badgeSelector, textarea, form);
    } catch (error) {
      console.error('Failed to enhance comment form:', error);
      // Remove from enhanced set if enhancement failed
      this.enhancedForms.delete(form);
    }
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

  addBadgeEventListeners(container: HTMLElement, textarea: BadgeTextarea, form: BadgeForm): void {
    const typeSelect = container.querySelector('.shield-type') as BadgeSelect;
    const decorationSelect = container.querySelector('.shield-decorations') as BadgeSelect;
    const previewContent = container.querySelector('.shield-preview-content') as BadgeDiv;
    const insertBtn = container.querySelector('.insert-shield-btn') as BadgeButton;
    const discardBtn = container.querySelector('.discard-shield-btn') as BadgeButton;

    // Update preview when selections change
    const updatePreview = (): void => {
      const selectedType = typeSelect.value;
      const selectedDecorations = decorationSelect.value;

      if (selectedType) {
        const shieldUrl = this.generateBadge(selectedType as ConventionalShields.ConventionalLabel, selectedDecorations ? [selectedDecorations as ConventionalShields.ConventionalDecoration] : []);
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
      try {
        this.insertBadgeIntoTextarea(textarea, typeSelect.value as ConventionalShields.ConventionalLabel, decorationSelect.value ? [decorationSelect.value as ConventionalShields.ConventionalDecoration] : []);
      } catch (error) {
        console.error('Failed to insert badge:', error);
      }
    });

    // Discard selections
    discardBtn.addEventListener('click', () => {
      try {
        // Reset form selections
        typeSelect.value = '';
        decorationSelect.value = '';

        // Remove the container
        container.remove();
      } catch (error) {
        console.error('Failed to discard badge:', error);
      }
    });
  }

  insertBadgeIntoTextarea(textarea: BadgeTextarea, badgeType: ConventionalShields.ConventionalLabel, decorations: ConventionalShields.ConventionalDecoration[] = []): void {
    if (!badgeType) return;

    try {
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
    } catch (error) {
      console.error('Failed to insert badge into textarea:', error);
      throw error;
    }
  }

  generateBadge(type: ConventionalShields.ConventionalLabel, decorations: ConventionalShields.ConventionalDecoration[] = []): string {
    try {
      const badge = ConventionalShields.generateConventionalShield({
        label: type,
        decorations
      });

      return badge;
    } catch (error) {
      console.error('Failed to generate badge:', error);
      throw new Error(`Failed to generate badge for type: ${type}`);
    }
  }

  // Cleanup method to prevent memory leaks
  public destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.enhancedForms = new WeakSet();
  }
}

// Initialize the extension
const conventionalShieldsExtension = new ConventionalShieldsExtension();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  conventionalShieldsExtension.destroy();
});

// Cleanup on extension unload (if supported)
if ((window as Window)?.chrome?.runtime?.onMessage) {
  (window as Window)?.chrome?.runtime?.onMessage?.addListener((message) => {
    if (message.type === 'cleanup') {
      conventionalShieldsExtension.destroy();
    }
  });
}
