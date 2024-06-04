import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chatbot-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chatbot-menu.component.html',
  styleUrls: ['./chatbot-menu.component.css']
})
export class ChatbotMenuComponent {
  pregunta: string = '';
  userMessage: string = '';
  conversation: { sender: string, message: string }[] = [];
  showWelcomeMessage: boolean = true;

  constructor(private chatService: ChatService) {}

  submit() {    
    console.log('Submitted question:', this.pregunta);
    const consulta = {
      pregunta: this.pregunta
    };
    this.chatService.create('consultar', consulta)
      .subscribe({
        next: (datos) => {
          // Handle successful data
          console.log('Successful data:', datos);
          
          if (typeof datos === 'object' && datos !== null && 'respuesta' in datos) {
            // Type assertion para ayudar a TypeScript
            const responseData = datos as { respuesta: string };
            // Add user message to conversation
            this.conversation.push({ sender: 'user', message: this.pregunta });

            // Remove "AI:" prefix from bot response
            const botMessage = responseData.respuesta ? responseData.respuesta.replace(/^AI:\s*/, '') : 'No response from bot';
            this.conversation.push({ sender: 'bot', message: botMessage });
          }
          // Clear input field
          this.pregunta = '';
        },
        error: (error) => {
          // Handle errors
          console.error('Error fetching data:', error);
        },
        complete: () => {
          // Handle completion if needed
        }
      });
  }


  sendMessage() {
    if (this.userMessage.trim() === '') return;

    this.conversation.push({ sender: 'user', message: this.userMessage });

    this.chatService.sendMessage(this.userMessage).subscribe(response => {
      // Remove "AI:" prefix from bot response
      const botMessage = response.message ? response.message.replace(/^AI:\s*/, '') : 'No response from bot';
      this.conversation.push({ sender: 'bot', message: botMessage });
    });

    this.userMessage = '';
  }
}

// export class EjemploComponent {

//   constructor(private el: ElementRef, private renderer: Renderer2) {}

//   // eliminarElementoPorID(id: string) {
//   //   const elemento = this.el.nativeElement.querySelector(`#${id}`);
//   //   if (elemento) {
//   //     this.renderer.removeChild(this.el.nativeElement, elemento);
//   //   }
//   // }

//   eliminarElementoPorClase(id: string) {
//     const elemento = this.el.nativeElement.querySelector(`#${id}`);
//     if (elemento) {
//       this.renderer.removeChild(this.el.nativeElement.querySelector('#contenedor'), elemento);
//     }
//   }

//   eliminarElementosPorClase(clase: string) {
//     const elementos = this.el.nativeElement.querySelectorAll(`.${clase}`);
//     elementos.forEach((elemento: HTMLElement) => {
//       this.renderer.removeChild(this.el.nativeElement.querySelector('#contenedor'), elemento);
//     });
//   }
// }