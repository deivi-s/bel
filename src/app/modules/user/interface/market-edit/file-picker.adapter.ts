import {
  HttpClient,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';

import {
  FilePickerAdapter,
  FilePreviewModel,
  UploadResponse,
  UploadStatus,
} from 'ngx-awesome-uploader';
import {
  Observable,
  of,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { LayoutService } from 'src/app/config/services/layout.service';

export class FilPickerAdapter extends FilePickerAdapter {

  constructor(private http: HttpClient, public layoutService: LayoutService) {
    super();
  }
  override uploadFile(fileItem: FilePreviewModel): Observable<UploadResponse> {
    const form = new FormData();
    const reader = new FileReader();
    reader.readAsDataURL(fileItem.file);
    reader.onload = (e) => {
      let image = e.target.result;
      this.layoutService.foto.next(image);
      };
    const api = '';
    const req = new HttpRequest('POST', api, form, { reportProgress: true });
    return this.http.request(req).pipe(
      map((res: HttpEvent<any>) => {
          return { status: UploadStatus.ERROR, body: null };

      })
    );
  }
  public removeFile(fileItem: FilePreviewModel): Observable<any> {
    this.layoutService.foto.next(null);
    return of({id:50});
  }
}
