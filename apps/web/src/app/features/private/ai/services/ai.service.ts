import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { AiRequest } from '../models/ai-request';
import { AiResponse } from '../models/ai-response';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private api = inject(ApiService);

  analyze(data: AiRequest) {
    return this.api.post<AiResponse>('assistant/analyze', data);
  }
  
}
