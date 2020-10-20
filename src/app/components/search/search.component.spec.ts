import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { SearchComponent } from './search.component';
import {FlightService} from "../../services/flight.service";
import {ComponentsModule} from "../components.module";
import {AppModule} from "../../app.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonHarness} from "@angular/material/button/testing";
import {MatAutocompleteHarness} from "@angular/material/autocomplete/testing";
let loader: HarnessLoader;
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsModule, BrowserAnimationsModule],
      declarations: [ SearchComponent, ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit button is disabled by default', async () => {
    const submitButton = await loader.getHarness(MatButtonHarness.with({selector: 'button[type=submit]'}));
    expect(await submitButton.isDisabled()).toBe(true);
  });

});
