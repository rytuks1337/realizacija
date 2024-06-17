-- Create table: Vartotojas
CREATE TABLE Vartotojas (
    ID SERIAL PRIMARY KEY,
    vardas VARCHAR(50),
    pavarde VARCHAR(50),
    amzius INT,
    el_pastas VARCHAR(50) UNIQUE,
    slaptazodis VARCHAR(50)
);

-- Create table: Sesija
CREATE TABLE Sesija (
    ID SERIAL PRIMARY KEY,
    Vartotojo_ID INT,
    cre_data TIMESTAMP,
    exp_data TIMESTAMP,
    FOREIGN KEY (Vartotojo_ID) REFERENCES Vartotojas(ID)
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
    Varzybos_ID INT,
    FOREIGN KEY (pogrup_ID) REFERENCES Pogrupis(ID),
    FOREIGN KEY (Varzybos_ID) REFERENCES Varzybos(ID)
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
    var_pogrupiai_ID INT,
    FOREIGN KEY (organizatoriusVartotojo_ID) REFERENCES Vartotojas(ID),
    FOREIGN KEY (var_pogrupiai_ID) REFERENCES Var_pogrupiai(ID)
);

-- Create table: Dalyvis_pogrupis
CREATE TABLE Dalyvis_pogrupis (
    ID SERIAL PRIMARY KEY,
    pogrupis_ID INT,
    varzybos_ID INT,
    dalyvis_ID INT,
    FOREIGN KEY (pogrupis_ID) REFERENCES Pogrupis(ID),
    FOREIGN KEY (varzybos_ID) REFERENCES Varzybos(ID),
    FOREIGN KEY (dalyvis_ID) REFERENCES Zmones(ID)
);

-- Create table: Zmones
CREATE TABLE Zmones (
    ID SERIAL PRIMARY KEY,
    vartotojo_ID INT,
    vartotojo_tipas ENUM('Judge', 'Participant'),
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
    ranka VARCHAR(2),
    FOREIGN KEY (dalyvio_ID) REFERENCES Zmones(ID),
    FOREIGN KEY (dalyvio2_ID) REFERENCES Zmones(ID),
    FOREIGN KEY (laimetojoDalyvio_ID) REFERENCES Zmones(ID),
    FOREIGN KEY (teisejasDalyvio_ID) REFERENCES Zmones(ID),
    FOREIGN KEY (varzybu_ID) REFERENCES Varzybos(ID)
);

-- Create table: Prazangos
CREATE TABLE Prazangos (
    ID SERIAL PRIMARY KEY,
    dalyvio_ID INT,
    lenkimo_ID INT,
    prazangos_tipas VARCHAR(4),
    FOREIGN KEY (dalyvio_ID) REFERENCES Zmones(ID),
    FOREIGN KEY (lenkimo_ID) REFERENCES Lenkimo_sesija(ID)
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
