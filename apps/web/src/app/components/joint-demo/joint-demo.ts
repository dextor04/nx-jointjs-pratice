import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { dia, shapes } from '@joint/plus';
import { FormsModule } from '@angular/forms';
// import '@joint/plus/build/joint-plus.css';
@Component({
  selector: 'app-joint-demo',
  imports: [FormsModule],
  templateUrl: './joint-demo.html',
  styleUrl: './joint-demo.css',
})
export class JointDemo implements AfterViewInit {
  @ViewChild('paperContainer', { static: true }) paperRef!: ElementRef;

  inputLevel = 0;
  currentLevel = 0;
  private graph!: dia.Graph;
  private paper!: dia.Paper;
  private tankElement!: dia.Element;
  private waterMask!: SVGRectElement;
  private animationFrame: any;

  ngAfterViewInit(): void {
    this.graph = new dia.Graph({}, { cellNamespace: shapes });

    this.paper = new dia.Paper({
      model: this.graph,
      width: window.innerWidth,
      height: window.innerHeight,
      cellViewNamespace: shapes,
      el: this.paperRef.nativeElement,
      background: { color: '#f0f0f0' },
      interactive: true,
    });

    this.renderCombinedTank();
  }
  renderCombinedTank() {
    const Tank = dia.Element.define(
      'custom.CombinedTank',
      {
        attrs: {
          body: {
            refWidth: '100%',
            refHeight: '100%',
            html: this.svgCombined,
          },
        },
      },
      {
        markup: [
          {
            tagName: 'foreignObject',
            selector: 'body',
            attributes: { width: '100%', height: '100%' },
            children: [
              {
                tagName: 'div',
                namespaceURI: 'http://www.w3.org/1999/xhtml',
                style: { width: '100%', height: '100%' },
              },
            ],
          },
        ],
      }
    );

    this.tankElement = new Tank();
    this.tankElement.resize(329, 488);
    this.tankElement.position(25, 100);
    this.graph.addCell(this.tankElement);

    setTimeout(() => {
      const fo = this.paper.el.querySelector('foreignObject');
      if (fo) {
        this.waterMask = fo.querySelector('#clip-rect') as SVGRectElement;
        this.setLevel(0);
      }
    }, 100);
  }

  applyLevel() {
    if (this.inputLevel >= 0 && this.inputLevel <= 100) {
      this.animateLevel(this.currentLevel, this.inputLevel);
    }
  }

