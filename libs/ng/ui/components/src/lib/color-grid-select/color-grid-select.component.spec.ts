import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorGridSelectComponent } from './color-grid-select.component';

describe('ColorGridSelectComponent', () => {
  let component: ColorGridSelectComponent;
  let fixture: ComponentFixture<ColorGridSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorGridSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorGridSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.items).toEqual([]);
    expect(component.itemSize).toBe('small');
    expect(component.value).toBeUndefined();
    expect(component.disabled).toBe(false);
  });

  it('should set items correctly', () => {
    const items = ['rgb(0, 0, 255)','rgb(255, 0, 0)','rgb(0, 255, 0)'];
    component.items = items;
    expect(component.items).toEqual(items);
  });

  it('should set itemSize correctly', () => {
    const itemSize = 'large';
    component.itemSize = itemSize;
    expect(component.itemSize).toBe(itemSize);
  });

  it('should set value correctly', () => {
    const value = 'rgb(0, 0, 255)';
    component.value = value;
    expect(component.value).toBe(value);
  });

  it('should set disabled correctly', () => {
    const disabled = true;
    component.disabled = disabled;
    expect(component.disabled).toBe(disabled);
  });

  it('should emit valueChange event when value changes', () => {
    const value = 'rgb(0, 0, 255)';
    let emittedValue: string | null | undefined;
    component.valueChange.subscribe((val) => (emittedValue = val));
    component.value = value;
    expect(emittedValue).toBe(value);
  });

  it('should calculate grid layout correctly', () => {
    const items = ['rgb(0, 0, 255)','rgb(255, 0, 0)','rgb(0, 255, 0)','rgb(255, 255, 0)','rgb(0, 255, 255)'];
    component.items = items;
    component.itemSize = 'small';
    expect(component.grid).toEqual([['rgb(0, 0, 255)','rgb(255, 0, 0)','rgb(0, 255, 0)','rgb(255, 255, 0)','rgb(0, 255, 255)']]);
  });

  it('should handle navigation correctly', () => {
    const items = ['rgb(0, 0, 255)','rgb(255, 0, 0)','rgb(0, 255, 0)','rgb(255, 255, 0)','rgb(0, 255, 255)'];
    component.items = items;
    component.itemSize = 'small';

    // Simulate keydown events
    component['_onKeydown']({ keyCode: 40 } as KeyboardEvent); // Down arrow
    expect(component['_keyManager'].activeItemIndex).toBe(1);

    component['_onKeydown']({ keyCode: 39 } as KeyboardEvent); // Right arrow
    expect(component['_keyManager'].activeItemIndex).toBe(2);

    component['_onKeydown']({ keyCode: 38 } as KeyboardEvent); // Up arrow
    expect(component['_keyManager'].activeItemIndex).toBe(1);

    component['_onKeydown']({ keyCode: 37 } as KeyboardEvent); // Left arrow
    expect(component['_keyManager'].activeItemIndex).toBe(0);
  });

});
