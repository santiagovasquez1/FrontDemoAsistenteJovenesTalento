import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotMenuComponent } from './chatbot-menu.component';

describe('ChatbotMenuComponent', () => {
  let component: ChatbotMenuComponent;
  let fixture: ComponentFixture<ChatbotMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatbotMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
