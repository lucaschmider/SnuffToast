import { Injectable } from "@angular/core";
import { Toast } from "./store/toast";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {

  public loadToastsAsync(): Promise<Toast[]> {
    return Promise.resolve([
      {
        toastId: "714cd5c8-975a-45f3-bf9b-548fd87144f6",
        "title": "vier Jahreszeiten",
        "text": "Im Winter ist es halt schon so gehalten<br />das durch die Kälte die Haut wird gespalten.<br />Im Frühling aber wieder mehr Wärme man verspührt<br />und von alleine die Libido glüht.<br />Der Sommer hat es ganz Dick<br />sind die Miniröcke ganz schick.<br />Ja der Herbst ist doch die beste Zeit<br />die geschwängerte doch zur Hochtzeit schreit.<br />Also liebe Schnupfgemeinschaft sei hier kurz gesagt, <br />vögeln nicht schnupfen, gibt eine Vaterschafts Klag!"
      },
      {
        toastId: "71aa268a-ec6e-4608-948a-d0c09821a284",
        "title": "Meister Proper",
        "text": "Meister Proper putzt das Klo<br />steckt den Finger in den Po<br />steckt den Finger in den Mund<br />Schokolade ist gesund<br /><br />Priiiiiiiiiiis"
      },
      {
        toastId: "c5a6035e-7072-4df3-b44b-de9a0741cb76",
        "title": "Bauer und Sau",
        "text": "Isst der Bauer abends Schinken, <br />tut die Sau am Morgen hinken!<br />Priiiissss!!!"
      },
      {
        toastId: "5ffc2468-45b6-478a-9246-df163c5e7778",
        "title": "Flachdach",
        "text": "Beim Flachdach <br />ist das Dach flach.<br /><br />Priis"
      },
      {

        toastId: "baa46dab-dfbe-40f0-9267-2c9f3c74fd0a",
        "title": "Dampfschiff",
        "text": "Auf jedem Schiff das dampft und segelt, <br />gibt's einer der die Putzfrau vögelt! <br />Und ist das Schiff auch noch so klein, <br />einer muss die Putzfrau sein!"
      }
    ] as Toast[]);
  }
}
