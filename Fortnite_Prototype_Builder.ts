namespace FortnitePrototypeBuilder {

    // Implementación patron Prototype
    interface Prototype<T> {
        clone(): T;
    }

    class Skin implements Prototype<Skin> {
        constructor(
            public nombre: string,
            public vida: number,
            public escudo: number
        ) { }

        clone(): Skin {
            return new Skin(
                this.nombre,
                this.vida,
                this.escudo
            );
        }

        displayInfo(): void {
            console.log(`
---- SKIN BASE ----
Vida: ${this.vida}
Escudo: ${this.escudo}
`);
        }
    }

    function duplicateSkin<T>(prototype: Prototype<T>): T {
        return prototype.clone();
    }

    // Prodcuto a clonar
    class Loadout {
        public skin: string = "";
        public vida: number = 0;
        public escudo: number = 0;

        public pico: string = "";
        public planeador: string = "";
        public gesto: string = "";
        public arma: string = "";

        displayInfo(): void {

            console.log(`
--> LOADOUT PERSONALIZADO
Skin: ${this.skin}
Vida: ${this.vida}
Escudo: ${this.escudo}

Pico: ${this.pico}
Planeador: ${this.planeador}
Gesto: ${this.gesto}
Arma: ${this.arma}
`);
        }
    }

    // Implementación Patrón Builder
    interface LoadoutBuilder {
        setSkin(skin: Skin): void;
        setPico(pico: string): void;
        setPlaneador(planeador: string): void;
        setGesto(gesto: string): void;
        setArma(arma: string): void;

        getResult(): Loadout;
    }

    class FortniteBuilder implements LoadoutBuilder {
        private loadout: Loadout;

        constructor() {
            this.loadout = new Loadout();
        }

        setSkin(skin: Skin): void {
            this.loadout.skin = skin.nombre;
            this.loadout.vida = skin.vida;
            this.loadout.escudo = skin.escudo;
        }

        setPico(pico: string): void {
            this.loadout.pico = pico;
        }

        setPlaneador(planeador: string): void {
            this.loadout.planeador = planeador;
        }

        setGesto(gesto: string): void {
            this.loadout.gesto = gesto;
        }

        setArma(arma: string): void {
            this.loadout.arma = arma;
        }

        getResult(): Loadout {
            return this.loadout;
        }
    }

    // Cliente
    function main(): void {
        const aura = new Skin(
            "Aura",
            100,
            100
        );

        const skullTrooper = new Skin(
            "Skull Trooper",
            100,
            100
        );

        const superheroe = new Skin(
            "Superheroe",
            100,
            100
        );

        aura.displayInfo();
        console.log("===== CLONANDO SKINS =====");

        const auraClone = duplicateSkin(aura);
        const skullClone = duplicateSkin(skullTrooper);
        const superheroeClone = duplicateSkin(superheroe);

        // Skin clonada Aura
        const builder1 = new FortniteBuilder();

        builder1.setSkin(auraClone);
        builder1.setPico("Picahielos");
        builder1.setPlaneador("Alas Magicas");
        builder1.setGesto("Griddy");
        builder1.setArma("Scar Legendaria");

        const auraLoadout = builder1.getResult();

        // Skin clonada Skull Trooper
        const builder2 = new FortniteBuilder();

        builder2.setSkin(skullClone);
        builder2.setPico("Guadaña");
        builder2.setPlaneador("Avion de papel");
        builder2.setGesto("Take The L");
        builder2.setArma("Spas morada");

        const skullLoadout = builder2.getResult();

        // Skin clonada Banano
        const builder3 = new FortniteBuilder();

        builder3.setSkin(superheroeClone);
        builder3.setPico("Pico de estrella");
        builder3.setPlaneador("Crucero Coral");
        builder3.setGesto("Risa de burro");
        builder3.setArma("Sniper pesado");

        const superheroeLoadout = builder3.getResult();

        auraLoadout.displayInfo();
        skullLoadout.displayInfo();
        superheroeLoadout.displayInfo();
    }

    main();
}