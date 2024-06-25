-- Define ENUM type
CREATE TYPE vartotojo_tipas AS ENUM ('Judge', 'Participant', 'Organizer');
CREATE TYPE prazangos_tipas AS ENUM ('Elbow', 'Hand', 'FStart', 'ISlip');
CREATE TYPE ranka AS ENUM ('K', 'D');
CREATE TYPE lytis AS ENUM ('V', 'M');

-- Create table: Vartotojas
CREATE TABLE Vartotojas (
    ID SERIAL PRIMARY KEY,
    vardas VARCHAR(50),
    pavarde VARCHAR(50),
    amzius INT,
    el_pastas VARCHAR(50) UNIQUE,
    slaptazodis VARCHAR(70),
    lytis lytis
);

-- Create table: Pogrupis
CREATE TABLE Pogrupis (
    ID SERIAL PRIMARY KEY,
    pavadinimas VARCHAR(50),
    svoris INT,
    amzius_k INT,
    lytis lytis,
    ranka ranka,
    vartotojo_ID INT,
    varzybos_ID INT
);

-- Create table: Varzybos
CREATE TABLE Varzybos (
    ID SERIAL PRIMARY KEY,
    pavadinimas VARCHAR(100),
    data DATE,
    lokacija VARCHAR(50),
    stalu_sk INT,
    pradzia TIME,
    pabaiga TIME,
    aprasas VARCHAR(4096),
    organizatoriusVartotojo_ID INT
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
    pogrupis_ID VARCHAR(10)
);

-- Create table: Prazangos
CREATE TABLE Prazangos (
    ID SERIAL PRIMARY KEY,
    dalyvio_ID INT,
    lenkimo_ID INT,
    prazangos_tipas prazangos_tipas
);

-- Create table: Irasa_prisijungimai
CREATE TABLE Irasa_prisijungimai (
    ID SERIAL PRIMARY KEY,
    cre_data TIMESTAMP,
    duomenys VARCHAR(4096)
);

-- Create table: Irasa_varzybos
CREATE TABLE Irasa_varzybos (
    ID SERIAL PRIMARY KEY,
    cre_data TIMESTAMP,
    duomenys VARCHAR(4096)
);

-- Add foreign keys to Varzybos table
ALTER TABLE Varzybos
    ADD CONSTRAINT fk_varzybos_organizatorius
    FOREIGN KEY (organizatoriusVartotojo_ID)
    REFERENCES Vartotojas(ID);

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
