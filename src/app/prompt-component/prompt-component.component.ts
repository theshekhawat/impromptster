import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-prompt-component',
  templateUrl: './prompt-component.component.html',
  styleUrls: ['./prompt-component.component.scss']
})
export class PromptComponent implements OnInit {
  public imgBasePath = ConstantsService.imageAssetsBasePath;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { mobileType: 'ios' | 'android', promptEvent?: any },
              private bottomSheetRef: MatBottomSheetRef<PromptComponent>) { }

  ngOnInit(): void {
  }

  public installPwa(): void {
    this.data.promptEvent.prompt();
    this.close();
  }

  public close(): void {
    this.bottomSheetRef.dismiss();
  }

}
