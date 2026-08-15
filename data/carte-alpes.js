// Schéma de l'itinéraire de la route des Alpes, partagé par les deux pages.
const CARTE_ALPES = '    <svg viewBox="0 0 1000 300" role="img" aria-label="Schéma de l\'itinéraire de Siegsdorf à Oberammergau par la route des Alpes">\n' +
  '      <defs>\n' +
  '        <style>\n' +
  '          .lac { fill: var(--lake); opacity: 0.28; }\n' +
  '          .lacnm { font-family: var(--mono); font-size: 9px; fill: var(--lake); letter-spacing: 0.06em; }\n' +
  '          .trace { fill: none; stroke: var(--ochre); stroke-width: 3.4; stroke-linejoin: round; stroke-linecap: round; }\n' +
  '          .court { fill: none; stroke: var(--muted); stroke-width: 2; stroke-dasharray: 7 6; opacity: 0.75; }\n' +
  '          .pt { fill: var(--card); stroke: var(--ochre); stroke-width: 2.4; }\n' +
  '          .pt-maj { fill: var(--ochre); stroke: var(--card); stroke-width: 2; }\n' +
  '          .pt-swim { fill: var(--lake); stroke: var(--card); stroke-width: 2; }\n' +
  '          .nm { font-family: var(--sans); font-size: 11.5px; fill: var(--ink); font-weight: 600; }\n' +
  '          .km { font-family: var(--mono); font-size: 9px; fill: var(--faint); }\n' +
  '          .lead { stroke: var(--line); stroke-width: 1; }\n' +
  '          .cap { font-family: var(--mono); font-size: 9px; fill: var(--muted); letter-spacing: 0.1em; }\n' +
  '        </style>\n' +
  '      </defs>\n' +
  '\n' +
  '      <!-- lacs -->\n' +
  '      <ellipse class="lac" cx="795" cy="46" rx="52" ry="26"/>\n' +
  '      <text class="lacnm" x="795" y="49" text-anchor="middle">CHIEMSEE</text>\n' +
  '      <ellipse class="lac" cx="878" cy="128" rx="20" ry="9"/>\n' +
  '      <ellipse class="lac" cx="497" cy="122" rx="12" ry="17"/>\n' +
  '      <ellipse class="lac" cx="437" cy="140" rx="11" ry="26"/>\n' +
  '      <ellipse class="lac" cx="234" cy="167" rx="17" ry="19"/>\n' +
  '      <ellipse class="lac" cx="224" cy="196" rx="25" ry="15"/>\n' +
  '      <ellipse class="lac" cx="196" cy="228" rx="9" ry="6"/>\n' +
  '\n' +
  '      <!-- raccourci autoroute Bernau -> Bad Tölz -->\n' +
  '      <path class="court" d="M 751.5,76.9 C 660,20 430,18 338,104.7"/>\n' +
  '      <text class="cap" x="545" y="24" text-anchor="middle">RACCOURCI A8 · 55 KM · 45 MIN</text>\n' +
  '\n' +
  '      <!-- tracé principal -->\n' +
  '      <polyline class="trace" points="881.5,71.6 935,103.6 886.5,126 860,136.7 797,148.9 797.5,113.2 791,106.3 786,94 751.5,76.9 722,95.6 666.5,136.7 655,152.7 645,164.9 595,161.7 580,155.3 567,150.5 491,118 439,129.7 338,104.7 265,133.5 242.5,159.1 236,174 227.5,190 207,234.8 195,240.7 107.5,247.6 106.5,206 93,191.1"/>\n' +
  '\n' +
  '      <!-- points secondaires -->\n' +
  '      <circle class="pt" cx="935" cy="103.6" r="3.4"/>\n' +
  '      <circle class="pt" cx="797.5" cy="113.2" r="3.4"/>\n' +
  '      <circle class="pt" cx="791" cy="106.3" r="3.4"/>\n' +
  '      <circle class="pt" cx="722" cy="95.6" r="3.4"/>\n' +
  '      <circle class="pt" cx="645" cy="164.9" r="3.4"/>\n' +
  '      <circle class="pt" cx="595" cy="161.7" r="3.4"/>\n' +
  '      <circle class="pt" cx="265" cy="133.5" r="3.4"/>\n' +
  '      <circle class="pt" cx="207" cy="234.8" r="3.4"/>\n' +
  '      <circle class="pt" cx="106.5" cy="206" r="3.4"/>\n' +
  '\n' +
  '      <!-- points majeurs et baignades -->\n' +
  '      <circle class="pt-maj" cx="881.5" cy="71.6" r="5"/>\n' +
  '      <circle class="pt-swim" cx="886.5" cy="126" r="5"/>\n' +
  '      <circle class="pt-maj" cx="797" cy="148.9" r="5"/>\n' +
  '      <circle class="pt-swim" cx="751.5" cy="76.9" r="5"/>\n' +
  '      <circle class="pt-maj" cx="666.5" cy="136.7" r="5"/>\n' +
  '      <circle class="pt-maj" cx="580" cy="155.3" r="5"/>\n' +
  '      <circle class="pt-maj" cx="567" cy="150.5" r="5"/>\n' +
  '      <circle class="pt-swim" cx="491" cy="118" r="5"/>\n' +
  '      <circle class="pt-swim" cx="439" cy="129.7" r="5"/>\n' +
  '      <circle class="pt-maj" cx="338" cy="104.7" r="5"/>\n' +
  '      <circle class="pt-swim" cx="242.5" cy="159.1" r="5"/>\n' +
  '      <circle class="pt-swim" cx="227.5" cy="190" r="5"/>\n' +
  '      <circle class="pt-swim" cx="195" cy="240.7" r="5"/>\n' +
  '      <circle class="pt-maj" cx="107.5" cy="247.6" r="5"/>\n' +
  '      <circle class="pt-maj" cx="93" cy="191.1" r="6"/>\n' +
  '\n' +
  '      <!-- étiquettes : est -->\n' +
  '      <line class="lead" x1="881.5" y1="66" x2="881.5" y2="96"/>\n' +
  '      <text class="nm" x="886" y="96" text-anchor="end">Siegsdorf</text>\n' +
  '      <text class="km" x="886" y="107" text-anchor="end">km 0 · départ</text>\n' +
  '\n' +
  '      <line class="lead" x1="886.5" y1="131" x2="886.5" y2="160"/>\n' +
  '      <text class="nm" x="891" y="171" text-anchor="middle">Weitsee</text>\n' +
  '      <text class="km" x="891" y="182" text-anchor="middle">km 22 · baignade</text>\n' +
  '\n' +
  '      <line class="lead" x1="797" y1="154" x2="797" y2="196"/>\n' +
  '      <text class="nm" x="797" y="207" text-anchor="middle">Reit im Winkl</text>\n' +
  '      <text class="km" x="797" y="218" text-anchor="middle">km 40</text>\n' +
  '\n' +
  '      <line class="lead" x1="751.5" y1="82" x2="751.5" y2="116"/>\n' +
  '      <text class="nm" x="751.5" y="127" text-anchor="middle">Bernau · Chiemsee</text>\n' +
  '      <text class="km" x="751.5" y="138" text-anchor="middle">km 65 · baignade</text>\n' +
  '\n' +
  '      <line class="lead" x1="666.5" y1="142" x2="666.5" y2="182"/>\n' +
  '      <text class="nm" x="666.5" y="193" text-anchor="middle">Sachrang</text>\n' +
  '      <text class="km" x="666.5" y="204" text-anchor="middle">km 86</text>\n' +
  '\n' +
  '      <line class="lead" x1="580" y1="160" x2="580" y2="212"/>\n' +
  '      <text class="nm" x="580" y="223" text-anchor="middle">Sudelfeld</text>\n' +
  '      <text class="km" x="580" y="234" text-anchor="middle">km 122 · 1 123 m</text>\n' +
  '\n' +
  '      \n' +
  '\n' +
  '      <line class="lead" x1="439" y1="135" x2="439" y2="180"/>\n' +
  '      <text class="nm" x="439" y="191" text-anchor="middle">Tegernsee</text>\n' +
  '      <text class="km" x="439" y="202" text-anchor="middle">km 154 · baignade</text>\n' +
  '\n' +
  '      <line class="lead" x1="338" y1="99" x2="338" y2="72"/>\n' +
  '      <text class="nm" x="338" y="68" text-anchor="middle">Bad Tölz</text>\n' +
  '      <text class="km" x="338" y="57" text-anchor="middle">km 174</text>\n' +
  '\n' +
  '      <line class="lead" x1="242.5" y1="164" x2="290" y2="164"/>\n' +
  '      <text class="nm" x="295" y="161" text-anchor="start">Kochelsee</text>\n' +
  '      <text class="km" x="295" y="172" text-anchor="start">km 197 · baignade</text>\n' +
  '\n' +
  '      <line class="lead" x1="227.5" y1="195" x2="290" y2="205"/>\n' +
  '      <text class="nm" x="295" y="202" text-anchor="start">Walchensee</text>\n' +
  '      <text class="km" x="295" y="213" text-anchor="start">km 206 · baignade</text>\n' +
  '\n' +
  '      \n' +
  '\n' +
  '      <line class="lead" x1="107.5" y1="253" x2="107.5" y2="272"/>\n' +
  '      <text class="nm" x="112" y="283" text-anchor="middle">Garmisch</text>\n' +
  '      <text class="km" x="112" y="294" text-anchor="middle">km 240</text>\n' +
  '\n' +
  '      <line class="lead" x1="93" y1="185" x2="93" y2="160"/>\n' +
  '      <text class="nm" x="70" y="156" text-anchor="start">Oberammergau</text>\n' +
  '      <text class="km" x="70" y="145" text-anchor="start">km 260 · arrivée</text>\n' +
  '    </svg>';