  animateLevel(from: number, to: number) {
    const duration = 1000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const level = from + (to - from) * progress;
      this.setLevel(level);

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        this.currentLevel = to;
        cancelAnimationFrame(this.animationFrame);
      }
    };

    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(animate);
  }

  setLevel(level: number) {
    if (!this.waterMask) return;
    // full height of svg
    const svgHeight = 295;

    // Ensure level is within valid bounds (0-100)
    const clampedLevel = Math.max(0, Math.min(100, level)); // 0–100%
    const height = Math.max(0, (clampedLevel / 100) * svgHeight); // pixel height
    const y = svgHeight - height; // clip from bottom

    this.waterMask.setAttribute('height', `${height}`);
    this.waterMask.setAttribute('y', `${y}`);
  }

  private svgCombined = `
<svg width="329" height="488" viewBox="0 0 329 488" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradient for water -->
    <linearGradient id="tankGradient" x1="79" y1="20" x2="83.3536" y2="294.994" gradientUnits="userSpaceOnUse">
      <stop stop-color="#AFD7FF"/>
      <stop offset="0.177655" stop-color="#4EA2F6"/>
      <stop offset="0.400945" stop-color="#2D80D4"/>
      <stop offset="1" stop-color="#0A5DB1"/>
    </linearGradient>

    <!-- Clip path for water level -->
    <clipPath id="tankClip">
      <rect id="clip-rect" x="0" y="295" width="167" height="0" />
    </clipPath>
  </defs>

  <!-- svgTank2: Background Tank -->
  <g id="tank-body"  fill="none">
  <g filter="url(#filter0_d_227_20614)">
<rect x="0.7" y="-0.7" width="168.107" height="302.976" transform="matrix(-1 0 0 1 249.533 84.3945)" fill="#727272"/>
<rect x="0.7" y="-0.7" width="168.107" height="302.976" transform="matrix(-1 0 0 1 249.533 84.3945)" fill="url(#paint0_linear_227_20614)"/>
<rect x="0.7" y="-0.7" width="168.107" height="302.976" transform="matrix(-1 0 0 1 249.533 84.3945)" stroke="black" stroke-width="1.4"/>
<path d="M250.377 393.081V309.704L175.891 389.089H153.279L77.9062 307.043V393.081H250.377Z" fill="white"/>
<rect x="0.495012" y="-0.857386" width="3.35339" height="53.6035" transform="matrix(-0.258746 -0.965945 0.965906 -0.258892 182.57 391.786)" fill="#727272"/>
<rect x="0.495012" y="-0.857386" width="3.35339" height="53.6035" transform="matrix(-0.258746 -0.965945 0.965906 -0.258892 182.57 391.786)" fill="url(#paint1_linear_227_20614)"/>
<rect x="0.495012" y="-0.857386" width="3.35339" height="53.6035" transform="matrix(-0.258746 -0.965945 0.965906 -0.258892 182.57 391.786)" stroke="black" stroke-width="1.4"/>
<rect x="0.85726" y="0.494939" width="3.3529" height="27.9549" transform="matrix(0.965907 -0.258888 0.25875 0.965944 224.612 334.168)" fill="#727272" stroke="black" stroke-width="1.4"/>
<rect x="0.857258" y="0.494938" width="3.3529" height="27.3759" transform="matrix(0.965907 -0.25889 0.258748 0.965945 195.716 364.887)" fill="#727272" stroke="black" stroke-width="1.4"/>
<rect x="-0.857257" y="0.494937" width="3.3529" height="51.7581" transform="matrix(-0.965906 -0.258892 -0.258746 0.965945 250.831 309.85)" fill="#727272" stroke="black" stroke-width="1.4"/>
<rect x="-0.857258" y="0.494938" width="3.3529" height="50.8131" transform="matrix(-0.965907 -0.258891 -0.258748 0.965945 221.515 340.916)" fill="#727272" stroke="black" stroke-width="1.4"/>
<path d="M201.864 360.543V406.548H212.88V350.312L201.864 360.543Z" fill="#727272" stroke="black" stroke-width="1.4"/>
<path d="M231.132 328.655V406.557H242.147V319.999L231.132 328.655Z" fill="#727272" stroke="black" stroke-width="1.4"/>
<rect x="-0.7" y="0.7" width="25.2061" height="3.03491" rx="0.7" transform="matrix(-1 0 0 1 248.801 404.594)" fill="#727272" stroke="black" stroke-width="1.4"/>
<rect x="-0.7" y="0.7" width="25.2061" height="3.03491" rx="0.7" transform="matrix(-1 0 0 1 219.532 404.594)" fill="#727272" stroke="black" stroke-width="1.4"/>
<rect x="-0.49501" y="-0.857382" width="3.35339" height="53.6035" transform="matrix(0.258751 -0.965944 -0.965908 -0.258887 147.08 390.829)" fill="#727272"/>
<rect x="-0.49501" y="-0.857382" width="3.35339" height="53.6035" transform="matrix(0.258751 -0.965944 -0.965908 -0.258887 147.08 390.829)" fill="url(#paint2_linear_227_20614)"/>
<rect x="-0.49501" y="-0.857382" width="3.35339" height="53.6035" transform="matrix(0.258751 -0.965944 -0.965908 -0.258887 147.08 390.829)" stroke="black" stroke-width="1.4"/>
<rect x="-0.85726" y="0.494939" width="3.3529" height="27.9549" transform="matrix(-0.965907 -0.258888 -0.25875 0.965944 103.115 333.725)" fill="#727272" stroke="black" stroke-width="1.4"/>
<rect x="-0.857261" y="0.49494" width="3.3529" height="27.3759" transform="matrix(-0.965908 -0.258887 -0.258751 0.965944 132.035 364.447)" fill="#727272" stroke="black" stroke-width="1.4"/>
<rect x="0.857254" y="0.494935" width="3.3529" height="51.7581" transform="matrix(0.965905 -0.258896 0.258743 0.965946 76.909 310.297)" fill="#727272" stroke="black" stroke-width="1.4"/>
<rect x="0.857261" y="0.49494" width="3.3529" height="50.8131" transform="matrix(0.965907 -0.258887 0.258751 0.965944 106.216 341.36)" fill="#727272" stroke="black" stroke-width="1.4"/>
<path d="M127.528 360.555V406.56H116.513V350.324L127.528 360.555Z" fill="#727272" stroke="black" stroke-width="1.4"/>
<path d="M98.2607 328.663V406.564H87.2451V320.007L98.2607 328.663Z" fill="#727272" stroke="black" stroke-width="1.4"/>
<rect x="79.8992" y="405.298" width="25.2061" height="3.03491" rx="0.7" fill="#727272" stroke="black" stroke-width="1.4"/>
<rect x="109.147" y="405.298" width="25.2061" height="3.03491" rx="0.7" fill="#727272" stroke="black" stroke-width="1.4"/>
<path d="M89.4531 71.2998C82.2083 71.2998 76.335 77.1732 76.335 84.418H77.0352V85.1182H252.609V84.418H253.31C253.31 77.1732 247.436 71.2998 240.191 71.2998H89.4531Z" fill="#727272"/>
<path d="M89.4531 71.2998C82.2083 71.2998 76.335 77.1732 76.335 84.418H77.0352V85.1182H252.609V84.418H253.31C253.31 77.1732 247.436 71.2998 240.191 71.2998H89.4531Z" fill="url(#paint3_linear_227_20614)"/>
<path d="M89.4531 71.2998C82.2083 71.2998 76.335 77.1732 76.335 84.418H77.0352V85.1182H252.609V84.418H253.31C253.31 77.1732 247.436 71.2998 240.191 71.2998H89.4531Z" stroke="black" stroke-width="1.4"/>
<mask id="path-22-outside-1_227_20614" maskUnits="userSpaceOnUse" x="169.939" y="83.293" width="85" height="311" fill="black">
<rect fill="white" x="169.939" y="83.293" width="85" height="311"/>
<path d="M252.636 308.812H252.626L252.633 308.817L175.184 392.069L171.939 389.046L248.201 307.189V85.293H252.636V308.812Z"/>
</mask>
<path d="M252.636 308.812H252.626L252.633 308.817L175.184 392.069L171.939 389.046L248.201 307.189V85.293H252.636V308.812Z" fill="url(#paint4_linear_227_20614)"/>
<path d="M252.636 308.812V310.212H254.036V308.812H252.636ZM252.626 308.812V307.413H248.257L251.812 309.952L252.626 308.812ZM252.633 308.817L253.658 309.771L254.743 308.604L253.447 307.678L252.633 308.817ZM175.184 392.069L174.229 393.094L175.254 394.049L176.209 393.023L175.184 392.069ZM171.939 389.046L170.915 388.092L169.961 389.116L170.985 390.07L171.939 389.046ZM248.201 307.189L249.226 308.144L249.601 307.741V307.189H248.201ZM248.201 85.293V83.893H246.801V85.293H248.201ZM252.636 85.293H254.036V83.893H252.636V85.293ZM252.636 308.812V307.413H252.626V308.812V310.212H252.636V308.812ZM252.626 308.812L251.812 309.952L251.819 309.957L252.633 308.817L253.447 307.678L253.44 307.673L252.626 308.812ZM252.633 308.817L251.608 307.864L174.159 391.116L175.184 392.069L176.209 393.023L253.658 309.771L252.633 308.817ZM175.184 392.069L176.138 391.045L172.894 388.022L171.939 389.046L170.985 390.07L174.229 393.094L175.184 392.069ZM171.939 389.046L172.964 390L249.226 308.144L248.201 307.189L247.177 306.235L170.915 388.092L171.939 389.046ZM248.201 307.189H249.601V85.293H248.201H246.801V307.189H248.201ZM248.201 85.293V86.693H252.636V85.293V83.893H248.201V85.293ZM252.636 85.293H251.236V308.812H252.636H254.036V85.293H252.636Z" fill="black" mask="url(#path-22-outside-1_227_20614)"/>
<mask id="path-24-outside-2_227_20614" maskUnits="userSpaceOnUse" x="74.6914" y="83.293" width="85" height="311" fill="black">
<rect fill="white" x="74.6914" y="83.293" width="85" height="311"/>
<path d="M77.0127 308.807L76.999 308.817L154.448 392.069L157.691 389.046L81.4473 307.207V85.293H77.0127V308.807Z"/>
</mask>
<path d="M77.0127 308.807L76.999 308.817L154.448 392.069L157.691 389.046L81.4473 307.207V85.293H77.0127V308.807Z" fill="url(#paint5_linear_227_20614)"/>
<path d="M77.0127 308.807H78.4127V309.487L77.8776 309.907L77.0127 308.807ZM76.999 308.817L75.974 309.771L74.9374 308.657L76.1341 307.717L76.999 308.817ZM154.448 392.069L155.403 393.093L154.378 394.049L153.423 393.023L154.448 392.069ZM157.691 389.046L158.716 388.092L159.67 389.116L158.646 390.07L157.691 389.046ZM81.4473 307.207L80.4229 308.161L80.0473 307.758V307.207H81.4473ZM81.4473 85.293V83.893H82.8473V85.293H81.4473ZM77.0127 85.293H75.6127V83.893H77.0127V85.293ZM77.0127 308.807L77.8776 309.907L77.864 309.918L76.999 308.817L76.1341 307.717L76.1477 307.706L77.0127 308.807ZM76.999 308.817L78.0241 307.864L155.473 391.116L154.448 392.069L153.423 393.023L75.974 309.771L76.999 308.817ZM154.448 392.069L153.494 391.045L156.737 388.022L157.691 389.046L158.646 390.07L155.403 393.093L154.448 392.069ZM157.691 389.046L156.667 390L80.4229 308.161L81.4473 307.207L82.4716 306.253L158.716 388.092L157.691 389.046ZM81.4473 307.207H80.0473V85.293H81.4473H82.8473V307.207H81.4473ZM81.4473 85.293V86.693H77.0127V85.293V83.893H81.4473V85.293ZM77.0127 85.293H78.4127V308.807H77.0127H75.6127V85.293H77.0127Z" fill="black" mask="url(#path-24-outside-2_227_20614)"/>
<rect x="-0.7" y="0.7" width="32.3011" height="6.58284" rx="2.1" transform="matrix(-1 0 0 1 180.268 385.98)" fill="#727272"/>
<rect x="-0.7" y="0.7" width="32.3011" height="6.58284" rx="2.1" transform="matrix(-1 0 0 1 180.268 385.98)" fill="url(#paint6_linear_227_20614)"/>
<rect x="-0.7" y="0.7" width="32.3011" height="6.58284" rx="2.1" transform="matrix(-1 0 0 1 180.268 385.98)" fill="url(#paint7_linear_227_20614)"/>
<rect x="-0.7" y="0.7" width="32.3011" height="6.58284" rx="2.1" transform="matrix(-1 0 0 1 180.268 385.98)" stroke="black" stroke-width="1.4"/>
</g>
<defs>
<filter id="filter0_d_227_20614" x="0.9375" y="0.601562" width="327.807" height="486.43" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="37"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_227_20614"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_227_20614" result="shape"/>
</filter>
<linearGradient id="paint0_linear_227_20614" x1="2.98061e-06" y1="151.384" x2="166.707" y2="151.384" gradientUnits="userSpaceOnUse">
<stop stop-color="#A5A5A5"/>
<stop offset="0.25" stop-color="#E1E1E1"/>
<stop offset="0.38" stop-color="#ECECEC"/>
<stop offset="0.6" stop-color="#D7D7D7"/>
<stop offset="1" stop-color="#9D9D9D"/>
</linearGradient>
<linearGradient id="paint1_linear_227_20614" x1="2.3767" y1="0" x2="2.3767" y2="55.0035" gradientUnits="userSpaceOnUse">
<stop stop-color="#6F6F6F"/>
<stop offset="0.455" stop-color="#D0D0D0"/>
<stop offset="1" stop-color="#6C6767"/>
</linearGradient>
<linearGradient id="paint2_linear_227_20614" x1="2.3767" y1="0" x2="2.3767" y2="55.0035" gradientUnits="userSpaceOnUse">
<stop stop-color="#6F6F6F"/>
<stop offset="0.455" stop-color="#D0D0D0"/>
<stop offset="1" stop-color="#6C6767"/>
</linearGradient>
<linearGradient id="paint3_linear_227_20614" x1="164.822" y1="72" x2="164.822" y2="84.4179" gradientUnits="userSpaceOnUse">
<stop stop-color="#6F6F6F"/>
<stop offset="0.455" stop-color="#D0D0D0"/>
<stop offset="1" stop-color="#6C6767"/>
</linearGradient>
<linearGradient id="paint4_linear_227_20614" x1="250.789" y1="307.669" x2="173.54" y2="390.537" gradientUnits="userSpaceOnUse">
<stop stop-color="#6F6F6F"/>
<stop offset="0.455" stop-color="#D0D0D0"/>
<stop offset="1" stop-color="#6C6767"/>
</linearGradient>
<linearGradient id="paint5_linear_227_20614" x1="78.846" y1="307.669" x2="156.095" y2="390.534" gradientUnits="userSpaceOnUse">
<stop stop-color="#6F6F6F"/>
<stop offset="0.455" stop-color="#D0D0D0"/>
<stop offset="1" stop-color="#6C6767"/>
</linearGradient>
<linearGradient id="paint6_linear_227_20614" x1="16.8505" y1="0" x2="16.8505" y2="7.98284" gradientUnits="userSpaceOnUse">
<stop offset="0.22" stop-color="#6F6F6F"/>
<stop offset="1" stop-color="#6C6767"/>
</linearGradient>
<linearGradient id="paint7_linear_227_20614" x1="16.8505" y1="0" x2="16.8505" y2="7.98284" gradientUnits="userSpaceOnUse">
<stop stop-color="#6F6F6F"/>
<stop offset="0.455" stop-color="#D0D0D0"/>
<stop offset="1" stop-color="#6C6767"/>
</linearGradient>
</defs>

    <!-- Omitted for brevity (you can paste the big <g>...</g> block here) -->
  </g>

  <!-- svgTank (Water fill): Clipped blue water on top -->
  <g transform="translate(81, 93)" clip-path="url(#tankClip)">
    <path d="M167 20V214.987L166.97 213.774L166.137 214.657L90.7852 294.5H73.2188L0 215.344V20H167Z"
          fill="url(#tankGradient)" stroke="none"/>
    <path fill-rule="evenodd" clip-rule="evenodd"
          d="M56.356 9.04507C34.1278 10.5866 0 0.471645 0 0.471645V20H167V9.04507C167 9.04507 122.937 -2.43525 94.6161 0.471645C87.2677 1.22588 81.6745 2.99548 76.1408 4.74624C70.1824 6.63135 64.2931 8.49463 56.356 9.04507Z"
          fill="#AFD7FF"/>
  </g>
</svg>
`;
  //   private svgTank = `
  // <svg width="167" height="295" viewBox="0 0 167 295" xmlns="http://www.w3.org/2000/svg">
  //   <defs>
  //     <linearGradient id="tankGradient" x1="79" y1="20" x2="83.3536" y2="294.994" gradientUnits="userSpaceOnUse">
  //       <stop stop-color="#AFD7FF"/>
  //       <stop offset="0.177655" stop-color="#4EA2F6"/>
  //       <stop offset="0.400945" stop-color="#2D80D4"/>
  //       <stop offset="1" stop-color="#0A5DB1"/>
  //     </linearGradient>

  //     <!-- ClipPath to reveal only part of tank -->
  //     <clipPath id="tankClip">
  //       <rect id="clip-rect" x="0" y="295" width="167" height="0" />
  //     </clipPath>
  //   </defs>

  //   <g clip-path="url(#tankClip)">
  //     <path d="M167 20V214.987L166.97 213.774L166.137 214.657L90.7852 294.5H73.2188L0 215.344V20H167Z"
  //           fill="url(#tankGradient)" stroke="none"/>
  //     <path fill-rule="evenodd" clip-rule="evenodd"
  //           d="M56.356 9.04507C34.1278 10.5866 0 0.471645 0 0.471645V20H167V9.04507C167 9.04507 122.937 -2.43525 94.6161 0.471645C87.2677 1.22588 81.6745 2.99548 76.1408 4.74624C70.1824 6.63135 64.2931 8.49463 56.356 9.04507Z"
  //           fill="#AFD7FF"/>
  //   </g>
  // </svg>
  // `;
  //   private svgTank2 = `<svg width="329" height="488" viewBox="0 0 329 488" fill="none" xmlns="http://www.w3.org/2000/svg">
  // <g filter="url(#filter0_d_227_20614)">
  // <rect x="0.7" y="-0.7" width="168.107" height="302.976" transform="matrix(-1 0 0 1 249.533 84.3945)" fill="#727272"/>
  // <rect x="0.7" y="-0.7" width="168.107" height="302.976" transform="matrix(-1 0 0 1 249.533 84.3945)" fill="url(#paint0_linear_227_20614)"/>
  // <rect x="0.7" y="-0.7" width="168.107" height="302.976" transform="matrix(-1 0 0 1 249.533 84.3945)" stroke="black" stroke-width="1.4"/>
  // <path d="M250.377 393.081V309.704L175.891 389.089H153.279L77.9062 307.043V393.081H250.377Z" fill="white"/>
  // <rect x="0.495012" y="-0.857386" width="3.35339" height="53.6035" transform="matrix(-0.258746 -0.965945 0.965906 -0.258892 182.57 391.786)" fill="#727272"/>
  // <rect x="0.495012" y="-0.857386" width="3.35339" height="53.6035" transform="matrix(-0.258746 -0.965945 0.965906 -0.258892 182.57 391.786)" fill="url(#paint1_linear_227_20614)"/>
  // <rect x="0.495012" y="-0.857386" width="3.35339" height="53.6035" transform="matrix(-0.258746 -0.965945 0.965906 -0.258892 182.57 391.786)" stroke="black" stroke-width="1.4"/>
  // <rect x="0.85726" y="0.494939" width="3.3529" height="27.9549" transform="matrix(0.965907 -0.258888 0.25875 0.965944 224.612 334.168)" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <rect x="0.857258" y="0.494938" width="3.3529" height="27.3759" transform="matrix(0.965907 -0.25889 0.258748 0.965945 195.716 364.887)" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <rect x="-0.857257" y="0.494937" width="3.3529" height="51.7581" transform="matrix(-0.965906 -0.258892 -0.258746 0.965945 250.831 309.85)" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <rect x="-0.857258" y="0.494938" width="3.3529" height="50.8131" transform="matrix(-0.965907 -0.258891 -0.258748 0.965945 221.515 340.916)" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <path d="M201.864 360.543V406.548H212.88V350.312L201.864 360.543Z" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <path d="M231.132 328.655V406.557H242.147V319.999L231.132 328.655Z" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <rect x="-0.7" y="0.7" width="25.2061" height="3.03491" rx="0.7" transform="matrix(-1 0 0 1 248.801 404.594)" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <rect x="-0.7" y="0.7" width="25.2061" height="3.03491" rx="0.7" transform="matrix(-1 0 0 1 219.532 404.594)" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <rect x="-0.49501" y="-0.857382" width="3.35339" height="53.6035" transform="matrix(0.258751 -0.965944 -0.965908 -0.258887 147.08 390.829)" fill="#727272"/>
  // <rect x="-0.49501" y="-0.857382" width="3.35339" height="53.6035" transform="matrix(0.258751 -0.965944 -0.965908 -0.258887 147.08 390.829)" fill="url(#paint2_linear_227_20614)"/>
  // <rect x="-0.49501" y="-0.857382" width="3.35339" height="53.6035" transform="matrix(0.258751 -0.965944 -0.965908 -0.258887 147.08 390.829)" stroke="black" stroke-width="1.4"/>
  // <rect x="-0.85726" y="0.494939" width="3.3529" height="27.9549" transform="matrix(-0.965907 -0.258888 -0.25875 0.965944 103.115 333.725)" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <rect x="-0.857261" y="0.49494" width="3.3529" height="27.3759" transform="matrix(-0.965908 -0.258887 -0.258751 0.965944 132.035 364.447)" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <rect x="0.857254" y="0.494935" width="3.3529" height="51.7581" transform="matrix(0.965905 -0.258896 0.258743 0.965946 76.909 310.297)" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <rect x="0.857261" y="0.49494" width="3.3529" height="50.8131" transform="matrix(0.965907 -0.258887 0.258751 0.965944 106.216 341.36)" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <path d="M127.528 360.555V406.56H116.513V350.324L127.528 360.555Z" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <path d="M98.2607 328.663V406.564H87.2451V320.007L98.2607 328.663Z" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <rect x="79.8992" y="405.298" width="25.2061" height="3.03491" rx="0.7" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <rect x="109.147" y="405.298" width="25.2061" height="3.03491" rx="0.7" fill="#727272" stroke="black" stroke-width="1.4"/>
  // <path d="M89.4531 71.2998C82.2083 71.2998 76.335 77.1732 76.335 84.418H77.0352V85.1182H252.609V84.418H253.31C253.31 77.1732 247.436 71.2998 240.191 71.2998H89.4531Z" fill="#727272"/>
  // <path d="M89.4531 71.2998C82.2083 71.2998 76.335 77.1732 76.335 84.418H77.0352V85.1182H252.609V84.418H253.31C253.31 77.1732 247.436 71.2998 240.191 71.2998H89.4531Z" fill="url(#paint3_linear_227_20614)"/>
  // <path d="M89.4531 71.2998C82.2083 71.2998 76.335 77.1732 76.335 84.418H77.0352V85.1182H252.609V84.418H253.31C253.31 77.1732 247.436 71.2998 240.191 71.2998H89.4531Z" stroke="black" stroke-width="1.4"/>
  // <mask id="path-22-outside-1_227_20614" maskUnits="userSpaceOnUse" x="169.939" y="83.293" width="85" height="311" fill="black">
  // <rect fill="white" x="169.939" y="83.293" width="85" height="311"/>
  // <path d="M252.636 308.812H252.626L252.633 308.817L175.184 392.069L171.939 389.046L248.201 307.189V85.293H252.636V308.812Z"/>
  // </mask>
  // <path d="M252.636 308.812H252.626L252.633 308.817L175.184 392.069L171.939 389.046L248.201 307.189V85.293H252.636V308.812Z" fill="url(#paint4_linear_227_20614)"/>
  // <path d="M252.636 308.812V310.212H254.036V308.812H252.636ZM252.626 308.812V307.413H248.257L251.812 309.952L252.626 308.812ZM252.633 308.817L253.658 309.771L254.743 308.604L253.447 307.678L252.633 308.817ZM175.184 392.069L174.229 393.094L175.254 394.049L176.209 393.023L175.184 392.069ZM171.939 389.046L170.915 388.092L169.961 389.116L170.985 390.07L171.939 389.046ZM248.201 307.189L249.226 308.144L249.601 307.741V307.189H248.201ZM248.201 85.293V83.893H246.801V85.293H248.201ZM252.636 85.293H254.036V83.893H252.636V85.293ZM252.636 308.812V307.413H252.626V308.812V310.212H252.636V308.812ZM252.626 308.812L251.812 309.952L251.819 309.957L252.633 308.817L253.447 307.678L253.44 307.673L252.626 308.812ZM252.633 308.817L251.608 307.864L174.159 391.116L175.184 392.069L176.209 393.023L253.658 309.771L252.633 308.817ZM175.184 392.069L176.138 391.045L172.894 388.022L171.939 389.046L170.985 390.07L174.229 393.094L175.184 392.069ZM171.939 389.046L172.964 390L249.226 308.144L248.201 307.189L247.177 306.235L170.915 388.092L171.939 389.046ZM248.201 307.189H249.601V85.293H248.201H246.801V307.189H248.201ZM248.201 85.293V86.693H252.636V85.293V83.893H248.201V85.293ZM252.636 85.293H251.236V308.812H252.636H254.036V85.293H252.636Z" fill="black" mask="url(#path-22-outside-1_227_20614)"/>
  // <mask id="path-24-outside-2_227_20614" maskUnits="userSpaceOnUse" x="74.6914" y="83.293" width="85" height="311" fill="black">
  // <rect fill="white" x="74.6914" y="83.293" width="85" height="311"/>
  // <path d="M77.0127 308.807L76.999 308.817L154.448 392.069L157.691 389.046L81.4473 307.207V85.293H77.0127V308.807Z"/>
  // </mask>
  // <path d="M77.0127 308.807L76.999 308.817L154.448 392.069L157.691 389.046L81.4473 307.207V85.293H77.0127V308.807Z" fill="url(#paint5_linear_227_20614)"/>
  // <path d="M77.0127 308.807H78.4127V309.487L77.8776 309.907L77.0127 308.807ZM76.999 308.817L75.974 309.771L74.9374 308.657L76.1341 307.717L76.999 308.817ZM154.448 392.069L155.403 393.093L154.378 394.049L153.423 393.023L154.448 392.069ZM157.691 389.046L158.716 388.092L159.67 389.116L158.646 390.07L157.691 389.046ZM81.4473 307.207L80.4229 308.161L80.0473 307.758V307.207H81.4473ZM81.4473 85.293V83.893H82.8473V85.293H81.4473ZM77.0127 85.293H75.6127V83.893H77.0127V85.293ZM77.0127 308.807L77.8776 309.907L77.864 309.918L76.999 308.817L76.1341 307.717L76.1477 307.706L77.0127 308.807ZM76.999 308.817L78.0241 307.864L155.473 391.116L154.448 392.069L153.423 393.023L75.974 309.771L76.999 308.817ZM154.448 392.069L153.494 391.045L156.737 388.022L157.691 389.046L158.646 390.07L155.403 393.093L154.448 392.069ZM157.691 389.046L156.667 390L80.4229 308.161L81.4473 307.207L82.4716 306.253L158.716 388.092L157.691 389.046ZM81.4473 307.207H80.0473V85.293H81.4473H82.8473V307.207H81.4473ZM81.4473 85.293V86.693H77.0127V85.293V83.893H81.4473V85.293ZM77.0127 85.293H78.4127V308.807H77.0127H75.6127V85.293H77.0127Z" fill="black" mask="url(#path-24-outside-2_227_20614)"/>
  // <rect x="-0.7" y="0.7" width="32.3011" height="6.58284" rx="2.1" transform="matrix(-1 0 0 1 180.268 385.98)" fill="#727272"/>
  // <rect x="-0.7" y="0.7" width="32.3011" height="6.58284" rx="2.1" transform="matrix(-1 0 0 1 180.268 385.98)" fill="url(#paint6_linear_227_20614)"/>
  // <rect x="-0.7" y="0.7" width="32.3011" height="6.58284" rx="2.1" transform="matrix(-1 0 0 1 180.268 385.98)" fill="url(#paint7_linear_227_20614)"/>
  // <rect x="-0.7" y="0.7" width="32.3011" height="6.58284" rx="2.1" transform="matrix(-1 0 0 1 180.268 385.98)" stroke="black" stroke-width="1.4"/>
  // </g>
  // <defs>
  // <filter id="filter0_d_227_20614" x="0.9375" y="0.601562" width="327.807" height="486.43" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  // <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  // <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  // <feOffset dy="4"/>
  // <feGaussianBlur stdDeviation="37"/>
  // <feComposite in2="hardAlpha" operator="out"/>
  // <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
  // <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_227_20614"/>
  // <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_227_20614" result="shape"/>
  // </filter>
  // <linearGradient id="paint0_linear_227_20614" x1="2.98061e-06" y1="151.384" x2="166.707" y2="151.384" gradientUnits="userSpaceOnUse">
  // <stop stop-color="#A5A5A5"/>
  // <stop offset="0.25" stop-color="#E1E1E1"/>
  // <stop offset="0.38" stop-color="#ECECEC"/>
  // <stop offset="0.6" stop-color="#D7D7D7"/>
  // <stop offset="1" stop-color="#9D9D9D"/>
  // </linearGradient>
  // <linearGradient id="paint1_linear_227_20614" x1="2.3767" y1="0" x2="2.3767" y2="55.0035" gradientUnits="userSpaceOnUse">
  // <stop stop-color="#6F6F6F"/>
  // <stop offset="0.455" stop-color="#D0D0D0"/>
  // <stop offset="1" stop-color="#6C6767"/>
  // </linearGradient>
  // <linearGradient id="paint2_linear_227_20614" x1="2.3767" y1="0" x2="2.3767" y2="55.0035" gradientUnits="userSpaceOnUse">
  // <stop stop-color="#6F6F6F"/>
  // <stop offset="0.455" stop-color="#D0D0D0"/>
  // <stop offset="1" stop-color="#6C6767"/>
  // </linearGradient>
  // <linearGradient id="paint3_linear_227_20614" x1="164.822" y1="72" x2="164.822" y2="84.4179" gradientUnits="userSpaceOnUse">
  // <stop stop-color="#6F6F6F"/>
  // <stop offset="0.455" stop-color="#D0D0D0"/>
  // <stop offset="1" stop-color="#6C6767"/>
  // </linearGradient>
  // <linearGradient id="paint4_linear_227_20614" x1="250.789" y1="307.669" x2="173.54" y2="390.537" gradientUnits="userSpaceOnUse">
  // <stop stop-color="#6F6F6F"/>
  // <stop offset="0.455" stop-color="#D0D0D0"/>
  // <stop offset="1" stop-color="#6C6767"/>
  // </linearGradient>
  // <linearGradient id="paint5_linear_227_20614" x1="78.846" y1="307.669" x2="156.095" y2="390.534" gradientUnits="userSpaceOnUse">
  // <stop stop-color="#6F6F6F"/>
  // <stop offset="0.455" stop-color="#D0D0D0"/>
  // <stop offset="1" stop-color="#6C6767"/>
  // </linearGradient>
  // <linearGradient id="paint6_linear_227_20614" x1="16.8505" y1="0" x2="16.8505" y2="7.98284" gradientUnits="userSpaceOnUse">
  // <stop offset="0.22" stop-color="#6F6F6F"/>
  // <stop offset="1" stop-color="#6C6767"/>
  // </linearGradient>
  // <linearGradient id="paint7_linear_227_20614" x1="16.8505" y1="0" x2="16.8505" y2="7.98284" gradientUnits="userSpaceOnUse">
  // <stop stop-color="#6F6F6F"/>
  // <stop offset="0.455" stop-color="#D0D0D0"/>
  // <stop offset="1" stop-color="#6C6767"/>
  // </linearGradient>
  // </defs>
  // </svg>
  // `;
  // renderTank() {
  //   const Tank = dia.Element.define(
  //     'custom.Tank',
  //     {
  //       attrs: {
  //         body: {
  //           refWidth: '100%',
  //           refHeight: '100%',
  //           html: this.svgTank,
  //         },
  //       },
  //     },
  //     {
  //       markup: [
  //         {
  //           tagName: 'foreignObject',
  //           selector: 'body',
  //           attributes: { width: '100%', height: '100%' },
  //           children: [
  //             {
  //               tagName: 'div',
  //               namespaceURI: 'http://www.w3.org/1999/xhtml',
  //               style: { width: '100%', height: '100%' },
  //             },
  //           ],
  //         },
  //       ],
  //     }
  //   );

  //   this.tankElement = new Tank();
  //   this.tankElement.resize(167, 295);
  //   this.tankElement.position(25, 100);
  //   this.graph.addCell(this.tankElement);
  //   // DOM rendering of foreignObject can be delayed — hence setTimeout
  //   setTimeout(() => {
  //     const fo = this.paper.el.querySelector('foreignObject');
  //     console.log('fo', fo);
  //     if (fo) {
  //       this.waterMask = fo.querySelector('#clip-rect') as SVGRectElement;
  //       console.log('watermask', this.waterMask);
  //       this.setLevel(0); // initial level
  //     }
  //   }, 100);
  // }

  // renderTank2() {
  //   const TankLevel = dia.Element.define(
  //     'custom.Tank',
  //     {
  //       attrs: {
  //         body: {
  //           refWidth: '100%',
  //           refHeight: '100%',
  //           html: this.svgTank2,
  //         },
  //       },
  //     },
  //     {
  //       markup: [
  //         {
  //           tagName: 'foreignObject',
  //           selector: 'body',
  //           attributes: { width: '100%', height: '100%' },
  //           children: [
  //             {
  //               tagName: 'div',
  //               namespaceURI: 'http://www.w3.org/1999/xhtml',
  //               style: {
  //                 width: '100%',
  //                 height: '100%',
  //                 // position: 'relative',
  //                 // zIndex: '-1',
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //     }
  //   );

  //   this.tankElement = new TankLevel();
  //   this.tankElement.resize(329, 488);
  //   this.tankElement.position(25, 100);
  //   this.graph.addCell(this.tankElement);
  //   // this.tankElement.set('z', -1);
  //   // DOM rendering of foreignObject can be delayed — hence setTimeout
  //   // setTimeout(() => {
  //   //   const fo = this.paper.el.querySelector('foreignObject');
  //   //   console.log('fo', fo);
  //   //   if (fo) {
  //   //     this.waterMask = fo.querySelector('#clip-rect') as SVGRectElement;
  //   //     console.log('watermask', this.waterMask);
  //   //     this.setLevel(0); // initial level
  //   //   }
  //   // }, 100);
  // }
}
