import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  // Local System
  public static readonly imageAssetsBasePath: string = '../../assets/images/';
  public static readonly datasourceFilePath: string = '../assets/datasource/question-set-1.json';

  // Github Deployment
  // public static readonly imageAssetsBasePath: string = '/impromptster/assets/images/';
  // public static readonly datasourceFilePath: string = '/impromptster/assets/datasource/question-set-1.json';
}
