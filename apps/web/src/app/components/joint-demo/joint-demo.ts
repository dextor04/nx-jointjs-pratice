import { AfterViewInit, Component } from '@angular/core';
import { dia, shapes, ui } from '@joint/plus';
// import '@joint/plus/build/joint-plus.css';
@Component({
  selector: 'app-joint-demo',
  imports: [],
  templateUrl: './joint-demo.html',
  styleUrl: './joint-demo.css',
})
export class JointDemo implements AfterViewInit {
  ngAfterViewInit(): void {
    // Create a new JointJS graph
    const graph = new dia.Graph();

    // Create a new JointJS paper and attach it to the DOM
    const paper = new dia.Paper({
      el: document.getElementById('paper'),
      model: graph,
      width: 600,
      height: 400,
      gridSize: 10,
      drawGrid: true,
      background: { color: '#f8f9fa' },
    });

    // Add a simple rectangle shape to the graph
    const rect = new shapes.standard.Rectangle();
    rect.position(100, 100);
    rect.resize(100, 40);
    rect.attr({
      body: {
        fill: '#2ECC71',
      },
      label: {
        text: 'Hello JointJS',
        fill: 'white',
      },
    });
    rect.addTo(graph);

    // Add a simple ellipse shape to the graph
    const ellipse = new shapes.standard.Ellipse();
    ellipse.position(300, 200);
    ellipse.resize(100, 60);
    ellipse.attr({
      body: {
        fill: '#3498DB',
      },
      label: {
        text: 'Ellipse',
        fill: 'white',
      },
    });
    ellipse.addTo(graph);

    // Link the rectangle and ellipse
    const link = new shapes.standard.Link();
    link.source(rect);
    link.target(ellipse);
    link.attr({
      line: {
        stroke: '#7D3C98',
        strokeWidth: 2,
        targetMarker: {
          type: 'classic',
          fill: '#7D3C98',
          stroke: '#7D3C98',
        },
      },
    });
    link.addTo(graph);
  }
}
