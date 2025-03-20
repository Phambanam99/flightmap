import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-multi-select-dropdown',
  standalone: false,
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css'],
})
export class MultiSelectDropdownComponent {
  // Controls whether the dropdown content is visible.
  dropdownOpen = false;

  // Example options for multi-select.
  @Input() options: string[] = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
  ];

  // Array to hold selected options.
  selectedOptions: string[] = [];

  constructor(private elementRef: ElementRef) {}

  // Toggle the dropdown visibility when the button is clicked.
  toggleDropdown(event: Event): void {
    event.stopPropagation(); // Prevent click from bubbling to document.
    this.dropdownOpen = !this.dropdownOpen;

    if (this.dropdownOpen) {
      // Initialize selectedOptions when dropdown is opened
      this.selectedOptions = this.options.filter((option) =>
        this.selectedOptions.includes(option)
      );
    }
  }

  // Listen for clicks anywhere in the document.
  // Close the dropdown if the click is outside of this component.
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  // Handles the selection/deselection of an option.
  onOptionSelected(event: Event, option: string): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedOptions = [...this.selectedOptions, option];
    } else {
      this.selectedOptions = this.selectedOptions.filter((o) => o !== option);
    }
  }

  get buttonText(): string {
    return this.selectedOptions.length > 0
      ? `${this.selectedOptions.length}  đã chọn`
      : '';
  }
}
