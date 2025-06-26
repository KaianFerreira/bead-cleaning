import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarcodeService, BarcodeData, User } from '../barcode.service';
import { AuthService } from '../auth.service';

declare var webix: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  title = 'AERO Bead Cleaning - Goodyear';
  @ViewChild('webixContainer', { static: true }) webixContainer!: ElementRef;

  private webixApp: any;
  private barcodeData: BarcodeData[] = [];
  
  // Logged user
  loggedUser: User = {
    username: 'AE04085',
    name: 'João Silva',
    role: 'Operator'
  };
  
  // Current date formatted for header
  currentDate = new Date().toLocaleDateString("en-US", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  constructor(
    private barcodeService: BarcodeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Get user from auth service
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.loggedUser = {
        username: currentUser.username,
        name: currentUser.name,
        role: currentUser.role || 'Operator'
      };
    }

    this.loadBarcodeData();
    this.initWebix();
  }

  ngOnDestroy() {
    if (this.webixApp) {
      this.webixApp.destructor();
    }
  }

  logout() {
    this.authService.logout();
    // Redirect to login page
    window.location.href = '/login';
  }

  // Method to load barcode data from API
  private loadBarcodeData() {
    this.barcodeService.getBarcodes().subscribe({
      next: (data) => {
        this.barcodeData = data;
        this.updateTable();
      },
      error: (error) => {
        console.log('Using mock barcode data:', error);
        this.barcodeData = this.barcodeService.getMockBarcodes();
        this.updateTable();
      }
    });
  }

  // Method to send new barcode to API
  private sendBarcodeToAPI(barcodeData: BarcodeData) {
    const webix = (window as any).webix;
    
    this.barcodeService.submitBarcode(barcodeData).subscribe({
      next: (response) => {
        console.log('Barcode sent successfully:', response);
        this.loadBarcodeData(); // Reload data
        webix.message({
          text: `✅ Barcode ${barcodeData.barcode} sent successfully!`,
          type: "success",
          expire: 3000
        });
      },
      error: (error) => {
        console.error('Error sending barcode:', error);
        webix.message({
          text: "⚠️ Error sending barcode to server, but saved locally",
          type: "warning",
          expire: 3000
        });
        // Add locally even with error
        this.barcodeData.unshift(barcodeData);
        this.updateTable();
      }
    });
  }

  // Method to update table
  private updateTable() {
    const webix = (window as any).webix;
    const table = webix.$$("barcodeTable");
    if (table) {
      table.clearAll();
      table.parse(this.barcodeData);
    }
  }

  private submitBarcode() {
    const webix = (window as any).webix;
    const barcodeInput = webix.$$("barcodeInput");
    const barcode = barcodeInput.getValue();

    if (!barcode) {
      webix.message({
        text: "⚠️ Please enter a barcode",
        type: "error",
        expire: 3000
      });
      return;
    }

    // Create new entry
    const newEntry: BarcodeData = {
      username: this.loggedUser.username,
      barcode: barcode,
      createdAt: new Date().toLocaleString("en-US", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      status: "Processed"
    };

    // Send to API
    this.sendBarcodeToAPI(newEntry);

    // Clear field
    barcodeInput.setValue("");
    
    // Focus field again
    barcodeInput.focus();
  }

  private initWebix() {
    const webix = (window as any).webix;
    
    if (!webix) {
      console.error('Webix is not loaded');
      return;
    }

    this.webixApp = webix.ui({
      container: this.webixContainer.nativeElement,
      rows: [
        {
          view: "form",
          elements: [
            {
              cols: [
                {
                  view: "text",
                  id: "barcodeInput",
                  label: "Barcode",
                  placeholder: "Enter or scan barcode...",
                  fillspace: true,
                  width: 300,
                },
                {
                  view: "button",
                  label: "Submit",
                  width: 100,
                  css: "webix_primary",
                  click: () => this.submitBarcode()
                }
              ],
            }
          ],
          rules: {
            barcodeInput: webix.rules.isNotEmpty
          },
        },
        {
          view: "datatable",
          id: "barcodeTable",
          columns: [
            { id: "username", header: "User", fillspace: true, sort: "string", width: "100" },
            { id: "barcode", header: "Barcode", fillspace: true, sort: "string", width: "200" },
            { id: "createdAt", header: "Date/Time", fillspace: true, sort: "date", width: "250" },
          ],
          data: this.barcodeData,
          select: "row",
          css: "webix_data_border webix_header_border",
          autoheight: true,
          autowidth: true,
          height: '100%',
        }
      ]
    });

    // Adicionar listener para redimensionamento da janela

    webix.ready(() => {
      console.log('Webix initialized successfully');
    });
  }
}
