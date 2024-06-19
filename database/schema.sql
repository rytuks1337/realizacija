-- Define ENUM type
CREATE TYPE vartotojo_tipas AS ENUM ('Judge', 'Participant');

-- Create table: Vartotojas
CREATE TABLE Vartotojas (
    ID SERIAL PRIMARY KEY,
    vardas VARCHAR(50),
    pavarde VARCHAR(50),
    amzius INT,
    el_pastas VARCHAR(50) UNIQUE,
    slaptazodis VARCHAR(70)
);

-- Create table: Sesija
CREATE TABLE Sesija (
    ID SERIAL PRIMARY KEY,
    Vartotojo_ID INT,
    cre_data TIMESTAMP,
    exp_data TIMESTAMP
);

-- Create table: Pogrupis
CREATE TABLE Pogrupis (
    ID SERIAL PRIMARY KEY,
    pogrupis VARCHAR(20)
);

-- Create table: Var_pogrupiai
CREATE TABLE Var_pogrupiai (
    ID SERIAL PRIMARY KEY,
    pogrup_ID INT,
    Varzybos_ID INT
);

-- Create table: Varzybos
CREATE TABLE Varzybos (
    ID SERIAL PRIMARY KEY,
    pavadinimas VARCHAR(30),
    data DATE,
    pradzia TIME,
    pabaiga TIME,
    aprasas VARCHAR(255),
    organizatoriusVartotojo_ID INT,
    var_pogrupiai_ID INT
);

-- Create table: Dalyvis_pogrupis
CREATE TABLE Dalyvis_pogrupis (
    ID SERIAL PRIMARY KEY,
    pogrupis_ID INT,
    varzybos_ID INT,
    dalyvis_ID INT
);

-- Create table: Zmones
CREATE TABLE Zmones (
    ID SERIAL PRIMARY KEY,
    vartotojo_ID INT,
    vartotojo_tipas vartotojo_tipas,
    varzybos_ID INT,
    FOREIGN KEY (vartotojo_ID) REFERENCES Vartotojas(ID),
    FOREIGN KEY (varzybos_ID) REFERENCES Varzybos(ID)
);

-- Create table: Lenkimo_sesija
CREATE TABLE Lenkimo_sesija (
    ID SERIAL PRIMARY KEY,
    dalyvio_ID INT,
    dalyvio2_ID INT,
    laimetojoDalyvio_ID INT,
    teisejasDalyvio_ID INT,
    varzybu_ID INT,
    pogrupis VARCHAR(10),
    ranka VARCHAR(2)
);

-- Create table: Prazangos
CREATE TABLE Prazangos (
    ID SERIAL PRIMARY KEY,
    dalyvio_ID INT,
    lenkimo_ID INT,
    prazangos_tipas VARCHAR(4)
);

-- Create table: Irasa_prisijungimai
CREATE TABLE Irasa_prisijungimai (
    ID SERIAL PRIMARY KEY,
    cre_data TIMESTAMP,
    duomenys VARCHAR(255)
);

-- Create table: Irasa_varzybos
CREATE TABLE Irasa_varzybos (
    ID SERIAL PRIMARY KEY,
    cre_data TIMESTAMP,
    duomenys VARCHAR(255)
);

-- Add foreign keys to Sesija table
ALTER TABLE Sesija
    ADD CONSTRAINT fk_sesija_vartotojo
    FOREIGN KEY (Vartotojo_ID)
    REFERENCES Vartotojas(ID);

-- Add foreign keys to Var_pogrupiai table
ALTER TABLE Var_pogrupiai
    ADD CONSTRAINT fk_var_pogrupiai_pogrupis
    FOREIGN KEY (pogrup_ID)
    REFERENCES Pogrupis(ID);

ALTER TABLE Var_pogrupiai
    ADD CONSTRAINT fk_var_pogrupiai_varzybos
    FOREIGN KEY (Varzybos_ID)
    REFERENCES Varzybos(ID);

-- Add foreign keys to Varzybos table
ALTER TABLE Varzybos
    ADD CONSTRAINT fk_varzybos_organizatorius
    FOREIGN KEY (organizatoriusVartotojo_ID)
    REFERENCES Vartotojas(ID);

ALTER TABLE Varzybos
    ADD CONSTRAINT fk_varzybos_var_pogrupiai
    FOREIGN KEY (var_pogrupiai_ID)
    REFERENCES Var_pogrupiai(ID);

-- Add foreign keys to Dalyvis_pogrupis table
ALTER TABLE Dalyvis_pogrupis
    ADD CONSTRAINT fk_dalyvis_pogrupis_pogrupis
    FOREIGN KEY (pogrupis_ID)
    REFERENCES Pogrupis(ID);

ALTER TABLE Dalyvis_pogrupis
    ADD CONSTRAINT fk_dalyvis_pogrupis_varzybos
    FOREIGN KEY (varzybos_ID)
    REFERENCES Varzybos(ID);

ALTER TABLE Dalyvis_pogrupis
    ADD CONSTRAINT fk_dalyvis_pogrupis_zmones
    FOREIGN KEY (dalyvis_ID)
    REFERENCES Zmones(ID);

-- Add foreign keys to Zmones table
ALTER TABLE Zmones
    ADD CONSTRAINT fk_zmones_vartotojas
    FOREIGN KEY (vartotojo_ID)
    REFERENCES Vartotojas(ID);

ALTER TABLE Zmones
    ADD CONSTRAINT fk_zmones_varzybos
    FOREIGN KEY (varzybos_ID)
    REFERENCES Varzybos(ID);

-- Add foreign keys to Lenkimo_sesija table
ALTER TABLE Lenkimo_sesija
    ADD CONSTRAINT fk_lenkimo_sesija_dalyvio1
    FOREIGN KEY (dalyvio_ID)
    REFERENCES Zmones(ID);

ALTER TABLE Lenkimo_sesija
    ADD CONSTRAINT fk_lenkimo_sesija_dalyvio2
    FOREIGN KEY (dalyvio2_ID)
    REFERENCES Zmones(ID);

ALTER TABLE Lenkimo_sesija
    ADD CONSTRAINT fk_lenkimo_sesija_laimetojas
    FOREIGN KEY (laimetojoDalyvio_ID)
    REFERENCES Zmones(ID);

ALTER TABLE Lenkimo_sesija
    ADD CONSTRAINT fk_lenkimo_sesija_teisejas
    FOREIGN KEY (teisejasDalyvio_ID)
    REFERENCES Zmones(ID);

ALTER TABLE Lenkimo_sesija
    ADD CONSTRAINT fk_lenkimo_sesija_varzybos
    FOREIGN KEY (varzybu_ID)
    REFERENCES Varzybos(ID);

-- Add foreign keys to Prazangos table
ALTER TABLE Prazangos
    ADD CONSTRAINT fk_prazangos_zmones
    FOREIGN KEY (dalyvio_ID)
    REFERENCES Zmones(ID);

ALTER TABLE Prazangos
    ADD CONSTRAINT fk_prazangos_lenkimo_sesija
    FOREIGN KEY (lenkimo_ID)
    REFERENCES Lenkimo_sesija(ID);
