import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JointDemo } from './components/joint-demo/joint-demo';
@Component({
  imports: [RouterModule, JointDemo],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'web';
}
