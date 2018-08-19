
export class DataLocal {
    local: String;
    latitude: number = -0.39;
    altitude: number = 30.00;
    albedo: number = 0.23;
    patm: number;
    constante_psicometrica: number;
    coeficienteCultura: number = 1.2;

    constructor() {
        this.calcPatm();
    }

    calcPatm() {
        if (this.altitude) {
            let valor = ((293 - 0.0065 * this.altitude) / 293);
            valor = Math.pow(valor, 5.26);
            valor = valor * 101.3;
            this.patm = valor;
            this.calcConstantePsicometrica();
        } else {
            this.patm = null;
        }
    }

    calcConstantePsicometrica() {
        if (this.patm) {
            let valor = 0.0006651 * this.patm;
            this.constante_psicometrica = valor;
        } else {
            this.calcConstantePsicometrica = null;
        }

    }


}