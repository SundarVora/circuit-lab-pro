import type { ComponentKind } from "./symbols";

export interface Part {
  /** Displayed on the node + list row, e.g. "2N2222" */
  label: string;
  kind: ComponentKind;
  /** Short spec line, e.g. "NPN · 40 V · 800 mA" */
  value: string;
}

export interface PartGroup {
  name: string;
  parts: Part[];
}

export interface PartCategory {
  id: string;
  name: string;
  groups: PartGroup[];
}

const npn = (label: string, value: string): Part => ({ label, kind: "bjt-npn", value });
const pnp = (label: string, value: string): Part => ({ label, kind: "bjt-pnp", value });
const nmos = (label: string, value: string): Part => ({ label, kind: "mosfet-n", value });
const pmos = (label: string, value: string): Part => ({ label, kind: "mosfet-p", value });
const jfet = (label: string, value: string): Part => ({ label, kind: "jfet-n", value });

export const PART_CATEGORIES: PartCategory[] = [
  {
    id: "bjt",
    name: "Transistors (BJT)",
    groups: [
      {
        name: "Generic",
        parts: [
          npn("Generic NPN", "NPN · ideal"),
          pnp("Generic PNP", "PNP · ideal"),
        ],
      },
      {
        name: "Small-signal NPN",
        parts: [
          npn("2N2222", "NPN · 40 V · 800 mA"),
          npn("2N2222A", "NPN · 75 V · 800 mA"),
          npn("PN2222A", "NPN · 40 V · 600 mA"),
          npn("2N3904", "NPN · 40 V · 200 mA"),
          npn("2N4401", "NPN · 40 V · 600 mA"),
          npn("2N5088", "NPN · 30 V · low noise"),
          npn("2N5089", "NPN · 25 V · hi-hFE"),
          npn("BC547", "NPN · 45 V · 100 mA"),
          npn("BC548", "NPN · 30 V · 100 mA"),
          npn("BC549", "NPN · 30 V · low noise"),
          npn("BC337", "NPN · 45 V · 800 mA"),
          npn("BC182", "NPN · 50 V · 200 mA"),
          npn("BC183", "NPN · 30 V · 200 mA"),
          npn("BC237", "NPN · 45 V · 100 mA"),
          npn("BC817", "NPN · SOT-23 · 500 mA"),
          npn("MPSA06", "NPN · 80 V · 500 mA"),
          npn("MPSA42", "NPN · 300 V · 500 mA"),
          npn("2N3053", "NPN · 40 V · 700 mA"),
          npn("2SC1815", "NPN · 50 V · 150 mA"),
          npn("2SC945", "NPN · 50 V · 100 mA"),
          npn("KSP2222A", "NPN · 40 V · 600 mA"),
          npn("BF199", "NPN · RF · 550 MHz"),
          npn("2N918", "NPN · RF · 600 MHz"),
        ],
      },
      {
        name: "Small-signal PNP",
        parts: [
          pnp("2N3906", "PNP · 40 V · 200 mA"),
          pnp("2N4403", "PNP · 40 V · 600 mA"),
          pnp("2N2907", "PNP · 60 V · 600 mA"),
          pnp("BC557", "PNP · 45 V · 100 mA"),
          pnp("BC558", "PNP · 30 V · 100 mA"),
          pnp("BC327", "PNP · 45 V · 800 mA"),
          pnp("BC212", "PNP · 50 V · 200 mA"),
          pnp("BC807", "PNP · SOT-23 · 500 mA"),
          pnp("MPSA56", "PNP · 80 V · 500 mA"),
          pnp("2SA1015", "PNP · 50 V · 150 mA"),
        ],
      },
      {
        name: "Power & Darlington",
        parts: [
          npn("TIP120", "NPN Darlington · 60 V · 5 A"),
          npn("TIP122", "NPN Darlington · 100 V · 5 A"),
          pnp("TIP125", "PNP Darlington · 60 V · 5 A"),
          npn("TIP31C", "NPN · 100 V · 3 A"),
          pnp("TIP32C", "PNP · 100 V · 3 A"),
          npn("TIP41C", "NPN · 100 V · 6 A"),
          pnp("TIP42C", "PNP · 100 V · 6 A"),
          npn("BD139", "NPN · 80 V · 1.5 A"),
          pnp("BD140", "PNP · 80 V · 1.5 A"),
          npn("2N3055", "NPN power · 60 V · 15 A"),
          pnp("MJ2955", "PNP power · 60 V · 15 A"),
          npn("MJE3055T", "NPN · 60 V · 10 A"),
          npn("BU508A", "NPN · 700 V · 8 A"),
          npn("2N6488", "NPN · 80 V · 15 A"),
          npn("BDX53C", "NPN Darlington · 100 V · 8 A"),
        ],
      },
    ],
  },
  {
    id: "fet",
    name: "Transistors (MOSFET & JFET)",
    groups: [
      {
        name: "Generic",
        parts: [
          nmos("Generic N-Channel", "NMOS · ideal"),
          pmos("Generic P-Channel", "PMOS · ideal"),
        ],
      },
      {
        name: "N-Channel MOSFET",
        parts: [
          nmos("IRFZ44N", "NMOS · 55 V · 49 A"),
          nmos("IRF540N", "NMOS · 100 V · 33 A"),
          nmos("IRF530", "NMOS · 100 V · 14 A"),
          nmos("IRF3205", "NMOS · 55 V · 110 A"),
          nmos("IRLZ44N", "NMOS logic · 55 V · 47 A"),
          nmos("IRL540N", "NMOS logic · 100 V · 36 A"),
          nmos("STP55NF06L", "NMOS logic · 60 V · 50 A"),
          nmos("FQP30N06L", "NMOS logic · 60 V · 32 A"),
          nmos("BS170", "NMOS · 60 V · 500 mA"),
          nmos("2N7000", "NMOS · 60 V · 200 mA"),
          nmos("2N7002", "NMOS SOT-23 · 60 V"),
          nmos("AO3400", "NMOS · 30 V · 5.7 A"),
          nmos("Si2302", "NMOS · 20 V · 3.6 A"),
          nmos("IRFP250N", "NMOS · 200 V · 30 A"),
          nmos("IRF830", "NMOS · 500 V · 4.5 A"),
        ],
      },
      {
        name: "P-Channel MOSFET",
        parts: [
          pmos("IRF9540N", "PMOS · -100 V · -23 A"),
          pmos("IRF4905", "PMOS · -55 V · -74 A"),
          pmos("FQP27P06", "PMOS · -60 V · -27 A"),
          pmos("AO3401", "PMOS · -30 V · -4 A"),
          pmos("BS250", "PMOS · -45 V · -230 mA"),
          pmos("Si2301", "PMOS · -20 V · -2.9 A"),
        ],
      },
      {
        name: "JFET",
        parts: [
          jfet("2N5457", "N-JFET · general purpose"),
          jfet("2N5458", "N-JFET · general purpose"),
          jfet("2N5459", "N-JFET · higher IDSS"),
          jfet("J201", "N-JFET · low noise audio"),
          jfet("J113", "N-JFET · switch"),
          jfet("MPF102", "N-JFET · RF amp"),
          jfet("BF245", "N-JFET · VHF amp"),
        ],
      },
    ],
  },
  {
    id: "opamp",
    name: "Op-Amps & ICs",
    groups: [
      {
        name: "Op-Amps",
        parts: [
          { label: "Generic Op-Amp", kind: "opamp", value: "ideal · single" },
          { label: "LM741", kind: "opamp", value: "single · general purpose" },
          { label: "LM358", kind: "opamp", value: "dual · low power" },
          { label: "LM324", kind: "opamp", value: "quad · single supply" },
          { label: "TL071", kind: "opamp", value: "single · JFET input" },
          { label: "TL072", kind: "opamp", value: "dual · low noise" },
          { label: "TL074", kind: "opamp", value: "quad · JFET input" },
          { label: "OP07", kind: "opamp", value: "precision · low offset" },
          { label: "LM393", kind: "opamp", value: "dual comparator" },
        ],
      },
      {
        name: "Timers & Logic",
        parts: [
          { label: "NE555", kind: "ic", value: "timer · 8-pin DIP" },
          { label: "NE556", kind: "ic", value: "dual timer" },
          { label: "CD4017", kind: "ic", value: "decade counter" },
          { label: "74HC595", kind: "ic", value: "shift register" },
          { label: "LM317", kind: "ic", value: "adj. regulator" },
          { label: "7805", kind: "ic", value: "5 V regulator" },
        ],
      },
    ],
  },
  {
    id: "passive",
    name: "RF & Misc",
    groups: [
      {
        name: "Passives",
        parts: [
          { label: "Resistor", kind: "resistor", value: "1 kΩ" },
          { label: "Capacitor", kind: "capacitor", value: "10 µF" },
          { label: "Inductor", kind: "inductor", value: "10 mH" },
          { label: "Wire", kind: "wire", value: "0 Ω" },
        ],
      },
      {
        name: "Sources & Nodes",
        parts: [
          { label: "DC Battery", kind: "battery", value: "9 V" },
          { label: "AC Source", kind: "ac-source", value: "1 kHz · 5 Vpp" },
          { label: "Ground", kind: "ground", value: "0 V" },
        ],
      },
      {
        name: "RF",
        parts: [{ label: "Antenna", kind: "antenna", value: "50 Ω · whip" }],
      },
    ],
  },
];
