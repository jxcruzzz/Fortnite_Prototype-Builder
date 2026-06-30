namespace FortnitePrototypeBuilder {

    // Patrón: Prototype
    interface Prototype<T> {
        clone(): T;
    }

    class Skin implements Prototype<Skin> {

        constructor(
            public nombre: string,
            public rareza: string,
            public vida: number,
            public escudo: number
        ) { }

        clone(): Skin {
            return new Skin(
                this.nombre,
                this.rareza,
                this.vida,
                this.escudo
            );
        }

        displayInfo(): void {
            console.log(`
===== SKIN BASE =====
Nombre: ${this.nombre}
Rareza: ${this.rareza}
Vida: ${this.vida}
Escudo: ${this.escudo}
`);
        }
    }

    function duplicateSkin<T>(prototype: Prototype<T>): T {
        return prototype.clone();
    }


    // Producto a clonar
    class FortniteCharacter {

        public nombre: string = "";
        public rareza: string = "";
        public vida: number = 0;
        public escudo: number = 0;

        public pico: string = "";
        public mochila: string = "";
        public planeador: string = "";
        public gesto: string = "";
        public arma: string = "";

        displayInfo(): void {

            console.log(`===== PERSONAJE PERSONALIZADO =====

Nombre: ${this.nombre}
Rareza: ${this.rareza}
Vida: ${this.vida}
Escudo: ${this.escudo}

Pico: ${this.pico}
Mochila: ${this.mochila}
Planeador: ${this.planeador}
Gesto: ${this.gesto}
Arma: ${this.arma}
`);
        }
    }

    // Patrón: Builder

    interface CharacterBuilder {
        setDatosBase(skin: Skin): void;
        setPico(pico: string): void;
        setMochila(mochila: string): void;
        setPlaneador(planeador: string): void;
        setGesto(gesto: string): void;
        setArma(arma: string): void;

        getResult(): FortniteCharacter;
    }

    class FortniteBuilder implements CharacterBuilder {
        private character: FortniteCharacter;

        constructor() {
            this.character = new FortniteCharacter();
        }

        setDatosBase(skin: Skin): void {
            this.character.nombre = skin.nombre;
            this.character.rareza = skin.rareza;
            this.character.vida = skin.vida;
            this.character.escudo = skin.escudo;
        }

        setPico(pico: string): void {
            this.character.pico = pico;
        }

        setMochila(mochila: string): void {
            this.character.mochila = mochila;
        }

        setPlaneador(planeador: string): void {
            this.character.planeador = planeador;
        }

        setGesto(gesto: string): void {
            this.character.gesto = gesto;
        }

        setArma(arma: string): void {
            this.character.arma = arma;
        }

        getResult(): FortniteCharacter {
            return this.character;
        }
    }


    // Director
    class CharacterDirector {

        constructor(private builder: CharacterBuilder) { }

        createCompetitiveLoadout(skin: Skin): void {
            this.builder.setDatosBase(skin);
            this.builder.setPico("Pico de Estrella");
            this.builder.setMochila("Trebol");
            this.builder.setPlaneador("Crucero Coral");
            this.builder.setGesto("Take the L");
            this.builder.setArma("Spas dorada");
        }
    }

    // Cliente
    function main(): void {
        const jonesyBase = new Skin(
            "Jonesy",
            "Epica",
            100,
            100
        );

        jonesyBase.displayInfo();

        const clonedSkin = duplicateSkin(jonesyBase);

        const builder = new FortniteBuilder();
        const director = new CharacterDirector(builder);

        director.createCompetitiveLoadout(clonedSkin);

        const finalCharacter = builder.getResult();
        finalCharacter.displayInfo();
    }

    main();
}