import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Toast, ToastDocument } from "./store/toast";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {

  constructor(
    private readonly firestore: AngularFirestore
  ) { }

  public loadToastsAsync(): Observable<Toast[]> {
    return this.firestore.collection<ToastDocument>(environment.toastsCollection).get().pipe(
      map((snapshots) => snapshots.docs.map((document) => {
        const { text, title } = document.data();
        return {
          text,
          title,
          toastId: document.id
        } as Toast;
      }))
    );
  }
}
