import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public static readonly imageAssetsBasePath: string = '../../assets/images/';
  public static readonly datasourceFilePath: string = '../assets/datasource/question-set-1.json';
}
