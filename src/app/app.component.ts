import { RouterOutlet } from '@angular/router'
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';;

declare var webix: any;
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'bead-cleaning';
  @ViewChild('webixContainer', { static: true }) webixContainer!: ElementRef;

  private webixHeader: any;

  ngOnInit() {
    this.webixHeader = webix.ui(
      {
        rows: [
          {
            view: "toolbar",
            elements: [
              { view: "image", src: "logo.png", width: 50, height: 50 }, // Added logo
              { view: "label", label: "Goodyear", align: "left" },
              { view: "label", label: new Date().toLocaleDateString("en-us"), align: "right" }
            ]
          },
          {
            cols: [
              {
                rows: [
                  {
                    view: "template",
                    template: "<h2>AERO Bead Cleaning</h2>",
                    type: "header"
                  },
                  {
                    cols: [
                      { view: "text", id: "barcodeInput", placeholder: "Barcode" },
                      {
                        view: "button", value: "Submit", width: 100, click: function () {
                          const barcode = '';
                          webix.message("Submitted Barcode: " + barcode);
                        }
                      }
                    ]
                  },
                  {
                    view: "datatable",
                    id: "dataTable",
                    columns: [
                      { id: "username", header: "Username", fillspace: true },
                      { id: "barcode", header: "Barcode", fillspace: true },
                      { id: "createdAt", header: "Created At", fillspace: true }
                    ],
                    data: [
                      { username: "AE04085", barcode: "1234567890", createdAt: "2025/06/13 06:54:18" },
                      { username: "AE04085", barcode: "5699999994", createdAt: "2025/06/13 06:53:42" },
                      { username: "AE04085", barcode: "5699999994", createdAt: "2025/06/13 06:53:30" }
                    ]
                  }
                ]
              }
            ]
          },
          { view: "template", template: "Message Board", height: 30 }
        ]
      },);
  }

}
